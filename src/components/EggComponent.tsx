import React, { useEffect, useState } from 'react'
import { eggType } from '../utils/functions'
import { formatUnits } from 'ethers/lib/utils'
import { Egg, useAuthStore, useStore } from '../utils/store'
import { axiosInstance } from '../utils/api'

type EggComponentProps = {
    key?: string,
    egg: Egg,
    index: number,
    customTimer?: number,
    currentTime?: number,
    onBtnKeepPress?: () => void,
    onBtnPurchasePress?: (idx: number) => void,
    onBtnPayPress?: (raw: string) => void,
}

function EggComponent({
    currentTime,
    customTimer,
    egg,
    index,
    onBtnKeepPress,
    onBtnPayPress,
    onBtnPurchasePress,
}: EggComponentProps) {


    const approved = useStore((state) => state.approved);
    const eggTransactionData = useStore((state) => state.eggTransactionData);
    const [expiryTime, setExpiryTime] = useState(customTimer ? customTimer : egg?.openat);
    // console.log('expiryTime', expiryTime)
    // console.log('currentTime', currentTime, 'index: ', index)
    const [countdownTime, setCountdownTime] = useState({
        countdownHours: 0,
        countdownMinutes: 0,
        countdownSeconds: 0,
    });

    useEffect(() => {
        let timeInterval: any;
        // const countdown = () => {
        if (expiryTime > 0 && currentTime) {
            // timeInterval = setInterval(() => {
            const countdownDateTime = expiryTime * 1000;
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
                setExpiryTime(0);
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
    }, [currentTime]);



    const countdownText = () => {
        if (expiryTime === 0) return "Keep";
        else
            return (
                `${countdownTime.countdownHours.toString().length === 1
                    ? `0${countdownTime.countdownHours}`
                    : countdownTime.countdownHours
                }:${countdownTime.countdownMinutes.toString().length === 1
                    ? `0${countdownTime.countdownMinutes}`
                    : countdownTime.countdownMinutes
                }:${countdownTime.countdownSeconds.toString().length === 1
                    ? `0${countdownTime.countdownSeconds}`
                    : countdownTime.countdownSeconds
                }` || ""
            );
    };
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
                    src={`${eggType(egg?.ticket)}`}
                    className={`w-14 -mt-[5.1rem] [@media(max-width:400px)]:w-[2.6rem] [@media(max-height:700px)]:w-[2.6rem] [@media(max-width:400px)]:-mt-[3.9rem] [@media(max-height:700px)]:-mt-[3.9rem]`}
                    alt="imgJurassicEggIcon"
                />
            </div>

            {/* price */}
            <div className="font magra font-bold decoration-from-font">
                <span className="text-[#FFC700] [@media(max-width:400px)]:text-sm">
                    {formatUnits(egg?.total, 18)} USDT
                </span>
            </div>

            {/* action button */}
            {!currentTime ? null :
                expiryTime > 0 ? (
                    <div>
                        <img
                            src="image/BtnPurchaseCountdown.png"
                            className="w-20 "
                            alt="BtnPurchaseCountdown"
                        />
                        <div className="flex w-full justify-center font magra font-bold decoration-from-font">
                            <span className="text-white -mt-[1.8rem]">
                                {countdownText()}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div onClick={() => {
                        if (approved && eggTransactionData && approved.toString() >= eggTransactionData.total && onBtnPayPress) {
                            onBtnPayPress(eggTransactionData.TxRawPayment)
                        }
                        else if (onBtnKeepPress) onBtnKeepPress()
                    }}>
                        <img
                            src="image/BtnPurchaseActive.png"
                            className="w-20 "
                            alt="BtnPurchaseActive"
                        />
                        <div className="flex w-full justify-center font magra font-bold decoration-from-font cursor-pointer">
                            <span className="text-white -mt-[1.8rem]">
                                Keep
                            </span>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default React.memo(EggComponent)