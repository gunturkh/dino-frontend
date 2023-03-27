import * as PIXI from "pixi.js";
import { Formik } from "formik";
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
  const [authMode, setAuthMode] = useState<
    "LOGIN" | "REGISTER" | "OTPEMAIL" | "OTPMOBILE"
  >("LOGIN");
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
          <div className=" my-5 flex backdrop-blur-sm  justify-center items-center flex-col bg-white/20 px-3.5 py-2.5 shadow-sm rounded-sm ">
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
              className="flex justify-start items-center flex-col gap-4 bg-white/50 px-3.5 py-6 shadow-sm rounded-xl "
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
                    placeholder="Username"
                    className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                    style={{
                      background: `url(image/InputBox.png) no-repeat `,
                    }}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                    style={{
                      background: `url(image/InputBox.png) no-repeat `,
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex justify-end w-full">
                    <button
                      onClick={() => window.alert(`forgot password clicke`)}
                      className="px-1.5 py-0.5 text-sm font-bold text-white shadow-sm hover:text-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 font-Magra"
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
                    type="text"
                    placeholder="Username"
                    className="py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                    style={{
                      background: `url(image/InputBox.png) no-repeat `,
                      backgroundSize: "inherit",
                    }}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                    style={{
                      background: `url(image/InputBox.png) no-repeat `,
                      backgroundSize: "inherit",
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Re-enter your password"
                    className="py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                    style={{
                      background: `url(image/InputBox.png) no-repeat `,
                      backgroundSize: "inherit",
                    }}
                    onChange={(e) => setRetypePassword(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Referral code (optional)"
                    className="py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                    style={{
                      background: `url(image/InputBox.png) no-repeat `,
                      backgroundSize: "inherit",
                    }}
                    onChange={(e) => setReferralCode(e.target.value)}
                  />
                  <input
                    alt="btnLogin"
                    type={"image"}
                    src={"image/BtnConfirmRegister.png"}
                    onClick={() => setAuthMode("OTPEMAIL")}
                    className=" px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  />
                </>
              )}
              {authMode === "OTPEMAIL" && (
                <Formik
                  initialValues={{ email: "" }}
                  validate={(values: any) => {
                    console.log("validate values", values);
                    const errors: { email?: string } = {};
                    if (!values.email) {
                      errors.email = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }
                    console.log("errors");
                    return errors;
                  }}
                  onSubmit={(values: any, { setSubmitting }: any) => {
                    console.log("otp submit:", values);
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    submitForm,
                    /* and other goodies */
                  }: any) => (
                    <>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <input
                            name="email"
                            type="email"
                            placeholder="Enter E-mail address"
                            className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                            style={{
                              background: `url(image/InputBox.png) no-repeat `,
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <p className="text-red-500 font-bold font-magra">
                            {errors.email && touched.email && errors.email}
                          </p>
                        </div>
                        <div className="relative mt-4">
                          <input
                            type="text"
                            placeholder="Enter OTP"
                            className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                            style={{
                              background: `url(image/InputBox.png) no-repeat `,
                            }}
                            onChange={(e) => setOtp(e.target.value)}
                          />
                          <button
                            className="absolute right-[20px] top-[15px] font-Magra font-bold text-[#00C2FF] hover:cursor-pointer"
                            // onClick={otpHandler}
                            type="submit"
                            disabled={isSubmitting}
                            onClick={submitForm}
                          >
                            Request OTP
                          </button>
                        </div>
                        <button
                          className=" right-[20px] top-[15px] font-Magra font-bold text-[#00C2FF] hover:cursor-pointer"
                          // onClick={otpHandler}
                          type="submit"
                          disabled={isSubmitting}
                        // onClick={submitForm}
                        >
                          Request OTP
                        </button>
                      </form>
                      <input
                        alt="Register Submit"
                        type={"image"}
                        src={"image/BtnSubmit.png"}
                        onClick={registerHandler}
                        className="mt-12 px-3.5 py-2.5 text-sm"
                      />
                    </>
                  )}
                </Formik>
              )}
            </div>
            <div>
              <input
                type="checkbox"
                alt="checkboxEula"
                src="image/CheckboxEulaBackground.png"
              />
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
            setScene("HOME")
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
