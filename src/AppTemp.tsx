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
  Suspense,
} from "react";
import { TextInput } from "./components/TextInput/index";
// import CustomButton from "./components/Button";
import useResizeObserver from "@react-hook/resize-observer";
import MetamaskConnect from "./components/MetamaskConnect";
import { networks } from "./chainIdConstants";
import { axiosInstance } from "./utils/api";
import Home from "./components/scene/Home";
import Register from "./components/scene/Register";
import Loading from "./components/scene/Loader";
// import { useGLTF, Html, shaderMaterial, useTexture, Plane } from '@react-three/drei'

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

export const AppTemp = () => {
  const { status, connect, ethereum, switchChain, account, chainId } =
    useMetaMask();
  const [currentChain, setCurrentChain] = useState("");
  // const target = useRef(null);
  // const size = useSize(target);
  const [scene, setScene] = useState("LOADING");
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
    // TODO: to change scene to home
    // setScene("HOME");
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
    <div className="relative flex justify-center items-center">
      {scene === "REGISTER" && (
        <div className="absolute h-full flex">
          <div className=" my-5 flex backdrop-blur-sm  justify-center items-center flex-col gap-8 bg-white/20 px-3.5 py-2.5 shadow-sm rounded-sm ">
            <div className="flex w-full justify-end">
              <img
                src="image/BtnLanguage.png"
                width={60}
                height={60}
                alt="Language"
              />
              <img
                src="image/BtnAudio.png"
                width={60}
                height={60}
                alt="Audio"
              />
            </div>
            <img
              src="image/Logo Dino.png"
              width={177}
              height={177}
              alt="Project Dino Logo"
            />
            <div
              className="flex justify-start items-center flex-col gap-8 bg-white/50 px-3.5 py-6 shadow-sm rounded-xl "
              style={{
                background: `url(image/formBackground.png) no-repeat `,
                backgroundSize: "cover",
              }}
            >
              <div className="flex gap-2 justify-start py-5 w-full">
                <input
                  alt="btnLogin"
                  type={"image"}
                  src={"image/Btnlogin.png"}
                  onClick={() => setAuthMode("LOGIN")}
                  className="text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                />
                <input
                  alt="btnRegister"
                  type={"image"}
                  src={"image/BtnRegister.png"}
                  onClick={() => setAuthMode("REGISTER")}
                  className="text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                />
              </div>
              {authMode === "LOGIN" && (
                <>
                  <input
                    type="text"
                    placeholder="username"
                    className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-white text-white"
                    style={{
                      background: `url(image/InputBox.png) no-repeat `,
                    }}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-white text-white"
                    style={{
                      background: `url(image/InputBox.png) no-repeat `,
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex justify-end w-full">
                    <button
                      onClick={() => window.alert(`forgot password clicke`)}
                      className="px-1.5 py-0.5 text-sm font-semibold text-white shadow-sm hover:text-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    >
                      Forgot password
                    </button>
                  </div>
                  <input
                    alt="btnLogin"
                    type={"image"}
                    src={"image/BtnConfirm.png"}
                    onClick={loginHandler}
                    className=" px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  />
                </>
              )}
              {authMode === "REGISTER" && (
                <>
                  <input
                    type="email"
                    placeholder="email"
                    className="p-4 rounded-xl placeholder:text-black"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="username"
                    className="p-4 rounded-xl placeholder:text-black"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    className="p-4 rounded-xl placeholder:text-black"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="retype password"
                    className="p-4 rounded-xl placeholder:text-black"
                    onChange={(e) => setRetypePassword(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Referral Code (optional)"
                    className="p-4 rounded-xl placeholder:text-black"
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
            <div>
              <input type="checkbox" />
              <span>{`I have read and agreed to <User Agreement and Privacy Policy>`}</span>
            </div>
          </div>
        </div>
      )}
      <Stage width={appWidth} height={appHeight} options={options}>
        {/* @ts-ignore */}
        <Suspense fallback={<p>loading...</p>}>
          {scene === "LOADING" && <Loading onFinishLoading={() => {
            console.log('finish loading')
            setScene("REGISTER")
          }} />}
        </Suspense>
        {scene === "REGISTER" && <Register />}
        {scene === "HOME" && (
          <>
            <Home />
          </>
        )}
      </Stage>
    </div>
  );
};
