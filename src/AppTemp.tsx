/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import {
  useEtherBalance,
  useEthers,
  // BSC,
  BSCTestnet,
  // useToken,
  useContractFunction,
  useTokenBalance,
  useTokenAllowance,
  useSendTransaction,
  useTransactions,
  useNotifications,
} from "@usedapp/core";
import * as PIXI from "pixi.js";
import { Stage } from "@pixi/react";
import { useState, useEffect, useCallback, useRef } from "react";
import Marquee from "react-fast-marquee";
import BigNumber from "bignumber.js";
import { axiosInstance } from "./utils/api";
// import { getCountries } from "react-phone-number-input/input";
// import en from "react-phone-number-input/locale/en.json";
// @ts-ignore
// import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js'
import { formatEther, formatUnits } from "@ethersproject/units";
import { Lightbox } from "react-modal-image";
import Home from "./components/scene/Home";
import Register from "./components/scene/Register";
import Loading from "./components/scene/Loader";
import ProfileTemp from "./components/scene/ProfileTemp";
import Album from "./components/scene/Album";
import JPass from "./components/scene/JPass";

import DinoCenter from "./components/scene/DinoCenter";

import { useAuthStore, useStore } from "./utils/store";
import {
  TOKEN_ADDR,
  PAYGATEWAY_ADDR,
  TICKET_ADDR,
  TOKEN_ABI,
  CAPTCHA_KEY,
  COUNTRIESLABEL,
  COUNTRIES,
  USDT_ADDR,
  // EXCHANGE_ADDR,
  USDT_ABI,
  // EXCHANGE_ABI,
  DEPO_ADDR,
} from "./utils/config";
import { Contract, ethers } from "ethers";
// import ReCAPTCHA from "react-google-recaptcha";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Select,
  Option,
} from "@material-tailwind/react";
import JurassicMarket from "./pages/JurassicMarket";
import { Buddies } from "./pages/Buddies";
import { History } from "./pages/History";
import { Bulletin } from "./pages/Bulletin";
// import useAudio from "./utils/hooks/useAudio";
import { formatToUTC } from "./utils/functions";
import { manifest } from "./assets";
import { useSocket } from "./utils/hooks/useWebSocket";
import ReactPaginate from "react-paginate";
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
    ethereum: any;
  }
}

const price = 0.25;
// const dnfPrice = 1;
// const BASE_URL = "https://cdn.jurassicegg.co";
export const AppTemp = () => {
  const socket = useSocket();

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
  const walletBalance = useStore((state) => state.walletBalance);
  // console.log("walletBalance", walletBalance);
  const setWalletBalance = useStore((state) => state.setWalletBalance);
  // const approved = useStore((state) => state.approved);
  const setApproved = useStore((state) => state.setApproved);
  const setEggPendingListData = useStore(
    (state) => state.setEggPendingListData
  );
  const eggTransactionState = useStore((state) => state.eggTransactionState);
  const setEggTransactionState = useStore(
    (state) => state.setEggTransactionState
  );
  const ticketPanel = useStore((state) => state.ticketPanel);
  const setTicketPanel = useStore((state) => state.setTicketPanel);
  const swapPanel = useStore((state) => state.swapPanel);
  const setSwapPanel = useStore((state) => state.setSwapPanel);
  // const swapTxHash = useStore((state) => state.swapTxHash);
  // const setSwapTxHash = useStore((state) => state.setSwapTxHash);
  const withdrawPanel = useStore((state) => state.withdrawPanel);
  const setWithdrawPanel = useStore((state) => state.setWithdrawPanel);
  const gameTaskPanel = useStore((state) => state.gameTaskPanel);
  const setGameTaskPanel = useStore((state) => state.setGameTaskPanel);
  const jPassPanel = useStore((state) => state.jPassPanel);
  // console.log("jPassPanel", jPassPanel);
  // jPassPanel?.data?.price > 0 &&
  //   console.log("jPassPanel price", BigInt(jPassPanel?.data?.price * 1e18));
  const setJPassPanel = useStore((state) => state.setJPassPanel);
  const changePasswordPanel = useStore((state) => state.changePasswordPanel);
  const setChangePasswordPanel = useStore(
    (state) => state.setChangePasswordPanel
  );
  const googleAuthPanel = useStore((state) => state.googleAuthPanel);
  const setGoogleAuthPanel = useStore((state) => state.setGoogleAuthPanel);
  const withdrawalHistory = useStore((state) => state.withdrawalHistory);
  const setUSDTWithdrawalHistory = useStore(
    (state) => state.setUSDTWithdrawalHistory
  );
  const USDTWithdrawalHistory = useStore(
    (state) => state.USDTWithdrawalHistory
  );
  const setDNFWithdrawalHistory = useStore(
    (state) => state.setDNFWithdrawalHistory
  );
  const DNFWithdrawalHistory = useStore((state) => state.DNFWithdrawalHistory);
  const notification = useStore((state) => state.notification);
  const setNotification = useStore((state) => state.setNotification);
  const setEggListsData = useStore((state) => state.setEggListsData);
  const eggListFilter = useStore((state) => state.eggListFilter);
  // console.log("notification text", notification);
  // const cardDetails = useStore((state) => state.cardDetails);
  // const eggListsData = useStore((state) => state.eggListsData);
  // console.log("googleAuthPanel", googleAuthPanel);
  // const usdtInfo = useToken(TOKEN_ADDR);
  const usdtBalance = useTokenBalance(USDT_ADDR, account);
  const dnfBalance = useTokenBalance(TOKEN_ADDR, account);
  const tokenBalance = useTokenBalance(
    "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
    account
  );
  const etherBalance = useEtherBalance(account, {
    chainId: BSCTestnet.chainId,
  });
  const mainnetBalance = useEtherBalance(account, {
    chainId: BSCTestnet.chainId,
  });
  const testnetBalance = useEtherBalance(account, {
    chainId: BSCTestnet.chainId,
  });
  const allowance = useTokenAllowance(
    TOKEN_ADDR,
    walletAddress,
    PAYGATEWAY_ADDR
  );
  // console.log("egg allowance", allowance);
  const ticketAllowance = useTokenAllowance(
    TOKEN_ADDR,
    walletAddress,
    TICKET_ADDR
  );
  const USDTContract = new Contract(USDT_ADDR, USDT_ABI);
  const SwapContract = new Contract(TOKEN_ADDR, TOKEN_ABI);
  const { state: stateUSDTDepositApproval, send: sendUSDTDepositApproval } =
    useContractFunction(USDTContract, "approve", {
      transactionName: "USDT Deposit Approval",
    });

  const {
    sendTransaction: sendUSDTDeposit,
    state: sendUSDTDepositState,
    resetState: resetSendUSDTDepositState,
  } = useSendTransaction({ transactionName: "USDT Deposit" });
  const {
    sendTransaction: sendDNFDeposit,
    state: sendDNFDepositState,
    resetState: resetSendDNFDepositState,
  } = useSendTransaction({ transactionName: "DNF Deposit" });
  const setMarketListBuy = useStore((state) => state.setMarketListBuy);
  const setMarketListSell = useStore((state) => state.setMarketListSell);
  const setMarketListOpen = useStore((state) => state.setMarketListOpen);
  const setMarketListHistory = useStore((state) => state.setMarketListHistory);
  const marketListBuy = useStore((state) => state.marketListBuy);
  const marketListSell = useStore((state) => state.marketListSell);
  const marketListOpen = useStore((state) => state.marketListOpen);
  const marketListHistory = useStore((state) => state.marketListHistory);

  useEffect(() => {
    if (
      sendUSDTDepositState &&
      sendUSDTDepositState.transaction &&
      sendUSDTDepositState.status === "Success" &&
      ticketAllowance
    ) {
      // checkValidateTx(sendUSDTDepositState.transaction.hash);
      resetSendUSDTDepositState();
    }
    // console.log("sendUSDTDepositState", sendUSDTDepositState);
    if (sendUSDTDepositState.status === "Exception") {
      toast(sendUSDTDepositState.errorMessage);
      resetSendUSDTDepositState();
      setDepositState("");
    }
  }, [sendUSDTDepositState]);

  const { state: stateDNFDepositApproval, send: sendDNFDepositApproval } =
    useContractFunction(SwapContract, "approve", {
      transactionName: "DNF Deposit Approval",
    });
  const usdtDepositAllowance = useTokenAllowance(
    USDT_ADDR,
    walletAddress,
    DEPO_ADDR
  );
  const dnfDepositAllowance = useTokenAllowance(
    TOKEN_ADDR,
    walletAddress,
    DEPO_ADDR
  );

  // console.log(
  //   "usdtDepositAllowance",
  //   usdtDepositAllowance && BigInt(usdtDepositAllowance.toString())
  // );

  // console.log(
  //   "swapAllowance",
  //   swapAllowance && BigInt(swapAllowance.toString())
  // );
  const [otpIntervalId, setOtpIntervalId] = useState<any>(60);
  const [otpInterval, setOtpInterval] = useState(5);
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRetypePasswordVisible, setIsRetypePasswordVisible] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [registerCaptcha, setRegisterCaptcha] = useState("");
  const [forgotPasswordCaptcha, setForgotPasswordCaptcha] = useState("");
  const [ticketHistories, setTicketHistories] = useState([]);
  const [ticketState, setTicketState] = useState("");
  const [depositState, setDepositState] = useState("");
  // const [withdrawState, setWithdrawState] = useState("");
  const [buyAmount, setBuyAmount] = useState("1");
  const [sellAmount, setSellAmount] = useState("1");
  const [buyPrice, setBuyPrice] = useState("1");
  const [sellPrice, setSellPrice] = useState("1");
  const [buyUSDTAmount, setBuyUSDTAmount] = useState("1");
  const [sellUSDTAmount, setSellUSDTAmount] = useState("1");
  const [jPassState, setJPassState] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  // const [googleAuthPanel, setGoogleAuthPanel] = useState(false);
  const [googleAuthData, setGoogleAuthData] = useState<{
    qr: string;
    secret: string;
  } | null>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [buddiesHistories, setBuddiesyHistories] = useState<{ username: string, data: { username: string, bought: string, dl_bought: string, regdate: number }[] }[]>([])
  // const [buddiesHistories, setBuddiesyHistories] = useState<string[]>([])
  // console.log('buddiesHistories', buddiesHistories)
  const [banner, setBanner] = useState<string | null>("");
  // console.log("banner", banner);
  const [sponsor, setSponsor] = useState<string | null | undefined>("");
  const {
    sendTransaction,
    state: sendTransactionState,
    resetState: resetSendTransactionState,
  } = useSendTransaction({ transactionName: "Egg Approval" });
  const {
    sendTransaction: sendTransactionPay,
    state: sendTransactionPayState,
    // resetState: resetSendTransactionPayState,
  } = useSendTransaction({ transactionName: "Egg Pay" });

  const countBuyUsdt = (amount: string, price: any) => {
    if (!amount) amount = "0";
    let namount = new BigNumber(amount);
    setBuyUSDTAmount(namount.mul(price).toFixed(6));
  };
  const countSellUsdt = (amount: string, price: any) => {
    if (!amount) amount = "0";
    let namount = new BigNumber(amount);
    setSellUSDTAmount(namount.mul(price).toFixed(6));
  };
  // const period = formatUnits(userData?.bought.period, 18);
  // const group = formatUnits(userData?.bought.group, 18);
  // const total = formatUnits(userData?.bought.total, 18);
  // const progress = (parseInt(group) / parseInt(total)) * 100;

  const transactionList = useTransactions();
  const { notifications } = useNotifications();

  async function loadAnimationAssets() {
    await PIXI.Assets.init({ manifest: manifest });
    // initialize assets that have big size
    const bundleIds = manifest.bundles
      .filter((bundle) => {
        return ["Animations"].includes(bundle.name);
      })
      .map((bundle) => bundle.name);

    // load asset in background
    const loadBgBundle = await PIXI.Assets.backgroundLoadBundle(bundleIds);
    const loadBundle = await PIXI.Assets.loadBundle(bundleIds);
    console.log("loadBgBundle", loadBgBundle);
    console.log("loadBundle", loadBundle);
  }

  const getEggList = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const data: any = await axiosInstance({
      url: `/egg/lists?page=${eggListFilter?.page}&sort=${eggListFilter?.sortby}&order=${eggListFilter?.orderby}`,
      method: "GET",
      headers: options.headers,
    });
    // console.log("getEggList Result:", data);
    if (data?.status === 200 && data?.data?.result?.lists) {
      setEggListsData(data?.data?.result);
    }
  };

  const getUSDTWithdrawHistory = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const { data }: any = await axiosInstance({
      url: "/wallet/usdt/history",
      method: "GET",
      headers: options.headers,
      params: {
        page: 1,
      },
    });
    console.log("getUSDTWithdrawHistory Result:", data);
    if (data?.success) {
      setUSDTWithdrawalHistory(data?.result);
    } else {
      toast(data.message);
    }
  };

  const getDNFWithdrawHistory = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const { data }: any = await axiosInstance({
      url: "/wallet/dnf/history",
      method: "GET",
      headers: options.headers,
      params: {
        page: 1,
      },
    });
    console.log("getDNFWithdrawHistory Result:", data);
    if (data?.success) {
      setDNFWithdrawalHistory(data?.result);
    } else {
      toast(data.message);
    }
  };

  const getMarketListBuy = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const resp: any = await axiosInstance({
      url: `/market/list-buy`,
      method: "GET",
      headers: options.headers,
    });
    // console.log("getEggList Result:", data);
    if (resp.data.success) {
      setMarketListBuy(resp.data.result);
    }
  };
  const getMarketListSell = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const { data }: any = await axiosInstance({
      url: "/market/list-sell",
      method: "GET",
      headers: options.headers,
    });
    console.log("market sell Result:", data);
    if (data?.success) {
      setMarketListSell(data.result);
    } else {
      toast(data.message);
    }
  };

  const getMarketListOpen = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const { data }: any = await axiosInstance({
      url: "/market/open",
      method: "GET",
      headers: options.headers,
    });
    console.log("market open Result:", data);
    if (data?.success) {
      setMarketListOpen(data.result);
    } else {
      toast(data.message);
    }
  };

  const getMarketListHistory = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const { data }: any = await axiosInstance({
      url: "/market/history",
      method: "GET",
      headers: options.headers,
    });
    console.log("market history Result:", data);
    if (data?.success) {
      setMarketListHistory(data.result);
    } else {
      toast(data.message);
    }
  };
  const onMessage = useCallback(
    (message: any) => {
      const pingWebSocket = async () => {
        var x = setInterval(() => {
          socket.send(
            JSON.stringify({
              event: "ping",
            })
          );
          clearInterval(x);
          pingWebSocket();
        }, 30000);
      };

      const wsresp = JSON.parse(message?.data);
      // console.log(wsresp);
      if (wsresp.event === "connection_established") {
        console.log("connection_established", token);
        // if (token) {
        socket.send(
          JSON.stringify({
            event: "subscribe",
            token: token,
          })
        );
        // }
        pingWebSocket();
      }
      if (wsresp.event === "notification") {
        toast(`💌 ${wsresp.data.message}`);
        setNotification(wsresp?.data?.message);
        getUserData();
        getEggList();
      }

      console.log("wsresp egg", wsresp);
      if (wsresp.event === "egg_sold") {
        console.log("egg_sold");
        getEggList();
      }
      if (wsresp.event === "market_update") {
        console.log("market_update");
        getUserData();
        getMarketListBuy();
        getMarketListSell();
        getMarketListOpen();
        getMarketListHistory();
      }
    },
    [
      socket,
      getEggList,
      getMarketListBuy,
      getMarketListSell,
      getMarketListOpen,
      getMarketListHistory,
      token,
    ]
  );

  const initialize = async () => {
    if (token) {
      try {
        let options = {
          headers: {
            "my-auth-key": token,
          },
        };
        // console.log(options);
        // const response = await axios.get(API_ENDPOINT + '/user/getUserData', options);
        const response: any = await axiosInstance({
          url: "/user/getUserData",
          method: "GET",
          headers: options.headers,
        });
        console.log(response.data);
        setUserData(response.data.result);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    console.log("TOKEN CHANGED", token);
    if (!userData) initialize();
    // if(!notification) notificate();
    socket.addEventListener("message", onMessage);
    return () => {
      socket.removeEventListener("message", onMessage);
    };
  });

  useEffect(() => {
    if (authMode === "LOGIN" || scene === "HOME") loadAnimationAssets();
  }, []);

  useEffect(() => {
    if (sendTransactionPayState.status === "Success") {
      console.log("sendTransactionPayState", sendTransactionPayState);
      setEggTransactionState({ mode: "DONE", state: "" });
    }
    if (sendTransactionPayState.status === "Exception") {
      setEggTransactionState({ ...eggTransactionState, state: "" });
    }
  }, [sendTransactionPayState]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log("ref", params.get("ref"));
    if (params.get("ref")) {
      setSponsor(params.get("ref"));
      registerForm.setFieldValue("referralCode", params.get("ref"));
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

  const getUnfinishedEggTransaction = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const { data }: any = await axiosInstance({
      url: "/egg/unfinished",
      method: "GET",
      headers: options.headers,
    });
    console.log("get unfinished egg transaction Result:", data);
    if (data?.success) {
      // processTransaction(id, ticket);
      // setUnfinishedTransaction(data?.result);
      if (data?.result)
        toast("You still have unfinished transaction on your listing");
    } else {
      toast(data.message);
    }
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
      const banner = await axiosInstance({
        url: "/news/announcement",
        method: "GET",
        headers: getUserDataOptions.headers,
      });
      console.log("result banner ", banner.data.result);
      if (banner.data.result && banner.data.result.image) {
        setBanner(banner.data.result);
      }
    }
  };

  const ShowBanner = (props: any) => {
    const default_open = sessionStorage.getItem("banner_open")
      ? sessionStorage.getItem("banner_open") === "true"
      : true;
    const [open, setOpen] = useState(default_open);
    console.log("state ", default_open);
    const closeLightbox = () => {
      setOpen(false);
      sessionStorage.setItem("banner_open", "false");
    };

    return open ? (
      <Lightbox
        medium={props.image.image}
        hideDownload={true}
        hideZoom={true}
        showRotate={false}
        // @ts-ignore
        onClose={closeLightbox}
      />
    ) : null;
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

  console.log("jPassPanel", jPassPanel);

  useEffect(() => {
    if (token) getTicketHistories();
  }, [ticketPanel.show, token]);

  console.log("ticketHistories", ticketHistories);

  const {
    sendTransaction: sendTicketBuy,
    state: sendTicketBuyState,
    resetState: resetSendTicketBuyState,
  } = useSendTransaction({ transactionName: "Ticket Buy" });

  const { state, send } = useContractFunction(SwapContract, "approve", {
    transactionName: "Ticket Approval",
  });

  const { state: JPassApprovalState, send: JPassApprovalSend } =
    useContractFunction(SwapContract, "approve", {
      transactionName: "JPass Approval",
    });

  const {
    sendTransaction: sendJPassBuy,
    state: sendJPassBuyState,
    resetState: resetSendJPassBuyState,
  } = useSendTransaction({ transactionName: "JPass Buy" });

  const { state: eggApprovalState, send: sendEggApproval } =
    useContractFunction(SwapContract, "approve", {
      transactionName: "Egg Approval",
    });

  console.log("eggApprovalState", eggApprovalState);

  console.log("contractFunction state", state);

  useEffect(() => {
    toast(state.errorMessage);
  }, [state.errorMessage]);

  useEffect(() => {
    toast(JPassApprovalState.errorMessage);
  }, [JPassApprovalState.errorMessage]);

  useEffect(() => {
    toast(stateDNFDepositApproval.errorMessage);
  }, [stateDNFDepositApproval.errorMessage]);

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
  // const [dnf, setDnf] = useState(dnfPrice);
  // const [dnfQty, setDnfQty] = useState<number | string>(1);
  const [qty, setQty] = useState<number | string>(1);
  const [transferUsername, setTransferUsername] = useState("");
  const [transferQty, setTransferQty] = useState(1);
  const [GAValue, setGAValue] = useState("");
  const [USDTDepositAmount, setUSDTDepositAmount] = useState(0);
  const [USDTWithdrawAmount, setUSDTWithdrawAmount] = useState(0);
  const [USDTWithdrawAddress, setUSDTWithdrawAddress] = useState("");
  const [DNFDepositAmount, setDNFDepositAmount] = useState(0);
  const [DNFWithdrawAmount, setDNFWithdrawAmount] = useState(0);
  const [DNFWithdrawAddress, setDNFWithdrawAddress] = useState("");
  // const [countryCodeValue, setCountryCodeValue] = useState();
  const [buyWithBonus, setBuyWithBonus] = useState(false);

  console.log(
    "usd",
    usd && BigInt(usd * 1e18),
    "ticketAllowance",
    ticketAllowance && BigInt(ticketAllowance.toString())
  );
  // console.log(
  //   "usd",
  //   usd && BigInt(usd * 1e18),
  //   "dnf",
  //   dnf && BigInt(dnf * 1e18)
  // );
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

  // const changeSwapQuantity = (e: any) => {
  //   let psx = e.target.value;
  //   if (psx > 10000) psx = 10000;
  //   console.log("dnf psx", psx);
  //   setDnfQty(psx);
  //   if (psx < 0) psx = 0;
  //   let total_dnf = psx * dnfPrice;
  //   setDnf(total_dnf);
  //   // setUsd(total_dnf);
  // };

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
    console.log("sendTransactionState", sendTransactionState);
    if (sendTransactionState.status === "Success" && allowance) {
      console.log("allowance appTemp", allowance);
      setApproved(allowance.toString());
      setEggTransactionState({ mode: "PURCHASE", state: "" });
      resetSendTransactionState();
    }
    if (sendTransactionState.status === "Exception") {
      setEggTransactionState({ ...eggTransactionState, state: "" });
    }
  }, [sendTransactionState, allowance]);

  useEffect(() => {
    if (allowance) setApproved(allowance.toString());
    // resetSendTransactionState();
  }, [allowance]);

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
          setTicketState("");
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

  const checkJPassValidateTx = (hash: string) => {
    console.log("checkJPassValidateTx", hash);
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    axiosInstance({
      url: "/item/validate",
      method: "POST",
      headers: options.headers,
      data: {
        hash: hash,
      },
    })
      .then((response) => {
        // console.log(response.data);
        if (response.data.result === 1) {
          toast("Buy JPass Confirmed");
          setJPassState("");
          setJPassPanel({ show: false, data: null });
          changeScene("HOME");
          getUserData();
        } else {
          setTimeout(() => checkJPassValidateTx(hash), 5000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // axios.post(API_ENDPOINT + '/ticket/validate', { hash: hash }, options)
  };
  const getPendingListingEgg = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const { data }: any = await axiosInstance({
      url: "/egg/pendingListing",
      method: "GET",
      headers: options.headers,
    });
    console.log("get pendingListing egg Result:", data);
    if (data?.success) {
      setEggPendingListData(data?.result);
    } else {
      toast(data.message);
    }
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
    // console.log("sendTicketBuyState", sendTicketBuyState);
    if (sendTicketBuyState.status === "Exception") {
      toast(sendTicketBuyState.errorMessage);
      resetSendTicketBuyState();
      setTicketState("");
    }
  }, [sendTicketBuyState]);

  useEffect(() => {
    if (
      sendDNFDepositState &&
      sendDNFDepositState.transaction &&
      sendDNFDepositState.status === "Success"
    ) {
      // checkValidateTx(sendDNFDepositState.transaction.hash);
      resetSendDNFDepositState();
    }
    // console.log("sendDNFDepositState", sendDNFDepositState);
    if (sendDNFDepositState.status === "Exception") {
      toast(sendDNFDepositState.errorMessage);
      resetSendDNFDepositState();
    }
  }, [sendDNFDepositState]);

  useEffect(() => {
    toast(stateUSDTDepositApproval.errorMessage);
  }, [stateUSDTDepositApproval.errorMessage]);

  useEffect(() => {
    toast(sendDNFDepositState.errorMessage);
  }, [sendDNFDepositState.errorMessage]);

  useEffect(() => {
    if (
      sendJPassBuyState &&
      sendJPassBuyState.transaction &&
      sendJPassBuyState.status === "Success" &&
      ticketAllowance
    ) {
      // checkValidateTx(sendJPassBuyState.transaction.hash);
      resetSendJPassBuyState();
    }
    // console.log("sendJPassBuyState", sendJPassBuyState);
    if (sendJPassBuyState.status === "Exception")
      toast(sendJPassBuyState.errorMessage);
  }, [sendJPassBuyState]);

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
    // console.log(result.data);
    if (result.data.result === 1) {
      toast("Egg Transaction Confirmed");
      setEggTransactionState({ mode: "DONE", state: "" });
      getPendingListingEgg();
      getUserData();
      changeScene("HOME");
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
    else if (
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
      sessionStorage.setItem("banner_open", "true");
      if (token) {
        socket.send(
          JSON.stringify({
            event: "subscribe",
            token: token,
          })
        );
      }
      // window.location.reload()
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
      setOtpIntervalId(
        setInterval(() => {
          setOtpInterval((prev) => prev - 1);
        }, 1000)
      );
    },
  });
  useEffect(() => {
    console.log("otpIntervalId", otpIntervalId);
    if (otpInterval <= 0) {
      console.log("clearInterval", otpIntervalId);
      clearInterval(otpIntervalId);
      setOtpInterval(60);
      otpForm.setSubmitting(false);
    }
  }, [otpInterval, otpIntervalId]);

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
            forgotPasswordRechaptchaRef?.current?.resetCaptcha();
          }
        }
        if (!data.success) {
          toast(`${forgotPasswordResult}`);
          setForgotPasswordCaptcha("");
          if (forgotPasswordRechaptchaRef?.current) {
            // console.log('forgotPasswordRechaptchaRef?.current', forgotPasswordRechaptchaRef?.current)
            // @ts-ignore
            forgotPasswordRechaptchaRef?.current?.resetCaptcha();
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
    if (dnfBalance) {
      const balance = formatUnits(dnfBalance, 18);
      console.log("dnfBalance", balance);
      setWalletBalance(balance);
    }
    if (usdtBalance) {
      const usdt = formatUnits(usdtBalance, 18);
      console.log("usdtBalance", usdt);
    }
  }, [setWalletBalance, dnfBalance, usdtBalance]);

  useEffect(() => {
    getPendingListingEgg();
    getUserData();
  }, [token]);

  useEffect(() => {
    if (scene === "HOME") getUnfinishedEggTransaction();
  }, [scene]);

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
      url: "/user/authentication2",
      method: "POST",
      data: loginRequestData,
    });

    const { data } = result;
    if (!data.success) {
      toast(`${data.message}`);
      if (loginRechaptchaRef?.current) {
        // console.log('loginRechaptchaRef?.current', loginRechaptchaRef?.current)
        // @ts-ignore
        loginRechaptchaRef?.current?.resetCaptcha();
      }
    }
    if (data && data.result) {
      saveToken(data.result?.jwt);
      localStorage.setItem("token_key", data?.result?.jwt);
      setCaptcha("");
      if (loginRechaptchaRef?.current) {
        // console.log('loginRechaptchaRef?.current', loginRechaptchaRef?.current)
        // @ts-ignore
        loginRechaptchaRef?.current?.resetCaptcha();
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
        registerRechaptchaRef?.current?.resetCaptcha();
      }
    }
    if (!data.success) {
      toast(`${data.message}`);
      setRegisterCaptcha("");
      if (registerRechaptchaRef?.current) {
        // console.log('registerRechaptchaRef?.current', registerRechaptchaRef?.current)
        // @ts-ignore
        registerRechaptchaRef?.current?.resetCaptcha();
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

  const CountrySelect = useCallback(
    ({ value, onChange, placeholder, labels, ...rest }: any) => (
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
        {COUNTRIES.map((country) => (
          <Option key={country} value={country} className="text-black">
            {labels[country]}
          </Option>
        ))}
      </Select>
    ),
    []
  );

  const [openGameGuide, setOpenGameGuide] = useState(0);
  function IconGameGuide({ id, open }: any) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? "rotate-180" : ""
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
  //   const ticketAllowance = useTokenAllowance(TOKEN_ADDR, walletAddress, TICKET_ADDR)
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
  //     //   abi: TOKEN_ABI,
  //     //   address: TOKEN_ADDR,
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

  const [toggleBtnAudio, setToggleBtnAudio] = useState(false);
  // const [playing, toggle] = useAudio(`${BASE_URL}/music/dinomusic.ogg`);

  // useEffect(() => {
  //   // @ts-ignore
  //   toggle()
  // }, [toggleBtnAudio])

  const getEncodeData = async (type: "USDT" | "DNF") => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const response = await axiosInstance({
      url: `/wallet/${type.toLowerCase()}/deposit`,
      method: "POST",
      headers: options.headers,
      data: {
        amount: type === "USDT" ? USDTDepositAmount : DNFDepositAmount,
      },
    });
    if (response.data.success) {
      // console.log(response.data.result);
      return response.data.result;
    }
    return false;
  };

  const paginateUSDTDepositHistory = ({ selected }: { selected: number }) => {
    const loadHistory = async (props: any) => {
      let options = {
        headers: {
          "my-auth-key": token,
        },
      };
      const response = await axiosInstance({
        url: "/wallet/usdt/history",
        params: {
          page: props,
        },
        method: "GET",
        headers: options.headers,
      });
      setUSDTWithdrawalHistory(response.data.result);
    };
    loadHistory(selected + 1);
  };
  const paginateDNFDepositHistory = ({ selected }: { selected: number }) => {
    const loadHistory = async (props: any) => {
      let options = {
        headers: {
          "my-auth-key": token,
        },
      };
      const response = await axiosInstance({
        url: "/wallet/dnf/history",
        params: {
          page: props,
        },
        method: "GET",
        headers: options.headers,
      });
      setDNFWithdrawalHistory(response.data.result);
    };
    loadHistory(selected + 1);
  };
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
                src={`image/BtnAudio${toggleBtnAudio ? "On" : "Off"}.png`}
                width={60}
                height={60}
                alt="Audio"
                onClick={() => {
                  // @ts-ignore
                  toggle();
                  setToggleBtnAudio(!toggleBtnAudio);
                }}
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
                      <p className="text-red-500 ml-2 font-bold font-magra max-w-[350px]">
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
                  <HCaptcha
                    ref={loginRechaptchaRef}
                    sitekey={CAPTCHA_KEY}
                    onVerify={(e: any) => verifiedCallback(e as string)}
                  />
                  <input
                    alt="btnLogin"
                    type={"image"}
                    src={"image/BtnConfirm.png"}
                    onClick={loginForm.submitForm}
                    className={`${
                      captcha?.length === 0 ? "opacity-50" : ""
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
                          labels={COUNTRIESLABEL}
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
                        placeholder="Referral"
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
                    className={`${
                      !registerCheckbox ? "opacity-50" : ""
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
                        className={`absolute right-[20px] top-[15px] font-Magra font-bold ${
                          otpForm?.isSubmitting
                            ? "text-[#00C2FF]/50"
                            : "text-[#00C2FF]"
                        } hover:cursor-pointer`}
                        type="button"
                        disabled={otpForm.isSubmitting}
                        onClick={otpForm.submitForm}
                      >
                        Request OTP{" "}
                        {`${otpForm.isSubmitting ? `: ${otpInterval}S` : ""}`}
                      </button>
                    </div>
                  </form>
                  <HCaptcha
                    ref={registerRechaptchaRef}
                    sitekey={CAPTCHA_KEY}
                    onVerify={(e: any) => verifiedRegisterCallback(e as string)}
                  />
                  <input
                    alt="Register Submit"
                    type={"image"}
                    src={"image/BtnSubmit.png"}
                    onClick={registerHandler}
                    disabled={registerCaptcha?.length === 0}
                    className={`${
                      registerCaptcha?.length === 0 ? "opacity-50" : ""
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
                    className={`${
                      loginWalletForm.values.walletAddress.length === 0
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
                  <HCaptcha
                    ref={forgotPasswordRechaptchaRef}
                    sitekey={CAPTCHA_KEY}
                    onVerify={(e: any) =>
                      verifiedForgotPasswordCallback(e as string)
                    }
                  />
                  <input
                    alt="Forgot Password Submit"
                    type={"image"}
                    src={"image/BtnSubmit.png"}
                    onClick={forgotPasswordForm.submitForm}
                    disabled={forgotPasswordCaptcha?.length === 0}
                    className={`${
                      forgotPasswordCaptcha?.length === 0 ? "opacity-50" : ""
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
                  className={`${
                    ticketPanel.mode === "BUY" ? "text-blue-500" : "text-white"
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
                    className={`${
                      ticketPanel.mode === "TRANSFER"
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
                  className={`${
                    ticketPanel.mode === "HISTORY"
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
                      <p className="text-white font-Magra my-3">Total DNF</p>
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
                  {ticketState !== "LOADING" && (
                    <button
                      type={"submit"}
                      // disabled={}
                      onClick={async () => {
                        console.log("usd amount approval", usd);
                        setTicketState("LOADING");
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
                            setTicketState("");
                            toast("Buy Ticket Confirmed");
                            getUserData();
                          } else alert(response.data.message);
                        } else if (!buyWithBonus) {
                          if (parseFloat(walletBalance) >= usd) {
                            if (
                              ticketAllowance &&
                              ticketAllowance.toBigInt() < BigInt(usd * 1e18)
                            ) {
                              // const txReq = { value: BigInt(usd * 1e18) }
                              const txSend = await send(
                                TICKET_ADDR,
                                BigInt(usd * 1e18)
                              );
                              setTicketState("");
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
                          } else {
                            setTicketState("");
                            toast("Your balance is not enough to buy ticket!");
                          }
                        }
                      }}
                      className={`${
                        buyWithBonus
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
                  )}
                  {ticketState === "LOADING" && (
                    <p className="text-white/50 font-Magra">Waiting...</p>
                  )}
                  {/* {sendTicketBuyState.status !== "None" && (
                    <p className="text-white/50 font-Magra">
                      {sendTicketBuyState.status}
                    </p>
                  )} */}
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
                      // TODO: change with function from utils later
                      const formattedTime = formatToUTC(date);
                      return (
                        <tr className="text-white text-center">
                          <td>{formattedTime}</td>
                          <td
                            className={`${
                              t.amount < 0 ? "text-red-500" : "text-green-500"
                            }`}
                          >
                            {t.amount < 0 ? "OUT" : "IN"}
                          </td>
                          <td
                            className={`${
                              t.amount < 0 ? "text-red-500" : "text-green-500"
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
      {swapPanel.show && scene === "HOME" && (
        <div className="absolute h-[80vh] flex items-start overflow-y-scroll">
          <div className=" my-5 flex backdrop-blur-sm  justify-center items-center flex-col bg-white/10 px-3.5 py-2.5 shadow-sm rounded-sm ">
            <div className="flex w-full justify-end">
              <img
                src="image/logoutBtn.png"
                width={30}
                height={30}
                alt="Close "
                onClick={() => setSwapPanel({ show: false })}
              />
            </div>
            <div
              className="w-[400px] flex justify-start items-center flex-col gap-4 bg-white/50 px-3.5 py-6 shadow-sm rounded-xl "
              style={{
                background: `url(image/formBackground.png) no-repeat `,
                backgroundSize: "cover",
                overflow: "auto",
              }}
            >
              <>
                <div className="flex gap-2 justify-center w-full">
                  <div className="flex gap-2 justify-around w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setGameTaskPanel({
                          ...gameTaskPanel,
                          mode: "MARKET.BUY",
                        })
                      }
                      className={`${
                        gameTaskPanel.mode.includes("MARKET")
                          ? "text-blue-500 border border-blue-500"
                          : "text-white"
                      } w-full font-bold font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                    >
                      Exchanger
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        // setTicketPanel({ ...ticketPanel, mode: "HISTORY" })
                        setGameTaskPanel({
                          ...gameTaskPanel,
                          mode: "DEPOSIT.USDT",
                        })
                      }
                      className={`${
                        gameTaskPanel.mode.includes("DEPOSIT")
                          ? "text-blue-500 border border-blue-500"
                          : "text-white"
                      } w-full font-bold font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                    >
                      Deposit
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 justify-center w-full">
                  {gameTaskPanel.mode.includes("DEPOSIT") && (
                    <div className="flex gap-2 justify-around w-full">
                      <button
                        type="button"
                        onClick={() =>
                          setGameTaskPanel({
                            ...gameTaskPanel,
                            mode: "DEPOSIT.USDT",
                          })
                        }
                        className={`${
                          gameTaskPanel.mode.includes("USDT")
                            ? "text-yellow-500 border border-yellow-500"
                            : "text-white"
                        } w-full font-bold font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      >
                        USDT
                        <br />
                        { userData?.wallet && userData?.wallet?.usdt ? ethers.utils.formatEther(userData?.wallet?.usdt) : '0'}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          // setTicketPanel({ ...ticketPanel, mode: "HISTORY" })
                          setGameTaskPanel({
                            ...gameTaskPanel,
                            mode: "DEPOSIT.DNF",
                          })
                        }
                        className={`${
                          gameTaskPanel.mode.includes("DNF")
                            ? "text-yellow-500 border border-yellow-500"
                            : "text-white"
                        } w-full font-bold font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      >
                        DNF
                        <br />
                        { userData?.wallet && userData?.wallet?.dnf ? ethers.utils.formatEther(userData?.wallet?.dnf) : '0'}
                      </button>
                    </div>
                  )}
                  {gameTaskPanel.mode.includes("MARKET") && (
                    <div className="flex gap-2 justify-around w-full">
                      <button
                        type="button"
                        onClick={() =>
                          setGameTaskPanel({
                            ...gameTaskPanel,
                            mode: "MARKET.BUY",
                          })
                        }
                        className={`${
                          gameTaskPanel.mode.includes("BUY")
                            ? "text-yellow-500 border border-yellow-500"
                            : "text-white"
                        } w-full font-bold font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      >
                        BUY
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          // setTicketPanel({ ...ticketPanel, mode: "HISTORY" })
                          setGameTaskPanel({
                            ...gameTaskPanel,
                            mode: "MARKET.SELL",
                          })
                        }
                        className={`${
                          gameTaskPanel.mode.includes("SELL")
                            ? "text-yellow-500 border border-yellow-500"
                            : "text-white"
                        } w-full font-bold font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      >
                        SELL
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          // setTicketPanel({ ...ticketPanel, mode: "HISTORY" })
                          setGameTaskPanel({
                            ...gameTaskPanel,
                            mode: "MARKET.OPEN",
                          })
                        }
                        className={`${
                          gameTaskPanel.mode.includes("OPEN")
                            ? "text-yellow-500 border border-yellow-500"
                            : "text-white"
                        } w-full font-bold font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      >
                        POSITION
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          // setTicketPanel({ ...ticketPanel, mode: "HISTORY" })
                          setGameTaskPanel({
                            ...gameTaskPanel,
                            mode: "MARKET.HISTORY",
                          })
                        }
                        className={`${
                          gameTaskPanel.mode.includes("HISTORY")
                            ? "text-yellow-500 border border-yellow-500"
                            : "text-white"
                        } w-full font-bold font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      >
                        HISTORY
                      </button>
                    </div>
                  )}
                </div>
                {gameTaskPanel.mode === "MARKET.BUY" && (
                  <>
                    <p className="text-white font-Magra mb-3">Buy List</p>
                    <div className="flex flex-row justify-around text-white w-full">
                      <p>
                        USDT: { userData?.wallet && userData?.wallet?.usdt ? ethers.utils.formatEther(userData?.wallet?.usdt) : '0'}
                      </p>
                      <p>
                        DNF: { userData?.wallet && userData?.wallet?.dnf ? ethers.utils.formatEther(userData?.wallet?.dnf) : '0'}
                      </p>
                    </div>
                    <table className="w-full text-base">
                      <thead className=" uppercase border-y ">
                        <tr className="text-yellow-500 font-Magra">
                          <th scope="col" className="w-[6rem]">
                            Price
                          </th>
                          <th scope="col" className="w-[7rem] pr-1">
                            DNF
                          </th>
                          <th scope="col" className="w-[4rem] py-1">
                            USDT
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {marketListSell?.map((t: any) => {
                          return (
                            <tr className="text-white text-center">
                              <td>{`${parseFloat(
                                formatUnits(t.price, 18)
                              ).toFixed(2)}`}</td>
                              <td
                                className={"text-white text-base text-center"}
                              >{`${parseFloat(formatUnits(t.dnf, 18)).toFixed(
                                2
                              )}`}</td>
                              <td className={`text-white pl-4 text-center`}>
                                {`${parseFloat(formatUnits(t.usdt, 18)).toFixed(
                                  2
                                )}`}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    <form>
                      <div className="flex flex-col">
                        <p className="text-white font-Magra my-3">DNF</p>
                        <input
                          name="amount"
                          type="number"
                          step="0.01"
                          placeholder="DNF"
                          className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          onChange={(e) => {
                            console.log("buy amount", e.target.value);
                            setBuyAmount(e.target.value);
                            countBuyUsdt(e.target.value, buyPrice);
                          }}
                          value={buyAmount}
                          min={0}
                        />
                        <p className="text-white font-Magra my-3">Price</p>
                        <input
                          name="price"
                          type="number"
                          step="0.01"
                          placeholder="Price"
                          className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          onChange={(e) => {
                            setBuyPrice(e.target.value);
                            countBuyUsdt(buyAmount, e.target.value);
                          }}
                          value={buyPrice}
                          min={0}
                        />
                        <p className="text-white font-Magra my-3">USDT</p>
                        <input
                          name="totalPrice"
                          type="number"
                          // placeholder="Password"
                          className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          readOnly
                          // onChange={loginForm.handleChange}
                          // onBlur={loginForm.handleBlur}
                          value={buyUSDTAmount}
                        />
                      </div>
                    </form>
                    <div className="flex flex-row justify-around w-full">
                      <button
                        type={"submit"}
                        // disabled={}
                        onClick={async () => {
                          try {
                            let options = {
                              headers: {
                                "my-auth-key": token,
                              },
                            };
                            const response = await axiosInstance({
                              url: "/market/buy",
                              method: "POST",
                              headers: options.headers,
                              data: {
                                amount: buyAmount,
                                price: buyPrice,
                              },
                            });
                            if (response.data.success) {
                              toast("Post Buy Success");
                            } else
                              toast(
                                response?.data?.message || "Post Buy Error"
                              );
                            console.log(response.data);
                          } catch (error) {
                            console.error(error);
                            toast("Post Buy Error");
                          }
                        }}
                        className={`${
                          parseFloat(buyPrice) <= 0
                            ? "bg-gray-700"
                            : "bg-green-500"
                        }  text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                        disabled={parseFloat(buyPrice) <= 0}
                      >
                        Buy
                      </button>
                    </div>

                  </>
                )}
                {gameTaskPanel.mode === "MARKET.SELL" && (
                  <>
                    <p className="text-white font-Magra mb-3">Sell List</p>
                    <div className="flex flex-row justify-around text-white w-full">
                      <p>
                        USDT: { userData?.wallet && userData?.wallet?.usdt ? ethers.utils.formatEther(userData?.wallet?.usdt) : '0'}
                      </p>
                      <p>
                        DNF: { userData?.wallet && userData?.wallet?.dnf ? ethers.utils.formatEther(userData?.wallet?.dnf) : '0'}
                      </p>
                    </div>
                    <table className="w-full text-base">
                      <thead className=" uppercase border-y ">
                        <tr className="text-yellow-500 font-Magra">
                          <th scope="col" className="w-[6rem]">
                            Price
                          </th>
                          <th scope="col" className="w-[7rem] pr-1">
                            DNF
                          </th>
                          <th scope="col" className="w-[4rem] py-1">
                            USDT
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {marketListBuy?.map((t: any) => {
                          return (
                            <tr className="text-white text-center">
                              <td>{`${parseFloat(
                                formatUnits(t.price, 18)
                              ).toFixed(2)}`}</td>
                              <td
                                className={"text-white text-base text-center"}
                              >{`${parseFloat(formatUnits(t.dnf, 18)).toFixed(
                                2
                              )}`}</td>
                              <td className={`text-white pl-4 text-center`}>
                                {`${parseFloat(formatUnits(t.usdt, 18)).toFixed(
                                  2
                                )}`}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    <form>
                      <div className="flex flex-col">
                        <p className="text-white font-Magra my-3">DNF</p>
                        <input
                          name="amount"
                          type="number"
                          step="0.01"
                          placeholder="DNF"
                          className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          onChange={(e) => {
                            console.log("sell amount", e.target.value);
                            setSellAmount(e.target.value);
                            countSellUsdt(e.target.value, sellPrice);
                          }}
                          value={sellAmount}
                          min={0}
                        />
                        <p className="text-white font-Magra my-3">Price</p>
                        <input
                          name="price"
                          type="number"
                          step="0.01"
                          placeholder="Price"
                          className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          onChange={(e) => {
                            setSellPrice(e.target.value);
                            countSellUsdt(sellAmount, e.target.value);
                          }}
                          value={sellPrice}
                          min={0}
                        />
                        <p className="text-white font-Magra my-3">USDT</p>
                        <input
                          name="totalPrice"
                          type="number"
                          // placeholder="Password"
                          className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          readOnly
                          // onChange={loginForm.handleChange}
                          // onBlur={loginForm.handleBlur}
                          value={sellUSDTAmount}
                        />
                      </div>
                    </form>
                    <div className="flex flex-row justify-around w-full">
                      <button
                        type={"submit"}
                        // disabled={}
                        onClick={async () => {
                          try {
                            let options = {
                              headers: {
                                "my-auth-key": token,
                              },
                            };
                            const response = await axiosInstance({
                              url: "/market/sell",
                              method: "POST",
                              headers: options.headers,
                              data: {
                                amount: sellAmount,
                                price: sellPrice,
                              },
                            });
                            if (response.data.success) {
                              toast("Post Sell Success");
                            } else
                              toast(
                                response.data?.message || "Post Sell Error"
                              );
                            console.log(response.data);
                          } catch (error) {
                            console.error(error);
                            toast("Post Sell Error");
                          }
                        }}
                        className={`${
                          parseFloat(sellPrice) <= 0
                            ? "bg-gray-700"
                            : "bg-red-500"
                        } text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                        disabled={parseFloat(sellPrice) <= 0}
                      >
                        Sell
                      </button>
                    </div>
                  </>
                )}
                {gameTaskPanel.mode === "MARKET.OPEN" && (
                  <>
                    <table className="w-full text-base">
                      <thead className=" uppercase border-y ">
                        <tr className="text-yellow-500 font-Magra">
                          <th scope="col" className="w-[6rem]">
                            Price
                          </th>
                          <th scope="col" className="w-[7rem] pr-1">
                            DNF
                          </th>
                          <th scope="col" className="w-[4rem] py-1">
                            USDT
                          </th>
                          <th scope="col" className="w-[4rem] py-1">
                            POSITION
                          </th>
                          <th scope="col" className="w-[4rem] py-1">
                            ACTION
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {marketListOpen?.map((t: any) => {
                          return (
                            <tr className="text-white text-center">
                              <td>{`${parseFloat(
                                formatUnits(t.price, 18)
                              ).toFixed(2)}`}</td>
                              <td
                                className={"text-white text-base text-center"}
                              >{`${parseFloat(formatUnits(t.dnf, 18)).toFixed(
                                2
                              )}`}</td>
                              <td className={`text-white pl-4 text-center`}>
                                {`${parseFloat(formatUnits(t.usdt, 18)).toFixed(
                                  2
                                )}`}
                              </td>
                              <td
                                className={`${
                                  t.position === "BUY"
                                    ? "text-green-500"
                                    : "text-red-500"
                                } pl-4 text-center`}
                              >
                                {t.position}
                              </td>
                              <td className={`text-white pl-4 text-center`}>
                                <button
                                  className="bg-red-500 text-white px-2 py-1 rounded-sm my-2"
                                  onClick={async () => {
                                    try {
                                      let options = {
                                        headers: {
                                          "my-auth-key": token,
                                        },
                                      };
                                      const response = await axiosInstance({
                                        url: "/market/cancel",
                                        method: "POST",
                                        headers: options.headers,
                                        data: {
                                          id: t.id,
                                        },
                                      });
                                      if (response.data.success) {
                                        toast("Post Cancel Success");
                                        getMarketListOpen();
                                      } else
                                        toast(
                                          response.data?.message ||
                                            "Post Cancel Error"
                                        );
                                      console.log(response.data);
                                    } catch (error) {
                                      console.error(error);
                                      toast("Post Cancel Error");
                                    }
                                  }}
                                >
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </>
                )}
                {gameTaskPanel.mode === "MARKET.HISTORY" && (
                  <>
                    <table className="w-full text-base">
                      <thead className=" uppercase border-y ">
                        <tr className="text-yellow-500 font-Magra">
                          <th scope="col" className="w-[6rem]">
                            Price
                          </th>
                          <th scope="col" className="w-[7rem] pr-1">
                            DNF
                          </th>
                          <th scope="col" className="w-[4rem] py-1">
                            USDT
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {marketListHistory?.map((t: any) => {
                          return (
                            <tr className="text-white text-center">
                              <td>{`${parseFloat(
                                formatUnits(t.price, 18)
                              ).toFixed(2)}`}</td>
                              <td
                                className={"text-white text-base text-center"}
                              >{`${parseFloat(formatUnits(t.dnf, 18)).toFixed(
                                2
                              )}`}</td>
                              <td className={`text-white pl-4 text-center`}>
                                {`${parseFloat(formatUnits(t.usdt, 18)).toFixed(
                                  2
                                )}`}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </>
                )}
                <div className="flex gap-2 justify-center w-full">
                  {gameTaskPanel.mode.includes("DEPOSIT") && (
                    <div className="flex gap-2 justify-around w-full">
                      <button
                        type="button"
                        onClick={() =>
                          setGameTaskPanel({
                            ...gameTaskPanel,
                            mode: `DEPOSIT.${
                              gameTaskPanel.mode.includes("USDT")
                                ? "USDT"
                                : "DNF"
                            }`,
                          })
                        }
                        className={`${
                          gameTaskPanel.mode ===
                          `DEPOSIT.${
                            gameTaskPanel.mode.includes("USDT") ? "USDT" : "DNF"
                          }`
                            ? "text-blue-500"
                            : "text-white"
                        } font-bold font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      >
                        Deposit
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          // setTicketPanel({ ...ticketPanel, mode: "HISTORY" })
                          setGameTaskPanel({
                            ...gameTaskPanel,
                            mode: `DEPOSIT.${
                              gameTaskPanel.mode.includes("USDT")
                                ? "USDT"
                                : "DNF"
                            }.WITHDRAW`,
                          })
                        }
                        className={`${
                          gameTaskPanel.mode ===
                          `DEPOSIT.${
                            gameTaskPanel.mode.includes("USDT") ? "USDT" : "DNF"
                          }.WITHDRAW`
                            ? "text-blue-500"
                            : "text-white"
                        } font-bold font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      >
                        Withdraw
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          // setTicketPanel({ ...ticketPanel, mode: "HISTORY" })
                          setGameTaskPanel({
                            ...gameTaskPanel,
                            mode: `DEPOSIT.${
                              gameTaskPanel.mode.includes("USDT")
                                ? "USDT"
                                : "DNF"
                            }.HISTORY`,
                          })
                        }
                        className={`${
                          gameTaskPanel.mode ===
                          `DEPOSIT.${
                            gameTaskPanel.mode.includes("USDT") ? "USDT" : "DNF"
                          }.HISTORY`
                            ? "text-blue-500"
                            : "text-white"
                        } font-bold font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      >
                        History
                      </button>
                    </div>
                  )}
                </div>
                {gameTaskPanel.mode === "DEPOSIT.USDT" && (
                  <>
                    <form onSubmit={loginForm.handleSubmit}>
                      <div className="flex flex-col">
                        <p className="text-white font-Magra mb-3">
                          Deposit USDT
                        </p>
                        <input
                          name="quantity"
                          type="number"
                          placeholder="Total USDT"
                          className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          onChange={(e) =>
                            setUSDTDepositAmount(parseInt(e.target.value))
                          }
                          value={USDTDepositAmount}
                          min={0}
                        />
                      </div>
                    </form>
                    <div className="flex flex-row justify-around w-full">
                      {depositState !== "LOADING" && (
                        <button
                          type={"submit"}
                          // disabled={}
                          onClick={async () => {
                            try {
                              setDepositState("LOADING");
                              if (
                                usdtDepositAllowance &&
                                usdtDepositAllowance.toBigInt() <
                                  BigInt(USDTDepositAmount * 1e18)
                              ) {
                                console.log(
                                  "usdtDepositAllowance button",
                                  usdtDepositAllowance &&
                                    BigInt(usdtDepositAllowance.toString())
                                );
                                const encodedData = await getEncodeData(
                                  gameTaskPanel.mode.includes("USDT")
                                    ? "USDT"
                                    : "DNF"
                                );
                                console.log(
                                  "encodedData USDT deposit",
                                  encodedData
                                );

                                const txSend = await sendUSDTDepositApproval(
                                  DEPO_ADDR,
                                  BigInt(USDTDepositAmount * 1e18)
                                );
                                console.log(
                                  "txSend USDT deposit approval",
                                  txSend
                                );
                                if (txSend?.status === 1) {
                                  setDepositState("");
                                  toast("USDT Approval Complete");
                                }
                              } else {
                                const encodedData = await getEncodeData("USDT");
                                const txReq = {
                                  data: encodedData.deposit,
                                  to: DEPO_ADDR,
                                  from: walletAddress,
                                };

                                const txSend = await sendUSDTDeposit(txReq);
                                console.log("txSend USDT deposit", txSend);
                                if (txSend?.status === 1) {
                                  setDepositState("");
                                  toast("USDT Deposit Complete");
                                  getUserData();
                                  getUSDTWithdrawHistory();
                                }
                              }
                            } catch (error) {
                              console.error(error);
                              setDepositState("");
                            }
                          }}
                          className={`${
                            USDTDepositAmount <= 0
                              ? "bg-gray-700"
                              : usdtDepositAllowance &&
                                usdtDepositAllowance.toBigInt() <
                                  BigInt(USDTDepositAmount * 1e18)
                              ? "bg-red-500"
                              : "bg-green-500"
                          } text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                          disabled={USDTDepositAmount <= 0}
                        >
                          {usdtDepositAllowance &&
                          usdtDepositAllowance.toBigInt() <
                            BigInt(USDTDepositAmount * 1e18)
                            ? "Approval"
                            : "Deposit"}
                        </button>
                      )}
                    </div>
                    {depositState === "LOADING" && (
                      <p className="text-white/50 font-Magra">Waiting...</p>
                    )}
                  </>
                )}
                {gameTaskPanel.mode === "DEPOSIT.DNF" && (
                  <>
                    <form onSubmit={loginForm.handleSubmit}>
                      <div className="flex flex-col">
                        <p className="text-white font-Magra mb-3">
                          Deposit DNF
                        </p>
                        <input
                          name="quantity"
                          type="number"
                          placeholder="Total DNF"
                          className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          onChange={(e) =>
                            setDNFDepositAmount(parseInt(e.target.value))
                          }
                          value={DNFDepositAmount}
                          min={0}
                        />
                      </div>
                    </form>
                    {depositState !== "LOADING" && (
                      <div className="flex flex-row justify-around w-full">
                        <button
                          type={"submit"}
                          // disabled={}
                          onClick={async () => {
                            try {
                              setDepositState("LOADING");
                              if (
                                dnfDepositAllowance &&
                                dnfDepositAllowance.toBigInt() <
                                  BigInt(DNFDepositAmount * 1e18)
                              ) {
                                console.log(
                                  "dnfDepositAllowance button",
                                  dnfDepositAllowance &&
                                    BigInt(dnfDepositAllowance.toString())
                                );
                                const encodedData = await getEncodeData(
                                  gameTaskPanel.mode.includes("DNF")
                                    ? "USDT"
                                    : "DNF"
                                );
                                console.log(
                                  "encodedData DNF deposit",
                                  encodedData
                                );

                                const txSend = await sendDNFDepositApproval(
                                  DEPO_ADDR,
                                  BigInt(DNFDepositAmount * 1e18)
                                );
                                console.log(
                                  "txSend DNF deposit approval",
                                  txSend
                                );
                                if (txSend?.status === 1) {
                                  setDepositState("");
                                  toast("DNF Approval Complete");
                                }
                              } else {
                                const encodedData = await getEncodeData("DNF");
                                const txReq = {
                                  data: encodedData.deposit,
                                  to: DEPO_ADDR,
                                  from: walletAddress,
                                };

                                const txSend = await sendDNFDeposit(txReq);
                                console.log("txSend USDT deposit", txSend);
                                if (txSend?.status === 1) {
                                  setDepositState("");
                                  toast("DNF Deposit Complete");
                                  getUserData();
                                  getDNFWithdrawHistory();
                                }
                              }
                            } catch (error) {
                              console.error(error);
                              setDepositState("");
                            }
                          }}
                          className={`${
                            DNFDepositAmount <= 0
                              ? "bg-gray-700"
                              : dnfDepositAllowance &&
                                dnfDepositAllowance.toBigInt() <
                                  BigInt(DNFDepositAmount * 1e18)
                              ? "bg-red-500"
                              : "bg-green-500"
                          } text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                          disabled={DNFDepositAmount <= 0}
                        >
                          {dnfDepositAllowance &&
                          dnfDepositAllowance.toBigInt() <
                            BigInt(DNFDepositAmount * 1e18)
                            ? "Approval"
                            : "Deposit"}
                        </button>
                      </div>
                    )}
                    {depositState === "LOADING" && (
                      <p className="text-white/50 font-Magra">Waiting...</p>
                    )}
                  </>
                )}
                {gameTaskPanel.mode === "DEPOSIT.USDT.WITHDRAW" && (
                  <>
                    <form onSubmit={loginForm.handleSubmit}>
                      <div className="flex flex-col gap-2">
                        <p className="text-white font-Magra mb-3">
                          Withdraw USDT
                        </p>
                        <input
                          name="quantity"
                          type="number"
                          placeholder="Total USDT"
                          className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          onChange={(e: any) =>
                            setUSDTWithdrawAmount(e.target.value)
                          }
                          value={USDTWithdrawAmount}
                        />
                        <input
                          name="address"
                          type="string"
                          placeholder="Address"
                          className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          onChange={(e: any) =>
                            setUSDTWithdrawAddress(e.target.value)
                          }
                          value={USDTWithdrawAddress}
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
                      type={"submit"}
                      // disabled={}
                      onClick={async () => {
                        try {
                          // setWithdrawState("LOADING");
                          let options = {
                            headers: {
                              "my-auth-key": token,
                            },
                          };
                          const response = await axiosInstance({
                            url: "/wallet/usdt/withdraw",
                            method: "POST",
                            headers: options.headers,
                            data: {
                              amount: USDTWithdrawAmount,
                              facode: GAValue,
                              to: USDTWithdrawAddress,
                            },
                          });
                          if ((response as any)?.success) {
                            toast("USDT Withdraw Success");
                            // setWithdrawState("");
                          } else {
                            toast("USDT Withdraw Failed");
                            // setWithdrawState("");
                          }
                        } catch (error) {
                          console.error(error);
                          // setWithdrawState("");
                        }
                      }}
                      className={`${
                        USDTWithdrawAmount === 0 ||
                        USDTWithdrawAddress === "" ||
                        GAValue === ""
                          ? "bg-gray-600"
                          : "bg-green-500"
                      } text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      disabled={
                        USDTWithdrawAmount === 0 ||
                        USDTWithdrawAddress === "" ||
                        GAValue === ""
                      }
                    >
                      Withdraw
                    </button>
                  </>
                )}
                {gameTaskPanel.mode === "DEPOSIT.DNF.WITHDRAW" && (
                  <>
                    <form onSubmit={loginForm.handleSubmit}>
                      <div className="flex flex-col gap-2">
                        <p className="text-white font-Magra mb-3">
                          Withdraw DNF
                        </p>
                        <input
                          name="quantity"
                          type="number"
                          placeholder="Total DNF"
                          className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          onChange={(e: any) =>
                            setDNFWithdrawAmount(e.target.value)
                          }
                          value={DNFWithdrawAmount}
                        />
                        <input
                          name="address"
                          type="string"
                          placeholder="Address"
                          className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                          style={{
                            background: `url(image/InputBox.png) no-repeat `,
                          }}
                          onChange={(e: any) =>
                            setDNFWithdrawAddress(e.target.value)
                          }
                          value={DNFWithdrawAddress}
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
                      type={"submit"}
                      // disabled={}
                      onClick={async () => {
                        try {
                          // setWithdrawState("LOADING");
                          let options = {
                            headers: {
                              "my-auth-key": token,
                            },
                          };
                          const response = await axiosInstance({
                            url: "/wallet/dnf/withdraw",
                            method: "POST",
                            headers: options.headers,
                            data: {
                              amount: DNFWithdrawAmount,
                              facode: GAValue,
                              to: DNFWithdrawAddress,
                            },
                          });
                          if ((response as any)?.success) {
                            toast("DNF Withdraw Success");
                            // setWithdrawState("");
                          } else {
                            toast("DNF Withdraw Failed");
                            // setWithdrawState("");
                          }
                        } catch (error) {
                          console.error(error);
                          // setWithdrawState("");
                        }
                      }}
                      className={`${
                        DNFWithdrawAmount === 0 ||
                        DNFWithdrawAddress === "" ||
                        GAValue === ""
                          ? "bg-gray-600"
                          : "bg-green-500"
                      } text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      disabled={
                        DNFWithdrawAmount === 0 ||
                        DNFWithdrawAddress === "" ||
                        GAValue === ""
                      }
                    >
                      Withdraw
                    </button>
                  </>
                )}
                {gameTaskPanel.mode === "DEPOSIT.USDT.HISTORY" && (
                  <>
                    <table className="w-full text-base">
                      <thead className=" uppercase border-y ">
                        <tr className="text-yellow-500 font-Magra">
                          <th scope="col" className="w-[6rem]">
                            Date
                          </th>
                          <th scope="col" className="w-[7rem] pr-1">
                            Description
                          </th>
                          <th scope="col" className="w-[4rem] py-1">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {USDTWithdrawalHistory?.lists?.map((t: any) => {
                          var date = new Date(t.date * 1000);

                          // Will display time in 10:30:23 format
                          // TODO: change with function from utils later
                          const formattedTime = formatToUTC(date);
                          var desc = "";
                          console.log(t);
                          if (t.desc.deposit) desc = "Deposit";
                          if (t.desc.market) {
                            if (t.desc.market === "BUY")
                              desc =
                                "Buy @" +
                                ethers.utils.formatEther(t.desc.price);
                            if (t.desc.market === "SELL")
                              desc =
                                "Sell @" +
                                ethers.utils.formatEther(t.desc.price);
                          }
                          if (t.desc.withdrawto) {
                            desc =
                              "Withdraw to " +
                              t.desc.withdrawto.replace(
                                /^(.{8})(.*)(.{5})$/gm,
                                `$1..$3`
                              );
                          }
                          return (
                            <tr className="text-white text-left">
                              <td>{formattedTime}</td>
                              <td className={"text-white text-base"}>{desc}</td>
                              <td
                                className={`${
                                  t.amount < 0
                                    ? "text-red-500"
                                    : "text-green-500"
                                } pl-4`}
                              >
                                {`${parseFloat(
                                  formatUnits(t.amount, 18)
                                ).toFixed(2)} USDT`}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <ReactPaginate
                      onPageChange={paginateUSDTDepositHistory}
                      pageCount={
                        USDTWithdrawalHistory?.totalpage > 0
                          ? USDTWithdrawalHistory?.totalpage
                          : 1
                      }
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={3}
                      previousLabel={"<<"}
                      nextLabel={">>"}
                      containerClassName={
                        "flex flex-row text-black items-center text-2xl justify-center"
                      }
                      breakClassName={
                        "font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white"
                      }
                      pageLinkClassName={
                        "font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white"
                      }
                      previousLinkClassName={`font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white`}
                      nextLinkClassName={`font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white`}
                      activeLinkClassName={
                        "font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white text-[#FFC700]"
                      }
                    />
                  </>
                )}
                {gameTaskPanel.mode === "DEPOSIT.DNF.HISTORY" && (
                  <>
                    <table className="w-full text-base">
                      <thead className=" uppercase border-y ">
                        <tr className="text-yellow-500 font-Magra">
                          <th scope="col" className="w-[6rem]">
                            Date
                          </th>
                          <th scope="col" className="w-[7rem] pr-1">
                            Description
                          </th>
                          <th scope="col" className="w-[4rem] py-1">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {DNFWithdrawalHistory?.lists?.map((t: any) => {
                          var date = new Date(t.date * 1000);

                          // Will display time in 10:30:23 format
                          // TODO: change with function from utils later
                          const formattedTime = formatToUTC(date);
                          var desc = "";
                          console.log(t);
                          if (t.desc.deposit) desc = "Deposit";
                          if (t.desc.market) {
                            if (t.desc.market === "BUY")
                              desc =
                                "Buy @" +
                                ethers.utils.formatEther(t.desc.price);
                            if (t.desc.market === "SELL")
                              desc =
                                "Sell @" +
                                ethers.utils.formatEther(t.desc.price);
                          }
                          if (t.desc.withdrawto) {
                            desc =
                              "Withdraw to " +
                              t.desc.withdrawto.replace(
                                /^(.{8})(.*)(.{5})$/gm,
                                `$1..$3`
                              );
                          }
                          return (
                            <tr className="text-white text-left">
                              <td>{formattedTime}</td>
                              <td className={"text-white text-base"}>{desc}</td>
                              <td
                                className={`${
                                  t.amount < 0
                                    ? "text-red-500"
                                    : "text-green-500"
                                } pl-4`}
                              >
                                {`${parseFloat(
                                  formatUnits(t.amount, 18)
                                ).toFixed(2)} DNF`}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    <ReactPaginate
                      onPageChange={paginateDNFDepositHistory}
                      pageCount={
                        DNFWithdrawalHistory?.totalpage > 0
                          ? DNFWithdrawalHistory?.totalpage
                          : 1
                      }
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={3}
                      previousLabel={"<<"}
                      nextLabel={">>"}
                      containerClassName={
                        "flex flex-row text-black items-center text-2xl justify-center"
                      }
                      breakClassName={
                        "font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white"
                      }
                      pageLinkClassName={
                        "font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white"
                      }
                      previousLinkClassName={`font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white`}
                      nextLinkClassName={`font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white`}
                      activeLinkClassName={
                        "font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white text-[#FFC700]"
                      }
                    />
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      )}
      {/* withdraw panel */}
      {withdrawPanel.show && scene === "HOME" && (
        <div className="absolute h-[80vh] flex">
          <div className=" my-5 flex backdrop-blur-sm  justify-center items-center flex-col bg-white/10 px-3.5 py-2.5 shadow-sm rounded-sm ">
            <div className="flex w-full justify-end">
              <img
                src="image/logoutBtn.png"
                width={30}
                height={30}
                alt="Close Withdraw"
                onClick={() =>
                  setWithdrawPanel({ show: false, mode: "WITHDRAW" })
                }
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
              <div className="flex gap-2 justify-start py-2 w-full">
                <button
                  type="button"
                  onClick={() =>
                    setWithdrawPanel({ ...withdrawPanel, mode: "WITHDRAW" })
                  }
                  className={`${
                    withdrawPanel.mode === "WITHDRAW"
                      ? "text-blue-500"
                      : "text-white"
                  } font-bold font-Magra px-3.5 py-2.5 text-xl focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                  Withdraw
                </button>
                <button
                  type="button"
                  onClick={() =>
                    // setTicketPanel({ ...ticketPanel, mode: "HISTORY" })
                    setWithdrawPanel({ ...withdrawPanel, mode: "HISTORY" })
                  }
                  className={`${
                    withdrawPanel.mode === "HISTORY"
                      ? "text-blue-500"
                      : "text-white"
                  } font-bold font-Magra px-3.5 py-2.5 text-xl focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                  History
                </button>
              </div>
              {withdrawPanel.mode === "WITHDRAW" && (
                <>
                  <form onSubmit={loginForm.handleSubmit}>
                    <div className="flex flex-col">
                      <p className="text-white font-Magra mb-3">Amount</p>
                      <input
                        name="amount"
                        type="number"
                        className="py-1 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        onChange={(e: any) => setWithdrawAmount(e.target.value)}
                        value={withdrawAmount}
                      />
                      <p className="text-green-400 font-Magra my-3">
                        You will receive{" "}
                        {withdrawAmount > 0
                          ? withdrawAmount - withdrawAmount * (5 / 100)
                          : 0}{" "}
                        DNF
                      </p>
                      <p className="text-white font-Magra my-3">Address</p>
                      <input
                        name="Address"
                        type="text"
                        className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        // readOnly
                        // onChange={loginForm.handleChange}
                        // onBlur={loginForm.handleBlur}
                        onChange={(e: any) =>
                          setWithdrawAddress(e.target.value)
                        }
                        value={withdrawAddress}
                      />
                      <p className="text-white font-Magra my-3">F2A Code</p>
                      <input
                        name="2FA"
                        type="text"
                        className="py-3 w-[350px] h-[53px] px-4 rounded-xl placeholder:text-[#A8A8A8] text-white font-Magra font-bold"
                        style={{
                          background: `url(image/InputBox.png) no-repeat `,
                        }}
                        // readOnly
                        // onChange={loginForm.handleChange}
                        // onBlur={loginForm.handleBlur}
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
                    type={"submit"}
                    // disabled={}
                    onClick={async () => {
                      console.log("withdraw amount approval", withdrawAmount);
                      let options = {
                        headers: {
                          "my-auth-key": token,
                        },
                      };
                      const response = await axiosInstance({
                        url: "/bonus/withdraw",
                        method: "POST",
                        headers: options.headers,
                        data: {
                          amount: withdrawAmount,
                          to: withdrawAddress,
                          facode: GAValue.toString(),
                        },
                      });
                      if (response.data.success) {
                        toast("Withdraw Confirmed");
                        getUserData();
                        setWithdrawPanel({ show: false, mode: "WITHDRAW" });
                      } else alert(response.data.message);
                    }}
                    className={`${
                      userData?.ga_key ? "bg-green-500" : "bg-red-500"
                    } text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                    disabled={!userData?.ga_key}
                  >
                    Withdraw
                  </button>
                  {/* {sendTicketBuyState.status !== "None" && (
                    <p className="text-white/50 font-Magra">
                      {sendTicketBuyState.status}
                    </p>
                  )} */}
                </>
              )}
              {withdrawPanel.mode === "HISTORY" && (
                <table className="w-full text-base">
                  <thead className=" uppercase border-y ">
                    <tr className="text-yellow-500 font-Magra">
                      <th scope="col" className="w-[6rem]">
                        Date
                      </th>
                      <th scope="col" className="w-[7rem] pr-1">
                        Description
                      </th>
                      <th scope="col" className="w-[4rem] py-1">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawalHistory.map((t: any) => {
                      var date = new Date(t.recdate * 1000);

                      // Will display time in 10:30:23 format
                      // TODO: change with function from utils later
                      const formattedTime = formatToUTC(date);
                      return (
                        <tr className="text-white text-left">
                          <td>{formattedTime}</td>
                          <td className={"text-white text-base"}>{t.txtype}</td>
                          <td
                            className={`${
                              t.amount < 0 ? "text-red-500" : "text-green-500"
                            } pl-4`}
                          >
                            {`${parseFloat(formatUnits(t.amount, 18)).toFixed(
                              2
                            )} DNF`}
                          </td>
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
      {jPassPanel.show && scene === "JPASS" && (
        <div className="absolute h-[80vh] flex">
          <div className=" my-5 flex backdrop-blur-sm  justify-center items-center flex-col bg-white/10 px-3.5 py-2.5 shadow-sm rounded-sm ">
            <div className="flex w-full justify-end">
              <img
                src="image/logoutBtn.png"
                width={30}
                height={30}
                alt="Close JPass"
                onClick={() => setJPassPanel({ show: false, data: [] })}
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
              <div className="flex gap-2 justify-center py-5 w-full text-white font-Magra text-xl font-bold">
                Buy Subscription
              </div>
              <div className="flex gap-2 justify-center py-1 w-full text-white font-Magra text-lg font-bold">
                {jPassPanel.data?.header}
              </div>
              <>
                <form onSubmit={loginForm.handleSubmit}>
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
                    <p className="w-64 font-Magra text-md text-white ml-3">
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
                </form>
                {jPassState !== "LOADING" && (
                  <button
                    type={"submit"}
                    // disabled={}
                    onClick={async () => {
                      console.log(
                        "JPass amount approval",
                        jPassPanel?.data?.price
                      );
                      setJPassState("LOADING");
                      if (buyWithBonus) {
                        console.log("Buy with bonus clicked", {
                          code: jPassPanel?.data?.purchaseCode,
                          facode: GAValue.toString(),
                        });
                        let options = {
                          headers: {
                            "my-auth-key": token,
                          },
                        };
                        const response = await axiosInstance({
                          url: "/item/buyWithBonuses",
                          method: "POST",
                          headers: options.headers,
                          data: {
                            code: jPassPanel?.data?.purchaseCode,
                            facode: GAValue.toString(),
                          },
                        });
                        if (response.data.success) {
                          setJPassState("");
                          toast("Buy JPass Confirmed");
                          getUserData();
                        } else alert(response.data.message);
                      } else if (!buyWithBonus) {
                        if (
                          ticketAllowance &&
                          ticketAllowance.toBigInt() <
                            BigInt(jPassPanel?.data?.price * 1e18)
                        ) {
                          // const txReq = { value: BigInt(usd * 1e18) }
                          const txSend = await JPassApprovalSend(
                            TICKET_ADDR,
                            BigInt(jPassPanel?.data?.price * 1e18)
                          );
                          setJPassState("");
                          console.log("txSend JPassApproval", txSend);
                        } else {
                          let options = {
                            headers: {
                              "my-auth-key": token,
                            },
                          };
                          const response = await axiosInstance({
                            url: "/item/createRawBuyItems",
                            method: "POST",
                            headers: options.headers,
                            data: {
                              code: jPassPanel?.data?.purchaseCode,
                            },
                          });
                          console.log("JPass buy", response.data);
                          if (response.data.success) {
                            const txReq = {
                              data: response.data.result,
                              to: TICKET_ADDR,
                              from: walletAddress,
                            };
                            console.log("txReq JPass", txReq);
                            const txSend = await sendJPassBuy(txReq);
                            console.log("txSend buy JPass", txSend);
                            if (txSend && txSend.transactionHash)
                              checkJPassValidateTx(txSend.transactionHash);
                          }
                        }
                      }
                    }}
                    className={`${
                      buyWithBonus
                        ? "bg-green-500"
                        : ticketAllowance &&
                          ticketAllowance.toBigInt() <
                            BigInt(jPassPanel?.data?.price * 1e18)
                        ? "bg-red-500"
                        : "bg-green-500"
                    } text-white font-Magra px-3.5 py-2.5 text-sm focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                    disabled={
                      (buyWithBonus &&
                        GAValue.length < 6 &&
                        !userData?.ga_key) ||
                      sendJPassBuyState.status !== "None"
                    }
                  >
                    {buyWithBonus
                      ? "Buy with Bonus"
                      : ticketAllowance &&
                        ticketAllowance.toBigInt() <
                          BigInt(jPassPanel?.data?.price * 1e18)
                      ? "Approval"
                      : "Buy Subscription"}
                  </button>
                )}
                {jPassState === "LOADING" && (
                  <p className="text-white/50 font-Magra">Waiting...</p>
                )}
              </>
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
                  Jurassic World
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <p>
                    When the first dinosaur bone was described in Jurassic
                    World, it was thought to come from an elephant or perhaps a
                    giant. Over a century later, scientists realised such
                    fossils came from a creature they named Megalosaurus. Then,
                    in leading anatomist recognised Megalosaurus as part of a
                    whole new group of animals, which named Dinosaur. Since
                    then, around 600 different dinosaur species have been
                    described in Jurassic World and there is more dinosaur that
                    haven’t described
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
                    Decentralized Concept, fair and comfortable in buying and
                    selling Jurassic Eggs. Jurassic Egg understands that this
                    kind of concept is an interesting concept to develop, so
                    Jurassic Egg tries to study it and find a fairer and more
                    comfortable game method and the balance in each personal
                    Wallet, your balance is only used when buying an Egg. And
                    the balance goes directly to your respective Wallet when you
                    sell it..
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
                  Game Introduction
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <p>
                    Every Hunters going to start with getting Dino Egg
                    <br />
                    <br />
                    Your Dino Egg will start hunting for you in the Jurassic
                    World for 33-48 hours after a successful purchase. After the
                    hunt, the Dino Egg are returned to the Jurassic Egg Market
                    for sale. As more hunts are performed, the Dino Egg gains
                    experience points and develops their ability to catch rare
                    Dinosaur.
                    <br />
                    <br />
                    If you successfully catch a Dinosaur, you will receive a
                    certain amount of DNF and the Dinosaur Card.
                    <br />
                    <br />
                    Collect every Dinosaur Card to enjoy our grand price up to
                    9999 DNF
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
                  Jurassic Fund
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <p>
                    Jurassic Fund is the most important component of the game.
                    All Dino Eggs listed in the jurassic market are only
                    availablle Up to 24hours, After that jurassic eggs will be
                    buyback using the Dino Fund pool
                  </p>
                  <br />
                  <p className="text-[#FFC700]">Dino Fund usage includes :</p>
                  <br />
                  <img src="/image/jurassicfund.png" alt="jurassic fund" />
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
                  Jurassic Egg Market
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <p>
                    Dino Eggs are sold sporadically at Jurassic Egg Market for
                    50 DNF each. The price of Dino Eggs increases as XP levels
                    increase.
                    <br />
                    <br />
                    For a better gaming experience, the overall number of Dino
                    Eggs in circula- tion will depend on the number active
                    Hunters.
                    <br />
                    <br />
                  </p>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openGameGuide === 5}
                icon={<IconGameGuide id={5} open={openGameGuide} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenGameGuide(5)}
                  className="text-[#FFC700] hover:text-[#FFC700] font-Magra font-bold bg-[#031A22] px-4 text-left"
                >
                  Get DNF Rewards When you Catch Dinosaur!
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <img src="/image/dnfreward.png" alt="dnf reward" />
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
                  Get More Rewards From Gacha
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <img src="/image/gatchareward.png" alt="gatcha reward" />
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openGameGuide === 7}
                icon={<IconGameGuide id={7} open={openGameGuide} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenGameGuide(7)}
                  className="text-[#FFC700] hover:text-[#FFC700] font-Magra font-bold bg-[#031A22] px-4"
                >
                  Dino Egg
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <p>
                    Dino Eggs will be listed soon in the Jurassic Egg Market and
                    available for purchase once the hunt is over. With the new
                    EXP, the cost of Dino Eggs will increase by 6%.
                    <br />
                    <br />
                    2% will go to the seller, 1% will go to plattform Fee and 3%
                    will go to the “Hunting Buddy Bonus” (if your buddy buy
                    egg), if the Dino Egg has not been sold after 24 hours,
                    Jurassic Fund will purchase the Dino Egg using the Dino Fund
                    Pool.
                    <br />
                    <br />
                    Active income from the Group
                    <br />
                    <br />
                    Ticket Price 0.25 DNF/Ticket.
                  </p>
                  <br />
                  <br />
                  <img src="/image/dinoegg1.png" alt="dino egg" />
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openGameGuide === 8}
                icon={<IconGameGuide id={8} open={openGameGuide} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenGameGuide(8)}
                  className="text-[#FFC700] hover:text-[#FFC700] font-Magra font-bold bg-[#031A22] px-4"
                >
                  Hunting Buddy Bonus
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <p>
                    When your Buddy earns DNF from hunting in Jurassic Egg, you
                    will be able to receive a 6.667% bonus on the amount they
                    earn. Hunters can receive up to level 15 of their
                    commander’s hunting bonus. With more Buddy, the more bonuses
                    you can receive.
                    <br />
                    <br />
                    Example :
                    <br />
                    <br />
                    A Legendary hunter’s (all with in level 15 of his network)
                    total hunting value for the day is 5,000,000 DNF, which
                    means their hunting profit is 150,000 DNF. If so, this
                    legendary hunter will get 6.667% of his 150,000 DNF. which
                    is 10,000 DNF as his buddy Hunting Bonus.
                    <br />
                    <br />
                    To receive the Hunting Bonus, the hunters must spend one
                    Ticket before the day ends.
                  </p>
                  <br />
                  <p className="font-bold">Hunter's Rank</p>
                  <br />
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openGameGuide === 9}
                icon={<IconGameGuide id={9} open={openGameGuide} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenGameGuide(9)}
                  className="text-[#FFC700] hover:text-[#FFC700] font-Magra font-bold bg-[#031A22] px-4"
                >
                  Hunting Ranking
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <p>
                    As a Hunter and his partner continue to hunt dinosaur in the
                    game, they will gradually move up to the next rank. The
                    higher rank of the Hunter, more allowances
                    <br />
                    <br />
                  </p>
                  <br />
                  <br />
                  <img src="/image/hunterranking.png" alt="hunter ranking" />
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openGameGuide === 10}
                icon={<IconGameGuide id={10} open={openGameGuide} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenGameGuide(10)}
                  className="text-[#FFC700] hover:text-[#FFC700] font-Magra font-bold bg-[#031A22] px-4 rounded-b-xl"
                >
                  Dino Egg Trading Illustration
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <img src="/image/dinotrading.png" alt="table start game" />
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openGameGuide === 11}
                icon={<IconGameGuide id={11} open={openGameGuide} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenGameGuide(11)}
                  className="text-[#FFC700] hover:text-[#FFC700] font-Magra font-bold bg-[#031A22] px-4 rounded-b-xl"
                >
                  Transaction Process
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <img
                    src="/image/transactionprocess.png"
                    alt="transaction process"
                  />
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openGameGuide === 12}
                icon={<IconGameGuide id={12} open={openGameGuide} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenGameGuide(12)}
                  className="text-[#FFC700] hover:text-[#FFC700] font-Magra font-bold bg-[#031A22] px-4 rounded-b-xl"
                >
                  Ultimate Hunter
                </AccordionHeader>
                <AccordionBody className="bg-[#031A22] px-5 py-4 text-white text-sm">
                  <p className="text-[#FFC700]">
                    Join and become an Ultimate Hunter!
                  </p>
                  <br />
                  <br />
                  <p>
                    Subscribe to the Ultimate Pass to enjoy additional perks in
                    Jurassic Egg
                  </p>
                  <br />
                  <br />
                  <p className="text-[#FFC700]">Ultimate Pass Benefits :</p>
                  <br />
                  <br />
                  <p>
                    Automatic sale of your Dino Egg (No need to "Pre-Register")
                    <br />
                    <br />
                    1 Extra egg purchase per day
                    <br />
                    <br />
                    10% less hunting time
                  </p>
                  <br />
                  <br />
                  <img src="/image/ultimatehunter.png" alt="ultimate hunter" />
                </AccordionBody>
              </Accordion>
            </div>
          </div>
        </div>
      )}
      {scene === "BUDDIES" && <Buddies />}
      {scene === "HISTORY" && <History />}
      {scene === "BULLETIN" && <Bulletin />}
      {scene === "DINOCENTER" && (
        // <div className="absolute w-full h-full flex justify-center items-center">
        //   <div className="flex z-20 h-[100vh] w-[450px] max-[450px]:w-[calc(100vw)] max-w-[450px] justify-center items-center flex-col sm:px-4 shadow-sm rounded-sm ">
        //     <div className="flex flex-row w-full justify-between mt-4 mb-1">
        //       <img
        //         src="image/backBtn.png"
        //         width={40}
        //         height={40}
        //         alt="Back"
        //         onClick={() => changeScene("HOME")}
        //       />
        //       <div className="flex flex-col items-center justify-center text-[1.5rem] text-white font-bold font-magra ">
        //         Jurassic Market
        //       </div>
        //       <img
        //         src="image/logoutBtn.png"
        //         width={40}
        //         height={40}
        //         alt="Back"
        //       // onClick={() => changeScene("HOME")}
        //       />
        //     </div>
        //     <div className="flex flex-col h-full w-full px-4 pb-6 backdrop-blur-sm overflow-y-visible overflow-auto">
        //       {/* Hunter Details */}
        //       <div className="absolute left-0 top-0 w-full">
        //         <>
        //           <img
        //             src="image/pnlJurassicMarketBackground.png"
        //             className="w-full object-cover"
        //             alt="pnlJurassicMarketBackground"
        //           />
        //           <div className="absolute top-4 w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
        //             <div className="flex flex-row justify-center font-bold font-Magra text-white text-lg [@media(max-width:400px)]:text-base">
        //               Hunter's Rank
        //             </div>
        //           </div>
        //           <div className="absolute top-8 w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
        //             <div className="flex flex-row justify-between px-1 font-bold font-Magra text-white text-base [@media(max-width:400px)]:text-sm">
        //               <span>Requalification</span>
        //               <span>Current Rank</span>
        //             </div>
        //           </div>
        //           {/* progress bar with image */}
        //           {/* TODO: need to update styling to accept dynamic progress bar fill */}
        //           <div className="absolute inline-block top-12 w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
        //             <div className="flex flex-col items-center justify-center font-bold font-Magra text-white text-lg">
        //               <img
        //                 src="image/RankExpBarBg.png"
        //                 className="object-cover z-10"
        //                 alt="RankExpBarBg"
        //               />
        //               {/* progress fill */}
        //               <div className="absolute top-0 w-auto z-0">
        //                 <img
        //                   src="image/imgRankExpBarFill.png"
        //                   className=" object-covef"
        //                   alt="imgRankExpBarFill"
        //                 />
        //               </div>
        //               <div className="absolute top-[-5px] text-[0.8rem]">
        //                 {`${parseInt(total)}/${parseInt(period)}`}
        //               </div>
        //             </div>
        //           </div>
        //           <div className="absolute top-12 w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
        //             <div className="flex flex-row justify-between px-1 font-bold font-Magra text-white [@media(max-width:400px)]:text-sm">
        //               <span>{parseInt(period)}</span>
        //               <span>{rankRequalification(userData?.title)}</span>
        //             </div>
        //           </div>
        //           <div className="absolute top-[4.4rem] w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
        //             <div className="flex flex-row justify-between px-20 font-bold font-Magra text-white text-sm">
        //               <span className="text-red-500">{rankLoaderBarProgress(userData?.title)?.[0]}</span>
        //               <span>{rankLoaderBarProgress(userData?.title)?.[1]}</span>
        //             </div>
        //           </div>
        //         </>
        //       </div>

        //       {/* DinoCenter Pages & filters */}
        //       <div className="absolute left-0 top-[6rem] w-full">
        //         <div className="flex flex-row w-full justify-between">
        //           {/* Pages */}
        //           <div className="flex w-full justify-start text-white font-Magra font-bold text-base [@media(max-width:400px)]:text-sm">
        //             <div className="px-4 text-[#FFC700]">Listings</div>
        //             <div>/</div>
        //             <div className="px-2">My Listings</div>
        //           </div>
        //           {/* Filters */}
        //           <div className="flex w-full text-white font-Magra font-bold text-base [@media(max-width:400px)]:text-sm">
        //             <div className="flex w-full items-end justify-end">
        //               <div className="flex flex-row items-center px-2">
        //                 <span>Price</span>
        //                 <img
        //                   src="image/btnFilterIcon.png"
        //                   width={5}
        //                   className="w-5 h-2.5 mx-1 rotate-180"
        //                   alt="priceFilterIcon"
        //                 />
        //               </div>
        //               <div className="flex flex-row items-center px-4">
        //                 <span>Time</span>
        //                 <img
        //                   src="image/btnFilterIcon.png"
        //                   width={5}
        //                   className="w-5 h-2.5 mx-1"
        //                   alt="priceFilterIcon"
        //                 />
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>

        //       {/* Market */}
        //       <div className="absolute left-0 top-[9rem] w-full h-[55vh]">
        //         {false ? (
        //           <div className="flex w-full h-full justify-center items-center font-Magra font-bold text-white">
        //             Coming Soon
        //           </div>
        //         ) : (
        //           <div className="grid grid-cols-4">
        //             {eggListsData?.lists.map((egg, index) => {
        //               return (
        //                 <EggComponent egg={egg} index={index} customTimer={1683355142 + (1000 * index)} />
        //                 // <div
        //                 //   key={index}
        //                 //   className="flex flex-col items-center content-center "
        //                 // >
        //                 //   <img
        //                 //     src="image/jurassicEggBg.png"
        //                 //     className="w-24 [@media(max-width:400px)]:w-[4.5rem] [@media(max-height:700px)]:w-[4.5rem]"
        //                 //     alt="jurassicEggBg"
        //                 //   />
        //                 //   <div>
        //                 //     <img
        //                 //       src={`${eggType(egg?.ticket)}`}
        //                 //       className={`w-14 -mt-[5.1rem] [@media(max-width:400px)]:w-[2.6rem] [@media(max-height:700px)]:w-[2.6rem] [@media(max-width:400px)]:-mt-[3.9rem] [@media(max-height:700px)]:-mt-[3.9rem]`}
        //                 //       alt="imgJurassicEggIcon"
        //                 //     />
        //                 //   </div>

        //                 //   {/* price */}
        //                 //   <div className="font magra font-bold decoration-from-font">
        //                 //     <span className="text-[#FFC700] [@media(max-width:400px)]:text-sm">
        //                 //       {formatUnits(egg?.total, 18)} USDT
        //                 //     </span>
        //                 //   </div>

        //                 //   {/* action button */}
        //                 //   {true ? (
        //                 //     <div>
        //                 //       <img
        //                 //         src="image/BtnPurchaseCountdown.png"
        //                 //         className="w-20 "
        //                 //         alt="BtnPurchaseCountdown"
        //                 //       />
        //                 //       <div className="flex w-full justify-center font magra font-bold decoration-from-font">
        //                 //         <span className="text-white -mt-[1.8rem]">
        //                 //           00:00:00
        //                 //         </span>
        //                 //       </div>
        //                 //     </div>
        //                 //   ) : (
        //                 //     <div>
        //                 //       <img
        //                 //         src="image/BtnPurchaseActive.png"
        //                 //         className="w-20 "
        //                 //         alt="BtnPurchaseActive"
        //                 //       />
        //                 //       <div className="flex w-full justify-center font magra font-bold decoration-from-font">
        //                 //         <span className="text-white -mt-[1.8rem]">
        //                 //           Keep
        //                 //         </span>
        //                 //       </div>
        //                 //     </div>
        //                 //   )}
        //                 // </div>
        //               );
        //             })}
        //           </div>
        //         )}
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <JurassicMarket
          sendEggApproval={sendEggApproval}
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
              if (data.success) {
                // setApproved(allowance);
                // setEggTransactionState("");
              }
              setTimeout(() => checkValidation(transactionData.id), 3000);
            }
          }}
        />
      )}
      {scene === "HOME" && notification && (
        <div className="absolute top-[87px] flex flex-col">
          <Marquee
            loop={1}
            onFinish={() => setNotification(null)}
            speed={30}
            className="font-Magra text-[#FFC700]"
          >
            {notification}
          </Marquee>
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
                // toggle={toggle}
                // playing={playing as boolean}
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
              <DinoCenter visible={scene === "DINOCENTER"} />
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
          {scene === "JPASS" && (
            <>
              <JPass
                scene={scene}
                onBackBtnClick={() => {
                  changeScene("HOME");
                }}
                visible={scene === "JPASS"}
              />
            </>
          )}
        </Stage>
      </div>
      {banner ? <ShowBanner image={banner} /> : ""}
      <ToastContainer />
    </div>
  );
};
