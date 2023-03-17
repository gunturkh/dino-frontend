import { useMetaMask } from "metamask-react";
import React from "react";

const networks = {
  mainnet: "0x1", // 1
  // Test nets
  goerli: "0x5", // 5
  ropsten: "0x3", // 3
  rinkeby: "0x4", // 4
  kovan: "0x2a", // 42
  mumbai: "0x13881", // 80001
  // Layers 2
  arbitrum: "0xa4b1", // 42161
  optimism: "0xa", // 10
  // Side chains
  polygon: "0x89", // 137
  gnosisChain: "0x64", // 100
  // Alt layer 1
  binanceSmartChain: "0x38", // 56
  avalanche: "0xa86a", // 43114
  cronos: "0x19", // 25
  fantom: "0xfa", // 250
};

function MetamaskConnect() {
  const { status, connect, ethereum, switchChain, account, chainId } =
    useMetaMask();
  if (status === "initializing") {
    return <div>Synchronisation with MetaMask ongoing...</div>;
  }

  if (status === "unavailable") {
    return <div>MetaMask not available :</div>;
  }

  if (status === "notConnected") {
    return <button onClick={connect}>Connect to MetaMask</button>;
  }

  if (status === "connecting") {
    return <div>Connecting...</div>;
  }

  if (status === "connected") {
    return (
      <div>
        Connected account {account} on chain ID {chainId}
        <div>
          {chainId === networks.mainnet && (
            <button
              onClick={async () => {
                const result = await switchChain(networks.binanceSmartChain);
                console.log("result switch chain to bnb", chainId);
                // setCurrentChain(networks.binanceSmartChain);
              }}
            >
              Connect to BNB
            </button>
          )}
          {chainId === networks.binanceSmartChain && (
            <button
              onClick={async () => {
                const result = await switchChain(networks.mainnet);
                console.log("result switch chain to ethereum", chainId);
                // setCurrentChain(networks.mainnet);
              }}
            >
              Connect to Ethereum
            </button>
          )}
        </div>
      </div>
    );
  } else return <></>;
}

export default MetamaskConnect;
