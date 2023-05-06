import React, { useEffect, useState } from 'react'
import { useStore } from '../utils/store';
import EggComponent from '../components/EggComponent';
import { rankRequalification, rankLoaderBarProgress } from '../utils/functions';
import { formatUnits } from 'ethers/lib/utils';

function JurassicMarket() {
    const userData = useStore((state) => state.userData);
    const eggListsData = useStore((state) => state.eggListsData);
    const changeScene = useStore((state) => state.changeScene);
    const period = formatUnits(userData?.bought.period, 18)
    const group = formatUnits(userData?.bought.group, 18)
    const total = formatUnits(userData?.bought.total, 18)
    const progress = (parseInt(group) / parseInt(total)) * 100
    // const currentTime = new Date().getTime();
    const [currentTime, setCurrentTime] = useState(new Date().getTime())

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
                                {eggListsData?.lists.map((egg, index) => {
                                    return (
                                        <EggComponent key={egg.id} egg={egg} index={index} currentTime={currentTime} customTimer={1683355142 + (1000 * index)} />
                                        // <div
                                        //   key={index}
                                        //   className="flex flex-col items-center content-center "
                                        // >
                                        //   <img
                                        //     src="image/jurassicEggBg.png"
                                        //     className="w-24 [@media(max-width:400px)]:w-[4.5rem] [@media(max-height:700px)]:w-[4.5rem]"
                                        //     alt="jurassicEggBg"
                                        //   />
                                        //   <div>
                                        //     <img
                                        //       src={`${eggType(egg?.ticket)}`}
                                        //       className={`w-14 -mt-[5.1rem] [@media(max-width:400px)]:w-[2.6rem] [@media(max-height:700px)]:w-[2.6rem] [@media(max-width:400px)]:-mt-[3.9rem] [@media(max-height:700px)]:-mt-[3.9rem]`}
                                        //       alt="imgJurassicEggIcon"
                                        //     />
                                        //   </div>

                                        //   {/* price */}
                                        //   <div className="font magra font-bold decoration-from-font">
                                        //     <span className="text-[#FFC700] [@media(max-width:400px)]:text-sm">
                                        //       {formatUnits(egg?.total, 18)} USDT
                                        //     </span>
                                        //   </div>

                                        //   {/* action button */}
                                        //   {true ? (
                                        //     <div>
                                        //       <img
                                        //         src="image/BtnPurchaseCountdown.png"
                                        //         className="w-20 "
                                        //         alt="BtnPurchaseCountdown"
                                        //       />
                                        //       <div className="flex w-full justify-center font magra font-bold decoration-from-font">
                                        //         <span className="text-white -mt-[1.8rem]">
                                        //           00:00:00
                                        //         </span>
                                        //       </div>
                                        //     </div>
                                        //   ) : (
                                        //     <div>
                                        //       <img
                                        //         src="image/BtnPurchaseActive.png"
                                        //         className="w-20 "
                                        //         alt="BtnPurchaseActive"
                                        //       />
                                        //       <div className="flex w-full justify-center font magra font-bold decoration-from-font">
                                        //         <span className="text-white -mt-[1.8rem]">
                                        //           Keep
                                        //         </span>
                                        //       </div>
                                        //     </div>
                                        //   )}
                                        // </div>
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