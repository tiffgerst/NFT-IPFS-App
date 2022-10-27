// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Certificates is ERC721URIStorage, Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _certificateID;


constructor() ERC721("VERISART", "VRST") {
    }

function createCertificate(string memory uri) public returns (uint256){
    _certificateID.increment();
    uint256 newID = _certificateID.current();
    _safeMint(msg.sender, newID);
    _setTokenURI(newID,uri); 
  
    return newID;
}
    
}
