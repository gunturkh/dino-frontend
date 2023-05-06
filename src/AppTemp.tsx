/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import {
  useEtherBalance,
  useEthers,
  BSC,
  BSCTestnet,
  useToken,
  useContractFunction,
  useTokenBalance,
  useTokenAllowance,
  useSendTransaction,
  useTransactions,
  useNotifications,
} from "@usedapp/core";
import { Stage } from "@pixi/react";
import { useState, useEffect, useCallback, useRef } from "react";
import { axiosInstance } from "./utils/api";
import { getCountries } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";
// @ts-ignore
// import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js'
import { formatEther, formatUnits } from "@ethersproject/units";
import Home from "./components/scene/Home";
import Register from "./components/scene/Register";
import Loading from "./components/scene/Loader";
import ProfileTemp from "./components/scene/ProfileTemp";
import Album from "./components/scene/Album";

import DinoCenter from "./components/scene/DinoCenter";

import { useAuthStore, useStore } from "./utils/store";
import {
  USDT_ADDR,
  PAYGATEWAY_ADDR,
  TICKET_ADDR,
  USDT_ABI,
  CAPTCHA_KEY,
} from "./utils/config";
import { Contract } from "ethers";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Select,
  Option,
} from "@material-tailwind/react";
import { BsPlusSquare } from "react-icons/bs";
import { rankLoaderBarProgress, rankRequalification } from "./utils/functions";
// import { BigNumber, BigNumberish, Contract, utils } from "ethers";
// import { Interface } from "ethers/lib/utils";

type loginReqFormat = {
  username: string;
  password: string;
  captcha?: string;
};

// type loginWalletReqFormat = {
//   walletAddress: string;
// };

type registerReqFormat = {
  email: string;
  username: string | undefined;
  password: string | undefined;
  referal: string | undefined;
  address: string;
  otp: string;
  country: string | undefined;
  captcha?: string | undefined;
};

type otpReqFormat = {
  email: string;
};

declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    clipboardData: { setData: any };
  }
}

// const USDT_ADDR = "0x0ed04d340a054382383ee2edff0ced66ead7496c";
const price = 0.25;
export const AppTemp = () => {
  const {
    account,
    active,
    deactivate,
    activateBrowserWallet,
    chainId,
    switchNetwork,
  } = useEthers();
  const loginRechaptchaRef = useRef(null);
  const registerRechaptchaRef = useRef(null);
  const forgotPasswordRechaptchaRef = useRef(null);
  const token = useAuthStore((state) => state.token);
  const saveToken = useAuthStore((state) => state.saveToken);
  const userData = useStore((state) => state.userData);
  const setUserData = useStore((state) => state.setUserData);
  const scene = useStore((state) => state.scene);
  const walletAddress = useStore((state) => state.walletAddress);
  const setWalletAddress = useStore((state) => state.setWalletAddress);
  const setWalletBalance = useStore((state) => state.setWalletBalance);
  // const approved = useStore((state) => state.approved);
  const setApproved = useStore((state) => state.setApproved);
  const ticketPanel = useStore((state) => state.ticketPanel);
  const setTicketPanel = useStore((state) => state.setTicketPanel);
  const changePasswordPanel = useStore((state) => state.changePasswordPanel);
  const setChangePasswordPanel = useStore(
    (state) => state.setChangePasswordPanel
  );
  const googleAuthPanel = useStore((state) => state.googleAuthPanel);
  const setGoogleAuthPanel = useStore((state) => state.setGoogleAuthPanel);
  console.log("googleAuthPanel", googleAuthPanel);
  // const usdtInfo = useToken(USDT_ADDR);
  const usdtBalance = useTokenBalance(USDT_ADDR, account);
  const tokenBalance = useTokenBalance(
    "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
    account
  );
  const etherBalance = useEtherBalance(account, {
    chainId: BSCTestnet.chainId,
  });
  const mainnetBalance = useEtherBalance(account, { chainId: BSCTestnet.chainId });
  const testnetBalance = useEtherBalance(account, {
    chainId: BSCTestnet.chainId,
  });
  const allowance = useTokenAllowance(
    USDT_ADDR,
    walletAddress,
    PAYGATEWAY_ADDR
  );
  const ticketAllowance = useTokenAllowance(
    USDT_ADDR,
    walletAddress,
    TICKET_ADDR
  );
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRetypePasswordVisible, setIsRetypePasswordVisible] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [registerCaptcha, setRegisterCaptcha] = useState("");
  const [forgotPasswordCaptcha, setForgotPasswordCaptcha] = useState("");
  const [ticketHistories, setTicketHistories] = useState([]);
  // const [googleAuthPanel, setGoogleAuthPanel] = useState(false);
  const [googleAuthData, setGoogleAuthData] = useState<{
    qr: string;
    secret: string;
  } | null>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [buddiesHistories, setBuddiesyHistories] = useState<{ username: string, data: { username: string, bought: string, dl_bought: string, regdate: number }[] }[]>([])
  // const [buddiesHistories, setBuddiesyHistories] = useState<string[]>([])
  // console.log('buddiesHistories', buddiesHistories)
  const [sponsor, setSponsor] = useState<string | null | undefined>("");
  const {
    sendTransaction,
    state: sendTransactionState,
    resetState: resetSendTransactionState,
  } = useSendTransaction({ transactionName: "Egg Approval" });
  const {
    sendTransaction: sendTransactionPay,
    // state: sendTransactionPayState,
    // resetState: resetSendTransactionPayState,
  } = useSendTransaction({ transactionName: "Egg Pay" });

  const period = formatUnits(userData?.bought.period, 18)
  const group = formatUnits(userData?.bought.group, 18)
  const total = formatUnits(userData?.bought.total, 18)
  const progress = (parseInt(group) / parseInt(total)) * 100

  const transactionList = useTransactions();
  const { notifications } = useNotifications();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log("sponsor", params.get("sponsor"));
    if (params.get("sponsor")) {
      setSponsor(params.get("sponsor"));
      registerForm.setFieldValue("referralCode", params.get("sponsor"));
      setAuthMode("REGISTER");
    }
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      console.log("notifications", notifications);
      toast(notifications[0].type);
    }
  }, [notifications]);

  console.log("transactionList", transactionList);
  const USDTContract = new Contract(USDT_ADDR, USDT_ABI);

  let getUserDataOptions = {
    headers: {
      "my-auth-key": token,
    },
  };

  function toggleOldPasswordVisibility() {
    setIsOldPasswordVisible((prevState) => !prevState);
  }
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  function toggleRetypePasswordVisibility() {
    setIsRetypePasswordVisible((prevState) => !prevState);
  }
  const verifiedCallback = (token: string) => {
    // console.log(token);
    setCaptcha(token);
  };
  const verifiedRegisterCallback = (token: string) => {
    // console.log(token);
    setRegisterCaptcha(token);
  };
  const verifiedForgotPasswordCallback = (token: string) => {
    // console.log(token);
    setForgotPasswordCaptcha(token);
  };

  const getUserData = async () => {
    const result = await axiosInstance({
      url: "/user/getUserData",
      method: "GET",
      headers: getUserDataOptions.headers,
    });
    console.log("getUserData Result:", result);
    if (result && result.data && result.data.result) {
      setUserData(result.data.result);
    }
  };

  const getTicketHistories = async () => {
    const result = await axiosInstance({
      url: "/ticket/history",
      method: "GET",
      headers: getUserDataOptions.headers,
    });
    console.log("getTicketHistories Result:", result);
    if (result && result.data && result.data.result) {
      setTicketHistories(result.data.result);
    }
  };

  useEffect(() => {
    if (token) getTicketHistories();
  }, [ticketPanel.show, token]);

  console.log("ticketHistories", ticketHistories);

  const {
    sendTransaction: sendTicketBuy,
    state: sendTicketBuyState,
    resetState: resetSendTicketBuyState,
  } = useSendTransaction({ transactionName: "Ticket Buy" });

  const { state, send } = useContractFunction(USDTContract, "approve", {
    transactionName: "Ticket Approval",
  });
  console.log("contractFunction state", state);
  useEffect(() => {
    toast(state.errorMessage);
  }, [state.errorMessage]);

  const changeScene = useStore((state) => state.changeScene);
  const [authMode, setAuthMode] = useState<
    | "LOGIN"
    | "REGISTER"
    | "OTPEMAIL"
    | "OTPMOBILE"
    | "LOGINWALLET"
    | "FORGOTPASSWORD"
  >("LOGIN");
  const [otp, setOtp] = useState("");
  // const [activateError, setActivateError] = useState('')
  const [registerCheckbox, setRegisterCheckbox] = useState(false);
  const [usd, setUsd] = useState(price);
  const [qty, setQty] = useState<number | string>(1);
  const [transferUsername, setTransferUsername] = useState("");
  const [transferQty, setTransferQty] = useState(1);
  const [GAValue, setGAValue] = useState("");
  // const [countryCodeValue, setCountryCodeValue] = useState();
  const [buyWithBonus, setBuyWithBonus] = useState(false);

  console.log(
    "usd",
    usd && BigInt(usd * 1e18),
    "ticketAllowance",
    ticketAllowance && BigInt(ticketAllowance.toString())
  );
  const checkUsername = async (e: any) => {
    setTransferUsername(e.target.value);
    const cusr = e.target.value;
    if (cusr.length >= 5) {
      const response = await axiosInstance({
        url: "/user/checkUser",
        method: "POST",
        data: { username: cusr },
      });
      console.log(response.data);
    }
  };
  const changeQuantity = (e: any) => {
    let psx = e.target.value;
    if (psx > 10000) psx = 10000;
    console.log("psx", psx);
    setQty(psx);
    if (psx < 0) psx = 0;
    let total_usd = psx * price;
    setUsd(total_usd);
  };

  // console.log('usdtBalance', usdtBalance)
  console.log("tokenBalance", tokenBalance);
  console.log("etherBalance", etherBalance);
  // console.log("usdtInfo", usdtInfo);
  console.log("sendTransaction state", sendTransactionState);
  console.log({
    mainnetBalance: mainnetBalance && formatEther(mainnetBalance as any),
    testnetBalance: testnetBalance && formatEther(testnetBalance as any),
    chainId,
  });
  // console.log({ testnetBalance: testnetBalance && formatEther(testnetBalance as any) })
  useEffect(() => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const create2FAtoken = async () => {
      const result = await axiosInstance({
        url: "/auth/create2FAtoken",
        method: "GET",
        headers: options.headers,
      });
      console.log("create2FAtoken Result:", result);
      if (result && result.data && result.data.result) {
        setGoogleAuthData(result.data.result);
      }
    };
    if (userData && userData?.username !== "" && userData?.ga_key === false) {
      create2FAtoken();
      // setGoogleAuthPanel(true);
    }
  }, [googleAuthPanel.show]);

  useEffect(() => {
    if (sendTransactionState.status === "Success" && allowance) {
      setApproved(allowance);
      resetSendTransactionState();
    }
  }, [sendTransactionState]);

  // useEffect(() => {
  //   if (sendTicketApprovalState.status === "Success" && ticketAllowance) {
  //     setTicketApproved(BigInt(ticketAllowance.toString()));
  //     resetSendTicketApprovalState();
  //   }
  //   console.log('sendTicketApprovalState', sendTicketApprovalState.status)
  // }, [sendTicketApprovalState]);

  const checkValidateTx = (hash: string) => {
    console.log("checkValidateTx", hash);
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    axiosInstance({
      url: "/ticket/validate",
      method: "POST",
      headers: options.headers,
      data: {
        hash: hash,
      },
    })
      .then((response) => {
        // console.log(response.data);
        if (response.data.result === 1) {
          toast("Buy Ticket Confirmed");
          setTicketPanel({ show: false, mode: "BUY" });
          getUserData();
        } else {
          setTimeout(() => checkValidateTx(hash), 5000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // axios.post(API_ENDPOINT + '/ticket/validate', { hash: hash }, options)
  };
  useEffect(() => {
    if (
      sendTicketBuyState &&
      sendTicketBuyState.transaction &&
      sendTicketBuyState.status === "Success" &&
      ticketAllowance
    ) {
      // checkValidateTx(sendTicketBuyState.transaction.hash);
      resetSendTicketBuyState();
    }
    console.log("sendTicketBuyState", sendTicketBuyState);
    if (sendTicketBuyState.status === "Exception")
      toast(sendTicketBuyState.errorMessage);
  }, [sendTicketBuyState]);

  const checkValidation = async (id: string) => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const result = await axiosInstance({
      url: "/egg/validate",
      method: "POST",
      headers: options.headers,
      data: { id: id },
    });
    console.log(result.data);
    if (result.data.result === 1) {
      alert("Transaction Confirmed");
      // window.location = '/pending-list';
    } else {
      setTimeout(() => checkValidation(id), 5000);
    }
  };

  const connectToWallet = async (
    e: React.MouseEvent<HTMLElement>,
    type: string
  ) => {
    e.stopPropagation();
    // setActivateError('')
    if (type === "metamask") {
      activateBrowserWallet({ type });
    } else if (type === "walletConnect") {
      // const provider = new WalletConnectProvider({
      //   infuraId: 'd8df2cb7844e4a54ab0a782f608749dd',
      // })
      // await provider.enable()
      // await activate(provider)
    }
  };

  const disconnectFromWallet = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deactivate();
  };

  // const getBalance = async (account: string) => {
  //   const balance = await library!.getBalance(account);
  //   setWalletBalance(formatEther(balance));
  // };

  const ConnectButton = ({ type }: { type: string }) => {
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
          onClick={(e) => connectToWallet(e, type)}
        >
          Connect {type === "metamask" ? "Wallet" : "WalletConnect"}
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
    referralCode?: string | null;
    countryCode?: string;
  };

  type ChangePasswordFormValidate = {
    oldPassword?: string;
    password?: string;
    retypePassword?: string;
  };

  const loginFormValidate = (values: LoginFormValidate) => {
    console.log("validate values", values);
    const errors: LoginFormValidate = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (!/^[A-Za-z0-9_]{4,20}$/i.test(values.username)) {
      errors.username = "Invalid username, min 5 chars & max 20 chars";
    }
    if (!values.password) errors.password = "Required";
    // else if (
    //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/i.test(values.password)
    // ) {
    //   errors.password =
    //     "Password must contain 1 uppercase, 1 lowercase, 1 number, min 8 chars & max 20 chars, no symbol";
    // }
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
    if (!values.countryCode) {
      errors.countryCode = "Required";
    }
    if (!values.username) {
      errors.username = "Required";
    } else if (!/^[A-Za-z][A-Za-z0-9_]{4,20}$/i.test(values.username)) {
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
      loginHandler();
      // setAuthMode("LOGINWALLET");
    },
  });

  const googleAuthenticationFormValidate = (values: {
    validation?: string;
  }) => {
    console.log("validate 2FA", values);
    const errors: { validation?: string } = {};
    if (!values.validation) {
      errors.validation = "Required";
    }
    console.log("errors", errors);
    return errors;
  };

  const forgotPasswordFormValidate = (values: { username?: string }) => {
    console.log("validate forgot password", values);
    const errors: { username?: string } = {};
    if (!values.username) {
      errors.username = "Required";
    }
    console.log("errors", errors);
    return errors;
  };

  const changePasswordFormValidate = (values: ChangePasswordFormValidate) => {
    console.log("changePasswordFormValidate validate values", values);
    const errors: ChangePasswordFormValidate = {};
    if (!values.oldPassword) {
      errors.oldPassword = "Required";
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

  const loginWalletForm = useFormik({
    initialValues: {
      walletAddress: "",
    },
    validate: loginWalletFormValidate,
    onSubmit: (values, { setSubmitting }) => {
      // alert(JSON.stringify(values, null, 2));
      // otpHandler(values.email);
      // loginHandler();
      setSubmitting(false);
      // setAuthMode("LOGINWALLET");
      changeScene("HOME");
    },
  });
  const registerForm = useFormik({
    initialValues: {
      username: "",
      password: "",
      retypePassword: "",
      referralCode: sponsor,
      countryCode: "",
    },
    validate: registerFormValidate,
    onSubmit: (values, { setSubmitting }) => {
      // alert(JSON.stringify(values, null, 2));
      // otpHandler(values.email);
      setSubmitting(false);
      setAuthMode("OTPEMAIL");
    },
  });
  const otpForm = useFormik({
    initialValues: {
      email: "",
      // walletAddress: "",
    },
    validate: otpFormValidate,
    onSubmit: (values, { setSubmitting }) => {
      // alert(JSON.stringify(values, null, 2));
      otpHandler(values.email);
      setSubmitting(false);
    },
  });
  const googleAuthenticationForm = useFormik({
    initialValues: {
      validation: "",
    },
    validate: googleAuthenticationFormValidate,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      let options = {
        headers: {
          "my-auth-key": token,
        },
      };
      if (googleAuthPanel.mode === "SET") {
        const validate2FA = async () => {
          const result = await axiosInstance({
            url: "/auth/confirm2FA",
            method: "POST",
            headers: options.headers,
            data: { key: values.validation },
          });
          console.log("validate2FA Result:", result);
          if (result && result.data && result.data.result) {
            toast("2FA Confirmed");
            getUserData();
            setGoogleAuthPanel({ show: false, mode: "SET" });
          } else {
            toast(result.data.message);
          }
        };

        validate2FA();
      } else if (googleAuthPanel.mode === "REMOVE") {
        const remove2FA = async () => {
          const result = await axiosInstance({
            url: "/auth/remove2FA",
            method: "POST",
            headers: options.headers,
            data: { key: values.validation },
          });
          console.log("remove 2FA Result:", result);
          if (result && result.data && result.data.result) {
            toast("2FA Removed");
            getUserData();
            setGoogleAuthPanel({ show: false, mode: "SET" });
          } else {
            toast(result.data.message);
          }
        };

        remove2FA();
      }
    },
  });
  const forgotPasswordForm = useFormik({
    initialValues: {
      username: "",
    },
    validate: forgotPasswordFormValidate,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      let options = {
        headers: {
          "my-auth-key": token,
        },
      };
      const forgotPassword = async () => {
        const result = await axiosInstance({
          url: "/user/forgotpassword",
          method: "POST",
          headers: options.headers,
          data: { username: values.username, captcha: forgotPasswordCaptcha },
        });
        const { data } = result;
        const { result: forgotPasswordResult } = data;
        console.log("forgotPassword data:", forgotPasswordResult);
        if (data.success) {
          toast(`${forgotPasswordResult}`);
          setForgotPasswordCaptcha("");
          if (forgotPasswordRechaptchaRef?.current) {
            // console.log('forgotPasswordRechaptchaRef?.current', forgotPasswordRechaptchaRef?.current)
            // @ts-ignore
            forgotPasswordRechaptchaRef?.current?.reset();
          }
        }
        if (!data.success) {
          toast(`${forgotPasswordResult}`);
          setForgotPasswordCaptcha("");
          if (forgotPasswordRechaptchaRef?.current) {
            // console.log('forgotPasswordRechaptchaRef?.current', forgotPasswordRechaptchaRef?.current)
            // @ts-ignore
            forgotPasswordRechaptchaRef?.current?.reset();
          }
        }
      };

      forgotPassword();
    },
  });

  const changePasswordForm = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      retypePassword: "",
    },
    validate: changePasswordFormValidate,
    onSubmit: (values, { setSubmitting }) => {
      // alert(JSON.stringify(values, null, 2));
      // otpHandler(values.email);
      setSubmitting(false);
      let options = {
        headers: {
          "my-auth-key": token,
        },
      };
      const changePassword = async () => {
        const result = await axiosInstance({
          url: "/user/changepassword",
          method: "POST",
          headers: options.headers,
          data: { old: values.oldPassword, password: values.password },
        });
        const { data } = result;
        const { message } = data;
        console.log("changePassword data:", data);
        if (data.success) {
          toast(`Password changed successfully`);
          changePasswordForm.resetForm();
          setChangePasswordPanel(false);
        }
        if (!data.success) {
          toast(`${message}`);
        }
      };

      changePassword();
    },
  });

  useEffect(() => {
    console.log("active", active);
    console.log("account", account);
    if (!!account) {
      setWalletAddress(account);
      if (chainId !== BSCTestnet.chainId) switchNetwork(BSCTestnet.chainId);
    }
    if (active && !!account && authMode === "OTPEMAIL")
      otpForm.setFieldValue("walletAddress", account);
    if (!active && !account && authMode === "OTPEMAIL")
      otpForm.setFieldValue("walletAddress", "");
    if (active && !!account && authMode === "LOGINWALLET")
      loginWalletForm.setFieldValue("walletAddress", account);
    if (!active && !account && authMode === "LOGINWALLET")
      loginWalletForm.setFieldValue("walletAddress", "");
  }, [active, account, authMode, chainId]);

  useEffect(() => {
    if (usdtBalance) {
      const balance = formatUnits(usdtBalance, 18);
      console.log("usdtBalance", balance);
      setWalletBalance(balance);
    }
  }, [setWalletBalance, usdtBalance]);

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

  const stageRef = useCallback((node: Stage) => {
    if (node !== null) {
      // node.render();
      node.forceUpdate(() => {
        node.render();
      });
    }
  }, []);

  const loginHandler = async () => {
    // TODO: to change scene to home
    // setScene("HOME");
    // changeScene('HOME')
    const loginRequestData: loginReqFormat = {
      username: loginForm.values.username,
      password: loginForm.values.password,
      captcha: captcha,
    };
    const result = await axiosInstance({
      url: "/user/authentication",
      method: "POST",
      data: loginRequestData,
    });

    const { data } = result;
    if (!data.success) {
      toast(`${data.message}`);
      if (loginRechaptchaRef?.current) {
        // console.log('loginRechaptchaRef?.current', loginRechaptchaRef?.current)
        // @ts-ignore
        loginRechaptchaRef?.current?.reset();
      }
    }
    if (data && data.result) {
      saveToken(data.result?.jwt);
      setCaptcha("");
      if (loginRechaptchaRef?.current) {
        // console.log('loginRechaptchaRef?.current', loginRechaptchaRef?.current)
        // @ts-ignore
        loginRechaptchaRef?.current?.reset();
      }
      setAuthMode("LOGINWALLET");
    }
  };

  const registerHandler = async () => {
    const registerRequestData: registerReqFormat = {
      email: otpForm.values.email,
      username: registerForm.values.username,
      password: registerForm.values.password,
      referal: registerForm.values.referralCode || "",
      // address: otpForm.values.walletAddress,
      address: "",
      otp,
      country: registerForm.values.countryCode,
      captcha: registerCaptcha,
    };
    // console.log("submit values", registerRequestData);
    const result = await axiosInstance({
      url: "/user/register",
      method: "POST",
      data: registerRequestData,
    });
    const { data } = result;
    // @ts-ignore
    if (data.success) {
      toast(`Register Success`);
      setAuthMode("LOGIN");
      setRegisterCaptcha("");
      if (registerRechaptchaRef?.current) {
        // console.log('registerRechaptchaRef?.current', registerRechaptchaRef?.current)
        // @ts-ignore
        registerRechaptchaRef?.current?.reset();
      }
    }
    if (!data.success) {
      toast(`${data.message}`);
      setRegisterCaptcha("");
      if (registerRechaptchaRef?.current) {
        // console.log('registerRechaptchaRef?.current', registerRechaptchaRef?.current)
        // @ts-ignore
        registerRechaptchaRef?.current?.reset();
      }
    }
  };

  const otpHandler = async (email: string) => {
    const otpRequestData: otpReqFormat = {
      email,
    };
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await axiosInstance({
      url: "/otp/getRegisterOtp",
      method: "POST",
      data: otpRequestData,
      headers: options.headers,
      // withCredentials: true
    });
    const { data } = result;
    if (!data.success) toast(`${data.message}`);
    if (data.success) toast("OTP Sent");
  };

  const [country, setCountry] = useState();
  useEffect(() => {
    registerForm.setFieldValue("countryCode", country);
  }, [country]);

  console.log("🚀 ~ file: AppTemp.tsx:548 ~ country:", country);

  const CountrySelect = ({
    value,
    onChange,
    placeholder,
    labels,
    ...rest
  }: any) => (
    // <select
    //   {...rest}
    //   value={value}
    //   onChange={(event) => {
    //     onChange(event.target.value || undefined);
    //   }}
    //   className="mt-2 py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] appearance-none text-black font-Magra font-bold"
    //   style={{
    //     background: `url(image/InputBox.png) no-repeat `,
    //   }}
    // >
    //   <option disabled selected defaultValue="">
    //     {placeholder}
    //   </option>
    //   {getCountries().map((country) => (
    //     <option key={country} value={country} className="text-black">
    //       {labels[country]}
    //     </option>
    //   ))}
    // </select>
    <Select
      {...rest}
      value={value}
      onChange={onChange}
      label="Select country"
      className="border-none focus:border-none focus:outline-none ring-0 outline-none text-[#A8A8A8] font-Magra font-bold"
      style={{
        background: `url(image/InputBox.png) no-repeat `,
      }}
    >
      {getCountries().map((country) => (
        <Option key={country} value={country} className="text-black">
          {labels[country]}
        </Option>
      ))}
    </Select>
  );

  const [openGameGuide, setOpenGameGuide] = useState(0);
  function IconGameGuide({ id, open }: any) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${id === open ? "rotate-180" : ""
          } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }

  const handleOpenGameGuide = (value: number) => {
    setOpenGameGuide(openGameGuide === value ? 0 : value);
  };

  const ShowUsers = (props: any) => {
    const { data, setDatas } = props;
    // const [downline, setDownline] = useState<any>();

    const clickPlus = async () => {
      let options = {
        headers: {
          "my-auth-key": token,
        },
      };
      const response = await axiosInstance({
        url: "/user/downline?ref=" + data.username,
        method: "GET",
        headers: options.headers,
      });
      if (response.data.result.length > 0) {
        // setDownline(response.data.result);
        setDatas(response.data.result);
        // let newHistory = buddiesHistories
        // newHistory.push({ username: data.username, data: response.data.result })
        // setBuddiesyHistories(newHistory)
      }
    };

    return (
      <>
        <div className="flex items-center m-2 p-2 w-full border border-black">
          <div className="flex flex-row w-full">
            <div className="icon">
              <BsPlusSquare size={20} onClick={clickPlus} />
            </div>
            <div className="flex w-full ml-3 justify-evenly font-Magra">
              <span className="text-yellow-700">{data.username}</span>
              {/* <span className='col-4'>Bought: $ { ethers.utils.formatUnits(data.bought, 18) }</span>
                        <span className='col-4'>Group : $ { ethers.utils.formatUnits(data.dl_bought, 18) }</span> */}
              <span className="">Bought: $ {formatUnits(data.bought, 18)}</span>
              <span className="">
                Group : $ {formatUnits(data.dl_bought, 18)}
              </span>
            </div>
          </div>
        </div>
        {/* {downline ? (
          <div className="d-flex flex-wrap ms-4 w-100">
            {downline.map((elm: any) => (
              <ShowUsers key={elm.username} data={elm} />
            ))}
          </div>
        ) : (
          ""
        )} */}
      </>
    );
  };

  const Downline = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [datas, setDatas] = useState<any>();

    const loadDownline = async () => {
      let options = {
        headers: {
          "my-auth-key": token,
        },
      };
      const response = await axiosInstance({
        url: "/user/downline",
        method: "GET",
        headers: options.headers,
      });
      setDatas(response.data.result);
      // setBuddiesyHistories([{ username: userData?.username, data: response.data.result }])
    };

    useEffect(() => {
      if (!datas) loadDownline();
      // if (buddiesHistories.length === 0) loadDownline();
    }, []);

    return (
      <>
        <h1 className="font-Magra text-yellow-700 text-center text-xl">
          {`${userData.username} Buddy`}
          {/* {buddiesHistories.length > 0 ? buddiesHistories[buddiesHistories.length - 1]?.username : `${userData.username}'s buddy`} */}
        </h1>
        {datas ? (
          <div className="flex flex-col">
            {datas.map((elm: any) => (
              <ShowUsers key={elm.username} data={elm} setDatas={setDatas} />
            ))}
          </div>
        ) : (
          ""
        )}
        {/* {buddiesHistories.length > 0 ? (
          <div className="flex flex-col">
            {buddiesHistories[buddiesHistories.length - 1]?.data?.map((elm: any) => (
              <ShowUsers key={elm.username} data={elm} setDatas={setDatas} />
            ))}
          </div>
        ) : (
          ""
        )} */}
      </>
    );
  };

  const DownlineCallback = useCallback(Downline, [token]);

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
  // const TicketBuyBtn = (props: any) => {
  //   const amount = BigInt(props.total * 1e18);
  //   // const { address } = getAccount();
  //   const ticketAllowance = useTokenAllowance(USDT_ADDR, walletAddress, TICKET_ADDR)
  //   const [btnApproved, setBtnApproved] = useState<any>();
  //   const [disabled, setDisabled] = useState(false);
  //   const {
  //     sendTransaction,
  //     state,
  //     resetState,
  //   } = useSendTransaction({ transactionName: "Ticket Approve" });

  //   const handleApprove = async () => {
  //     setDisabled(true);
  //     // const txReq = { to: TICKET_ADDR, from: walletAddress, data: d.TxRawApproval }
  //     // const config = await prepareWriteContract({
  //     //   abi: USDT_ABI,
  //     //   address: USDT_ADDR,
  //     //   chainId: NETWORK_CHAIN,
  //     //   functionName: 'approve',
  //     //   args: [TICKET_ADDR, amount]
  //     // });
  //     // const hash = await writeContract(config);
  //     // const confirm = await waitForTransaction(hash);
  //     if (state) {
  //       setBtnApproved(amount);
  //     }
  //     console.log(state);

  //     setDisabled(false);
  //   }

  //   const handleBuy = async () => {
  //     let options = {
  //       headers: {
  //         'my-auth-key': token
  //       }
  //     }
  //     const response = await axiosInstance({
  //       url: "/ticket/createRawBuyTickets",
  //       method: "POST",
  //       headers: options.headers,
  //       data: {
  //         qty: props.qty,
  //       },
  //     });
  //     console.log(response.data);
  //     if (response.data.success) {
  //       const txReq = {
  //         data: response.data.result,
  //         to: TICKET_ADDR,
  //         from: walletAddress,
  //       }
  //       const txSend = await sendTransaction(txReq);
  //       console.log(txSend);
  //       // const confirm = await waitForTransaction(txSend);
  //       // if(confirm) {

  //       // }
  //       if (txSend) checkValidateTx(txSend.transactionHash);
  //       // console.log(confirm);
  //     }
  //   }

  //   const checkValidateTx = (hash: string) => {
  //     let options = {
  //       headers: {
  //         'my-auth-key': token
  //       }
  //     }
  //     axiosInstance({
  //       url: "/ticket/validate",
  //       method: "POST",
  //       headers: options.headers,
  //       data: {
  //         qty: props.qty,
  //       },
  //     }).then((response) => {
  //       console.log(response.data);
  //       if (response.data.result === 1) {
  //         alert('Buy Ticket Confirmed');
  //       } else {
  //         setTimeout(() => checkValidateTx(hash), 5000);
  //       }
  //     })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     // axios.post(API_ENDPOINT + '/ticket/validate', { hash: hash }, options)

  //   }

  //   const checkApproval = async () => {
  //     if (ticketAllowance) {
  //       let d = BigInt(ticketAllowance.toString());
  //       setBtnApproved(d);
  //     }
  //   }

  //   // useEffect(() => {
  //   //   if (!btnApproved) checkApproval();
  //   // });

  //   if (btnApproved < amount) {
  //     return (
  //       <button className="btn-sm btn btn-primary" disabled={disabled} onClick={handleApprove}>Approval</button>
  //     )
  //   } else {
  //     return (
  //       <button className="btn-sm btn btn-success" disabled={disabled} onClick={handleBuy}>Buy</button>
  //     )
  //   }
  // }
  return (
    <div className="relative flex justify-center items-center">
      {scene === "REGISTER" && (
        <div className="absolute h-full flex">
          <div className="flex z-20 sm:backdrop-blur-sm justify-center items-center flex-col sm:bg-white/10  sm:px-8 py-2.5 shadow-sm rounded-sm ">
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
              className={`flex justify-start items-center flex-col gap-4 bg-white/50 px-2 py-6 shadow-sm rounded-xl`}
              style={{
                background: `url(image/formBackground.png) no-repeat `,
                backgroundSize: "cover",
              }}
            >
              <div className="flex gap-2 justify-start py-5 w-full">
                <input
                  alt="btnLogin"
                  type={"image"}
                  src={"image/BtnLogin.png"}
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
                      <div className="relative flex flex-row items-center justify-between">
                        <input
                          name="password"
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder="Password"
                          className="mt-2 py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          onChange={loginForm.handleChange}
                          onBlur={loginForm.handleBlur}
                          value={loginForm.values.password}
                        />
                        <button
                          type="button"
                          className="absolute flex top-[42%] right-1 items-center px-4 text-gray-600"
                          onClick={togglePasswordVisibility}
                        >
                          {isPasswordVisible ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <p className="text-red-500 font-bold font-magra max-w-[350px]">
                        {loginForm.errors.password &&
                          loginForm.touched.password &&
                          loginForm.errors.password}
                      </p>
                      <div className="flex justify-end w-full">
                        <button
                          type="button"
                          onClick={() => setAuthMode("FORGOTPASSWORD")}
                          className="px-1.5 py-0.5 text-sm font-bold text-white shadow-sm hover:text-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 font-Magra"
                        >
                          Forgot password
                        </button>
                      </div>
                    </div>
                  </form>
                  <ReCAPTCHA
                    ref={loginRechaptchaRef}
                    sitekey={CAPTCHA_KEY}
                    onChange={(e: any) => verifiedCallback(e as string)}
                  />
                  <input
                    alt="btnLogin"
                    type={"image"}
                    src={"image/BtnConfirm.png"}
                    onClick={loginForm.submitForm}
                    className={`${captcha?.length === 0 ? "opacity-50" : ""
                      } mt-12 px-3.5 py-2.5 text-sm`}
                    disabled={captcha?.length === 0}
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
                      <div className="relative flex flex-row items-center justify-between">
                        <input
                          name="password"
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder="Password"
                          className="mt-2 py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          onChange={registerForm.handleChange}
                          onBlur={registerForm.handleBlur}
                          value={registerForm.values.password}
                        />
                        <button
                          type="button"
                          className="absolute flex top-[42%] right-1 items-center px-4 text-gray-600"
                          onClick={togglePasswordVisibility}
                        >
                          {isPasswordVisible ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <p className="text-red-500 font-bold font-magra max-w-[350px]">
                        {registerForm.errors.password &&
                          registerForm.touched.password &&
                          registerForm.errors.password}
                      </p>

                      <div className="relative flex flex-row items-center justify-between">
                        <input
                          name="retypePassword"
                          type={isRetypePasswordVisible ? "text" : "password"}
                          placeholder="Re-enter your password"
                          className="mt-2 py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          onChange={registerForm.handleChange}
                          onBlur={registerForm.handleBlur}
                          value={registerForm.values.retypePassword}
                        />
                        <button
                          type="button"
                          className="absolute flex top-[42%] right-1 items-center px-4 text-gray-600"
                          onClick={toggleRetypePasswordVisibility}
                        >
                          {isRetypePasswordVisible ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="my-2">
                        <p className="text-red-500 font-bold font-magra max-w-[350px]">
                          {registerForm.errors.retypePassword &&
                            registerForm.touched.retypePassword &&
                            registerForm.errors.retypePassword}
                        </p>
                        <CountrySelect
                          labels={en}
                          placeholder="Select Country"
                          value={country}
                          onChange={setCountry}
                        />
                        <p className="text-red-500 font-bold font-magra">
                          {registerForm.errors.countryCode &&
                            registerForm.touched.countryCode &&
                            registerForm.errors.countryCode}
                        </p>
                      </div>

                      <input
                        name="referralCode"
                        type="text"
                        placeholder="Sponsor"
                        className="mt-2 py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        value={registerForm.values.referralCode || ""}
                        disabled={!!sponsor}
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
                        src="image/CheckBoxEulaBackground.png"
                        onClick={() => setRegisterCheckbox(true)}
                      />
                    )}
                    <span className="font-Magra ml-2 text-white font-bold">{`I have read and agreed to <User Agreement and Privacy Policy>`}</span>
                  </div>
                  <input
                    alt="btnRegister"
                    type="image"
                    src={"image/BtnConfirmRegister.png"}
                    disabled={!registerCheckbox}
                    onClick={registerForm.submitForm}
                    className={`${!registerCheckbox ? "opacity-50" : ""
                      } mt-12 px-3.5 py-2.5 text-sm`}
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
                    {/* {account && (
                      <div
                        placeholder="Wallet Address"
                        className="mt-4 py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white text-sm font-Magra font-bold flex items-center"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                      >
                        {account}
                      </div>
                    )} */}
                    {/* {otpForm.values?.walletAddress?.length === 0 && ( */}
                    {/* <div className="flex flex-col">
                      <ConnectButton type="metamask" />
                    </div> */}
                    {/* )} */}
                    {/* <p className="text-red-500 font-bold font-magra">
                      {otpForm.errors.walletAddress &&
                        otpForm.touched.walletAddress &&
                        otpForm.errors.walletAddress}
                    </p> */}
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
                        type="button"
                        disabled={otpForm.isSubmitting}
                        onClick={otpForm.submitForm}
                      >
                        Request OTP
                      </button>
                    </div>
                  </form>
                  <ReCAPTCHA
                    ref={registerRechaptchaRef}
                    sitekey={CAPTCHA_KEY}
                    onChange={(e: any) => verifiedRegisterCallback(e as string)}
                  />
                  <input
                    alt="Register Submit"
                    type={"image"}
                    src={"image/BtnSubmit.png"}
                    onClick={registerHandler}
                    disabled={registerCaptcha?.length === 0}
                    className={`${registerCaptcha?.length === 0 ? "opacity-50" : ""
                      } mt-12 px-3.5 py-2.5 text-sm`}
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
                      <div className="flex flex-col">
                        <ConnectButton type="metamask" />
                        {/* <ConnectButton type='walletConnect' /> */}
                      </div>
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
                    className={`${loginWalletForm.values.walletAddress.length === 0
                      ? "opacity-50"
                      : ""
                      } mt-12 px-3.5 py-2.5 text-sm`}
                  />
                </>
              )}
              {authMode === "FORGOTPASSWORD" && (
                <>
                  <form onSubmit={forgotPasswordForm.handleSubmit}>
                    <div>
                      <input
                        name="username"
                        type="text"
                        placeholder="Enter username"
                        className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={forgotPasswordForm.handleChange}
                        onBlur={forgotPasswordForm.handleBlur}
                        value={forgotPasswordForm.values.username}
                      />
                      <p className="text-red-500 font-bold font-magra">
                        {forgotPasswordForm.errors.username &&
                          forgotPasswordForm.touched.username &&
                          forgotPasswordForm.errors.username}
                      </p>
                    </div>
                  </form>
                  <ReCAPTCHA
                    ref={forgotPasswordRechaptchaRef}
                    sitekey={CAPTCHA_KEY}
                    onChange={(e: any) =>
                      verifiedForgotPasswordCallback(e as string)
                    }
                  />
                  <input
                    alt="Forgot Password Submit"
                    type={"image"}
                    src={"image/BtnSubmit.png"}
                    onClick={forgotPasswordForm.submitForm}
                    disabled={forgotPasswordCaptcha?.length === 0}
                    className={`${forgotPasswordCaptcha?.length === 0 ? "opacity-50" : ""
                      } mt-12 px-3.5 py-2.5 text-sm`}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {googleAuthPanel.show &&
        googleAuthPanel.mode === "SET" &&
        scene === "PROFILE" && (
          <div className="absolute h-full flex">
            <div className=" my-5 flex backdrop-blur-sm  justify-center items-center flex-col bg-white/10 px-3.5 py-2.5 shadow-sm rounded-sm ">
              <div
                className="flex justify-start items-center flex-col gap-4 bg-white/50 px-3.5 py-6 shadow-sm rounded-xl "
                style={{
                  background: `url(image/formBackground.png) no-repeat `,
                  backgroundSize: "cover",
                }}
              >
                <>
                  <div className="flex w-full justify-end">
                    <img
                      src="image/logoutBtn.png"
                      width={30}
                      height={30}
                      alt="Close 2FA"
                      onClick={() =>
                        setGoogleAuthPanel({ show: false, mode: "SET" })
                      }
                    />
                  </div>
                  <img
                    src={googleAuthData?.qr}
                    width={177}
                    height={177}
                    alt="2FA QR"
                  />
                  <div
                    className="flex flex-row items-center justify-around"
                    onClick={() => {
                      if (navigator && navigator.clipboard) {
                        var textarea = document.createElement("textarea");
                        textarea.textContent = `${googleAuthData?.secret}`;
                        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
                        document.body.appendChild(textarea);
                        textarea.select();
                        try {
                          console.log(`2FA secret: ${googleAuthData?.secret}`);
                          return document.execCommand("copy");
                        } catch (ex) {
                          toast("Copy 2FA secret to clipboard failed.");
                          return false;
                        } finally {
                          document.body.removeChild(textarea);
                          toast("2FA Secret Copied!");
                        }
                      }
                    }}
                  >
                    <p className="font-Magra text-white cursor-pointer">
                      Secret : {googleAuthData?.secret}
                    </p>

                    <img src="/image/copyIcon.png" alt="Copy Icon" />
                  </div>
                  <form onSubmit={googleAuthenticationForm.handleSubmit}>
                    <div className="flex flex-col">
                      <input
                        name="validation"
                        type="text"
                        placeholder="Validation"
                        className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={googleAuthenticationForm.handleChange}
                        onBlur={googleAuthenticationForm.handleBlur}
                        value={googleAuthenticationForm.values.validation}
                      />
                      <p className="text-red-500 font-bold font-magra">
                        {googleAuthenticationForm.errors.validation &&
                          googleAuthenticationForm.touched.validation &&
                          googleAuthenticationForm.errors.validation}
                      </p>
                    </div>
                  </form>
                  <button
                    type={"submit"}
                    // src={"image/BtnConfirm.png"}
                    onClick={googleAuthenticationForm.submitForm}
                    className="bg-green-500 text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    Validation
                  </button>
                </>
              </div>
            </div>
          </div>
        )}
      {googleAuthPanel.show &&
        googleAuthPanel.mode === "REMOVE" &&
        scene === "PROFILE" && (
          <div className="absolute h-full flex">
            <div className=" my-5 flex backdrop-blur-sm  justify-center items-center flex-col bg-white/10 px-3.5 py-2.5 shadow-sm rounded-sm ">
              <div
                className="flex justify-start items-center flex-col gap-4 bg-white/50 px-3.5 py-6 shadow-sm rounded-xl "
                style={{
                  background: `url(image/formBackground.png) no-repeat `,
                  backgroundSize: "cover",
                }}
              >
                <>
                  <div className="flex w-full justify-end">
                    <img
                      src="image/logoutBtn.png"
                      width={30}
                      height={30}
                      alt="Close 2FA"
                      onClick={() =>
                        setGoogleAuthPanel({ show: false, mode: "SET" })
                      }
                    />
                  </div>
                  <p className="font-Magra text-white">Remove 2FA</p>
                  <form onSubmit={googleAuthenticationForm.handleSubmit}>
                    <div className="flex flex-col">
                      <input
                        name="validation"
                        type="text"
                        placeholder="Validation"
                        className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={googleAuthenticationForm.handleChange}
                        onBlur={googleAuthenticationForm.handleBlur}
                        value={googleAuthenticationForm.values.validation}
                      />
                      <p className="text-red-500 font-bold font-magra">
                        {googleAuthenticationForm.errors.validation &&
                          googleAuthenticationForm.touched.validation &&
                          googleAuthenticationForm.errors.validation}
                      </p>
                    </div>
                  </form>
                  <button
                    type={"submit"}
                    // src={"image/BtnConfirm.png"}
                    onClick={googleAuthenticationForm.submitForm}
                    className="bg-green-500 text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    Validation
                  </button>
                </>
              </div>
            </div>
          </div>
        )}
      {ticketPanel.show && scene === "HOME" && (
        <div className="absolute h-[80vh] flex">
          <div className=" my-5 flex backdrop-blur-sm  justify-center items-center flex-col bg-white/10 px-3.5 py-2.5 shadow-sm rounded-sm ">
            <div className="flex w-full justify-end">
              <img
                src="image/logoutBtn.png"
                width={30}
                height={30}
                alt="Close Ticket"
                onClick={() => setTicketPanel({ show: false, mode: "BUY" })}
              />
            </div>
            <div
              className="flex justify-start items-center flex-col gap-4 bg-white/50 px-3.5 py-6 shadow-sm rounded-xl "
              style={{
                background: `url(image/formBackground.png) no-repeat `,
                backgroundSize: "cover",
                overflow: "auto",
              }}
            >
              <div className="flex gap-2 justify-start py-5 w-full">
                <button
                  type="button"
                  onClick={() =>
                    setTicketPanel({ ...ticketPanel, mode: "BUY" })
                  }
                  className={`${ticketPanel.mode === "BUY" ? "text-blue-500" : "text-white"
                    } font-bold font-Magra px-3.5 py-2.5 text-xl focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                  Buy
                </button>
                {userData.tf_ticket && (
                  <button
                    type="button"
                    onClick={() =>
                      setTicketPanel({ ...ticketPanel, mode: "TRANSFER" })
                    }
                    className={`${ticketPanel.mode === "TRANSFER"
                      ? "text-blue-500"
                      : "text-white"
                      } font-bold font-Magra px-3.5 py-2.5 text-xl focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                  >
                    Transfer
                  </button>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setTicketPanel({ ...ticketPanel, mode: "HISTORY" })
                  }
                  className={`${ticketPanel.mode === "HISTORY"
                    ? "text-blue-500"
                    : "text-white"
                    } font-bold font-Magra px-3.5 py-2.5 text-xl focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                  History
                </button>
              </div>
              {ticketPanel.mode === "BUY" && (
                <>
                  <form onSubmit={loginForm.handleSubmit}>
                    <div className="flex flex-col">
                      <p className="text-white font-Magra mb-3">
                        Ticket Quantity
                      </p>
                      <input
                        name="quantity"
                        type="number"
                        placeholder="Ticket Quantity"
                        className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={changeQuantity}
                        value={qty}
                      />
                      <p className="text-white font-Magra my-3">Total USDT</p>
                      <input
                        name="totalPrice"
                        type="text"
                        // placeholder="Password"
                        className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        readOnly
                        // onChange={loginForm.handleChange}
                        // onBlur={loginForm.handleBlur}
                        value={usd}
                      />
                      <div className="flex flex-row py-3">
                        <input
                          name="buyWithBonus"
                          type="checkbox"
                          // placeholder="Password"
                          // className="py-3"
                          // style={{
                          //   background: `url(image/InputBox.png) no-repeat `,
                          // }}
                          checked={buyWithBonus}
                          onChange={(e: any) => {
                            console.log("buy with bonus", e);
                            setBuyWithBonus(!buyWithBonus);
                          }}
                        // onBlur={loginForm.handleBlur}
                        // value={usd}
                        />
                        <p className="font-Magra text-md text-white ml-3">
                          Buy with Bonus
                        </p>
                      </div>

                      {!userData?.ga_key && buyWithBonus && (
                        <p className="font-Magra text-md text-red-500 ml-3">
                          Please configure 2FA on Setting
                        </p>
                      )}

                      {buyWithBonus && (
                        <input
                          name="2FA"
                          type="number"
                          placeholder="2FA"
                          className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          onChange={(e: any) => setGAValue(e.target.value)}
                          value={GAValue}
                        />
                      )}
                    </div>
                  </form>
                  <button
                    type={"submit"}
                    // disabled={}
                    onClick={async () => {
                      console.log("usd amount approval", usd);
                      if (buyWithBonus) {
                        console.log("Buy with bonus clicked", {
                          qty: parseInt(qty as string),
                          facode: GAValue.toString(),
                        });
                        let options = {
                          headers: {
                            "my-auth-key": token,
                          },
                        };
                        const response = await axiosInstance({
                          url: "/ticket/buyWithBonuses",
                          method: "POST",
                          headers: options.headers,
                          data: {
                            qty: parseInt(qty as string),
                            facode: GAValue.toString(),
                          },
                        });
                        if (response.data.success) {
                          toast("Buy Ticket Confirmed");
                          getUserData();
                        } else alert(response.data.message);
                      } else if (!buyWithBonus) {
                        if (
                          ticketAllowance &&
                          ticketAllowance.toBigInt() < BigInt(usd * 1e18)
                        ) {
                          // const txReq = { value: BigInt(usd * 1e18) }
                          const txSend = await send(
                            TICKET_ADDR,
                            BigInt(usd * 1e18)
                          );
                          console.log("txSend ticketApproval", txSend);
                        } else {
                          let options = {
                            headers: {
                              "my-auth-key": token,
                            },
                          };
                          const response = await axiosInstance({
                            url: "/ticket/createRawBuyTickets",
                            method: "POST",
                            headers: options.headers,
                            data: {
                              qty: qty,
                            },
                          });
                          console.log(response.data);
                          if (response.data.success) {
                            const txReq = {
                              data: response.data.result,
                              to: TICKET_ADDR,
                              from: walletAddress,
                            };
                            const txSend = await sendTicketBuy(txReq);
                            console.log("txSend buy ticket", txSend);
                            if (txSend && txSend.transactionHash)
                              checkValidateTx(txSend.transactionHash);
                          }
                        }
                      }
                    }}
                    className={`${buyWithBonus
                      ? "bg-green-500"
                      : ticketAllowance &&
                        ticketAllowance.toBigInt() < BigInt(usd * 1e18)
                        ? "bg-red-500"
                        : "bg-green-500"
                      } text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                    disabled={
                      (buyWithBonus &&
                        GAValue.length < 6 &&
                        !userData?.ga_key) ||
                      sendTicketBuyState.status !== "None"
                    }
                  >
                    {buyWithBonus
                      ? "Buy with Bonus"
                      : ticketAllowance &&
                        ticketAllowance.toBigInt() < BigInt(usd * 1e18)
                        ? "Approval"
                        : "Buy Ticket"}
                  </button>
                  {sendTicketBuyState.status !== "None" && (
                    <p className="text-white/50 font-Magra">
                      {sendTicketBuyState.status}
                    </p>
                  )}
                </>
              )}
              {ticketPanel.mode === "TRANSFER" && (
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
                        onChange={checkUsername}
                        value={transferUsername}
                      />
                      <p className="text-red-500 font-bold font-magra">
                        {registerForm.errors.username &&
                          registerForm.touched.username &&
                          registerForm.errors.username}
                      </p>
                      <p className="text-white font-Magra mt-2">
                        Ticket Quantity
                      </p>
                      <input
                        name="quantity"
                        type="number"
                        placeholder="Ticket Quantity"
                        className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={(e: any) => setTransferQty(e.target.value)}
                        value={transferQty}
                      />
                      <input
                        name="2FA"
                        type="number"
                        placeholder="2FA"
                        className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={(e: any) => setGAValue(e.target.value)}
                        value={GAValue}
                      />
                      {!userData?.ga_key && (
                        <p className="font-Magra text-md text-red-500 ml-3">
                          Please configure 2FA on Setting
                        </p>
                      )}
                    </div>
                  </form>
                  <button
                    type={"button"}
                    // src={"image/BtnConfirm.png"}
                    onClick={async () => {
                      let options = {
                        headers: {
                          "my-auth-key": token,
                        },
                      };
                      if (
                        window.confirm(
                          `Are you sure to transfer ${transferQty} ticket(s) to ${transferUsername}`
                        )
                      ) {
                        const response = await axiosInstance({
                          url: "/ticket/transfer",
                          method: "POST",
                          headers: options.headers,
                          data: {
                            to: transferUsername,
                            qty: transferQty,
                            facode: GAValue.toString(),
                          },
                        });
                        console.log("transfer ticket", response.data);
                        if (response.data.success) {
                          toast("Ticket Transfer Success");
                          getUserData();
                          setTicketPanel({ show: false, mode: "BUY" });
                          setGAValue("");
                        } else if (!response.data.success)
                          toast(response.data.message);
                      }
                    }}
                    className="bg-green-500 text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    disabled={!userData?.ga_key}
                  >
                    {/* {ticketAllowance && ticketAllowance.toBigInt() < BigInt(usd * 1e18) ? 'Approval' : 'Buy Ticket'} */}
                    Transfer Ticket
                  </button>
                </>
              )}
              {ticketPanel.mode === "HISTORY" && (
                <table>
                  <thead>
                    <tr className="text-yellow-500 font-Magra">
                      <th className="w-[160px]">Timestamp</th>
                      <th className="w-[80px]">Type</th>
                      <th className="w-[100px]">Qty</th>
                      <th className="w-[280px]">Desc</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketHistories.map((t: any) => {
                      var date = new Date(t.timestamp * 1000);

                      // Will display time in 10:30:23 format
                      var formattedTime =
                        date.getDate() +
                        "/" +
                        (date.getMonth() + 1) +
                        "/" +
                        date.getFullYear() +
                        " " +
                        date.getHours() +
                        ":" +
                        date.getMinutes() +
                        ":" +
                        date.getSeconds();
                      return (
                        <tr className="text-white text-center">
                          <td>{formattedTime}</td>
                          <td
                            className={`${t.amount < 0 ? "text-red-500" : "text-green-500"
                              }`}
                          >
                            {t.amount < 0 ? "OUT" : "IN"}
                          </td>
                          <td
                            className={`${t.amount < 0 ? "text-red-500" : "text-green-500"
                              }`}
                          >
                            {t.amount}
                          </td>
                          <td>{t.description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
      {/* {sponsorLinkPanel.show && scene === "PROFILE" && (
        <div className="absolute h-[80vh] flex">
          <div className=" my-5 flex backdrop-blur-sm  justify-center items-center flex-col bg-white/10 px-3.5 py-2.5 shadow-sm rounded-sm ">
            <div className="flex w-full justify-end">
              <img
                src="image/logoutBtn.png"
                width={30}
                height={30}
                alt="Close Sponsor Panel"
                onClick={() => setSponsorLinkPanel({ show: false, link: '' })}
              />
            </div>
            <div
              className="flex justify-start items-center flex-col gap-4 bg-white/50 px-3.5 py-6 shadow-sm rounded-xl "
              style={{
                background: `url(image/formBackground.png) no-repeat `,
                backgroundSize: "cover",
                overflow: "auto",
              }}
            >

              <>
                <div className="flex flex-col">
                  <p className="text-white font-Magra mb-3">
                    Sponsor Link
                  </p>

                  <p className="text-white text-lg">{sponsorLinkPanel.link}</p>
                  {navigator && navigator.clipboard &&
                    <p className="text-gray-500 text-sm">Your browser cannot copy link directly, please copy the link above manually</p>
                  }
                  {navigator && navigator.clipboard &&
                    <button
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        document?.getElementById("sponsorLink")?.focus();
                        console.log('window.clipboardData', window.clipboardData)
                        // if (window?.clipboardData && window?.clipboardData.setData) {
                        //   toast("Sponsor Link Copied!");
                        //   // IE specific code path to prevent textarea being shown while dialog is visible.
                        //   return window.clipboardData.setData("Text", `${window.location.origin}?sponsor=${userData.username}`);

                        // }
                        if (navigator && navigator.clipboard) {
                          // navigator.clipboard.writeText(
                          //   `${window.location.origin}?sponsor=${userData.username}`
                          // ).then(() => {
                          //   toast("Sponsor Link Copied!");
                          // });

                          var textarea = document.createElement("textarea");
                          textarea.textContent = `${window.location.origin}?sponsor=${userData.username}`;
                          textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
                          document.body.appendChild(textarea);
                          textarea.select();
                          try {
                            console.log(`sponsor link: ${window.location.origin}?sponsor=${userData.username} `)
                            // toast("Sponsor Link Copied!");
                            return document.execCommand("copy");
                          } catch (ex) {
                            toast("Copy to clipboard failed.");
                          } finally {
                            document.body.removeChild(textarea);
                            toast("Sponsor Link Copied!");
                          }
                        }
                        // else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                        //   var textarea = document.createElement("textarea");
                        //   textarea.textContent = `${window.location.origin}?sponsor=${userData.username}`;
                        //   textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
                        //   document.body.appendChild(textarea);
                        //   textarea.select();
                        //   try {
                        //     console.log(`sponsor link: ${window.location.origin}?sponsor=${userData.username} `)
                        //     toast("Sponsor Link Copied!");
                        //     return document.execCommand("copy");
                        //   } catch (ex) {
                        //     toast("Copy to clipboard failed.");
                        //   } finally {
                        //     document.body.removeChild(textarea);
                        //     toast("Sponsor Link Copied!");
                        //   }
                        // }
                      }
                      }
                      className="mt-3 bg-green-500 text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >Copy Link</button>
                  }
                </div>
              </>

            </div>
          </div>
        </div>
      )} */}
      {changePasswordPanel && scene === "PROFILE" && (
        <div className="absolute h-[80vh] flex">
          <div className=" my-5 flex backdrop-blur-sm  justify-center items-center flex-col bg-white/10 px-3.5 py-2.5 shadow-sm rounded-sm ">
            <div className="flex w-full justify-end">
              <img
                src="image/logoutBtn.png"
                width={30}
                height={30}
                alt="Close Change Password Panel"
                onClick={() => setChangePasswordPanel(false)}
              />
            </div>
            <div
              className="flex justify-start items-center flex-col gap-4 bg-white/50 px-3.5 py-6 shadow-sm rounded-xl "
              style={{
                background: `url(image/formBackground.png) no-repeat `,
                backgroundSize: "cover",
                overflow: "auto",
              }}
            >
              <>
                <form onSubmit={changePasswordForm.handleSubmit}>
                  <div className="flex flex-col">
                    <div className="relative flex flex-row items-center justify-between">
                      <input
                        name="oldPassword"
                        type={isOldPasswordVisible ? "text" : "password"}
                        placeholder="Old Password"
                        className="mt-2 py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={changePasswordForm.handleChange}
                        onBlur={changePasswordForm.handleBlur}
                        value={changePasswordForm.values.oldPassword}
                      />
                      <button
                        type="button"
                        className="absolute flex top-[42%] right-1 items-center px-4 text-gray-600"
                        onClick={toggleOldPasswordVisibility}
                      >
                        {isOldPasswordVisible ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="text-red-500 font-bold font-magra max-w-[350px]">
                      {changePasswordForm.errors.oldPassword &&
                        changePasswordForm.touched.oldPassword &&
                        changePasswordForm.errors.oldPassword}
                    </p>
                    <div className="relative flex flex-row items-center justify-between">
                      <input
                        name="password"
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="New Password"
                        className="mt-2 py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={changePasswordForm.handleChange}
                        onBlur={changePasswordForm.handleBlur}
                        value={changePasswordForm.values.password}
                      />
                      <button
                        type="button"
                        className="absolute flex top-[42%] right-1 items-center px-4 text-gray-600"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="text-red-500 font-bold font-magra max-w-[350px]">
                      {changePasswordForm.errors.password &&
                        changePasswordForm.touched.password &&
                        changePasswordForm.errors.password}
                    </p>

                    <div className="relative flex flex-row items-center justify-between">
                      <input
                        name="retypePassword"
                        type={isRetypePasswordVisible ? "text" : "password"}
                        placeholder="Re-enter your password"
                        className="mt-2 py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={changePasswordForm.handleChange}
                        onBlur={changePasswordForm.handleBlur}
                        value={changePasswordForm.values.retypePassword}
                      />
                      <button
                        type="button"
                        className="absolute flex top-[42%] right-1 items-center px-4 text-gray-600"
                        onClick={toggleRetypePasswordVisibility}
                      >
                        {isRetypePasswordVisible ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <div className="my-2">
                      <p className="text-red-500 font-bold font-magra max-w-[350px]">
                        {changePasswordForm.errors.retypePassword &&
                          changePasswordForm.touched.retypePassword &&
                          changePasswordForm.errors.retypePassword}
                      </p>
                    </div>
                  </div>
                </form>
                <button
                  onClick={changePasswordForm.submitForm}
                  className={`bg-green-500 text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                  Change Password
                </button>
              </>
            </div>
          </div>
        </div>
      )}
      {scene === "GAMEGUIDE" && (
        <div className="absolute w-full h-full flex justify-center items-center">
          <img
            src="image/profileBackground.png"
            className="absolute w-full h-full object-cover "
            alt="background"
          />
          <div className="flex z-20 h-[80vh] w-[450px] max-[450px]:w-[calc(100vw)] max-w-[450px] justify-center items-center flex-col sm:px-4 shadow-sm rounded-sm ">
            <div className="flex w-full justify-start">
              <img
                src="image/backBtn.png"
                width={30}
                height={30}
                alt="Back"
                onClick={() => changeScene("PROFILE")}
              />
            </div>
            <div className="flex flex-col h-full w-full px-4 pt-6 pb-6 bg-white/20 backdrop-blur-sm overflow-y-visible overflow-auto">
              <Accordion
                open={openGameGuide === 1}
                icon={<IconGameGuide id={1} open={openGameGuide} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenGameGuide(1)}
                  className="text-[#FFC700] hover:text-[#FFC700] font-Magra font-bold bg-[#031A22] px-4 rounded-t-xl"
                >
                  Jurrasic World
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <p>
                    When the first dinosaur bone was described in Jurassic
                    World, it was thought to come from an elephant or perhaps a
                    giant.Over a century later, scientists realised such fossils
                    came from a creature they named Megalosaurus. Then, in
                    leading anatomist recognised Megalosaurus as part of a whole
                    new group of animals, which named Dinosaur. Since then,
                    around 600 different dinosaur species have been described in
                    Jurassic World and there is more dinosaur that haven’t
                    described
                  </p>
                  <br />
                  <p>
                    In a meantime, people and dinosaur will meet eventually and
                    we encourage for all of you around the world to participate
                    inside Jurassic World, become a Hunter and train your
                    Dinosaur to defeat and capture Dinosaur Eggs. Only highly
                    dedicated Hunters who able to defeat Immortal Dinosaur. Let
                    us lead the future of Jurassic World to a more promising
                    path.
                  </p>
                  <br />
                  <p>
                    Hunters need to go to the [Jurassic] Market to buy Dino Eggs
                    before starting the hunting journey. When the Dino Eggs is
                    successfully purchased, the Hunter will also accumulate its
                    own hunting value. With the increase of the hunting value,
                    the hunter can also advance to a higher level and enjoy more
                    benefits (the hunting value of the first-level relationship
                    buddies of the hunter, can also contribute to the hunter's
                    hunting value, and assist the hunter to advance).
                  </p>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openGameGuide === 2}
                icon={<IconGameGuide id={2} open={openGameGuide} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenGameGuide(2)}
                  className="text-[#FFC700] hover:text-[#FFC700] font-Magra font-bold bg-[#031A22] px-4"
                >
                  Start Game
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <p>
                    Before beginning the hunting expedition, hunters must
                    purchase Dino Eggs at the [Jurassic] Market. Following the
                    purchase of Dino Eggs, the hunter will also raise their
                    hunting value, climb the rank ladder, and earn more rewards.
                    (The hunting value of the hunter's first-degree buddies will
                    also help the hunter rise in rank.)
                  </p>
                  <br />
                  <img src="/image/tableStartGame.png" alt="table start game" />
                  <br />
                  <p>
                    Hunters will receive additional awards from the [Jurassic]
                    Market in addition to hunting rewards for successfully
                    capturing Dinosaurus during the hunting procedure. Hunters
                    who failed to capture any Dinosaurus will also receive
                    rewards for their efforts.
                  </p>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openGameGuide === 3}
                icon={<IconGameGuide id={3} open={openGameGuide} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenGameGuide(3)}
                  className="text-[#FFC700] hover:text-[#FFC700] font-Magra font-bold bg-[#031A22] px-4"
                >
                  Jurrasic Market
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <p>
                    A place where all hunters gather.
                    <br />
                    <br />
                    Hunters who intend to purchase Dino Eggs here are required
                    to have purchase eggs, tickets and USDT in their account.
                    <br />
                    <br />
                    One hour prior to the end of the hunt, hunters who are
                    hunting can pre-list their Dino Eggs at the [Jurassic]
                    market. The Dino eggs will be listed immediately at the
                    [Jurassic] market for other Hunters to purchase from after
                    the hunting session has ended.
                    <br />
                    <br />
                    All Dino Eggs listed in the Jurassic Market are only
                    available for 24 hours. After 24 hours, any remaining
                    Jurassic Eggs will trigger the Dino Fund's buy- back policy.
                  </p>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openGameGuide === 5}
                icon={<IconGameGuide id={5} open={openGameGuide} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenGameGuide(5)}
                  className="text-[#FFC700] hover:text-[#FFC700] font-Magra font-bold bg-[#031A22] px-4"
                >
                  Dino Egg
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <img src="/image/tableDinoEgg.png" alt="table start game" />
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openGameGuide === 4}
                icon={<IconGameGuide id={4} open={openGameGuide} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenGameGuide(4)}
                  className="text-[#FFC700] hover:text-[#FFC700] font-Magra font-bold bg-[#031A22] px-4"
                >
                  Dinosaurus
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <p className="font-bold">Captured Dinosaurus Rewards</p>
                  <br />
                  <img src="/image/tableDinosaur.png" alt="table start game" />
                  <br />
                  <p>
                    Higher rarity Dinosaurus can only be captured using a Epic
                    or Glory Egg.
                  </p>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openGameGuide === 6}
                icon={<IconGameGuide id={6} open={openGameGuide} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenGameGuide(6)}
                  className="text-[#FFC700] hover:text-[#FFC700] font-Magra font-bold bg-[#031A22] px-4"
                >
                  Buddies
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <p>
                    Trainers can earn Buddy hunting bonuses by recruiting
                    Buddies; Bonuses will be earned whenever your Buddies
                    purchase Dino Eggs. Tiers receivable are based on the
                    hunter’s personal rank.
                  </p>
                  <br />
                  <p className="font-bold">Hunter\'s Rank</p>
                  <img src="/image/tableBuddies.png" alt="table start game" />
                  <br />
                  <p>
                    *In order to receive Buddy Hunting Bonus, the trainer will
                    need to exhaust one Purchase Ticket before the day ends,
                    2359hrs (GMT +8)
                  </p>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openGameGuide === 7}
                icon={<IconGameGuide id={7} open={openGameGuide} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenGameGuide(7)}
                  className="text-[#FFC700] hover:text-[#FFC700] font-Magra font-bold bg-[#031A22] px-4 rounded-b-xl"
                >
                  Rank Requalification
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <p>
                    Hunter are required to maintain their rank in order to enjoy
                    their current benefits. 1 week following a promotion to a
                    rank, a minimum amount of personal hunting value is required
                    for requalification.
                  </p>
                  <br />
                  <img
                    src="/image/tableRankRequalification.png"
                    alt="table start game"
                  />
                </AccordionBody>
              </Accordion>
            </div>
          </div>
        </div>
      )}
      {scene === "BUDDIES" && (
        <div className="absolute w-full h-full flex justify-center items-center">
          <img
            src="image/profileBackground.png"
            className="absolute w-full h-full object-cover "
            alt="background"
          />
          <div className="flex z-20 h-[80vh] w-[450px] max-[450px]:w-[calc(100vw)] max-w-[450px] justify-center items-center flex-col sm:px-4 shadow-sm rounded-sm ">
            <div className="flex w-full justify-start">
              <img
                src="image/backBtn.png"
                width={30}
                height={30}
                alt="Back"
                onClick={() => changeScene("HOME")}
              />
            </div>
            <div className="flex flex-col h-full w-full px-4 pt-6 pb-6 bg-gray-700/20 backdrop-blur-sm overflow-y-visible overflow-auto">
              <div className="bg-transparent">
                <DownlineCallback />
              </div>
            </div>
          </div>
        </div>
      )}
      {scene === "DINOCENTER" && (
        <div className="absolute w-full h-full flex justify-center items-center">
          <div className="flex z-20 h-[100vh] w-[450px] max-[450px]:w-[calc(100vw)] max-w-[450px] justify-center items-center flex-col sm:px-4 shadow-sm rounded-sm ">
            <div className="flex flex-row w-full justify-between mt-4 mb-1">
              <img
                src="image/backBtn.png"
                width={40}
                height={40}
                alt="Back"
                onClick={() => changeScene("HOME")}
              />
              <div className="flex flex-col items-center justify-center text-[1.5rem] text-white font-bold font-magra ">
                Jurrasic Market
              </div>
              <img
                src="image/logoutBtn.png"
                width={40}
                height={40}
                alt="Back"
              // onClick={() => changeScene("HOME")}
              />
            </div>
            <div className="flex flex-col h-full w-full px-4 pb-6 backdrop-blur-sm overflow-y-visible overflow-auto">
              {/* Hunter Details */}
              <div className="absolute left-0 top-0 w-full">
                <>
                  <img
                    src="image/pnlJurassicMarketBackground.png"
                    className="w-full object-cover"
                    alt="pnlJurassicMarketBackground"
                  />
                  <div className="absolute top-4 w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
                    <div className="flex flex-row justify-center font-bold font-Magra text-white text-lg [@media(max-width:400px)]:text-base">
                      Hunter's Rank
                    </div>
                  </div>
                  <div className="absolute top-8 w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
                    <div className="flex flex-row justify-between px-1 font-bold font-Magra text-white text-base [@media(max-width:400px)]:text-sm">
                      <span>Requalification</span>
                      <span>Current Rank</span>
                    </div>
                  </div>
                  {/* progress bar with image */}
                  {/* TODO: need to update styling to accept dynamic progress bar fill */}
                  <div className="absolute inline-block top-12 w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
                    <div className="flex flex-col items-center justify-center font-bold font-Magra text-white text-lg">
                      <img
                        src="image/RankExpBarBg.png"
                        className="object-cover z-10"
                        alt="RankExpBarBg"
                      />
                      {/* progress fill */}
                      <div className="absolute top-0 w-auto z-0">
                        <img
                          src="image/imgRankExpBarFill.png"
                          className=" object-covef"
                          alt="imgRankExpBarFill"
                        />
                      </div>
                      <div className="absolute top-[-5px] text-[0.8rem]">
                        {`${parseInt(total)}/${parseInt(period)}`}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-12 w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
                    <div className="flex flex-row justify-between px-1 font-bold font-Magra text-white [@media(max-width:400px)]:text-sm">
                      <span>{parseInt(period)}</span>
                      <span>{rankRequalification(userData?.title)}</span>
                    </div>
                  </div>
                  <div className="absolute top-[4.4rem] w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
                    <div className="flex flex-row justify-between px-20 font-bold font-Magra text-white text-sm">
                      <span className="text-red-500">{rankLoaderBarProgress(userData?.title)?.[0]}</span>
                      <span>{rankLoaderBarProgress(userData?.title)?.[1]}</span>
                    </div>
                  </div>
                </>
              </div>

              {/* DinoCenter Pages & filters */}
              <div className="absolute left-0 top-[6rem] w-full">
                <div className="flex flex-row w-full justify-between">
                  {/* Pages */}
                  <div className="flex w-full justify-start text-white font-Magra font-bold text-base [@media(max-width:400px)]:text-sm">
                    <div className="px-4 text-[#FFC700]">Listings</div>
                    <div>/</div>
                    <div className="px-2">My Listings</div>
                  </div>
                  {/* Filters */}
                  <div className="flex w-full text-white font-Magra font-bold text-base [@media(max-width:400px)]:text-sm">
                    <div className="flex w-full items-end justify-end">
                      <div className="flex flex-row items-center px-2">
                        <span>Price</span>
                        <img
                          src="image/btnFilterIcon.png"
                          width={5}
                          className="w-5 h-2.5 mx-1 rotate-180"
                          alt="priceFilterIcon"
                        />
                      </div>
                      <div className="flex flex-row items-center px-4">
                        <span>Time</span>
                        <img
                          src="image/btnFilterIcon.png"
                          width={5}
                          className="w-5 h-2.5 mx-1"
                          alt="priceFilterIcon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market */}
              <div className="absolute left-0 top-[9rem] w-full h-[55vh]">
                {false ? (
                  <div className="flex w-full h-full justify-center items-center font-Magra font-bold text-white">
                    Coming Soon
                  </div>
                ) : (
                  <div className="grid grid-cols-4">
                    {[...Array(12)].map((_, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center content-center "
                        >
                          <img
                            src="image/jurassicEggBg.png"
                            className="w-24 [@media(max-width:400px)]:w-[4.5rem] [@media(max-height:700px)]:w-[4.5rem]"
                            alt="jurassicEggBg"
                          />
                          <div>
                            <img
                              src={`${false
                                ? "image/imgJurassicEggIcon.png"
                                : "image/imgJurassicEggIcon2.png"
                                }`}
                              className={`w-14 -mt-[5.1rem] [@media(max-width:400px)]:w-[2.6rem] [@media(max-height:700px)]:w-[2.6rem] [@media(max-width:400px)]:-mt-[3.9rem] [@media(max-height:700px)]:-mt-[3.9rem]`}
                              alt="imgJurassicEggIcon"
                            />
                          </div>

                          {/* price */}
                          <div className="font magra font-bold decoration-from-font">
                            <span className="text-[#FFC700] [@media(max-width:400px)]:text-sm">
                              100 USDT
                            </span>
                          </div>

                          {/* action button */}
                          {true ? (
                            <div>
                              <img
                                src="image/BtnPurchaseCountdown.png"
                                className="w-20 "
                                alt="BtnPurchaseCountdown"
                              />
                              <div className="flex w-full justify-center font magra font-bold decoration-from-font">
                                <span className="text-white -mt-[1.8rem]">
                                  00:00:00
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <img
                                src="image/BtnPurchaseActive.png"
                                className="w-20 "
                                alt="BtnPurchaseActive"
                              />
                              <div className="flex w-full justify-center font magra font-bold decoration-from-font">
                                <span className="text-white -mt-[1.8rem]">
                                  Keep
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <Stage
          ref={stageRef}
          width={appWidth}
          height={appHeight}
          options={options}
          // renderOnComponentChange={true}
          raf={true}
          renderOnComponentChange={true}
          onAnimationIteration={() => {
            console.log("animation iteration");
          }}
        // onMount={(_app) => setApp(_app)}
        >
          {/* @ts-ignore */}

          {/* <Suspense fallback={<p>loading...</p>}> */}
          {scene === "LOADING" && (
            <Loading
              onFinishLoading={() => {
                console.log("finish loading");
                if (token && token !== "") changeScene("HOME");
                else changeScene("REGISTER");
              }}
              visible={scene === "LOADING"}
            />
          )}
          {/* </Suspense> */}
          {scene === "REGISTER" && <Register />}
          {scene === "HOME" && (
            <>
              <Home
                onProfileClick={() => changeScene("PROFILE")}
                scene={scene}
              />
            </>
          )}

          {scene === "PROFILE" && (
            <>
              <ProfileTemp
                onBackBtnClick={() => {
                  changeScene("HOME");
                  console.log("back");
                }}
                deactivate={deactivate}
                setAuthMode={setAuthMode}
              />
            </>
          )}
          {scene === "DINOCENTER" && (
            <>
              <DinoCenter
                scene={scene}
                onBackBtnClick={() => {
                  changeScene("HOME");
                  console.log("back");
                }}
                sendTransaction={async (data: any) => {
                  console.log("sendTransaction triggered from appTemp", data);
                  const txSend = await sendTransaction(data);
                  console.log("txSend from appTemp", txSend);
                }}
                sendPayTransaction={async (req: any, transactionData: any) => {
                  const txSend = await sendTransactionPay(req);
                  console.log("sendPayTransaction from appTemp", txSend);
                  if (txSend) {
                    let options = {
                      headers: {
                        "my-auth-key": token,
                      },
                    };
                    const result = await axiosInstance({
                      url: "/egg/finished",
                      method: "POST",
                      headers: options.headers,
                      data: {
                        id: transactionData.id,
                        hash: txSend.transactionHash,
                      },
                    });
                    const { data } = result;
                    console.log("payment finished", data);
                    setTimeout(() => checkValidation(transactionData.id), 3000);
                  }
                }}
              />
            </>
          )}
          {scene === "ALBUM" && (
            <>
              <Album
                scene={scene}
                onBackBtnClick={() => {
                  changeScene("HOME");
                  console.log("back");
                }}
                visible={scene === "ALBUM"}
              />
            </>
          )}
        </Stage>
      </div>
      <ToastContainer />
    </div>
  );
};
