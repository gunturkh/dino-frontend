import { useFormik } from "formik";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { Stage } from "@pixi/react";
import { useState, Suspense, useEffect } from "react";
import { axiosInstance } from "./utils/api";
import Home from "./components/scene/Home";
import Register from "./components/scene/Register";
import Loading from "./components/scene/Loader";
import ProfileTemp from "./components/scene/ProfileTemp";

import DinoCenter from "./components/scene/DinoCenter";
import { useStore } from "./utils/store";

type loginReqFormat = {
  username: string;
  password: string;
};

type loginWalletReqFormat = {
  walletAddress: string;
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
  const { account, active, deactivate, activateBrowserWallet } = useEthers();
  const scene = useStore((state) => state.scene);
  const changeScene = useStore((state) => state.changeScene);
  const saveToken = useStore((state) => state.saveToken);
  const [authMode, setAuthMode] = useState<
    "LOGIN" | "REGISTER" | "OTPEMAIL" | "OTPMOBILE" | "LOGINWALLET"
  >("LOGIN");
  const [otp, setOtp] = useState("");
  const [registerCheckbox, setRegisterCheckbox] = useState(false);

  const connectToWallet = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    activateBrowserWallet();
  };

  const disconnectFromWallet = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deactivate();
  };

  // const getBalance = async (account: string) => {
  //   const balance = await library!.getBalance(account);
  //   setWalletBalance(formatEther(balance));
  // };

  const ConnectButton = () => {
    // 'account' being undefined means that we are not connected.
    if (account)
      return (
        <div className="flex flex-col">
          <button
            className="mt-4 py-3 w-[350px] h-[53px] px-4 font-Magra font-bold text-red-500 hover:cursor-pointer"
            style={{
              background: `url(image/InputBox.png) no-repeat `,
            }}
            type="button"
            onClick={disconnectFromWallet}
          >
            Disconnect Wallet
          </button>
          {/* <button
            className="mt-4 py-3 w-[350px] h-[53px] px-4 font-Magra font-bold text-red-500 hover:cursor-pointer"
            style={{
              background: `url(image/InputBox.png) no-repeat `,
            }}
            type="button"
            onClick={() => getBalance(account)}
          >
            Get Balance
          </button> */}
        </div>
      );
    else
      return (
        <button
          className="mt-4 py-3 w-[350px] h-[53px] px-4 font-Magra font-bold text-[#00C2FF] hover:cursor-pointer"
          style={{
            background: `url(image/InputBox.png) no-repeat `,
          }}
          type="button"
          // disabled={otpForm.isSubmitting}
          // onClick={otpForm.submitForm}

          // onClick={() => connect()}
          onClick={connectToWallet}
        >
          Connect Wallet
        </button>
      );
  };

  // form
  type LoginFormValidate = {
    username?: string;
    password?: string;
  };
  type LoginWalletFormValidate = {
    walletAddress?: string;
  };
  type RegisterFormValidate = {
    username?: string;
    password?: string;
    retypePassword?: string;
    referralCode?: string;
  };

  const loginFormValidate = (values: LoginFormValidate) => {
    console.log("validate values", values);
    const errors: LoginFormValidate = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (!/^[A-Za-z][A-Za-z0-9_]{5,20}$/i.test(values.username)) {
      errors.username = "Invalid username, min 5 chars & max 20 chars";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/i.test(values.password)
    ) {
      errors.password =
        "Password must contain 1 uppercase, 1 lowercase, 1 number, min 8 chars & max 20 chars, no symbol";
    }
    console.log("errors", errors);
    return errors;
  };

  const loginWalletFormValidate = (values: LoginWalletFormValidate) => {
    console.log("validate values", values);
    const errors: LoginWalletFormValidate = {};
    if (!values.walletAddress) {
      errors.walletAddress = "Required";
    }
    console.log("errors", errors);
    return errors;
  };
  const registerFormValidate = (values: RegisterFormValidate) => {
    console.log("validate values", values);
    const errors: RegisterFormValidate = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (!/^[A-Za-z][A-Za-z0-9_]{5,20}$/i.test(values.username)) {
      errors.username = "Invalid username, min 5 chars & max 20 chars";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/i.test(values.password)
    ) {
      errors.password =
        "Password must contain 1 uppercase, 1 lowercase, 1 number, min 8 chars & max 20 chars, no symbol";
    }
    if (!values.retypePassword) {
      errors.retypePassword = "Required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/i.test(
        values.retypePassword
      )
    ) {
      errors.retypePassword =
        "Password must contain 1 uppercase, 1 lowercase, 1 number, min 8 chars & max 20 chars, no symbol";
    }
    if (values.password !== values.retypePassword) {
      errors.retypePassword = "Password is not the same";
    }
    console.log("errors", errors);
    return errors;
  };
  type OTPFormValidate = { email?: string };
  const otpFormValidate = (values: OTPFormValidate) => {
    console.log("validate values", values);
    const errors: OTPFormValidate = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    console.log("errors", errors);
    return errors;
  };
  const loginForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: loginFormValidate,
    onSubmit: (values, { setSubmitting }) => {
      // alert(JSON.stringify(values, null, 2));
      // otpHandler(values.email);
      setSubmitting(false);
      setAuthMode("LOGINWALLET");
    },
  });
  const loginWalletForm = useFormik({
    initialValues: {
      walletAddress: "",
    },
    validate: loginWalletFormValidate,
    onSubmit: (values, { setSubmitting }) => {
      // alert(JSON.stringify(values, null, 2));
      // otpHandler(values.email);
      loginHandler();
      setSubmitting(false);
      // setAuthMode("LOGINWALLET");
    },
  });
  const registerForm = useFormik({
    initialValues: {
      username: "",
      password: "",
      retypePassword: "",
      referralCode: "",
    },
    validate: registerFormValidate,
    onSubmit: (values, { setSubmitting }) => {
      alert(JSON.stringify(values, null, 2));
      // otpHandler(values.email);
      setSubmitting(false);
      setAuthMode("OTPEMAIL");
    },
  });
  const otpForm = useFormik({
    initialValues: {
      email: "",
      walletAddress: "",
    },
    validate: otpFormValidate,
    onSubmit: (values, { setSubmitting }) => {
      // alert(JSON.stringify(values, null, 2));
      otpHandler(values.email);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    console.log("active", active);
    console.log("account", account);
    if (active && !!account && authMode === "OTPEMAIL")
      otpForm.setFieldValue("walletAddress", account);
    if (!active && !account && authMode === "OTPEMAIL")
      otpForm.setFieldValue("walletAddress", "");
    if (active && !!account && authMode === "LOGINWALLET")
      loginWalletForm.setFieldValue("walletAddress", account);
    if (!active && !account && authMode === "LOGINWALLET")
      loginWalletForm.setFieldValue("walletAddress", "");
  }, [active, account, authMode]);

  const options = {
    backgroundColor: 0x1099bb,
    antialias: true,
    autoresize: true,
    autoStart: false,
    clearBeforeRender: false,
    hello: true,
    transparent: false,
    // resolution: 1,
    // forceCanvas: true,
  };

  const appWidth = window.innerWidth;
  const appHeight = window.innerHeight;

  console.log("scene", scene);

  const loginHandler = async () => {
    // TODO: to change scene to home
    // setScene("HOME");
    const loginRequestData: loginReqFormat = {
      username: loginForm.values.username,
      password: loginForm.values.password,
    };
    const result = await axiosInstance({
      url: "/user/authentication",
      method: "POST",
      data: loginRequestData,
    });

    const { data } = result;
    if (!data.success) window.alert(`${data.message}`);
    if (data && data.result) {
      saveToken(data.result?.jwt);
      changeScene('HOME')
    }
  };

  const registerHandler = async () => {
    const registerRequestData: registerReqFormat = {
      email: otpForm.values.email,
      username: registerForm.values.username,
      password: registerForm.values.password,
      referal: registerForm.values.referralCode,
      address: otpForm.values.walletAddress,
      otp,
    };
    // console.log("submit values", registerRequestData);
    const result = await axiosInstance({
      url: "/user/register",
      method: "POST",
      data: registerRequestData,
    });
    const { data } = result;
    if (!data.success) window.alert(`${data.message}`);
  };

  const otpHandler = async (email: string) => {
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

  // const walletStatus = (status: string) => {
  //   switch (status) {
  //     case "initializing":
  //       return "Synchronisation with MetaMask ongoing...";
  //     case "unavailable":
  //       return "MetaMask not available :";
  //     case "notConnected":
  //       return "Connect to MetaMask";
  //     case "connected":
  //       return `Connected account ${account} on chain ID ${chainId}`;
  //     default:
  //       return "Synchronisation with MetaMask ongoing...";
  //   }
  // };
  return (
    <div className="relative flex justify-center items-center">
      {scene === "REGISTER" && (
        <div className="absolute h-full flex">
          <div className=" my-5 flex backdrop-blur-sm  justify-center items-center flex-col bg-white/10 px-3.5 py-2.5 shadow-sm rounded-sm ">
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
                  <form onSubmit={loginForm.handleSubmit}>
                    <div className="flex flex-col">
                      <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        value={loginForm.values.username}
                      />
                      <p className="text-red-500 font-bold font-magra">
                        {loginForm.errors.username &&
                          loginForm.touched.username &&
                          loginForm.errors.username}
                      </p>
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="mt-2 py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        value={loginForm.values.password}
                      />
                      <p className="text-red-500 font-bold font-magra max-w-[350px]">
                        {loginForm.errors.password &&
                          loginForm.touched.password &&
                          loginForm.errors.password}
                      </p>
                      <div className="flex justify-end w-full">
                        <button
                          type="button"
                          onClick={() =>
                            window.alert(`forgot password clicked`)
                          }
                          className="px-1.5 py-0.5 text-sm font-bold text-white shadow-sm hover:text-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 font-Magra"
                        >
                          Forgot password
                        </button>
                      </div>
                    </div>
                  </form>
                  <input
                    alt="btnLogin"
                    type={"image"}
                    src={"image/BtnConfirm.png"}
                    onClick={loginForm.submitForm}
                    className=" px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  />
                </>
              )}
              {authMode === "REGISTER" && (
                <>
                  <form onSubmit={registerForm.handleSubmit}>
                    <div className="flex flex-col">
                      <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        value={registerForm.values.username}
                      />
                      <p className="text-red-500 font-bold font-magra">
                        {registerForm.errors.username &&
                          registerForm.touched.username &&
                          registerForm.errors.username}
                      </p>
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="mt-2 py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        value={registerForm.values.password}
                      />
                      <p className="text-red-500 font-bold font-magra max-w-[350px]">
                        {registerForm.errors.password &&
                          registerForm.touched.password &&
                          registerForm.errors.password}
                      </p>
                      <input
                        name="retypePassword"
                        type="password"
                        placeholder="Re-enter your password"
                        className="mt-2 py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        value={registerForm.values.retypePassword}
                      />
                      <p className="text-red-500 font-bold font-magra max-w-[350px]">
                        {registerForm.errors.retypePassword &&
                          registerForm.touched.retypePassword &&
                          registerForm.errors.retypePassword}
                      </p>
                      <input
                        name="referralCode"
                        type="text"
                        placeholder="Referral code (optional)"
                        className="mt-2 py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        value={registerForm.values.referralCode}
                      />
                      {registerForm.errors.referralCode &&
                        registerForm.touched.referralCode &&
                        registerForm.errors.referralCode}
                    </div>
                  </form>
                  <div className="mt-4 flex items-center max-w-[400px]">
                    {registerCheckbox && (
                      <input
                        // type="checkbox"
                        type="image"
                        alt="checkboxEula"
                        src="image/CheckBoxChecked.png"
                        onClick={() => setRegisterCheckbox(false)}
                      />
                    )}
                    {!registerCheckbox && (
                      <input
                        // type="checkbox"
                        type="image"
                        alt="checkboxEula"
                        src="image/CheckboxEulaBackground.png"
                        onClick={() => setRegisterCheckbox(true)}
                      />
                    )}
                    <span className="font-Magra ml-2 text-white font-bold">{`I have read and agreed to <User Agreement and Privacy Policy>`}</span>
                  </div>
                  <input
                    alt="btnRegister"
                    type="image"
                    src={"image/BtnConfirmRegister.png"}
                    onClick={registerForm.submitForm}
                    className="mt-2 px-3.5 py-2.5 text-sm "
                  />
                </>
              )}
              {authMode === "OTPEMAIL" && (
                <>
                  <form onSubmit={otpForm.handleSubmit}>
                    <div>
                      <input
                        name="email"
                        type="email"
                        placeholder="Enter E-mail address"
                        className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={otpForm.handleChange}
                        onBlur={otpForm.handleBlur}
                        value={otpForm.values.email}
                      />
                      <p className="text-red-500 font-bold font-magra">
                        {otpForm.errors.email &&
                          otpForm.touched.email &&
                          otpForm.errors.email}
                      </p>
                    </div>
                    {/* {!!walletAddress && ( */}
                    {account && (
                      <div
                        placeholder="Wallet Address"
                        className="mt-4 py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white text-sm font-Magra font-bold flex items-center"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                      >
                        {account}
                      </div>
                    )}
                    {/* {otpForm.values?.walletAddress?.length === 0 && ( */}
                    <ConnectButton />
                    {/* )} */}
                    <p className="text-red-500 font-bold font-magra">
                      {otpForm.errors.walletAddress &&
                        otpForm.touched.walletAddress &&
                        otpForm.errors.walletAddress}
                    </p>
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
                        type="submit"
                        disabled={otpForm.isSubmitting}
                        onClick={otpForm.submitForm}
                      >
                        Request OTP
                      </button>
                    </div>
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
              {authMode === "LOGINWALLET" && (
                <>
                  <form onSubmit={loginWalletForm.handleSubmit}>
                    <div>
                      {account && (
                        <div
                          placeholder="Wallet Address"
                          className="mt-4 py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white text-sm font-Magra font-bold flex items-center"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                        >
                          {account}
                        </div>
                      )}
                      <ConnectButton />
                      <p className="text-red-500 font-bold font-magra">
                        {loginWalletForm.errors.walletAddress &&
                          loginWalletForm.touched.walletAddress &&
                          loginWalletForm.errors.walletAddress}
                      </p>
                    </div>
                  </form>
                  <input
                    alt="Login Submit"
                    type={"image"}
                    src={"image/BtnSubmit.png"}
                    onClick={loginWalletForm.submitForm}
                    className="mt-12 px-3.5 py-2.5 text-sm"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <Stage
        width={appWidth}
        height={appHeight}
        options={options}
        raf={true}
        onAnimationIteration={() => {
          console.log("animation iteration");
        }}
        // onMount={(_app) => setApp(_app)}
      >
        {/* @ts-ignore */}

        <Suspense fallback={<p>loading...</p>}>
          {scene === "LOADING" && (
            <Loading
              onFinishLoading={() => {
                console.log("finish loading");
                changeScene("REGISTER");
              }}
            />
          )}
        </Suspense>
        {scene === "REGISTER" && <Register />}
        {scene === "PROFILE" && (
          <>
            <ProfileTemp
              onBackBtnClick={() => {
                changeScene("HOME");
                console.log("back");
              }}
            />
          </>
        )}
        {scene === "HOME" && (
          <>
            <Home onProfileClick={() => changeScene("PROFILE")} scene={scene} />
          </>
        )}
        {scene === "DINOCENTER" && (
          <>
            <DinoCenter scene={scene} />
          </>
        )}
      </Stage>
    </div>
  );
};
