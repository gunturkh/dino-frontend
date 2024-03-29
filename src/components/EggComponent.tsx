import React, { useEffect, useState } from "react";
import { eggType } from "../utils/functions";
import { formatUnits } from "ethers/lib/utils";
import { Egg, useStore } from "../utils/store";
// import { axiosInstance } from "../utils/api";

type EggComponentProps = {
  key?: string;
  egg: Egg;
  index: string;
  customTimer?: number;
  currentTime?: number;
  filter?: string;
  onBtnKeepPress?: () => void;
  onBtnPurchasePress?: (idx: number) => void;
  onBtnPayPress?: (raw: string) => void;
};

function EggComponent({
  currentTime,
  customTimer,
  egg,
  index,
  // filter,
  onBtnKeepPress,
  onBtnPayPress,
  onBtnPurchasePress,
}: EggComponentProps) {
  // const token = useAuthStore((state) => state.token);
  const approved = useStore((state) => state.approved);
  const eggTransactionData = useStore((state) => state.eggTransactionData);
  // const setEggListsData = useStore((state) => state.setEggListsData);
  // const setEggPendingListData = useStore(
  //   (state) => state.setEggPendingListData
  // );
  const [expiryTime, setExpiryTime] = useState(
    // customTimer ? customTimer : egg?.openat
    egg?.listat ? egg?.listat : egg?.openat
  );
  // console.log('expiryTime', expiryTime)
  // console.log('currentTime', currentTime, 'index: ', index)
  const [countdownTime, setCountdownTime] = useState({
    countdownHours: 0,
    countdownMinutes: 0,
    countdownSeconds: 0,
  });

  // const getEggList = async () => {
  //   let options = {
  //     headers: {
  //       "my-auth-key": token,
  //     },
  //   };
  //   const data: any = await axiosInstance({
  //     url: "/egg/lists",
  //     method: "GET",
  //     headers: options.headers,
  //   });
  //   console.log("getEggList Result:", data);
  //   if (data?.status === 200 && data?.data?.result?.lists) {
  //     setEggListsData(data?.data?.result);
  //     // setEggListsData({ remaining: 0, lists: [] });
  //   }
  // };

  // const getPendingListingEgg = async () => {
  //   let options = {
  //     headers: {
  //       "my-auth-key": token,
  //     },
  //   };
  //   const { data }: any = await axiosInstance({
  //     url: "/egg/pendingListing",
  //     method: "GET",
  //     headers: options.headers,
  //   });
  //   console.log("get pendingListing egg Result:", data);
  //   if (data?.success) {
  //     setEggPendingListData(data?.result);
  //   }
  // };
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
      const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

      const runningCountdownTime = {
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };

      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        setExpiryTime(0);
        // if (filter === '') {
        //   getPendingListingEgg()
        //   getEggList()
        // }
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
    <div key={index} className="flex flex-col items-center content-center mb-2">
      <img
        src="image/jurassicEggBgNew.png"
        className="w-20 [@media(max-width:400px)]:w-[4.5rem] [@media(max-height:700px)]:w-[4.5rem]"
        alt="jurassicEggBg"
      />
      <div>
        <img
          src={`${eggType(egg?.ticket)}`}
          className={`w-[3.5rem] -mt-[4.6rem] [@media(max-width:400px)]:w-[2.6rem] [@media(max-height:700px)]:w-[2.6rem] [@media(max-width:400px)]:-mt-[3.9rem] [@media(max-height:700px)]:-mt-[3.9rem]`}
          alt="imgJurassicEggIcon"
        />
      </div>

      {/* price */}
      <div className="font magra font-bold decoration-from-font">
        <span className="text-white text-sm [@media(max-width:400px)]:text-sm">
          {parseFloat(
            parseFloat(formatUnits(egg?.total, 18)).toFixed(2)
          ).toString()}{" "}
          DNF
        </span>
      </div>

      {/* action button */}
      {!currentTime ? null : expiryTime > 0 ? (
        <div>
          <img
            src="image/BtnPurchaseCountdownNew.png"
            className="w-20"
            alt="BtnPurchaseCountdown"
          />
          <div className="flex w-full justify-center font magra font-bold decoration-from-font">
            <span className="text-white -mt-[1.8rem]">{countdownText()}</span>
          </div>
        </div>
      ) : !egg?.listat && !!egg?.openat ? (
        <div
          onClick={() => {
            if (
              approved &&
              eggTransactionData &&
              approved.toString() >= eggTransactionData.total &&
              onBtnPayPress
            ) {
              onBtnPayPress(eggTransactionData.TxRawPayment);
            } else if (onBtnKeepPress) onBtnKeepPress();
          }}
        >
          <img
            src="image/BtnPurchaseActive.png"
            className="w-20 "
            alt="BtnPurchaseActive"
          />
          <div className="flex w-full justify-center font magra font-bold decoration-from-font cursor-pointer">
            <span className="text-white -mt-[1.8rem]">Keep</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(EggComponent);
