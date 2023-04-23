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
import { useState, useEffect, useCallback } from "react";
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
import GameGuide from "./components/scene/GameGuide";

import { useAuthStore, useStore } from "./utils/store";
import {
  USDT_ADDR,
  PAYGATEWAY_ADDR,
  TICKET_ADDR,
  USDT_ABI,
  // CAPTCHA_KEY,
} from "./utils/config";
import { Contract } from "ethers";
// import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
const USDT_ADDRESS = "0x0ed04d340a054382383ee2edff0ced66ead7496c";
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
  const usdtInfo = useToken(USDT_ADDRESS)
  const usdtBalance = useTokenBalance(USDT_ADDRESS, account)
  const tokenBalance = useTokenBalance('0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE', account)
  const etherBalance = useEtherBalance(account, { chainId: BSCTestnet.chainId })
  const mainnetBalance = useEtherBalance(account, { chainId: BSC.chainId })
  const testnetBalance = useEtherBalance(account, { chainId: BSCTestnet.chainId })
  const allowance = useTokenAllowance(USDT_ADDR, walletAddress, PAYGATEWAY_ADDR)
  const ticketAllowance = useTokenAllowance(USDT_ADDR, walletAddress, TICKET_ADDR)
  // const [captcha, setCaptcha] = useState('')
  // const [registerCaptcha, setRegisterCaptcha] = useState('')
  const [ticketHistories, setTicketHistories] = useState([])
  const [googleAuthVisible, setGoogleAuthVisible] = useState(false);
  const [googleAuthData, setGoogleAuthData] = useState<{
    qr: string;
    secret: string;
  } | null>();
  const [sponsor, setSponsor] = useState<string | null | undefined>('')
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

  // const {
  //   sendTransaction: sendTicketApproval,
  //   state: sendTicketApprovalState,
  //   resetState: resetSendTicketApprovalState,
  // } = useSendTransaction({ transactionName: "Ticket Approve" });

  const transactionList = useTransactions();
  const { notifications } = useNotifications();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    console.log('sponsor', params.get('sponsor'))
    if (params.get('sponsor')) {
      setSponsor(params.get('sponsor'))
      registerForm.setFieldValue("referralCode", params.get('sponsor'));
      setAuthMode('REGISTER')
    }
  }, [])


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

  // const verifiedCallback = (token: string) => {
  //   console.log(token);
  //   setCaptcha(token);
  // };
  // const verifiedRegisterCallback = (token: string) => {
  //   console.log(token);
  //   setRegisterCaptcha(token);
  // };

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
      headers: getUserDataOptions.headers
    });
    console.log('getTicketHistories Result:', result)
    if (result && result.data && result.data.result) {
      setTicketHistories(result.data.result)
    }
  };

  useEffect(() => {
    getTicketHistories()
  }, [ticketPanel.show])

  console.log('ticketHistories', ticketHistories)

  const {
    sendTransaction: sendTicketBuy,
    state: sendTicketBuyState,
    resetState: resetSendTicketBuyState,
  } = useSendTransaction({ transactionName: "Ticket Buy" });

  const { state, send } = useContractFunction(USDTContract, "approve", {
    transactionName: "Ticket Approval",
  });
  console.log("contractFunction state", state);

  const changeScene = useStore((state) => state.changeScene);
  const [authMode, setAuthMode] = useState<
    "LOGIN" | "REGISTER" | "OTPEMAIL" | "OTPMOBILE" | "LOGINWALLET"
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
  console.log("usdtInfo", usdtInfo);
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
      setGoogleAuthVisible(true);
    }
  }, [userData]);

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
        console.log(response.data);
        if (response.data.result === 1) {
          alert("Buy Ticket Confirmed");
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
      checkValidateTx(sendTicketBuyState.transaction.hash);
      resetSendTicketBuyState();
    }
    console.log("sendTicketBuyState", sendTicketBuyState);
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

  const loginFormValidate = (values: LoginFormValidate) => {
    console.log("validate values", values);
    const errors: LoginFormValidate = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (!/^[A-Za-z0-9_]{5,20}$/i.test(values.username)) {
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
    if (!values.countryCode) {
      errors.countryCode = "Required";
    }
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
      const validate2FA = async () => {
        const result = await axiosInstance({
          url: "/auth/confirm2FA",
          method: "POST",
          headers: options.headers,
          data: { key: values.validation },
        });
        console.log("validate2FA Result:", result);
        if (result && result.data && result.data.result) {
          alert("2FA Confirmed");
          setGoogleAuthVisible(false);
        } else {
          alert(result.data.message);
        }
      };

      validate2FA();
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
      // captcha: captcha,
    };
    const result = await axiosInstance({
      url: "/user/authentication",
      method: "POST",
      data: loginRequestData,
    });

    const { data } = result;
    if (!data.success) toast(`${data.message}`);
    if (data && data.result) {
      saveToken(data.result?.jwt, () => changeScene("HOME"));
    }
  };

  const registerHandler = async () => {
    const registerRequestData: registerReqFormat = {
      email: otpForm.values.email,
      username: registerForm.values.username,
      password: registerForm.values.password,
      referal: registerForm.values.referralCode || '',
      // address: otpForm.values.walletAddress,
      address: "",
      otp,
      country: registerForm.values.countryCode,
      // captcha: registerCaptcha,
    };
    // console.log("submit values", registerRequestData);
    const result = await axiosInstance({
      url: "/user/register",
      method: "POST",
      data: registerRequestData,
    });
    const { data } = result;
    // @ts-ignore
    if (data.success) toast(`Register Success`);
    if (!data.success) toast(`${data.message}`);
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
    <select
      {...rest}
      value={value}
      onChange={(event) => {
        onChange(event.target.value || undefined);
      }}
      className="mt-2 py-3 w-[350px] h-auto px-4 rounded-xl placeholder:text-[#A8A8A8] appearance-none text-white font-Magra font-bold"
      style={{
        background: `url(image/InputBox.png) no-repeat `,
      }}
    >
      <option disabled selected value="">
        {placeholder}
      </option>
      {getCountries().map((country) => (
        <option key={country} value={country} className="text-white">
          {labels[country]}
        </option>
      ))}
    </select>
  );

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
                        value={registerForm.values.referralCode || ''}
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
                  {/* <ReCAPTCHA
                    sitekey={CAPTCHA_KEY}
                    onChange={(e: any) => verifiedRegisterCallback(e as string)}
                  /> */}
                  <input
                    alt="btnRegister"
                    type="image"
                    src={"image/BtnConfirmRegister.png"}
                    disabled={!registerCheckbox}
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
                  <input
                    alt="Register Submit"
                    type={"image"}
                    src={"image/BtnSubmit.png"}
                    onClick={registerHandler}
                    // disabled={registerCaptcha.length === 0}
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
                    className="mt-12 px-3.5 py-2.5 text-sm"
                  // disabled={captcha.length === 0}
                  />
                  {/* <ReCAPTCHA
                    sitekey={CAPTCHA_KEY}
                    onChange={(e: any) => verifiedCallback(e as string)}
                  /> */}
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {googleAuthVisible && scene === "HOME" && (
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
                    onClick={() => setGoogleAuthVisible(false)}
                  />
                </div>
                <img
                  src={googleAuthData?.qr}
                  width={177}
                  height={177}
                  alt="2FA QR"
                />
                <p className="font-Magra text-white">
                  Secret : {googleAuthData?.secret}
                </p>
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
                overflow: 'auto'
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
                {/* {userData.tf_ticket && */}
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
                {/* } */}
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
                    // src={"image/BtnConfirm.png"}
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
                          alert("Buy Ticket Confirmed");
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
                    className="bg-green-500 text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    disabled={buyWithBonus && GAValue.length < 6}
                  >
                    {buyWithBonus
                      ? "Buy with Bonus"
                      : ticketAllowance &&
                        ticketAllowance.toBigInt() < BigInt(usd * 1e18)
                        ? "Approval"
                        : "Buy Ticket"}
                  </button>
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
                        console.log('transfer ticket', response.data);
                        if (response.data.success) {
                          toast('Ticket Transfer Success')
                          getUserData()
                          setTicketPanel({ show: false, mode: 'BUY' })
                          setGAValue('')
                        }
                        else if (!response.data.success) toast(response.data.message)
                      }
                    }}
                    className="bg-green-500 text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
                      var formattedTime = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
                      return (
                        <tr className="text-white text-center">
                          <td>{formattedTime}</td>
                          <td className={`${t.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>{t.amount < 0 ? 'OUT' : 'IN'}</td>
                          <td className={`${t.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>{t.amount}</td>
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
      <div>
        <Stage
          ref={stageRef}
          width={appWidth}
          height={appHeight}
          options={options}
          // raf={true}
          // renderOnComponentChange={true}
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
              />
            </>
          )}
          {scene === "GAMEGUIDE" && (
            <>
              <GameGuide
                onBackBtnClick={() => {
                  changeScene("PROFILE");
                }}
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
