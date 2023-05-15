import { useEffect, useState } from "react";
import { useAuthStore, useStore } from "../utils/store";
import EggComponent from "../components/EggComponent";
import {
  eggType,
  maxRankValue,
  rankLoaderBarProgress,
  rankProgress,
  requalificationRankProgress,
} from "../utils/functions";
import { formatUnits } from "ethers/lib/utils";
import { axiosInstance } from "../utils/api";
import { PAYGATEWAY_ADDR, USDT_ADDR } from "../utils/config";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useEthers } from "@usedapp/core";
import React from "react";

function JurassicMarket({
  sendEggApproval,
  sendTransaction,
  sendPayTransaction,
}: any) {
  const { activateBrowserWallet } = useEthers();
  const token = useAuthStore((state) => state.token);
  const walletAddress = useStore((state) => state.walletAddress);
  const eggTransactionData = useStore((state) => state.eggTransactionData);
  const setEggTransactionData = useStore(
    (state) => state.setEggTransactionData
  );
  const eggTransactionState = useStore((state) => state.eggTransactionState);
  console.log('eggTransactionState', eggTransactionState)
  const setEggTransactionState = useStore(
    (state) => state.setEggTransactionState
  );
  const userData = useStore((state) => state.userData);
  const eggListsData = useStore((state) => state.eggListsData);
  const setEggListsData = useStore((state) => state.setEggListsData);
  const myListingEggData = useStore((state) => state.myListingEggData);
  const setMyListingEggData = useStore((state) => state.setMyListingEggData);

  // const [transactionState, setTransactionState] = useState<'APPROVAL' | 'PURCHASE'>('APPROVAL')
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = eggListsData?.lists.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const changeScene = useStore((state) => state.changeScene);
  const period = formatUnits(userData?.bought.period, 18);
  const group = formatUnits(userData?.bought.group, 18);
  // const group = formatUnits(userData?.bought.group, 18)
  // const total = formatUnits(userData.bought.total, 18);
  // console.log('progress JurassicMarket', progress)
  const approved = useStore((state) => state.approved);
  console.log('eggTransactionData', eggTransactionData)
  // if (parseFloat(approved as string) >= parseFloat(eggTransactionData.total))  setTransactionState('PURCHASE')
  console.log('approved JurassicMarket', (approved))
  // console.log('approved jurassic market', approved)
  // console.log('approved jurassic market to string', approved?.toString())
  // console.log('eggTransactionData jurassic market', eggTransactionData)
  // console.log('approved.toString() >= eggTransactionData.total ', approved?.toString() >= eggTransactionData.total)
  // const currentTime = new Date().getTime();
  const [selectedPanel, setSelectedPanel] = useState<
    "My Listing" | "Listing" | "Finish"
  >("Listing");
  const [unfinishedTransaction, setUnfinishedTransaction] = useState<
    string | null
  >(null);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  // const [myListingEgg, setMyListingEgg] = useState<any>([]);
  const rank_dateend = new Date(userData?.rank_end * 1000).toLocaleString();
  const [marketFilter, setMarketFilter] = useState<any>("Price");

  const processTransaction = async (id: string, ticket: number) => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const data: any = await axiosInstance({
      url: `/egg/detail?id=${id}`,
      method: "GET",
      headers: options.headers,
    });
    console.log("processTransaction Result:", data);
    if (data?.data?.success) {
      setEggTransactionData({ ...data?.data?.result, ticket });
      getUnfinishedEggTransaction();
      setSelectedPanel("My Listing");
    }
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
      setUnfinishedTransaction(data?.result);
      const response: any = await axiosInstance({
        url: `/egg/detail?id=${data?.result}`,
        method: "GET",
        headers: options.headers,
      });
      console.log("processTransaction Result:", response);
      if (response?.data?.success) {
        setEggTransactionData({ ...response?.data?.result });
        // if (selectedPanel === 'My Listing') setSelectedPanel("Finish");
      }
    } else {
      toast(data.message);
    }
  };

  const getEggList = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const data: any = await axiosInstance({
      url: "/egg/lists",
      method: "GET",
      headers: options.headers,
    });
    console.log("getEggList Result:", data);
    if (data?.status === 200 && data?.data?.result?.lists) {
      setEggListsData(data?.data?.result);

      // setEggListsData({ remaining: 0, lists: [] });
    }
  };

  const getMyListingEgg = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const { data }: any = await axiosInstance({
      url: "/egg/myListing",
      method: "GET",
      headers: options.headers,
    });
    console.log("get MyListing egg Result:", data);
    if (data?.success) {
      // processTransaction(id, ticket);
      // setUnfinishedTransaction(data?.result)
      setMyListingEggData(data?.result);
    } else {
      toast(data.message);
    }
  };

  const handleKeep = async (id: string, ticket: number) => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const { data }: any = await axiosInstance({
      url: "/egg/keep",
      method: "POST",
      headers: options.headers,
      data: { id },
    });
    console.log("handleKeep Result:", data);
    if (data?.success) {
      processTransaction(id, ticket);
    } else {
      toast(data.message);
    }
  };

  const paginate = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  // create a function for filtering from frontend, when click price and time filter
  // TODO: need to check the logic and where to look for the data
  const filterEggList = (filter: string) => {
    if (filter === "Price") {
      const sortedList = eggListsData?.lists.sort((a: any, b: any) => {
        return a.total - b.total;
      });
      setEggListsData({ ...eggListsData, lists: sortedList });
      setMarketFilter("Price");
    } else if (filter === "Time") {
      const sortedList = eggListsData?.lists.sort((a: any, b: any) => {
        return a.openat - b.openat;
      });
      setEggListsData({ ...eggListsData, lists: sortedList });
      setMarketFilter("Time");
    }
  };

  // TODO: handle unfinished egg and continue the transaction
  useEffect(() => {
    getUnfinishedEggTransaction();
    getMyListingEgg();

    // const unlockWallet = async () => {
    //     console.log('walletAddress', walletAddress)
    //     // console.log("allowance ", allowance);
    //     // console.log("account approve", walletAddress);
    //     if (walletAddress?.length === 0) activateBrowserWallet({ type: 'metamask' })
    //     else {
    //         try {
    //             const txReq = {
    //                 to: USDT_ADDR,
    //                 from: walletAddress,
    //                 data: eggTransactionData.TxRawApproval,
    //             };
    //             console.log("txReq", txReq);
    //             const txSend = await sendTransaction(txReq);
    //             console.log("txSend", txSend);
    //         } catch (error) {
    //             // @ts-ignore
    //             toast(error)
    //         }
    //     }
    // }
    // unlockWallet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPanel]);

  // console.log('unfinishedTransaction', unfinishedTransaction)
  // console.log('eggTransactionData', eggTransactionData)
  // console.log('myListingEgg', myListingEgg)
  const requalificationRankValue = parseInt(
    requalificationRankProgress({ rank: userData?.title })
  );
  const rankValue = parseInt(rankProgress({ rank: userData?.title }));
  const periodValue = parseInt(period);
  const groupValue = parseInt(group);
  const progress =
    groupValue / rankValue > 1 ? 100 : (groupValue / rankValue) * 100;
  const requalificationScore =
    requalificationRankValue - periodValue < 0
      ? 0
      : requalificationRankValue - periodValue;

  const [countdownTime, setCountdownTime] = useState({
    countdownHours: 0,
    countdownMinutes: 0,
    countdownSeconds: 0,
  });
  useEffect(() => {
    let timeInterval: any;
    const countdown = () => {
      timeInterval = setInterval(() => {
        setCurrentTime(new Date().getTime());
      }, 1000);
    };
    countdown();
    return () => {
      clearInterval(timeInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eggTransactionState]);
  console.log('current time > 1684152000', Math.floor(currentTime / 1000), Math.floor(currentTime / 1000) > 1684152000)
  useEffect(() => {
    let timeInterval: any;
    // const countdown = () => {
    if (eggTransactionData?.expired > 0 && currentTime) {
      // timeInterval = setInterval(() => {
      const countdownDateTime = eggTransactionData?.expired * 1000;
      // const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      // console.log(`countdownDateTime ${index}`, countdownDateTime);
      // console.log(`currentTime ${index}`, currentTime);
      // console.log(`remainingDayTime ${index}`, remainingDayTime);
      const totalHours = Math.floor(
        (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const totalMinutes = Math.floor(
        (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const totalSeconds = Math.floor(
        (remainingDayTime % (1000 * 60)) / 1000
      );

      const runningCountdownTime = {
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };

      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        // getPendingListingEgg()
      } else {
        setCountdownTime(runningCountdownTime);
      }
      // }, 1000);
    }
    // };
    // countdown();
    // return () => {
    //     clearInterval(timeInterval);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime, eggTransactionData?.expired]);

  useEffect(() => {
    console.log('check approved', approved)
    if (approved !== '0' && parseFloat(approved as string) >= parseFloat(eggTransactionData.total)) {
      console.log('check approved purchase', parseFloat(approved as string) >= parseFloat(eggTransactionData.total))
      setEggTransactionState({ mode: 'PURCHASE', state: '' })
    }
    else setEggTransactionState({ mode: 'APPROVAL', state: '' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (eggListsData?.lists.length > 0) {
      console.log('egg list jurassic currentTime', currentTime)
      console.log('egg list jurassic', eggListsData?.lists?.map((item: any) => (item.openat)).sort((a, b) => (b - a)))

    }
  }, [currentTime, eggListsData?.lists])

  return (
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
          <div className="w-10 h-10"></div>
          {/* <img
            src="image/logoutBtn.png"
            width={40}
            height={40}
            className="w-10"
            alt="Back"
            // onClick={() => changeScene("HOME")}
          /> */}
        </div>
        <div className="flex flex-col h-full w-full px-4 pb-6 backdrop-blur-none overflow-y-visible overflow-auto">
          {/* Hunter Details */}
          <div className="absolute left-0 top-0 w-full">
            <>
              <img
                src="image/pnlJurassicMarketBackgroundNew.png"
                className="w-full object-cover"
                alt="pnlJurassicMarketBackground"
              />
              <div className="absolute top-4 w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
                <div className="flex flex-row justify-center font-bold font-Magra text-white text-lg [@media(max-width:400px)]:text-base">
                  Hunter's Rank
                </div>
              </div>
              <div className="absolute top-8 w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
                <div className="flex flex-row justify-between items-center px-1 font-bold font-Magra text-white text-base [@media(max-width:400px)]:text-sm">
                  <span>Requalification</span>
                  <span>Current Rank</span>
                </div>
              </div>
              {/* progress bar with image */}
              <div className="absolute inline-block top-12 w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
                <div className="flex flex-col items-center justify-center font-bold font-Magra text-white text-lg">
                  <div>
                    {/* progress fill */}
                    <div className="absolute top-0 max-w-[156px] z-0">
                      <img
                        src="image/imgRankExpBarFill.png"
                        className={`h-[25px] relative left-2`}
                        alt="imgRankExpBarFill"
                        width={(progress / 100) * 156}
                      />
                    </div>
                    <img
                      src="image/rankExpBarBg.png"
                      className="object-cover z-10"
                      alt="RankExpBarBg"
                    />
                  </div>
                  <div className="absolute top-[-5px] text-[0.8rem]">
                    {`${parseInt(group)}/${maxRankValue({
                      group: parseInt(group),
                    })}`}
                  </div>
                </div>
              </div>
              <div className="absolute top-12 w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
                <div className="flex flex-row justify-between px-1 font-bold font-Magra text-white [@media(max-width:400px)]:text-sm">
                  <span>{requalificationScore}</span>
                  <span>{userData?.title}</span>
                </div>
              </div>
              <div className="absolute top-[4.4rem] w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
                <div className="flex flex-row justify-between px-20 [@media(max-width:400px)]:px-16 font-bold font-Magra text-white text-sm">
                  <span className="text-red-500">
                    {rankLoaderBarProgress(userData?.title)?.[0]}
                  </span>
                  <span className="text-[9px] text-center ">
                    Reset: {rank_dateend}
                  </span>
                  <span>{rankLoaderBarProgress(userData?.title)?.[1]}</span>
                </div>
              </div>
            </>
          </div>

          {/* DinoCenter Pages & filters */}
          <div className="absolute w-full left-0 top-[6.6rem] [@media(max-width:400px)]:top-[6rem] ">
            <div className="flex flex-row w-full justify-between">
              {/* Pages */}
              <div className="flex w-full justify-start text-white font-Magra font-bold text-base [@media(max-width:400px)]:text-sm">
                <div
                  className={`cursor-pointer px-4 ${selectedPanel === "Listing"
                    ? "text-[#FFC700]"
                    : "text-white"
                    }`}
                  onClick={() => setSelectedPanel("Listing")}
                >
                  Listings
                </div>
                <div>/</div>
                <div
                  className={`cursor-pointer px-2 ${selectedPanel === "My Listing"
                    ? "text-[#FFC700]"
                    : "text-white"
                    }`}
                  onClick={() => setSelectedPanel("My Listing")}
                >
                  My Listings
                </div>
              </div>
              {/* Filters */}
              <div className="flex w-full text-white font-Magra font-bold text-base [@media(max-width:400px)]:text-sm">
                <div className="flex w-full items-end justify-end">
                  <div
                    onClick={() => filterEggList("Price")}
                    className="flex flex-row items-center px-2"
                  >
                    <span>Price</span>
                    <img
                      src="image/btnFilterIcon.png"
                      width={5}
                      className={`w-[0.7rem] ml-2 ${marketFilter === "Price" ? "rotate-180" : ""
                        }`}
                      alt="priceFilterIcon"
                    />
                  </div>
                  <div
                    onClick={() => filterEggList("Time")}
                    className="flex flex-row items-center px-4"
                  >
                    <span>Time</span>
                    <img
                      src="image/btnFilterIcon.png"
                      width={5}
                      className={`w-[0.7rem] ml-2 ${marketFilter === "Time" ? "rotate-180" : ""
                        }`}
                      alt="priceFilterIcon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market */}
          <div className="absolute left-0 top-[9rem] w-full h-[55vh]">
            {selectedPanel === "Finish" && (
              <>
                <div className="flex w-full justify-start font-Magra font-bold text-white"></div>
              </>
            )}
            {selectedPanel === "My Listing" && (
              <>
                {Math.floor(currentTime / 1000) <= 1684152000 &&
                  <div className="flex h-full justify-center items-center">
                    <p className="font-Magra text-white text-lg">Market start at 05/15 12:00 UTC</p>
                  </div>
                }
                <div className="flex w-full justify-start font-Magra font-bold text-white">
                  {unfinishedTransaction && eggTransactionData && (
                    <div className="p-4 w-full border-b-2 border-white">
                      {/* <p className='text-[#FFC700]'>{eggTransactionData?.id}</p> */}

                      <div className="flex flex-col items-center content-center mb-2">
                        <img
                          src="image/jurassicEggBgNew.png"
                          className="w-20 [@media(max-width:400px)]:w-[4.5rem] [@media(max-height:700px)]:w-[4.5rem]"
                          alt="jurassicEggBg"
                        />
                        <div>
                          <img
                            src={`${eggType(eggTransactionData?.ticket)}`}
                            className={`w-14 -mt-[4.6rem] [@media(max-width:400px)]:w-[2.6rem] [@media(max-height:700px)]:w-[2.6rem] [@media(max-width:400px)]:-mt-[3.9rem] [@media(max-height:700px)]:-mt-[3.9rem]`}
                            alt="imgJurassicEggIcon"
                          />
                        </div>
                        <p className="text-[#FFC700]">
                          {parseFloat(
                            parseFloat(
                              formatUnits(eggTransactionData?.total, 18)
                            ).toFixed(2)
                          ).toString()}{" "}
                          USDT
                        </p>
                        <p className="p-1 bg-gray-700 rounded-sm mb-2">{`${countdownTime.countdownHours.toString().length === 1
                          ? `0${countdownTime.countdownHours}`
                          : countdownTime.countdownHours
                          }:${countdownTime.countdownMinutes.toString().length === 1
                            ? `0${countdownTime.countdownMinutes}`
                            : countdownTime.countdownMinutes
                          }:${countdownTime.countdownSeconds.toString().length === 1
                            ? `0${countdownTime.countdownSeconds}`
                            : countdownTime.countdownSeconds
                          }` || ""}</p>
                        {eggTransactionState?.mode === 'PURCHASE' && approved && parseFloat(approved as string) >= parseFloat(eggTransactionData.total) && (
                          <button
                            className={`${eggTransactionState?.state === "LOADING"
                              ? "bg-[#FFC700]"
                              : "bg-green-700 "} cursor-pointer px-4 py-2 rounded`}
                            onClick={async (raw: any) => {
                              setEggTransactionState({ mode: 'PURCHASE', state: 'LOADING' });
                              // setTransactionState('PURCHASE')
                              try {
                                const txReq = {
                                  data: eggTransactionData.TxRawPayment,
                                  to: PAYGATEWAY_ADDR,
                                  from: walletAddress,
                                };
                                const txSend = await sendPayTransaction(
                                  txReq,
                                  eggTransactionData
                                );
                                console.log("txSend payment", txSend);
                              } catch (error) {
                                // @ts-ignore
                                toast(error);
                              }
                            }}
                            disabled={eggTransactionState?.state === 'LOADING'}
                          >
                            {eggTransactionState?.state === 'LOADING'
                              ? "Waiting..."
                              : "Purchase"}
                          </button>
                        )}
                        {(eggTransactionState?.mode === 'APPROVAL' &&
                          <button
                            className={`${eggTransactionState?.state === "LOADING"
                              ? "bg-[#FFC700]"
                              : "bg-red-700"
                              } cursor-pointer px-4 py-2 rounded`}
                            onClick={async () => {
                              setEggTransactionState({ mode: 'APPROVAL', state: 'LOADING' });
                              // setTransactionState('APPROVAL')
                              // console.log("walletAddress", walletAddress);
                              // console.log("allowance ", allowance);
                              // console.log("account approve", walletAddress);
                              if (walletAddress?.length === 0)
                                activateBrowserWallet({ type: "metamask" });
                              else {
                                try {
                                  const txReq = {
                                    to: USDT_ADDR,
                                    from: walletAddress,
                                    data: eggTransactionData.TxRawApproval,
                                  };
                                  // sendEggApproval(USDT_ADDR, eggTransactionData?.total)
                                  console.log("txReq", txReq);
                                  const txSend = await sendTransaction(txReq);
                                  console.log("txSend", txSend);
                                } catch (error) {
                                  // @ts-ignore
                                  toast(error);
                                }
                              }
                            }}
                            disabled={eggTransactionState?.state === "LOADING"}
                          >
                            {eggTransactionState?.state === 'LOADING'
                              ? "Waiting..."
                              : "Approval"}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-4">
                  {myListingEggData?.map((egg: any, index: number) => {
                    return (
                      <EggComponent
                        key={index.toString()}
                        egg={egg}
                        index={egg?.id}
                        currentTime={currentTime}
                        filter={''}
                      />
                    );
                  })}
                </div>
              </>
            )}
            {selectedPanel === "Listing" && (
              <>
                <div className="grid grid-cols-4">
                  {currentPosts.map((egg, index) => {
                    return (
                      <EggComponent
                        key={egg.id}
                        egg={egg}
                        index={egg?.id}
                        filter={marketFilter}
                        currentTime={currentTime}
                        // customTimer={1683430121 + (1050 * index)}
                        onBtnKeepPress={() => {
                          // TODO: action button for keep, using idx from props as a differentiator
                          console.log("onBtnKeepPress", egg.id);
                          handleKeep(egg.id, egg.ticket);
                        }}
                      // onBtnPurchasePress={async () => {
                      //     // console.log("allowance ", allowance);
                      //     // console.log("account approve", walletAddress);
                      //     const txReq = {
                      //         to: USDT_ADDR,
                      //         from: walletAddress,
                      //         data: eggTransactionData.TxRawApproval,
                      //     };
                      //     console.log("txReq", txReq);
                      //     const txSend = await sendTransaction(txReq);
                      //     console.log("txSend", txSend);
                      // }}
                      // onBtnPayPress={async (raw: any) => {
                      //     const txReq = {
                      //         data: raw,
                      //         to: PAYGATEWAY_ADDR,
                      //         from: walletAddress,
                      //     };
                      //     const txSend = await sendPayTransaction(txReq, eggTransactionData);
                      //     console.log("txSend payment", txSend);
                      // }}
                      />
                    );
                  })}
                </div>
                {Math.floor(currentTime / 1000) <= 1684152000 &&
                  <div className="flex h-full justify-center items-center">
                    <p className="font-Magra text-white text-lg">Market start at 05/15 12:00 UTC</p>
                  </div>
                }
                {currentPosts?.length > 0 &&
                  <div className="flex flex-row justify-center py-8">
                    <ReactPaginate
                      onPageChange={paginate}
                      pageCount={Math.ceil(
                        eggListsData?.lists?.length / postsPerPage
                      )}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      previousLabel={"<<"}
                      nextLabel={">>"}
                      containerClassName={
                        "flex flex-row text-white items-center text-2xl"
                      }
                      pageLinkClassName={"font-Magra px-2 "}
                      previousLinkClassName={`font-Magra text-white px-4 `}
                      nextLinkClassName={"font-Magra text-white px-4"}
                      // TODO: create circle button for active page
                      // activeLinkClassName={
                      //   "text-[#FFC700] w-8 h-8 rounded-full bg-[#1E1E1E] flex justify-center items-center"
                      // }
                      activeLinkClassName={"text-[#FFC700] "}
                    />
                    <img
                      onClick={() => getEggList()}
                      src="image/BtnRefreshListing.png"
                      // width={5}
                      className="mx-1 cursor-pointer"
                      alt="Refresh"
                    />
                  </div>
                }
              </>
            )}
          </div>
        </div>
      </div >
    </div >
  );
}

export default React.memo(JurassicMarket);
