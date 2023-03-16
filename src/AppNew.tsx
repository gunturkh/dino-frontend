import * as PIXI from "pixi.js";
import { useMetaMask } from "metamask-react";
import {
  Stage,
  Container,
  Sprite,
  Text,
  useApp,
  AppProvider,
  Graphics,
} from "@pixi/react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import TextInput from "./components/TextInput";
import useResizeObserver from "@react-hook/resize-observer";

const useSize = (target: any) => {
  const [size, setSize] = useState<any>();

  useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

export const AppNew = () => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const target = useRef(null);
  const size = useSize(target);
  const [scene, setScene] = useState("HOME");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("username", username);
    console.log("password", password);
    console.log("size", size);
    console.log("status", status);
  }, [username, password, status, size]);

  const options = {
    backgroundColor: 0x1099bb,
    antialias: true,
    autoresize: true,
    autoStart: false,
    clearBeforeRender: false,
  };

  // const app = useApp();

  const appWidth = window.innerWidth;
  const appHeight = window.innerHeight;

  const blurFilter = useMemo(() => new PIXI.BlurFilter(4), []);
  return (
    // <AppProvider value={app} >
    <div ref={target}>
      {/* <div className={`w-screen relative top-50`}> */}

      <div style={{ position: "relative", top: appHeight / 2, width: "100%" }}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {status === "initializing" && (
        <div>Synchronisation with MetaMask ongoing...</div>
      )}

      {status === "unavailable" && <div>MetaMask not available :</div>}

      {status === "notConnected" && (
        <button onClick={connect}>Connect to MetaMask</button>
      )}

      {status === "connecting" && <div>Connecting...</div>}

      {status === "connected" && (
        <div>
          Connected account {account} on chain ID {chainId}
        </div>
      )}
      <Stage width={appWidth} height={appHeight} options={options}>
        {scene === "GAME" && (
          <Sprite
            image={"image/forest_background.jpg"}
            width={window.innerWidth}
            height={window.innerHeight}
          />
        )}
        {scene === "HOME" && (
          <Sprite
            image={"image/forest_background.jpg"}
            width={window.innerWidth}
            height={window.innerHeight}
          />
        )}

        <Container x={400} y={330} position={[appWidth / 2, appHeight / 2]}>
          <Text
            text="Hello World"
            anchor={{ x: 0.5, y: 0.5 }}
            filters={[blurFilter]}
            interactive={true}
            onclick={() => {
              console.log("click");
              setScene((prev) => (prev === "GAME" ? "HOME" : "GAME"));
            }}
            ontap={() => {
              console.log("click");
              setScene((prev) => (prev === "GAME" ? "HOME" : "GAME"));
            }}
          />
          {/* <TextInput onChange={(e: string)=>setUsername(e)} placeholder="Enter your username" />
            <TextInput onChange={(e: string)=>setPassword(e)} placeholder="Enter your password"/> */}
        </Container>
      </Stage>
    </div>
    // </AppProvider>
  );
};
