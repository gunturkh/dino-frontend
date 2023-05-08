import React, { useEffect, useState } from 'react'
import { useAuthStore, useStore } from '../utils/store';
import EggComponent from '../components/EggComponent';
import { rankLoaderBarProgress, rankProgress } from '../utils/functions';
import { formatUnits } from 'ethers/lib/utils';
import { axiosInstance } from '../utils/api';
import { PAYGATEWAY_ADDR, USDT_ADDR } from '../utils/config';
import { toast } from "react-toastify";
import ReactPaginate from 'react-paginate';
import { useEthers } from '@usedapp/core';

function JurassicMarket({
    sendTransaction,
    sendPayTransaction,
}: any) {
    const { activateBrowserWallet, } = useEthers();
    const token = useAuthStore((state) => state.token);
    const walletAddress = useStore((state) => state.walletAddress);
    const eggTransactionData = useStore((state) => state.eggTransactionData);
    const setEggTransactionData = useStore(
        (state) => state.setEggTransactionData
    );
    const userData = useStore((state) => state.userData);
    const eggListsData = useStore((state) => state.eggListsData);
    const setEggListsData = useStore((state) => state.setEggListsData);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = eggListsData?.lists.slice(indexOfFirstPost, indexOfLastPost);

    const changeScene = useStore((state) => state.changeScene);
    const period = formatUnits(userData?.bought.period, 18)
    // const group = formatUnits(userData?.bought.group, 18)
    const total = formatUnits(userData?.bought.total, 18)
    const progress = (parseInt(period) / parseInt(total)) * 100
    // console.log('progress JurassicMarket', progress)
    const approved = useStore((state) => state.approved);
    // console.log('approved jurassic market', approved)
    // console.log('approved jurassic market to string', approved?.toString())
    // console.log('eggTransactionData jurassic market', eggTransactionData)
    // console.log('approved.toString() >= eggTransactionData.total ', approved?.toString() >= eggTransactionData.total)
    // const currentTime = new Date().getTime();
    const [selectedPanel, setSelectedPanel] = useState<'My Listing' | 'Listing' | 'Finish'>("Listing");
    const [unfinishedTransaction, setUnfinishedTransaction] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date().getTime())
    const [myListingEgg, setMyListingEgg] = useState<any>([])
    const rank_dateend = new Date(userData?.rank_end * 1000).toLocaleString();

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
            setSelectedPanel("Finish");
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
            setMyListingEgg(data?.result)
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

    // TODO: handle unfinished egg and continue the transaction
    useEffect(() => {
        getUnfinishedEggTransaction()
        getMyListingEgg()

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
    }, [])

    console.log('unfinishedTransaction', unfinishedTransaction)


    useEffect(() => {
        let timeInterval: any;
        const countdown = () => {
            timeInterval = setInterval(() => {
                setCurrentTime(new Date().getTime())
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
                                <div className="flex flex-row justify-between items-center px-1 font-bold font-Magra text-white text-base [@media(max-width:400px)]:text-sm">
                                    <span>Requalification</span>
                                    <span>Current Rank</span>
                                </div>
                            </div>
                            {/* progress bar with image */}
                            {/* TODO: need to update styling to accept dynamic progress bar fill */}
                            <div className="absolute inline-block top-12 w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
                                <div className="flex flex-col items-center justify-center font-bold font-Magra text-white text-lg">
                                    <div>
                                        {/* progress fill */}
                                        <div className="absolute top-0 max-w-[156px] z-0">
                                            <img
                                                src="image/imgRankExpBarFill.png"
                                                className={`h-[25px] relative left-2`}
                                                alt="imgRankExpBarFill"
                                                width={progress / 100 * 156}
                                            />
                                        </div>
                                        <img
                                            src="image/RankExpBarBg.png"
                                            className="object-cover z-10"
                                            alt="RankExpBarBg"
                                        />
                                    </div>
                                    <div className="absolute top-[-5px] text-[0.8rem]">
                                        {`${parseInt(period)}/${rankProgress(userData?.title)}`}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-12 w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
                                <div className="flex flex-row justify-between px-1 font-bold font-Magra text-white [@media(max-width:400px)]:text-sm">
                                    <span>{parseInt(period)}</span>
                                    <span>{(userData?.title)}</span>
                                </div>
                            </div>
                            <div className="absolute top-[4.4rem] w-full max-[450px]:w-[calc(100vw)] max-w-[450px]">
                                <div className="flex flex-row justify-between px-20 font-bold font-Magra text-white text-sm">
                                    <span className="text-red-500">{rankLoaderBarProgress(userData?.title)?.[0]}</span>
                                    <span className='text-[9px] text-center '>Reset: {rank_dateend}</span>
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
                        {selectedPanel === 'Finish' &&
                            <>
                                <div className="flex w-full justify-start font-Magra font-bold text-white">
                                    {eggTransactionData &&
                                        <div className='px-4 w-full h-24 border-b-2 border-white'>
                                            {/* <p className='text-[#FFC700]'>{eggTransactionData?.id}</p> */}
                                            <p className='text-[#FFC700]'>{
                                                parseFloat(
                                                    parseFloat(formatUnits(eggTransactionData?.total, 18)).toFixed(2)
                                                ).toString()} USDT</p>
                                            {approved && approved?.toString() >= eggTransactionData.total ?
                                                <button className='bg-green-700 cursor-pointer px-4 py-2 rounded' onClick={async (raw: any) => {
                                                    try {
                                                        const txReq = {
                                                            data: eggTransactionData.TxRawPayment,
                                                            to: PAYGATEWAY_ADDR,
                                                            from: walletAddress,
                                                        };
                                                        const txSend = await sendPayTransaction(txReq, eggTransactionData);
                                                        console.log("txSend payment", txSend);
                                                    } catch (error) {
                                                        // @ts-ignore
                                                        toast(error)
                                                    }
                                                }}>Purchase</button>
                                                :
                                                <button className='bg-red-700 cursor-pointer px-4 py-2 rounded' onClick={async () => {
                                                    console.log('walletAddress', walletAddress)
                                                    // console.log("allowance ", allowance);
                                                    // console.log("account approve", walletAddress);
                                                    if (walletAddress?.length === 0) activateBrowserWallet({ type: 'metamask' })
                                                    else {
                                                        try {
                                                            const txReq = {
                                                                to: USDT_ADDR,
                                                                from: walletAddress,
                                                                data: eggTransactionData.TxRawApproval,
                                                            };
                                                            console.log("txReq", txReq);
                                                            const txSend = await sendTransaction(txReq);
                                                            console.log("txSend", txSend);
                                                        } catch (error) {
                                                            // @ts-ignore
                                                            toast(error)
                                                        }
                                                    }
                                                }}>Unlock Wallet</button>

                                            }
                                        </div>
                                    }
                                </div>

                            </>
                        }
                        {selectedPanel === 'My Listing' &&
                            <>
                                <div className="flex w-full justify-start font-Magra font-bold text-white">
                                    {unfinishedTransaction &&
                                        <div className='px-4 w-full h-24 border-b-2 border-white'>
                                            <p className='text-[#FFC700]'>Unfinished</p>
                                            <button className='bg-red-700 cursor-pointer px-4 py-2 rounded' onClick={() => setSelectedPanel('Finish')}>Click Here to Continue</button>
                                        </div>
                                    }
                                </div>

                                <div className="grid grid-cols-4">
                                    {myListingEgg?.map((egg: any, index: number) => {
                                        return (
                                            <EggComponent
                                                key={index.toString()}
                                                egg={egg}
                                                index={egg?.id}
                                            // currentTime={currentTime}
                                            />
                                        );
                                    })}
                                </div>
                            </>
                        }
                        {selectedPanel === 'Listing' &&
                            <>
                                <div className="grid grid-cols-4">
                                    {currentPosts.map((egg, index) => {
                                        return (
                                            <EggComponent
                                                key={egg.id}
                                                egg={egg}
                                                index={egg?.id}
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
                                <div className='flex flex-row justify-center py-8'>
                                    <ReactPaginate
                                        onPageChange={paginate}
                                        pageCount={Math.ceil(eggListsData?.lists?.length / postsPerPage)}
                                        previousLabel={'<<'}
                                        nextLabel={'>>'}
                                        containerClassName={'flex flex-row text-white text-2xl'}
                                        pageLinkClassName={'font-Magra px-2'}
                                        previousLinkClassName={'font-Magra text-white px-4'}
                                        nextLinkClassName={'font-Magra text-white px-4'}
                                        activeLinkClassName={'text-[#FFC700]'}
                                    />
                                    <img
                                        onClick={() => getEggList()}
                                        src="image/BtnRefreshListing.png"
                                        // width={5}
                                        className="mx-1 cursor-pointer"
                                        alt="Refresh"
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default JurassicMarket