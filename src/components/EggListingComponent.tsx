import { useCallback, useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import {
  Container,
  Sprite,
  Text,
  useApp,
} from "@pixi/react";

type props = {
  priceText?: string;
  timerText?: string;
  key?: string;
  index?: string;
  idx: number,
  eggType: number,
  onBtnKeepPress: (idx: number) => void,
};

const EggListingComponent = ({
  priceText,
  timerText,
  key,
  index,
  idx,
  eggType,
  onBtnKeepPress,
}: props) => {
  const app = useApp();
  const isNotMobile = app.screen.width >= 430;

  const [listingItemBounds, setListingItemBounds] = useState({
    x: 0, y: 0, width: 0, height: 0
  });

  const calculateEggXPosition = (index: number) => {
    return listingItemBounds.width + 95 * (index % 4);
  };
  const calculateEggYPosition = (index: number) => {
    return Math.floor(index / 4) * 135;
  };

  const listingItemBgRef = useCallback((node: any) => {
    if (node !== null) {
      setListingItemBounds(node.getBounds());
    }
  }, []);

  const listingActionBtnRef = useCallback((node: any) => {
    if (node !== null && listingItemBounds.height > 0) {
      node.y = listingItemBounds.height * (isNotMobile ? 0.25 : 0.3)
    }
  }, [isNotMobile, listingItemBounds.height]);

  const [expiryTime, setExpiryTime] = useState(parseInt(timerText as string));
  const [countdownTime, setCountdownTime] = useState({
    countdownHours: 0,
    countdownMinutes: 0,
    countdownSeconds: 0,
  });

  useEffect(() => {
    let timeInterval: any;
    const countdown = () => {
      if (expiryTime > 0) {
        timeInterval = setInterval(() => {
          const countdownDateTime = expiryTime * 1000;
          const currentTime = new Date().getTime();
          const remainingDayTime = countdownDateTime - currentTime;
          console.log(`countdownDateTime ${index}`, countdownDateTime);
          console.log(`currentTime ${index}`, currentTime);
          console.log(`remainingDayTime ${index}`, remainingDayTime);
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
        }, 1000);
      }
    };
    countdown();
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

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
    <Container
      x={calculateEggXPosition(idx)}
      y={calculateEggYPosition(idx)}
    >
      <Sprite
        ref={listingItemBgRef}
        texture={PIXI.Assets.get("ListingItemBg")}
        anchor={[0.5, 0.5]}
        scale={isNotMobile ? [0.9, 0.85] : [0.9, 0.9]}
      />
      <Sprite
        texture={PIXI.Assets.get(eggType === 4 ? "EggIcon3" : eggType === 2 ? "EggIcon2" : eggType === 1 ? "EggIcon1" : '')}
        anchor={[0.5, 0.5]}
        scale={isNotMobile ? [0.75, 0.85] : [0.8, 0.9]}
      />

      {/* Action Button */}
      <Container
        ref={listingActionBtnRef}
        eventMode="static"
        onpointertap={() => {
          if (countdownText() !== 'Keep') return
          else return onBtnKeepPress(idx);
        }}
      >
        <Text
          text={priceText}
          position={[0, isNotMobile ? 10 : 7]}
          anchor={[0.5, 0]}
          style={new PIXI.TextStyle({
            fontFamily: 'Magra Bold',
            fontSize: isNotMobile ? 16 : 15,
            fontWeight: '600',
            strokeThickness: 1,
            fill: ['0xFFB800'],
          })}
        />
        <Container position={[0, isNotMobile ? 30 : 25]}>
          <Sprite
            texture={PIXI.Assets.get(countdownText() === 'Keep' ? "BtnPurchaseActive" : "BtnPurchaseCountdown")}
            anchor={[0.5, 0]}
            position={[0, 0]}
          />
          <Text
            text={countdownText()}
            position={[0, isNotMobile ? 2.5 : 2.5]}
            anchor={[0.5, 0]}
            style={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: isNotMobile ? 16 : 15,
              fontWeight: '600',
              strokeThickness: 1,
              fill: ['white'],
            })}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default EggListingComponent;
