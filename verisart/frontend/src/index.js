import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DAppProvider, Goerli } from "@usedapp/core";

const root = ReactDOM.createRoot(document.getElementById("root"));
const config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]:
      "https://goerli.infura.io/v3/a62eadd278cd4fd2ba177ab602341291",
  },
};
root.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>
);
