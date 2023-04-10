import React, { useCallback, useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import {
  Stage,
  Container,
  Sprite,
  Text,
  useApp,
  AppProvider,
  Graphics,
  AnimatedSprite,
} from "@pixi/react";

type props = {
  spriteTexture: PIXI.Texture;
  imageIcon?: PIXI.Texture;
  priceText?: string;
  timerText?: string;
  priceTextStyle?: PIXI.TextStyle;
  timerTextStyle?: PIXI.TextStyle;
  posX: number;
  posY: number;
  priceTextXOffset?: number;
  priceTextYOffset?: number;
  timerTextXOffset?: number;
  timerTextYOffset?: number;
  imageXOffset?: number;
  imageYOffset?: number;
  scaleX?: number;
  scaleY?: number;
  ref?: any;
  x?: number;
  y?: number;
  scaleImgX?: number;
  scaleImgY?: number;
  onPress?: () => void;
  key?: string;
  index?: string;
};

const EggListingComponent = ({
  spriteTexture,
  imageIcon,
  priceText,
  timerText,
  priceTextStyle,
  timerTextStyle,
  posX,
  posY,
  priceTextXOffset = 0,
  priceTextYOffset = 0,
  timerTextXOffset = 0,
  timerTextYOffset = 0,
  imageXOffset = 0,
  imageYOffset = 0,
  scaleX = 1,
  scaleY = 1,
  ref = null,
  x = 0,
  y = 0,
  scaleImgX = 1,
  scaleImgY = 1,
  onPress,
  key,
  index,
}: props) => {
  const app = useApp();
  const containerRef = React.useRef(null);
  // const [timeLeft, setTimeLeft] = useState(
  //   1681145515 < new Date().getTime() / 1000
  // );
  const timerRef = useRef();
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
        `${
          countdownTime.countdownHours.toString().length === 1
            ? `0${countdownTime.countdownHours}`
            : countdownTime.countdownHours
        }:${
          countdownTime.countdownMinutes.toString().length === 1
            ? `0${countdownTime.countdownMinutes}`
            : countdownTime.countdownMinutes
        }:${
          countdownTime.countdownSeconds.toString().length === 1
            ? `0${countdownTime.countdownSeconds}`
            : countdownTime.countdownSeconds
        }` || ""
      );
  };

  return (
    <Container
      ref={ref || containerRef}
      scale={[scaleX, scaleY]}
      //  x={x}
      //  y={y}
      anchor={[0, 0]}
      eventMode="static"
      onpointertap={onPress}
      key={key}
    >
      {spriteTexture && (
        <>
          <Sprite
            // texture={PIXI.Assets.get('DinoFundLogo')}
            texture={spriteTexture || PIXI.Texture.EMPTY}
            anchor={[0.5, 0]}
            // scale={[0.5, 0.5]}
            position={[posX, posY]}
            // scale={[scaleX, scaleY]}
          />
          <Sprite
            texture={imageIcon || PIXI.Texture.EMPTY}
            anchor={[0.5, 0]}
            scale={[scaleImgX, scaleImgY]}
            position={[posX + imageXOffset, posY + imageYOffset]}
          />
          <Text
            text={priceText || ""}
            anchor={[0.5, 0]}
            position={[posX + priceTextXOffset, posY + priceTextYOffset]}
            style={priceTextStyle}
            // scale={[scaleX, scaleY]}
          />
          <Text
            // text={timerText || ""}
            text={countdownText()}
            anchor={[0.5, 0]}
            position={[posX + timerTextXOffset, posY + timerTextYOffset]}
            style={timerTextStyle}
            // scale={[scaleX, scaleY]}
          />
        </>
      )}
    </Container>
  );
};

export default EggListingComponent;
