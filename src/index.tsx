import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppSpine } from "./AppSpine";
import { AppTemp } from "./AppTemp";
import { AppNew } from "./AppNew";
import reportWebVitals from "./reportWebVitals";
import { MetaMaskProvider } from "metamask-react";
import { DAppProvider, BSC, Config, MetamaskConnector, } from "@usedapp/core";
import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'
import { getDefaultProvider } from "ethers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const config: Config = {
  readOnlyChainId: BSC.chainId,
  multicallVersion: 2,
  connectors: {
    metamask: new MetamaskConnector(),
    walletConnect: new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
  },
};

root.render(
  // <React.StrictMode>
  // <MetaMaskProvider>
  <DAppProvider config={config}>
    <AppTemp />
  </DAppProvider>
  // </MetaMaskProvider>
  // {/* <AppCanvas /> */}
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
