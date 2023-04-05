import React, { useEffect, useRef, useState } from "react";
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
import DinoFundComponent from "../DinoFundComponent";
import ProfileComponent from "../ProfileComponent";
import DetailsComponent from "../DetailsComponent";
import LowerButtonComponent from "../LowerButtonComponent";
import EggListingComponent from "../EggListingComponent";

const DinoCenter = ({ setScene, scene }: any) => {
  const app = useApp();
  console.log("app.screen", app.screen);
  console.log("scene", scene);
  const [getHomeContainerBounds, setHomeContainerBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [toggleBtnAudio, setToggleBtnAudio] = useState(false);

  const ProfileBgBounds = PIXI.Assets.get("ProfileBg").orig;
  const ProfileAvatarDefaultBounds = PIXI.Assets.get(
    "ProfileAvatarDefault"
  ).orig;
  const DinoFundBgBounds = PIXI.Assets.get("DinoFundBg").orig;
  const DetailsBounds = PIXI.Assets.get("DiamondDetails").orig;
  const BtnSmallBounds = PIXI.Assets.get("LowerBtnSmallBg").orig;
  const BtnBigBounds = PIXI.Assets.get("LowerBtnBigBg").orig;

  const upperContainerRef = useRef(null);
  const homecontainerRef = useRef(null);
  useEffect(() => {
    // @ts-ignore
    setHomeContainerBounds(homecontainerRef.current.getBounds());
  }, []);

  useEffect(() => {
    console.log("homeContainerBounds", getHomeContainerBounds);
  }, [getHomeContainerBounds]);

  const dummyListingData = [
    { price: 1000, timestamp: 500 },
    { price: 1020, timestamp: 530 },
    { price: 1040, timestamp: 535 },
    { price: 1070, timestamp: 555 },
    { price: 1080, timestamp: 560 },
    { price: 1090, timestamp: 570 },
    { price: 1100, timestamp: 575 },
    { price: 1120, timestamp: 585 },
    { price: 1130, timestamp: 590 },
    { price: 1140, timestamp: 595 },
    { price: 1150, timestamp: 600 },
    { price: 1160, timestamp: 605 },
  ];
  // const dinoFundRef = useRef(null);
  // console.log('dinoFundRef', dinoFundRef.current)
  // useEffect(() => {
  //   // @ts-ignore
  //   console.log('upperContainerRef', upperContainerRef.current.getBounds())
  //   // @ts-ignore
  //   console.log('upperContainerRef getGlobalPosition', upperContainerRef.current.getGlobalPosition())
  // }, [])
  // console.log('avatar')
  const calculateEggXPosition = (index: number) => {
    return BtnSmallBounds.width + 90 * (index % 4);
  };
  const calculateEggYPosition = (index: number) => {
    return Math.floor(index / 4) * 100;
  };

  return (
    <Container>
      <Sprite
        texture={PIXI.Assets.get("MainBg")}
        width={
          app.screen.width < 450 ? app.screen.width * 1.5 : app.screen.width
        }
        height={app.screen.height}
        anchor={[0.5, 0.5]}
        position={[app.screen.width / 2, app.screen.height / 2]}
      />
      <Container
        ref={homecontainerRef}
        x={app.screen.width / 2}
        y={0}
        width={app.screen.width > 450 ? 450 : app.screen.width}
        // position={[app.screen.width / 2, 0]}
        // anchor={[0.5, 0.5]}
      >
        {/* Upper  Container */}
        <Container
          ref={upperContainerRef}
          // x={0}
          y={app.screen.width > 450 ? 20 : 0}
          // width={app.screen.width > 450 ? 450 : app.screen.width}
          anchor={[0.5, 0.5]}
        >
          <ProfileComponent
            spriteTexture={PIXI.Assets.get("ProfileBg")}
            avatarTexture={PIXI.Assets.get("ProfileAvatarDefault")}
            text={`h=${app.screen.height.toFixed()}`}
            componentPosX={
              app.screen.width > 450
                ? -(ProfileBgBounds.width * 2.4)
                : -(ProfileBgBounds.width * 2.4)
            }
            componentPosY={0}
            avatarXOffset={0}
            avatarYOffset={
              (ProfileBgBounds.height / 2 -
                ProfileAvatarDefaultBounds.height / 2) *
              0.5
            }
            textYOffset={ProfileBgBounds.height - 8}
            textStyle={
              new PIXI.TextStyle({
                fontFamily: "Magra Bold",
                fontSize: 16,
                fontWeight: "bold",
                fill: ["0x705802"],
              })
            }
            onPress={() => {
              console.log("onPress ProfileComponent");
            }}
          />

          <DinoFundComponent
            spriteTexture={PIXI.Assets.get("DinoFundBg")}
            text="Dino Center"
            // text={`w=${getHomeContainerBounds.width.toFixed()} h=${getHomeContainerBounds.height}`}
            posX={0}
            posY={0}
            scaleX={app.screen.width > 450 ? 0.87 : 0.75}
            textYOffest={(DinoFundBgBounds.height * 0.5) / 2 - 5}
            textStyle={
              new PIXI.TextStyle({
                fontFamily: "Magra Bold",
                fontSize: 24,
                fontWeight: "bold",
                fill: ["0xFFC700"],
              })
            }
          />

          <Container
            position={[
              (DinoFundBgBounds.width / 2) *
                (app.screen.width > 450 ? 1.05 : 1),
              DinoFundBgBounds.height / 2 - 7,
            ]}
          >
            {/* Button Language */}
            <Sprite
              texture={PIXI.Assets.get("BtnLngHome")}
              width={app.screen.width > 450 ? 35 : 30}
              height={app.screen.width > 450 ? 35 : 30}
              anchor={[0.5, 0.5]}
              x={0}
              y={0}
              eventMode={"static"}
              onpointertap={() => {
                console.log("BtnLngHome clicked");
              }}
            />
            {/* Button Share */}
            <Sprite
              texture={PIXI.Assets.get("BtnShareHome")}
              width={app.screen.width > 450 ? 35 : 30}
              height={app.screen.width > 450 ? 35 : 30}
              anchor={[0.5, 0.5]}
              x={20 * (app.screen.width > 450 ? 2 : 1.6)}
              y={0}
              eventMode={"static"}
              onpointertap={() => {
                console.log("BtnShareHome clicked");
              }}
            />
            {/* Button Audio on/mute */}
            <Sprite
              texture={PIXI.Assets.get(
                toggleBtnAudio ? "BtnAudioHomeOn" : "BtnAudioHomeMute"
              )}
              width={app.screen.width > 450 ? 35 : 30}
              height={app.screen.width > 450 ? 35 : 30}
              anchor={[0.5, 0.5]}
              x={20 * (app.screen.width > 450 ? 4 : 3.2)}
              y={0}
              eventMode={"static"}
              onpointertap={() => {
                // set toggle audio
                setToggleBtnAudio(!toggleBtnAudio);
              }}
            />
          </Container>
        </Container>

        {/* Details Container */}
        <Container
          x={-(app.screen.width / 2)}
          y={app.screen.width > 450 ? 120 : 100}
          width={app.screen.width > 450 ? 450 : app.screen.width}
          visible={false}
          // anchor={[0.5, 0.5]}
        >
          {/* left side */}
          <DetailsComponent
            spriteTexture={PIXI.Assets.get("DiamondDetails")}
            text={"123.123.123"}
            posX={app.screen.width / 2 - (DetailsBounds.width / 2) * 1.4}
            posY={20}
            textStyle={
              new PIXI.TextStyle({
                fontFamily: "Magra Bold",
                fontSize: 20,
                fontWeight: "bold",
                fill: ["0xFFC700"],
              })
            }
            textYOffest={-3}
            textXOffest={10}
            onPress={() => {
              console.log("onPress DiamondDetails");
            }}
          />
          <DetailsComponent
            spriteTexture={PIXI.Assets.get("StarDetails")}
            text={"123.123.123"}
            posX={app.screen.width / 2 - (DetailsBounds.width / 2) * 1.4}
            posY={DetailsBounds.height + 35}
            textStyle={
              new PIXI.TextStyle({
                fontFamily: "Magra Bold",
                fontSize: 20,
                fontWeight: "bold",
                fill: ["0xFFC700"],
              })
            }
            textYOffest={-2}
            textXOffest={10}
            onPress={() => {
              console.log("onPress DiamondDetails");
            }}
          />

          {/* right side */}
          <DetailsComponent
            spriteTexture={PIXI.Assets.get("BNBDetails")}
            text={"0.55012312"}
            posX={app.screen.width / 2 + (DetailsBounds.width / 2) * 1.4}
            posY={0}
            textStyle={
              new PIXI.TextStyle({
                fontFamily: "Magra Bold",
                fontSize: 20,
                fontWeight: "bold",
                fill: ["0xFFC700"],
              })
            }
            textYOffest={-3}
            textXOffest={10}
            onPress={() => {
              console.log("onPress BNBDetails");
            }}
          />
          <DetailsComponent
            spriteTexture={PIXI.Assets.get("InGameTokenDetails")}
            text={"123.123.123"}
            posX={app.screen.width / 2 + (DetailsBounds.width / 2) * 1.4}
            posY={DetailsBounds.height + 12}
            textStyle={
              new PIXI.TextStyle({
                fontFamily: "Magra Bold",
                fontSize: 20,
                fontWeight: "bold",
                fill: ["0xFFC700"],
              })
            }
            textYOffest={-1}
            textXOffest={10}
            onPress={() => {
              console.log("onPress BNBDetails");
            }}
          />

          <DetailsComponent
            spriteTexture={PIXI.Assets.get("HuntingBonusDetails")}
            text={"123.123.123"}
            posX={app.screen.width / 2 + (DetailsBounds.width / 2) * 1.4}
            posY={DetailsBounds.height * 2 + 30}
            textStyle={
              new PIXI.TextStyle({
                fontFamily: "Magra Bold",
                fontSize: 20,
                fontWeight: "bold",
                fill: ["0xFFC700"],
              })
            }
            textYOffest={-1}
            textXOffest={10}
            onPress={() => {
              console.log("onPress BNBDetails");
            }}
          />
        </Container>

        {/* Lower Button Container */}
        {getHomeContainerBounds && (
          <Container
            anchor={[0.5, 0.5]}
            x={-190}
            y={app.screen.height / 2 - 100}
            // width={app.screen.width > 450 ? 450 : app.screen.width}
          >
            {/* left side */}
            {dummyListingData.map((d, idx) => {
              return (
                <EggListingComponent
                  spriteTexture={PIXI.Assets.get("LowerBtnSmallBg")}
                  imageIcon={PIXI.Assets.get("ImgDinoCenter")}
                  priceText={d.price.toString()}
                  timerText={d.timestamp.toString()}
                  // posX={BtnSmallBounds.width - (70 * idx)}
                  posX={calculateEggXPosition(idx)}
                  posY={calculateEggYPosition(idx)}
                  imageYOffset={10}
                  priceTextYOffset={BtnSmallBounds.height / 2 + 13}
                  timerTextYOffset={BtnSmallBounds.height / 2 + 30}
                  priceTextStyle={
                    new PIXI.TextStyle({
                      fontFamily: "Magra Bold",
                      fontSize: 12,
                      fontWeight: "bold",
                      fill: ["0xFFC700"],
                    })
                  }
                  timerTextStyle={
                    new PIXI.TextStyle({
                      fontFamily: "Magra Bold",
                      fontSize: 12,
                      fontWeight: "bold",
                      fill: ["0xFFC700"],
                    })
                  }
                  onPress={() => setScene("DINOCENTER")}
                />
              );
            })}
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default DinoCenter;
