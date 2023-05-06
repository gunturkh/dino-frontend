import React, { useEffect, useState } from 'react'
import { useAuthStore, useStore } from '../utils/store';
import EggComponent from '../components/EggComponent';
import { rankRequalification, rankLoaderBarProgress } from '../utils/functions';
import { formatUnits } from 'ethers/lib/utils';
import { axiosInstance } from '../utils/api';
import { PAYGATEWAY_ADDR, USDT_ADDR } from '../utils/config';
import { toast } from "react-toastify";

function JurassicMarket({
    sendTransaction,
    sendPayTransaction,
}: any) {
    const token = useAuthStore((state) => state.token);
    const walletAddress = useStore((state) => state.walletAddress);
    const eggTransactionData = useStore((state) => state.eggTransactionData);
    const setEggTransactionData = useStore(
        (state) => state.setEggTransactionData
    );
    const userData = useStore((state) => state.userData);
    const eggListsData = useStore((state) => state.eggListsData);
    const changeScene = useStore((state) => state.changeScene);
    const period = formatUnits(userData?.bought.period, 18)
    const group = formatUnits(userData?.bought.group, 18)
    const total = formatUnits(userData?.bought.total, 18)
    const progress = (parseInt(group) / parseInt(total)) * 100
    // const currentTime = new Date().getTime();
    const [selectedPanel, setSelectedPanel] = useState("Listing");
    const [unfinishedTransaction, setUnfinishedTransaction] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date().getTime())

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
            getUnfinishedEggTransaction()
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
            setUnfinishedTransaction(data?.result)
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

    // TODO: handle unfinished egg and continue the transaction
    useEffect(() => {
        getUnfinishedEggTransaction()
    }, [])

    console.log('unfinishedTransaction', unfinishedTransaction)


    useEffect(() => {
        let timeInterval: any;
        const countdown = () => {
            timeInterval = setInterval(() => {
                // const countdownDateTime = expiryTime * 1000;
                // const currentTime = new Date().getTime();
                setCurrentTime(new Date().getTime())
                // const remainingDayTime = countdownDateTime - currentTime;
                // // console.log(`countdownDateTime ${index}`, countdownDateTime);
                // // console.log(`currentTime ${index}`, currentTime);
                // // console.log(`remainingDayTime ${index}`, remainingDayTime);
                // const totalHours = Math.floor(
                //     (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                // );
                // const totalMinutes = Math.floor(
                //     (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
                // );
                // const totalSeconds = Math.floor(
                //     (remainingDayTime % (1000 * 60)) / 1000
                // );

                // const runningCountdownTime = {
                //     countdownHours: totalHours,
                //     countdownMinutes: totalMinutes,
                //     countdownSeconds: totalSeconds,
                // };

                // if (remainingDayTime < 0) {
                //     clearInterval(timeInterval);
                //     setExpiryTime(0);
                // } else {
                //     setCountdownTime(runningCountdownTime);
                // }
            }, 1000);
        }
        countdown();
        return () => {
            clearInterval(timeInterval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
                                <div className={`cursor-pointer px-4 ${selectedPanel === 'Listing' ? 'text-[#FFC700]' : 'text-white'}`} onClick={() => setSelectedPanel('Listing')}>Listings</div>
                                <div>/</div>
                                <div className={`cursor-pointer px-2 ${selectedPanel === 'My Listing' ? 'text-[#FFC700]' : 'text-white'}`} onClick={() => setSelectedPanel('My Listing')}>My Listings</div>
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
                        {selectedPanel === 'My Listing' ? (
                            <div className="flex w-full h-full justify-start font-Magra font-bold text-white">
                                {unfinishedTransaction &&
                                    <div className='px-4 w-full h-24 border-b-2 border-white'>
                                        <p className='text-[#FFC700]'>Unfinished</p>
                                        <p>{unfinishedTransaction}</p>
                                    </div>
                                }
                            </div>
                        ) : (
                            <div className="grid grid-cols-4">
                                {eggListsData?.lists.map((egg, index) => {
                                    return (
                                        <EggComponent
                                            key={egg.id}
                                            egg={egg}
                                            index={index}
                                            currentTime={currentTime}
                                            customTimer={1683355142 + (1000 * index)}
                                            onBtnKeepPress={() => {
                                                // TODO: action button for keep, using idx from props as a differentiator
                                                console.log("onBtnKeepPress", egg.id);
                                                handleKeep(egg.id, egg.ticket);
                                            }}
                                            onBtnPurchasePress={async () => {
                                                // console.log("allowance ", allowance);
                                                // console.log("account approve", walletAddress);
                                                const txReq = {
                                                    to: USDT_ADDR,
                                                    from: walletAddress,
                                                    data: eggTransactionData.TxRawApproval,
                                                };
                                                console.log("txReq", txReq);
                                                const txSend = await sendTransaction(txReq);
                                                console.log("txSend", txSend);
                                            }}
                                            onBtnPayPress={async (raw: any) => {
                                                const txReq = {
                                                    data: raw,
                                                    to: PAYGATEWAY_ADDR,
                                                    from: walletAddress,
                                                };
                                                const txSend = await sendPayTransaction(txReq, eggTransactionData);
                                                console.log("txSend payment", txSend);
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JurassicMarket