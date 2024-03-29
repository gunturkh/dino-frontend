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
import { TextInput } from "./components/TextInput/index";
// import CustomButton from "./components/Button";
import useResizeObserver from "@react-hook/resize-observer";
import MetamaskConnect from "./components/MetamaskConnect";
import { networks } from "./chainIdConstants";
import { axiosInstance } from "./utils/api";

// const useSize = (target: any) => {
//   const [size, setSize] = useState<any>();

//   useLayoutEffect(() => {
//     setSize(target.current.getBoundingClientRect());
//   }, [target]);

//   // Where the magic happens
//   useResizeObserver(target, (entry) => setSize(entry.contentRect));
//   return size;
// };

type loginReqFormat = {
  username: string;
  password: string;
};

type registerReqFormat = {
  email: string;
  username: string;
  password: string;
  referal: string;
  address: string;
  otp: string;
};

type otpReqFormat = {
  email: string;
};

export const AppNew = () => {
  const { status, connect, ethereum, switchChain, account, chainId } =
    useMetaMask();
  const [currentChain, setCurrentChain] = useState("");
  // const target = useRef(null);
  // const size = useSize(target);
  const [scene, setScene] = useState("HOME");
  const [authMode, setAuthMode] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [testValue, setTestValue] = useState("");
  console.log("username", username);
  console.log("password", password);

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

  console.log("usernameRef", usernameRef);
  console.log("passwordRef", passwordRef);
  console.log("testRef", testRef);

  const loginHandler = async () => {
    const loginRequestData: loginReqFormat = {
      username,
      password,
    };
    const result = await axiosInstance({
      url: "/user/authentication",
      method: "POST",
      data: JSON.stringify(loginRequestData),
    });

    const { data } = result;
    if (!data.success) window.alert(`${data.message}`);
  };

  const registerHandler = async () => {
    const registerRequestData: registerReqFormat = {
      email,
      username,
      password,
      referal: referralCode,
      address: "asdf",
      otp,
    };
    const result = await axiosInstance({
      url: "/user/register",
      method: "POST",
      data: JSON.stringify(registerRequestData),
    });
    const { data } = result;
    if (!data.success) window.alert(`${data.message}`);
  };

  const otpHandler = async () => {
    const otpRequestData: otpReqFormat = {
      email,
    };
    const result = await axiosInstance({
      url: "/otp/getRegisterOtp",
      method: "POST",
      data: otpRequestData,
    });
    const { data } = result;
    if (!data.success) window.alert(`${data.message}`);
  };
  return (
    // <AppProvider value={app} >
    <div className="relative flex justify-center items-center">
      <div className="absolute flex justify-center items-center flex-col gap-8 bg-white/50 px-3.5 py-2.5 shadow-sm hover:bg-white/80 rounded-xl ">
        <div className="flex gap-10 justify-start">
          <button
            onClick={() => setAuthMode("LOGIN")}
            className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Login
          </button>
          <button
            onClick={() => setAuthMode("REGISTER")}
            className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Register
          </button>
        </div>
        {authMode === "LOGIN" && (
          <>
            <input
              type="text"
              placeholder="username"
              className="bg-orange-400 p-4 rounded-xl placeholder:text-black"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="bg-orange-400 p-4 rounded-xl placeholder:text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end w-full">
              <button
                onClick={() => window.alert(`forgot password clicke`)}
                className="px-1.5 py-0.5 text-sm font-semibold text-black shadow-sm hover:text-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Forgot password
              </button>
            </div>
            <button
              onClick={loginHandler}
              className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Login
            </button>
          </>
        )}
        {authMode === "REGISTER" && (
          <>
            <input
              type="email"
              placeholder="email"
              className="bg-orange-400 p-4 rounded-xl placeholder:text-black"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="username"
              className="bg-orange-400 p-4 rounded-xl placeholder:text-black"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="bg-orange-400 p-4 rounded-xl placeholder:text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="retype password"
              className="bg-orange-400 p-4 rounded-xl placeholder:text-black"
              onChange={(e) => setRetypePassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Referral Code (optional)"
              className="bg-orange-400 p-4 rounded-xl placeholder:text-black"
              onChange={(e) => setReferralCode(e.target.value)}
            />
            <button
              onClick={registerHandler}
              className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Register
            </button>
          </>
        )}
      </div>

      <Stage width={appWidth} height={appHeight} options={options}>
        {scene === "GAME" && (
          <Sprite
            image={"image/forest_background.jpg"}
            width={window.innerWidth}
            height={window.innerHeight}
          />
        )}
        {scene === "HOME" && (
          <>
            <Sprite
              image={"image/forest_background.jpg"}
              width={window.innerWidth}
              height={window.innerHeight}
            />
            <Sprite
              image="logo192.png"
              anchor={[0.5, 0.5]}
              position={[0, 0]}
              eventMode='static'
              // interactive={true}
              onclick={() => console.log('btn1 clicked')}
            />
          </>
        )}

        {/* <Container x={400} y={330} position={[appWidth / 2, appHeight / 2]}>

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
        </Container> */}
      </Stage>
    </div>
  );
};
