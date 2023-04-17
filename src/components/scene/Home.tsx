import { useCallback, useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { Container, Sprite, useApp, Text } from "@pixi/react";
// import { useSendTransaction } from "@usedapp/core";
import DinoFundComponent from "../DinoFundComponent";
import ProfileComponent from "../ProfileComponent";
import DetailsComponent from "../DetailsComponent";
import LowerButtonComponent from "../LowerButtonComponent";
import { useAuthStore, useStore } from "../../utils/store";
import { axiosInstance } from "../../utils/api";
// import { TICKET_ADDR } from "../../utils/config";

type Props = {
  onProfileClick: () => void;
  setScene?: (value: string) => void;
  scene: string;
};

const rawBuyTickets = async (qty: number) => {
  const data: any = await axiosInstance({
    url: "/ticket/createRawBuyTickets",
    method: "POST",
    data: { qty }
  });
  console.log("rawBuyTickets Result:", data);
  if (data?.data?.success) {
    // processTransaction(id, ticket)
  }
};

const Home = ({ onProfileClick, scene }: Props) => {
  const app = useApp();
  const changeScene = useStore((state) => state.changeScene);
  // const walletAddress = useStore((state) => state.walletAddress);
  const walletBalance = useStore((state) => state.walletBalance);
  const userData = useStore((state) => state.userData);
  const setUserData = useStore((state) => state.setUserData);
  const setEggListsData = useStore((state) => state.setEggListsData);
  const token = useAuthStore((state) => state.token);
  // const { sendTransaction, state } = useSendTransaction({ transactionName: 'Buy Ticket' })
  console.log("token", token);
  const isNotMobile = app.screen.width > 450;
  // @ts-ignore
  globalThis.__PIXI_APP__ = app;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    };
  }, []);

  console.log("app.screen", app.screen);
  console.log("scene", scene);

  const defaultBounds = { x: 0, y: 0, width: 0, height: 0 };
  const [toggleBtnAudio, setToggleBtnAudio] = useState(false);

  console.log("ProfileBgBounds", PIXI?.Assets?.get("ProfileBg"));
  console.log(
    "ProfileAvatarDefaultBounds",
    PIXI?.Assets?.get("ProfileAvatarDefault")
  );
  const ProfileBgBounds = PIXI?.Assets?.get("ProfileBg")?.orig || defaultBounds;
  const ProfileAvatarDefaultBounds = PIXI?.Assets?.get(
    "ProfileAvatarDefault"
  )?.orig || defaultBounds;
  const DinoFundBgBounds = PIXI?.Assets?.get("DinoFundBg")?.orig || defaultBounds;
  // const lfSideBounds = PIXI?.Assets?.get('DinoEggDetails').orig;
  // const rgSideBounds = PIXI?.Assets?.get('BNBDetails').orig;

  const BtnSmallBounds = PIXI?.Assets?.get("LowerBtnSmallBg")?.orig || defaultBounds;
  const BtnBigBounds = PIXI?.Assets?.get("LowerBtnBigBg")?.orig || defaultBounds;

  const upperContainerRef = useRef(null);
  const homecontainerRef = useRef(null);

  useEffect(() => {
    // /user/getUserData
    const getUserData = async () => {
      const result = await axiosInstance({
        url: "/user/getUserData",
        method: "GET",
      });
      console.log('getUserData Result:', result)
      if (result && result.data && result.data.result) {
        setUserData(result.data.result)
      }
    };

    const getEggList = async () => {
      const data: any = await axiosInstance({
        url: "/egg/lists",
        method: "GET",
      });
      console.log("getEggList Result:", data);
      if (data?.status === 200 && data?.data?.result?.lists) {
        setEggListsData(data?.data?.result.lists);
      }
    };

    getUserData();
    getEggList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // const [normalEggBounds, setNormalEggBounds] = useState({
  //   x: 0, y: 0, width: 0, height: 0
  // });
  const normalEggref = useCallback((node: any) => {
    if (node !== null) {
      // setNormalEggBounds(node.getBounds());
    }
  }, []);

  const NormalEggComponent = ({
    eggTexture,
    ref, posX, posY, onPress, scaleEgg, scaleBtn, posBtn,
    text,
  }: any) => {
    return (
      <Container
        ref={ref || null}
        x={posX || 0}
        y={posY || 0}
      >
        <Sprite
          texture={eggTexture || PIXI.Texture.EMPTY}
          anchor={[0.5, 0.5]}
          scale={scaleEgg ? scaleEgg : [0.9, 0.9]}
        />
        {/* action button */}
        <Container
          position={posBtn ? posBtn : [0, 25]}
          scale={scaleBtn ? scaleBtn : [0.6, 0.7]}
          eventMode="static"
          onpointertap={() => {
            onPress();
          }}
        >
          <Sprite
            position={[0, 0]}
            texture={PIXI.Assets.get(true ? "BtnPurchaseActive" : "BtnPurchaseCountdown") || PIXI.Texture.EMPTY}
            anchor={[0.5, 0.5]}
          />
          <Text
            text={text ? text : '00:00:00'}
            position={[0, 0]}
            anchor={[0.5, 0.5]}
            style={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 13,
              fontWeight: '600',
              strokeThickness: 1,
              fill: ['white'],
            })}
          />
        </Container>
      </Container>
    )
  }

  const EggPlateComponent = () => {
    return (
      <Container
        x={-5}
        y={app.screen.height / 2}
      >
        <Sprite
          texture={PIXI.Assets.get("EggPlate") || PIXI.Texture.EMPTY}
          anchor={[0.5, 0.5]}
        />

        {/* egg 2 */}
        <NormalEggComponent
          eggTexture={PIXI.Assets.get("EggIcon1")}
          posX={-53}
          posY={-112}
          posBtn={[-3, 25]}
          text={'Pre-List'}
          onPress={() => console.log('egg 2 clicked')}
        />

        {/* egg 3 */}
        <NormalEggComponent
          eggTexture={PIXI.Assets.get("EggIcon2")}
          posX={-92}
          posY={-65}
          text={'Reveal'}
          onPress={() => console.log('egg 3 clicked')}
        />

        {/* egg 4 */}
        <NormalEggComponent
          eggTexture={PIXI.Assets.get("EggIcon1")}
          posX={-79}
          posY={-2}
          onPress={() => console.log('egg 4 clicked')}
        />

        {/* egg 5 */}
        <NormalEggComponent
          ref={normalEggref}
          eggTexture={PIXI.Assets.get("EggIcon3")}
          posX={7}
          posY={29}
          onPress={() => console.log('egg 5 clicked')}
        />

        {/* egg 6 */}
        <NormalEggComponent
          eggTexture={PIXI.Assets.get("EggIcon2")}
          posX={98}
          posY={-2}
          onPress={() => console.log('egg 6 clicked')}
        />

        {/* egg 7 */}
        <NormalEggComponent
          eggTexture={PIXI.Assets.get("EggIcon1")}
          posX={109}
          posY={-65}
          onPress={() => console.log('egg 7 clicked')}
        />

        {/* egg 8 */}
        <NormalEggComponent
          eggTexture={PIXI.Assets.get("EggIcon2")}
          posX={70}
          posY={-112}
          posBtn={[5, 25]}
          onPress={() => console.log('egg 8 clicked')}
        />

        {/* egg 1 (big) */}
        <NormalEggComponent
          eggTexture={PIXI.Assets.get("BigEggIcon3")}
          posX={10}
          posY={-75}
          posBtn={[0, 50]}
          scaleBtn={[1.2, 1.3]}
          scaleEgg={[0.95, 0.95]}
          onPress={() => console.log('egg 1 clicked')}
        />

      </Container>
    )
  }
  return (
    <>
      {isLoaded && <Container>
        <Sprite
          texture={PIXI?.Assets?.get("MainBg") || PIXI.Texture.EMPTY}
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
              spriteTexture={PIXI?.Assets?.get("ProfileBg") || PIXI.Texture.EMPTY}
              avatarTexture={PIXI?.Assets?.get("ProfileAvatarDefault") || PIXI.Texture.EMPTY}
              text={userData.username}
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
                texture={PIXI?.Assets?.get("BtnLngHome") || PIXI.Texture.EMPTY}
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
                texture={PIXI?.Assets?.get("BtnShareHome") || PIXI.Texture.EMPTY}
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
                ) || PIXI.Texture.EMPTY}
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
                spriteTexture={PIXI?.Assets?.get("ImgDetailsBg")}
                IconTexture={PIXI?.Assets?.get("USDTIcon")}
                text={walletBalance}
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
                spriteTexture={PIXI?.Assets?.get("ImgDetailsBg")}
                IconTexture={PIXI?.Assets?.get("BonusIcon")}
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
                spriteTexture={PIXI?.Assets?.get("ImgDetailsBg")}
                IconTexture={PIXI?.Assets?.get("EventFragmentIcon")}
                // text={userData?.bonuses.toString() || '0'}
                text={'0'}
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
                spriteTexture={PIXI?.Assets?.get("ImgDetailsBg")}
                IconTexture={PIXI?.Assets?.get("DinoTicketIcon")}
                text={userData?.tickets.toString() || '0'}
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
                onPress={async () => {
                  await rawBuyTickets(100)
                  // console.log("onPress DinoTicketDetails");
                  // const txReq = { to: TICKET_ADDR, from: walletAddress, data: d.TxRawApproval, value: utils.parseEther(d.total) }
                  // console.log('txReq', txReq)
                  // const txSend = await sendTransaction(txReq)
                  // console.log('txSend', txSend)

                }}
              />

              <DetailsComponent
                spriteTexture={PIXI?.Assets?.get("ImgDetailsBg")}
                IconTexture={PIXI?.Assets?.get("DinoEggIcon")}
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

          {/* Egg Panel */}
          {EggPlateComponent()}



          {/* Lower Button Container */}
          {(
            <Container
              anchor={[0.5, 1]}
              x={0}
              y={app.screen?.height - BtnSmallBounds?.height * 2 - 15}
              width={app.screen?.width > 450 ? 450 : app.screen.width * 0.95}
            >
              {/* left side */}
              <LowerButtonComponent
                spriteTexture={PIXI?.Assets?.get("LowerBtnSmallBg")}
                imageIcon={PIXI?.Assets?.get("ImgDinoCenter")}
                text={"Jurassic Market"}
                posX={-155}
                posY={15}
                imageYOffset={10}
                textYOffset={BtnSmallBounds?.height / 2 + 5}
                textStyle={
                  new PIXI.TextStyle({
                    align: "center",
                    fill: ["0xFFC700"],
                    fontFamily: "Magra Bold",
                    fontSize: 11,
                    fontWeight: "bold",
                    wordWrap: true,
                    wordWrapWidth: 50,
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
                onPress={() => changeScene("ALBUM")}
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
                onPress={() => changeScene("PROFILE")}
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
      </Container>}
    </>
  );
};

export default Home;
