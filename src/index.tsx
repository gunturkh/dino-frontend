import ReactDOM from "react-dom/client";
import "./index.css";
import { AppTemp } from "./AppTemp";
import reportWebVitals from "./reportWebVitals";
import { DAppProvider, BSC, BSCTestnet, Config, MetamaskConnector, } from "@usedapp/core";
// import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const config: Config = {
  readOnlyChainId: BSCTestnet.chainId,
  readOnlyUrls: {
    [BSC.chainId]: 'https://bsc-dataseed.binance.org',
    [BSCTestnet.chainId]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  },
  multicallVersion: 1,
  connectors: {
    metamask: new MetamaskConnector(),
    // walletConnect: new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
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
