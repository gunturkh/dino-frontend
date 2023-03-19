import * as PIXI from "pixi.js";
import { useConnectedMetaMask, useMetaMask } from "metamask-react";
import {
  Stage,
  Container,
  Sprite,
  Text,
  useApp,
  AppProvider,
  Graphics,
} from "@pixi/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TextInput from "./components/TextInput/index";
// import CustomButton from "./components/Button";
import useResizeObserver from "@react-hook/resize-observer";
import MetamaskConnect from "./components/MetamaskConnect";
import { networks } from "./chainIdConstants";


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
  const { status, connect, ethereum, switchChain, account, chainId } =
    useMetaMask();
  const [currentChain, setCurrentChain] = useState("");
  const target = useRef(null);
  const size = useSize(target);
  const [scene, setScene] = useState("HOME");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [testValue, setTestValue] = useState("");
  console.log('username', username)
  console.log('password', password)

  const options = {
    backgroundColor: 0x1099bb,
    antialias: true,
    autoresize: true,
    autoStart: false,
    clearBeforeRender: false,
    hello: true, 
    // forceCanvas: true
  };

  // const app = useApp();

  const appWidth = window.innerWidth;
  const appHeight = window.innerHeight;

  const blurFilter = useMemo(() => new PIXI.BlurFilter(4), []);



  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const testRef = useRef(null);

  console.log('usernameRef', usernameRef)
  console.log('passwordRef', passwordRef)
  console.log('testRef', testRef)
  // @ts-ignore
  usernameRef?.current?.onChange.connect(() => setUsername(usernameRef.current.value))
  // @ts-ignore
  usernameRef?.current?.onEnter.connect((e) => console.log('onEnter fired', e))
  // const handleOnChange = (e: any, state: any) => {
  //   console.log("e", e);
  //   state(e.target.value);
  // };

  return (
    // <AppProvider value={app} >
    <div ref={target}>
      {/* <div className={`w-screen relative top-50`}> */}
      {/* <MetamaskConnect /> */}
      {/* <div style={{ position: "relative", top: appHeight / 2, width: "100%" }}>
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
      </div> */}

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
          {/* <Text
            text="Click to Connect"
            anchor={{ x: 0.5, y: 0.5 }}
            // filters={[blurFilter]}
            interactive={true}
            onclick={() => {
              console.log("click");
              // setScene((prev) => (prev === "GAME" ? "HOME" : "GAME"));
            }}
            ontap={() => {
              console.log("click");
              // setScene((prev) => (prev === "GAME" ? "HOME" : "GAME"));
            }}
          /> */}

          {status === "initializing" && (
            <Text
              text="Synchronisation with MetaMask ongoing..."
              anchor={{ x: 0.5, y: 0.5 }}
            />
          )}

          {status === "unavailable" && (
            <Text text="MetaMask not available :" anchor={{ x: 0.5, y: 0.5 }} />
          )}

          {status === "notConnected" && (
            <Text
              anchor={{ x: 0.5, y: 0.5 }}
              text="Connect to MetaMask"
              eventMode="static"
              onclick={() => connect()}
            />
          )}

          {status === "connecting" && (
            <Text text="Connecting..." anchor={{ x: 0.5, y: 0.5 }} />
          )}

          {status === "connected" && (
            <>
              <Text
                anchor={0.5}
                // x={appWidth / 2}
                // y={appHeight / 2}
                style={
                  new PIXI.TextStyle({
                    align: "center",
                    fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                    fontSize: 20,
                    // fontWeight: 400,
                    fill: ["#ffffff", "#ffff55"], // gradient
                    stroke: "#000000",
                    strokeThickness: 5,
                    letterSpacing: 1,
                    dropShadow: true,
                    dropShadowColor: "#ccced2",
                    dropShadowBlur: 4,
                    dropShadowAngle: Math.PI / 6,
                    dropShadowDistance: 6,
                    wordWrap: true,
                    wordWrapWidth: 440,
                  })
                }
                text={`Connected account ${account} on chain ID ${chainId}`}
              />
              {chainId === networks.mainnet && (
                <Text
                  anchor={0.5}
                  y={appHeight / 6}
                  // x={appWidth / 2}
                  // y={appHeight / 2}
                  style={
                    new PIXI.TextStyle({
                      align: "center",
                      fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                      fontSize: 20,
                      // fontWeight: 400,
                      fill: ["#ffffff", "#ffff55"], // gradient
                      stroke: "#000000",
                      strokeThickness: 5,
                      letterSpacing: 1,
                      dropShadow: true,
                      dropShadowColor: "#ccced2",
                      dropShadowBlur: 4,
                      dropShadowAngle: Math.PI / 6,
                      dropShadowDistance: 6,
                      wordWrap: true,
                      wordWrapWidth: 440,
                    })
                  }
                  text="Connect to BNB"
                  eventMode="static"
                  onclick={async () => {
                    const result = await switchChain(
                      networks.binanceSmartChain
                    );
                    console.log("result switch chain to bnb", chainId);
                    // setCurrentChain(networks.binanceSmartChain);
                  }}
                />
              )}
              {chainId === networks.binanceSmartChain && (
                <Text
                  anchor={0.5}
                  y={appHeight / 6}
                  style={
                    new PIXI.TextStyle({
                      align: "center",
                      fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                      fontSize: 20,
                      // fontWeight: 400,
                      fill: ["#ffffff", "#ffff55"], // gradient
                      stroke: "#000000",
                      strokeThickness: 5,
                      letterSpacing: 1,
                      dropShadow: true,
                      dropShadowColor: "#ccced2",
                      dropShadowBlur: 4,
                      dropShadowAngle: Math.PI / 6,
                      dropShadowDistance: 6,
                      wordWrap: true,
                      wordWrapWidth: 440,
                    })
                  }
                  text="Connect to Ethereum"
                  eventMode="static"
                  onclick={async () => {
                    const result = await switchChain(networks.mainnet);
                    console.log("result switch chain to ethereum", chainId);
                    // setCurrentChain(networks.mainnet);
                  }}
                />
              )}
            </>
          )}
          <TextInput
            onChange={(e: string) => {
              console.log('e username', e)
              setUsername(e)}}
            ref={usernameRef}
            x={-100}
            y={0}
            width={280}
            height={55}
            value={username}
            placeholder={"username"}
          />
          <TextInput
            // onInput={(e: string) => setPassword(e)}
            ref={passwordRef}
            x={-100}
            y={100}
            width={280}
            height={55}
            onChange={(e: string) => {
              console.log('e password', e)
              setPassword(e)}}

            value={password}
            placeholder={"password"}
          />
          {/* <TextInput
            ref={testRef}
            x={-100}
            y={150}
            width={280}
            height={55}
            onChange={(e: string) => {
              setTestValue(e)}}

            value={testValue}
            placeholder={"test Value"}
          /> */}
          {/* <CustomButton 
            onClick={() => console.log("click")}
            x={100}
          y={100}
          width={200}
          height={50}
          buttonText="Click me"
          /> */}
          {/* <TextInput onChange={(e: string)=>setUsername(e)} placeholder="Enter your username" />
            <TextInput onChange={(e: string)=>setPassword(e)} placeholder="Enter your password"/> */}
        </Container>
      </Stage>
    </div>
    // </AppProvider>
  );
};
