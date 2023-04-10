import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { Container, Sprite, useApp } from "@pixi/react";
import DinoFundComponent from "../DinoFundComponent";
import ProfileComponent from "../ProfileComponent";
import DetailsComponent from "../DetailsComponent";
import EggListingComponent from "../EggListingComponent";
import { useStore } from "../../utils/store";
import { axiosInstance } from "../../utils/api";

const DinoCenter = ({ scene }: any) => {
  const app = useApp();
  const changeScene = useStore((state) => state.changeScene);
  const isNotMobile = app.screen.width > 450;
  console.log("app.screen", app.screen);
  console.log("scene", scene);
  const [getHomeContainerBounds, setHomeContainerBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [toggleBtnAudio, setToggleBtnAudio] = useState(false);
  const [eggLists, setEggLists] = useState([]);

  const ProfileBgBounds = PIXI.Assets.get("ProfileBg").orig;
  const ProfileAvatarDefaultBounds = PIXI.Assets.get(
    "ProfileAvatarDefault"
  ).orig;
  const DinoFundBgBounds = PIXI.Assets.get("DinoFundBg").orig;
  const BtnSmallBounds = PIXI.Assets.get("LowerBtnSmallBg").orig;

  const upperContainerRef = useRef(null);
  const homecontainerRef = useRef(null);
  useEffect(() => {
    // @ts-ignore
    setHomeContainerBounds(homecontainerRef.current.getBounds());
  }, []);

  useEffect(() => {
    console.log("homeContainerBounds", getHomeContainerBounds);
  }, [getHomeContainerBounds]);

  useEffect(() => {
    // /egg/lists
    const getEggList = async () => {
      const data: any = await axiosInstance({
        url: "/egg/lists",
        method: "GET",
      });
      console.log("getEggList Result:", data);
      if (data?.status === 200 && data?.data?.result?.lists) {
        setEggLists(data?.data?.result.lists);
      }
    };

    getEggList();
  }, []);

  const dummyListingData = [
    {
      id: "43d0dc7559ab1d630b1255b4bc073368",
      ticket: 2,
      total: "216000000000000000000",
      openat: 1681059000,
    },
    {
      id: "1b866c80f12fa4f67b80879b10badbfb",
      ticket: 1,
      total: "53946251000000000000",
      openat: 1681155515,
    },
    {
      id: "c17ec81751eb424c57ccbb6b22e7842d",
      ticket: 1,
      total: "58261950000000000000",
      openat: 1681165515,
    },
    {
      id: "8bc77b6cdfa78deba5fde023653acea9",
      ticket: 1,
      total: "58261950000000000000",
      openat: 1681175515,
    },
    {
      id: "086f39a21e9925ec873f528d9d19794d",
      ticket: 1,
      total: "58261950000000000000",
      openat: 1681185515,
    },
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
        {/* left side */}
        <Container position={[isNotMobile ? -100 : -85, 0]} visible={false}>
          <DetailsComponent
            spriteTexture={
              PIXI.Assets?.get("ImgDetailsBg") || PIXI.Texture.EMPTY
            }
            IconTexture={
              PIXI.Assets?.get("EventFragmentIcon") || PIXI.Texture.EMPTY
            }
            text={"0.55012312"}
            posX={0}
            posY={0}
            scaleX={isNotMobile ? 1 : 0.85}
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
              console.log("onPress EventFragmentDetails");
            }}
          />
          <DetailsComponent
            spriteTexture={
              PIXI.Assets?.get("ImgDetailsBg") || PIXI.Texture.EMPTY
            }
            IconTexture={
              PIXI.Assets?.get("DinoTicketIcon") || PIXI.Texture.EMPTY
            }
            text={"123.123.123"}
            posX={0}
            posY={35}
            scaleX={isNotMobile ? 1 : 0.85}
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
              console.log("onPress DinoTicketDetails");
            }}
          />

          <DetailsComponent
            spriteTexture={
              PIXI.Assets?.get("ImgDetailsBg") || PIXI.Texture.EMPTY
            }
            IconTexture={PIXI.Assets?.get("DinoEggIcon") || PIXI.Texture.EMPTY}
            text={"123.123.123"}
            posX={0}
            posY={70}
            scaleX={isNotMobile ? 1 : 0.85}
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
              console.log("onPress DinoEggDetailss");
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
            {/* {eggLists.length > 0 && eggLists.map((d: any, idx: number) => { */}
            {dummyListingData.length > 0 &&
              dummyListingData.map((d: any, idx: number) => {
                return (
                  <EggListingComponent
                    key={`egg-list-${idx}`}
                    index={`egg-list-${idx}`}
                    spriteTexture={PIXI.Assets.get("LowerBtnSmallBg")}
                    imageIcon={PIXI.Assets.get("ImgDinoCenter")}
                    priceText={d.total.toString()}
                    timerText={d.openat.toString()}
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
                        fill: ["0xFFFFFF"],
                      })
                    }
                    onPress={() => changeScene("DINOCENTER")}
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
