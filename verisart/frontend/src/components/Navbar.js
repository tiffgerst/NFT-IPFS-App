import React from "react"
import logo from "../img/logo.png";
import styles from "./navbar.module.scss";
import Main from "./Main/Main";
import { useEthers } from "@usedapp/core";

function Navbar() {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const isConnected = account !== undefined;

  return (
    <>
      <div>
        <header>
          <nav>
            <ul className={styles.nav__links}>
              <li>
                <a className={styles.logo} href="/">
                  <img src={logo} alt="logo" />
                </a>
              </li>
              <li className={styles.verisart}>
                <h3>VERISART</h3>
              </li>
              <li className={styles.con}>
                {isConnected ? (
                  <button className={styles.draw} onClick={deactivate}>
                    Disconnect
                  </button>
                ) : (
                  <button
                    className={styles.draw}
                    color="primary"
                    onClick={() => activateBrowserWallet()}
                  >
                    Connect
                  </button>
                )}{" "}
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Main />
    </>
  );
}

export default Navbar;
