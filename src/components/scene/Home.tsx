import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { Container, Sprite, useApp } from "@pixi/react";
import DinoFundComponent from "../DinoFundComponent";
import ProfileComponent from "../ProfileComponent";
import DetailsComponent from "../DetailsComponent";
import LowerButtonComponent from "../LowerButtonComponent";
import { useAuthStore, useStore } from "../../utils/store";
import { axiosInstance } from "../../utils/api";

type Props = {
  onProfileClick: () => void;
  setScene?: (value: string) => void;
  scene: string;
};

const Home = ({ onProfileClick, scene }: Props) => {
  const app = useApp();
  const changeScene = useStore((state) => state.changeScene);
  const token = useAuthStore((state) => state.token);
  console.log("token", token);
  const isNotMobile = app.screen.width > 450;
  // @ts-ignore
  globalThis.__PIXI_APP__ = app;

  console.log("app.screen", app.screen);
  console.log("scene", scene);
  const [getHomeContainerBounds, setHomeContainerBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [toggleBtnAudio, setToggleBtnAudio] = useState(false);

  console.log("ProfileBgBounds", PIXI?.Assets?.get("ProfileBg"));
  console.log(
    "ProfileAvatarDefaultBounds",
    PIXI?.Assets?.get("ProfileAvatarDefault")
  );
  const ProfileBgBounds = PIXI?.Assets?.get("ProfileBg")?.orig;
  const ProfileAvatarDefaultBounds = PIXI?.Assets?.get(
    "ProfileAvatarDefault"
  )?.orig;
  const DinoFundBgBounds = PIXI?.Assets?.get("DinoFundBg")?.orig;
  // const lfSideBounds = PIXI?.Assets?.get('DinoEggDetails').orig;
  // const rgSideBounds = PIXI?.Assets?.get('BNBDetails').orig;

  const BtnSmallBounds = PIXI?.Assets?.get("LowerBtnSmallBg")?.orig;
  const BtnBigBounds = PIXI?.Assets?.get("LowerBtnBigBg")?.orig;

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
    // /user/getUserData
    const getUserData = async () => {
      const result = await axiosInstance({
        url: "/user/getUserData",
        method: "GET",
      });
      console.log('getUserData Result:', result)
    };

    getUserData();
  }, []);

  // const dinoFundRef = useRef(null);
  // console.log('dinoFundRef', dinoFundRef.current)
  // useEffect(() => {
  //   // @ts-ignore
  //   console.log('upperContainerRef', upperContainerRef.current.getBounds())
  //   // @ts-ignore
  //   console.log('upperContainerRef getGlobalPosition', upperContainerRef.current.getGlobalPosition())
  // }, [])
  // console.log('avatar')
  return (
    <Container>
      <Sprite
        texture={PIXI?.Assets?.get("MainBg")}
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
          // width={app.screen.width}
          anchor={[0.5, 0.5]}
        >
          <ProfileComponent
            spriteTexture={PIXI?.Assets?.get("ProfileBg")}
            avatarTexture={PIXI?.Assets?.get("ProfileAvatarDefault")}
            text={`h=${app.screen.height?.toFixed()}`}
            componentPosX={
              app.screen?.width > 450
                ? -(ProfileBgBounds?.width * 2.4)
                : -(ProfileBgBounds?.width * 2.4)
            }
            componentPosY={0}
            avatarXOffset={0}
            avatarYOffset={
              (ProfileBgBounds?.height / 2 -
                ProfileAvatarDefaultBounds?.height / 2) *
              0.5
            }
            textYOffset={ProfileBgBounds?.height - 8}
            textStyle={
              new PIXI.TextStyle({
                fontFamily: "Magra Bold",
                fontSize: 16,
                fontWeight: "bold",
                fill: ["0x705802"],
              })
            }
            onPress={() => {
              onProfileClick();
            }}
          />

          <DinoFundComponent
            spriteTexture={PIXI?.Assets?.get("DinoFundBg")}
            text="9.000.000.000"
            // text={`w=${getHomeContainerBounds.width.toFixed()} h=${getHomeContainerBounds.height}`}
            posX={0}
            posY={0}
            scaleX={app.screen?.width > 450 ? 0.87 : 0.75}
            textYOffest={(DinoFundBgBounds?.height * 0.5) / 2 - 5}
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
              (DinoFundBgBounds?.width / 2) *
                (app.screen?.width > 450 ? 1.05 : 1),
              DinoFundBgBounds?.height / 2 - 7,
            ]}
          >
            {/* Button Language */}
            <Sprite
              texture={PIXI?.Assets?.get("BtnLngHome")}
              width={app.screen?.width > 450 ? 35 : 30}
              height={app.screen?.width > 450 ? 35 : 30}
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
              texture={PIXI?.Assets?.get("BtnShareHome")}
              width={app.screen?.width > 450 ? 35 : 30}
              height={app.screen?.width > 450 ? 35 : 30}
              anchor={[0.5, 0.5]}
              x={20 * (app.screen?.width > 450 ? 2 : 1.6)}
              y={0}
              eventMode={"static"}
              onpointertap={() => {
                console.log("BtnShareHome clicked");
              }}
            />
            {/* Button Audio on/mute */}
            <Sprite
              texture={PIXI?.Assets?.get(
                toggleBtnAudio ? "BtnAudioHomeOn" : "BtnAudioHomeMute"
              )}
              width={app.screen?.width > 450 ? 35 : 30}
              height={app.screen?.width > 450 ? 35 : 30}
              anchor={[0.5, 0.5]}
              x={20 * (app.screen?.width > 450 ? 4 : 3.2)}
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
          x={0}
          y={app.screen?.width > 450 ? 130 : 110}
          // width={app.screen.width > 450 ? 450 : app.screen.width}
          anchor={[0.5, 0.5]}
        >
          {/* right side */}
          <Container
            // position={[app.screen.width / 2 - (lfSideBounds.width / 2), 0]}
            position={[isNotMobile ? 110 : 90, 20]}
            anchor={[0.5, 0.5]}
            // width={app.screen.width > 450 ? 450 : app.screen.width}
          >
            <DetailsComponent
              spriteTexture={PIXI?.Assets?.get("ImgDetailsBg") || PIXI.Texture.EMPTY}
              IconTexture={PIXI?.Assets?.get("BNBIcon") || PIXI.Texture.EMPTY}
              text={"123.123.123"}
              posX={0}
              posY={0}
              scaleX={isNotMobile ? 1 : 0.8}
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
              spriteTexture={PIXI?.Assets?.get("ImgDetailsBg") || PIXI.Texture.EMPTY}
              IconTexture={PIXI?.Assets?.get("BonusIcon") || PIXI.Texture.EMPTY}
              text={"123.123.123"}
              posX={0}
              posY={35}
              scaleX={isNotMobile ? 1 : 0.8}
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
                console.log("onPress StarDetails");
              }}
            />
          </Container>

          {/* left side */}
          <Container position={[isNotMobile ? -100 : -85, 0]}>
            <DetailsComponent
              spriteTexture={PIXI?.Assets?.get("ImgDetailsBg") || PIXI.Texture.EMPTY}
              IconTexture={PIXI?.Assets?.get("EventFragmentIcon") || PIXI.Texture.EMPTY}
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
              spriteTexture={PIXI?.Assets?.get("ImgDetailsBg") || PIXI.Texture.EMPTY}
              IconTexture={PIXI?.Assets?.get("DinoTicketIcon") || PIXI.Texture.EMPTY}
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
              spriteTexture={PIXI?.Assets?.get("ImgDetailsBg") || PIXI.Texture.EMPTY}
              IconTexture={PIXI?.Assets?.get("DinoEggIcon") || PIXI.Texture.EMPTY}
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
        </Container>

        {/* Lower Button Container */}
        {getHomeContainerBounds && (
          <Container
            anchor={[0.5, 0.5]}
            x={0}
            y={app.screen?.height - BtnSmallBounds?.height * 2 - 15}
            width={app.screen?.width > 450 ? 450 : app.screen.width}
          >
            {/* left side */}
            <LowerButtonComponent
              spriteTexture={PIXI?.Assets?.get("LowerBtnSmallBg")}
              imageIcon={PIXI?.Assets?.get("ImgDinoCenter")}
              text={"Dino Center"}
              posX={-155}
              posY={15}
              imageYOffset={10}
              textYOffset={BtnSmallBounds?.height / 2 + 13}
              textStyle={
                new PIXI.TextStyle({
                  fontFamily: "Magra Bold",
                  fontSize: 12,
                  fontWeight: "bold",
                  fill: ["0xFFC700"],
                })
              }
              onPress={() => changeScene("DINOCENTER")}
            />
            <LowerButtonComponent
              spriteTexture={PIXI?.Assets?.get("LowerBtnSmallBg")}
              imageIcon={PIXI?.Assets?.get("ImgGameTask")}
              text={"Game Task"}
              posX={BtnSmallBounds?.width - 155}
              posY={15}
              imageYOffset={10}
              textYOffset={BtnSmallBounds?.height / 2 + 13}
              textStyle={
                new PIXI.TextStyle({
                  fontFamily: "Magra Bold",
                  fontSize: 12,
                  fontWeight: "bold",
                  fill: ["0xFFC700"],
                })
              }
            />
            <LowerButtonComponent
              spriteTexture={PIXI?.Assets?.get("LowerBtnSmallBg")}
              imageIcon={PIXI?.Assets?.get("ImgBulletin")}
              text={"Bulletin"}
              posX={-155}
              posY={BtnSmallBounds?.height + 10}
              imageYOffset={10}
              textYOffset={BtnSmallBounds?.height / 2 + 13}
              textStyle={
                new PIXI.TextStyle({
                  fontFamily: "Magra Bold",
                  fontSize: 12,
                  fontWeight: "bold",
                  fill: ["0xFFC700"],
                })
              }
            />
            <LowerButtonComponent
              spriteTexture={PIXI?.Assets?.get("LowerBtnSmallBg")}
              imageIcon={PIXI?.Assets?.get("ImgComrade")}
              text={"Comrade"}
              posX={BtnSmallBounds?.width - 155}
              posY={BtnSmallBounds?.height + 10}
              imageYOffset={10}
              textYOffset={BtnSmallBounds?.height / 2 + 13}
              textStyle={
                new PIXI.TextStyle({
                  fontFamily: "Magra Bold",
                  fontSize: 12,
                  fontWeight: "bold",
                  fill: ["0xFFC700"],
                })
              }
            />

            {/* center button */}
            <LowerButtonComponent
              spriteTexture={PIXI?.Assets?.get("LowerBtnBigBg")}
              imageIcon={PIXI?.Assets?.get("ImgUpass")}
              text={"U Pass"}
              posX={0}
              posY={BtnSmallBounds?.height + 20}
              scaleX={0.8}
              scaleY={0.8}
              imageYOffset={13}
              textYOffset={BtnBigBounds?.height / 2 + 20}
              textStyle={
                new PIXI.TextStyle({
                  fontFamily: "Magra Bold",
                  fontSize: 14,
                  fontWeight: "bold",
                  fill: ["0xFFC700"],
                })
              }
            />
            {/* center button */}

            {/* right side */}
            <LowerButtonComponent
              spriteTexture={PIXI?.Assets?.get("LowerBtnSmallBg")}
              imageIcon={PIXI?.Assets?.get("ImgAlbum")}
              text={"Album"}
              posX={155}
              posY={15}
              imageYOffset={10}
              textYOffset={BtnSmallBounds?.height / 2 + 13}
              textStyle={
                new PIXI.TextStyle({
                  fontFamily: "Magra Bold",
                  fontSize: 12,
                  fontWeight: "bold",
                  fill: ["0xFFC700"],
                })
              }
            />
            <LowerButtonComponent
              spriteTexture={PIXI?.Assets?.get("LowerBtnSmallBg")}
              imageIcon={PIXI?.Assets?.get("ImgMiniGames")}
              text={"Mini Games"}
              posX={155 - BtnSmallBounds?.width}
              posY={15}
              imageYOffset={10}
              textYOffset={BtnSmallBounds?.height / 2 + 13}
              textStyle={
                new PIXI.TextStyle({
                  fontFamily: "Magra Bold",
                  fontSize: 12,
                  fontWeight: "bold",
                  fill: ["0xFFC700"],
                })
              }
            />
            <LowerButtonComponent
              spriteTexture={PIXI?.Assets?.get("LowerBtnSmallBg")}
              imageIcon={PIXI?.Assets?.get("ImgProfile")}
              text={"Profile"}
              posX={155}
              posY={BtnSmallBounds?.height + 10}
              imageYOffset={10}
              textYOffset={BtnSmallBounds?.height / 2 + 13}
              textStyle={
                new PIXI.TextStyle({
                  fontFamily: "Magra Bold",
                  fontSize: 12,
                  fontWeight: "bold",
                  fill: ["0xFFC700"],
                })
              }
            />
            <LowerButtonComponent
              spriteTexture={PIXI?.Assets?.get("LowerBtnSmallBg")}
              imageIcon={PIXI?.Assets?.get("ImgHistory")}
              text={"History"}
              posX={155 - BtnSmallBounds?.width}
              posY={BtnSmallBounds?.height + 10}
              imageYOffset={10}
              textYOffset={BtnSmallBounds?.height / 2 + 13}
              textStyle={
                new PIXI.TextStyle({
                  fontFamily: "Magra Bold",
                  fontSize: 12,
                  fontWeight: "bold",
                  fill: ["0xFFC700"],
                })
              }
            />
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default Home;
