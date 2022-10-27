import { React, useState, useEffect } from "react";
import styles from "./main.module.scss";
import { Buffer } from "buffer";
import { create } from "ipfs-http-client";
import json from "./contract/Certificates.json";
import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";
import Confetti from "react-confetti";

const projectId = '2FoHLw3Z83eOruuqk1OB3245oGY';
const projectSecret = '3c4a631dc43de1bd574b239e8118a4fc';
const authorization =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const contractAddress = '0xBC2fA093400FAbE53Bb43A95616155152eC4aAD5';
const contractABI = json.abi;
const ipfs = create({
  host:'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: authorization,
  },

});

export default function Main() {
  async function refreshPage() {
    await delay(3000);
    window.location.reload(false);
  }
  const contract = new Contract(contractAddress, contractABI);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(0);
  const [artist, setArtist] = useState("");
  const [worked, setWorked] = useState(false)

  const onChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const {send,state} = useContractFunction(contract, "createCertificate");

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const uploadHandler = async () => {
    if(title&&year&&artist){
    try {
      const img = await ipfs.add(image);
      const data = JSON.stringify({
        name: title,
        description: "Verified certificate",
        image: `https://verisart-tiff.infura-ipfs.io/ipfs/${img.path}`,
        attributes: [
          { trait_type: "Artist", value: artist },
          { trait_type: "Year", value: year },
        ],
      });
      const nftURI = await ipfs.add(Buffer.from(data));
      const url = `https://verisart-tiff.infura-ipfs.io/ipfs/${nftURI.path}`;
      console.log(url);
      await send(url);
      console.log(state.status)
      
    } catch (error) {
      console.log("Error uploading file: ", error);
    }}
  };
  useEffect(() => {
    if (state.status == 'Mining') {
      setYear()
    setArtist("")
    setTitle("")
    setImage(null)
    setWorked(true);
    refreshPage();
    
    }
  }, [state])

  useEffect(() => {
    if (state.status == 'Success') {
      refreshPage()
    }
  }, [state])
  return (
    <div className={styles.container}>
      <div className={styles.input}>
      {worked? (
          <Confetti className={styles.confetti} width={800} height={500} recycle={false} />
        ) : (
          <></>
        )}
       
        <label className={styles.label}>
          Title:
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            className={styles.field}
          ></input>
        </label>
        <label>
          Artist:
          <input
            className={styles.field}
            type="text"
            name="artist"
            onChange={(e) => setArtist(e.target.value)}
          ></input>
        </label>
        <label>
          Year:
          <input
            className={styles.field}
            type="text"
            name="year"
            onChange={(e) => setYear(e.target.value)}
          ></input>
        </label>
        <label>
          Image Upload
          <input
            className={styles.field}
            type="file"
            accept="image/*"
            name="ImageStyle"
            onChange={onChange}
          />
        </label>
        {image && <img className={styles.img} src={image} alt="idk"></img>}
        {image && <button className={styles.btn} onClick={uploadHandler}>
          Mint
        </button>}
      </div>
    </div>
  );
}
