/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import { Container, Sprite, Text, useApp } from "@pixi/react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/api";
import { useAuthStore, useStore } from "../../utils/store";

type Props = {
  onBackBtnClick: () => void;
  visible: boolean;
  scene: string;
};

const JPass = ({ onBackBtnClick, visible = true, scene }: Props) => {
  const app = useApp();
  // @ts-ignore
  globalThis.__PIXI_APP__ = app;

  const isNotMobile = app.screen.width > 450;

  const token = useAuthStore((state) => state.token);
  const userData = useStore((state) => state.userData);
  const setJPassPanel = useStore((state) => state.setJPassPanel);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rarityPanelBounds, setRarityPanelBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [isRarityPanelVisible, setIsRarityPanelVisible] = useState(false);

  const [countdownTime, setCountdownTime] = useState({
    countdownDays: 0,
    countdownHours: 0,
    countdownMinutes: 0,
    countdownSeconds: 0,
  });
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  // const [album, setAlbum] = useState([]);

  const [selectedJpass, setSelectedJpass] = useState(1);

  const rarityPanelRef = useCallback((node: any) => {
    if (node !== null) {
      node.width = isNotMobile ? 410 : app.screen.width * 0.75;
      node.height = app.screen.height * 0.3;
      setRarityPanelBounds(node.getBounds());
    }
  }, []);

  const getAlbum = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const { data }: any = await axiosInstance({
      url: "/user/collections",
      method: "GET",
      headers: options.headers,
    });
    console.log("get album Result:", data);
    if (data?.success) {
      // setAlbum(data?.result);
    } else {
      toast(data.message);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    getAlbum();
    return () => {
      setIsLoaded(false);
    };
  }, []);


  useEffect(() => {
    let timeInterval: any;
    const countdown = () => {
      timeInterval = setInterval(() => {
        setCurrentTime(new Date().getTime());
      }, 1000);
    };
    countdown();
    return () => {
      clearInterval(timeInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timeInterval: any;
    // const countdown = () => {
    console.log('currentTime jpass', currentTime)
    if (userData?.ability_end > 0 && currentTime) {
      // timeInterval = setInterval(() => {
      const countdownDateTime = userData?.ability_end * 1000;
      // const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      // console.log(`countdownDateTime ${index}`, countdownDateTime);
      console.log(`currentTime `, currentTime);
      console.log(`remainingDayTime `, remainingDayTime);
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(
        (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const totalMinutes = Math.floor(
        (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const totalSeconds = Math.floor(
        (remainingDayTime % (1000 * 60)) / 1000
      );
      console.log('totalDays', totalDays)

      const runningCountdownTime = {
        countdownDays: totalDays,
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };

      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        // getPendingListingEgg()
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
  }, [currentTime, userData?.ability_end]);
  console.log("isLoaded", isLoaded);
  console.log("app profile screen", app.screen);

  const jPassCardInfo = [
    {
      id: 1,
      header: "7-Day Ultimate Pass",
      // get texture from PIXI.Assets
      image: PIXI.Assets.get("JPassCardItem1"),
      price: 8.9,
      purchaseCode: "special1",
    },
    {
      id: 2,
      header: "14-Day Ultimate Pass",
      image: PIXI.Assets.get("JPassCardItem2"),
      price: 15.9,
      purchaseCode: "special2",
    },
    {
      id: 3,
      header: "30-Day Ultimate Pass",
      image: PIXI.Assets.get("JPassCardItem3"),
      price: 27.9,
      purchaseCode: "special3",
    },
  ];

  console.log("selected Jpass", selectedJpass);

  return (
    <>
      {isLoaded && (
        <Container visible={visible}>
          <Sprite
            texture={PIXI.Assets.get("JPassBackground")}
            width={isNotMobile ? app.screen.width : app.screen.width * 1.1}
            height={app.screen.height}
            anchor={[0.5, 0.5]}
            // scale={isNotMobile ? [1, 1] : [0.5, 1]}
            position={[app.screen.width / 2, app.screen.height / 2]}
          />
          {/* apply white layer and filter */}
          <Sprite
            texture={PIXI.Texture.WHITE}
            width={isNotMobile ? app.screen.width : app.screen.width * 1.1}
            height={app.screen.height}
            anchor={[0.5, 0.5]}
            // scale={isNotMobile ? [1, 1] : [0.5, 1]}
            position={[app.screen.width / 2, app.screen.height / 2]}
            filters={[new PIXI.BlurFilter(10)]}
            tint={"white"}
            alpha={0.3}
          />

          <Container position={[app.screen.width / 2, 0]}>
            {/* Upper Button */}
            <Container
              // ref={upperComponentRef}
              x={0}
              y={isNotMobile ? 20 : 0}
              width={isNotMobile ? 450 : app.screen.width * 0.9}
            >
              {/* left side */}
              <Container position={isNotMobile ? [-190, 30] : [-150, 40]}>
                <Sprite
                  texture={PIXI.Assets.get("BackBtn") || PIXI.Texture.EMPTY}
                  width={isNotMobile ? 40 : 30}
                  height={isNotMobile ? 40 : 30}
                  anchor={[0.5, 0.5]}
                  position={[0, 0]}
                  eventMode="static"
                  onpointertap={() => onBackBtnClick()}
                />
              </Container>

              {/* Text */}
              <Container position={[0, isNotMobile ? 30 : 40]}>
                <Text
                  text={"Subscribe"}
                  position={[-2, 0]}
                  anchor={[0.5, 0.5]}
                  style={
                    new PIXI.TextStyle({
                      fontFamily: "Magra Bold",
                      fontSize: isNotMobile ? 24 : 18,
                      fontWeight: "600",
                      strokeThickness: 1,
                      fill: ["white"],
                    })
                  }
                />
              </Container>
              {/* divider */}
              <Container position={[0, isNotMobile ? 15 : 10]}>
                <Sprite
                  texture={PIXI.Assets.get("UpperDivider")}
                  anchor={[0.5, 0.5]}
                  position={isNotMobile ? [0, 50] : [0, 60]}
                />
              </Container>
            </Container>

            {/* Countdown */}
            <Container
              position={isNotMobile ? [0, 110] : [0, 95]}
              anchor={[0.5, 0.5]}
              eventMode="static"
            // onpointertap={() =>
            //   setIsRarityPanelVisible(!isRarityPanelVisible)
            // }
            >
              <Text
                text={`${countdownTime.countdownDays.toString().length === 1
                  ? `0${countdownTime.countdownDays}`
                  : countdownTime.countdownDays
                  }:${countdownTime.countdownHours.toString().length === 1
                    ? `0${countdownTime.countdownHours}`
                    : countdownTime.countdownHours
                  }:${countdownTime.countdownMinutes.toString().length === 1
                    ? `0${countdownTime.countdownMinutes}`
                    : countdownTime.countdownMinutes
                  }:${countdownTime.countdownSeconds.toString().length === 1
                    ? `0${countdownTime.countdownSeconds}`
                    : countdownTime.countdownSeconds
                  }` || ""}
                position={[0, 0]}
                anchor={[0.5, 0.5]}
                style={
                  new PIXI.TextStyle({
                    fontFamily: "Magra Bold",
                    fontSize: isNotMobile ? 30 : 22,
                    fontWeight: "600",
                    strokeThickness: 1,
                    fill: ["yellow"],
                  })
                }
              // visible={false}
              />
            </Container>

            {/* Statement */}
            <Container
              position={isNotMobile ? [110, 110] : [110, 95]}
              anchor={[0.5, 0.5]}
              eventMode="static"
            // onpointertap={() =>
            //   setIsRarityPanelVisible(!isRarityPanelVisible)
            // }
            >
              <Text
                text={"Statement"}
                position={[0, 0]}
                anchor={[0.5, 0.5]}
                style={
                  new PIXI.TextStyle({
                    fontFamily: "Magra Bold",
                    fontSize: isNotMobile ? 15 : 13,
                    fontWeight: "600",
                    strokeThickness: 1,
                    fill: ["white"],
                  })
                }
                visible={false}
              />
              <Sprite
                texture={
                  PIXI.Assets.get("AlbumPrevPageBtn") || PIXI.Texture.EMPTY
                }
                anchor={[0.5, 0.5]}
                rotation={Math.PI * 1.5}
                scale={isNotMobile ? [0.4, 0.4] : [0.3, 0.3]}
                position={[isNotMobile ? 45 : 40, 2]}
                visible={false}
              />
            </Container>

            {/* Jpass Card */}
            <Container
              x={0}
              y={
                isNotMobile
                  ? app.screen.height * 0.35
                  : app.screen.height * 0.36
              }
              scale={isNotMobile ? [0.85, 0.85] : [0.6, 0.6]}
            >
              <Sprite
                texture={PIXI.Assets.get("JPassCardBg")}
                anchor={[0.5, 0.5]}
              />

              <Text
                text={`${jPassCardInfo[selectedJpass - 1].header}`}
                position={[0, -125]}
                anchor={[0.5, 0.5]}
                style={
                  new PIXI.TextStyle({
                    fontFamily: "Magra Bold",
                    fontSize: isNotMobile ? 17 : 15,
                    fontWeight: "600",
                    strokeThickness: 1,
                    fill: ["#FFD700"],
                  })
                }
              />
              <Sprite
                texture={
                  jPassCardInfo[selectedJpass - 1].image || PIXI.Texture.EMPTY
                }
                anchor={[0.5, 0.5]}
                position={[0, 0]}
              />
              <Text
                text={`$ ${jPassCardInfo[selectedJpass - 1].price}`}
                position={[0, 125]}
                anchor={[0.5, 0.5]}
                style={
                  new PIXI.TextStyle({
                    fontFamily: "Magra Bold",
                    fontSize: isNotMobile ? 17 : 15,
                    fontWeight: "600",
                    strokeThickness: 1,
                    fill: ["#FFD700"],
                  })
                }
              />

              <Container y={180} x={-40}>
                {jPassCardInfo.map((item, index) => (
                  <Container
                    x={index * 40}
                    eventMode="static"
                    onpointertap={() => setSelectedJpass(item.id)}
                  >
                    <Sprite
                      texture={PIXI.Assets.get(
                        item.id === selectedJpass
                          ? "JpassPageBgHighlight"
                          : "JpassPageBg"
                      )}
                      anchor={[0.5, 0.5]}
                      position={[0, 0]}
                    />
                    <Text
                      text={`${item.id}`}
                      position={[0, -1.5]}
                      anchor={[0.5, 0.5]}
                      style={
                        new PIXI.TextStyle({
                          fontFamily: "Magra Bold",
                          fontSize: isNotMobile ? 17 : 15,
                          fontWeight: "600",
                          strokeThickness: 1,
                          fill: "white",
                        })
                      }
                    />
                  </Container>
                ))}
              </Container>
            </Container>

            {/* Jpass Advantages */}
            <Container
              x={0}
              y={app.screen.height * (isNotMobile ? 0.62 : 0.65)}
              scale={isNotMobile ? [0.9, 0.9] : [0.8, 0.8]}
            >
              {/* first row */}
              <Container x={0} y={0}>
                <Container x={-130} scale={[0.8, 0.8]}>
                  <Sprite
                    texture={PIXI.Assets.get("JPassItemBg")}
                    anchor={[0.5, 0.5]}
                  />
                  <Sprite
                    texture={PIXI.Assets.get("JPassItemAutoListing")}
                    anchor={[0.5, 0.5]}
                  />
                  <Text
                    text={`Automated Listing`}
                    position={[0, 60]}
                    anchor={[0.5, 0.5]}
                    style={
                      new PIXI.TextStyle({
                        fontFamily: "Magra Bold",
                        fontSize: isNotMobile ? 17 : 15,
                        fontWeight: "600",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 50,
                        align: "center",
                        fill: ["#FFD700"],
                      })
                    }
                  />
                </Container>
                <Container x={0} scale={[0.8, 0.8]}>
                  <Sprite
                    texture={PIXI.Assets.get("JPassItemBg")}
                    anchor={[0.5, 0.5]}
                  />
                  <Sprite
                    texture={PIXI.Assets.get("JPassItemDailyPurchase")}
                    anchor={[0.5, 0.5]}
                  />
                  <Text
                    text={`Daily Purchase Ticket +1 `}
                    position={[0, 60]}
                    anchor={[0.5, 0.5]}
                    style={
                      new PIXI.TextStyle({
                        fontFamily: "Magra Bold",
                        fontSize: isNotMobile ? 17 : 15,
                        fontWeight: "600",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 110,
                        align: "center",
                        fill: ["#FFD700"],
                      })
                    }
                  />
                </Container>
                <Container x={130} scale={[0.8, 0.8]}>
                  <Sprite
                    texture={PIXI.Assets.get("JPassItemBg")}
                    anchor={[0.5, 0.5]}
                  />
                  <Sprite
                    texture={PIXI.Assets.get("JPassItemUpgradeHuntingValue")}
                    anchor={[0.5, 0.5]}
                  />
                  <Text
                    text={`Upgraded Hunting Value +10% `}
                    position={[0, 60]}
                    anchor={[0.5, 0.5]}
                    style={
                      new PIXI.TextStyle({
                        fontFamily: "Magra Bold",
                        fontSize: isNotMobile ? 17 : 15,
                        fontWeight: "600",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 150,
                        align: "center",
                        fill: ["#FFD700"],
                      })
                    }
                  />
                </Container>
              </Container>
              {/* second row */}
              <Container x={0} y={100}>
                <Container x={-130} scale={[0.8, 0.8]}>
                  <Sprite
                    texture={PIXI.Assets.get("JPassItemBg")}
                    anchor={[0.5, 0.5]}
                  />
                  <Sprite
                    texture={PIXI.Assets.get("JPassItemShortenHunting1")}
                    anchor={[0.5, 0.5]}
                  />
                  <Text
                    text={`Shorten Hunting Period 10%`}
                    position={[0, 60]}
                    anchor={[0.5, 0.5]}
                    style={
                      new PIXI.TextStyle({
                        fontFamily: "Magra Bold",
                        fontSize: isNotMobile ? 17 : 15,
                        fontWeight: "600",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 130,
                        align: "center",
                        fill: ["#FFD700"],
                      })
                    }
                  />
                </Container>
                <Container x={0} scale={[0.8, 0.8]}>
                  <Sprite
                    texture={PIXI.Assets.get("JPassItemBg")}
                    anchor={[0.5, 0.5]}
                  />
                  <Sprite
                    texture={PIXI.Assets.get("JPassItemShortenHunting2")}
                    anchor={[0.5, 0.5]}
                  />
                  <Text
                    text={`Shorten Hunting Period 10%`}
                    position={[0, 60]}
                    anchor={[0.5, 0.5]}
                    style={
                      new PIXI.TextStyle({
                        fontFamily: "Magra Bold",
                        fontSize: isNotMobile ? 17 : 15,
                        fontWeight: "600",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 130,
                        align: "center",
                        fill: ["#FFD700"],
                      })
                    }
                  />
                </Container>
                <Container x={130} scale={[0.8, 0.8]}>
                  <Sprite
                    texture={PIXI.Assets.get("JPassItemBg")}
                    anchor={[0.5, 0.5]}
                  />
                  <Sprite
                    texture={PIXI.Assets.get("JPassItemShortenHunting3")}
                    anchor={[0.5, 0.5]}
                  />
                  <Text
                    text={`Shorten Hunting Period 10%`}
                    position={[0, 60]}
                    anchor={[0.5, 0.5]}
                    style={
                      new PIXI.TextStyle({
                        fontFamily: "Magra Bold",
                        fontSize: isNotMobile ? 17 : 15,
                        fontWeight: "600",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 130,
                        align: "center",
                        fill: ["#FFD700"],
                      })
                    }
                  />
                </Container>
              </Container>
            </Container>

            {/* Purchase Button */}
            <Container
              x={0}
              y={app.screen.height * (isNotMobile ? 0.9 : 0.94)}
              scale={isNotMobile ? [1, 1] : [0.75, 0.75]}
              eventMode="static"
              onpointertap={() => {
                const tempData = jPassCardInfo.filter(
                  (item) => item.id === selectedJpass
                )[0];
                setJPassPanel({ show: true, data: tempData });
                console.log("test purchase");
              }}
            >
              <Sprite
                texture={PIXI.Assets.get("JPassBtnPurchase")}
                anchor={[0.5, 0.5]}
              />
              <Text
                text={`Purchase`}
                position={[0, -2]}
                anchor={[0.5, 0.5]}
                style={
                  new PIXI.TextStyle({
                    fontFamily: "Magra Bold",
                    fontSize: isNotMobile ? 19 : 15,
                    fontWeight: "600",
                    strokeThickness: 1,
                    wordWrap: true,
                    wordWrapWidth: 50,
                    align: "center",
                    fill: "white",
                  })
                }
              />
            </Container>

            {/* Rarity popup */}
            <Container
              position={[0, app.screen.height * 0.5]}
              anchor={[0.5, 0.5]}
              visible={isRarityPanelVisible}
            >
              <Sprite
                texture={PIXI.Texture.WHITE}
                width={app.screen.width}
                height={app.screen.height * 1.5}
                anchor={[0.5, 0.5]}
                // scale={isNotMobile ? [1, 1] : [0.5, 1]}
                position={[0, 0]}
                filters={[new PIXI.BlurFilter(10)]}
                tint={"black"}
                alpha={0.7}
              />
              <Container ref={rarityPanelRef} position={[0, 0]}>
                <Sprite
                  texture={PIXI.Assets.get("RarityPanelBg")}
                  anchor={[0.5, 0.5]}
                  position={[0, 0]}
                />

                {/* upper panel component */}
                <Container
                  position={[
                    0,
                    rarityPanelBounds?.height * (isNotMobile ? -0.35 : -0.4),
                  ]}
                >
                  <Text
                    text={"Rarity"}
                    position={[0, 0]}
                    anchor={[0.5, 0.5]}
                    style={
                      new PIXI.TextStyle({
                        fontFamily: "Magra Bold",
                        fontSize: isNotMobile ? 20 : 18,
                        fontWeight: "600",
                        strokeThickness: 1,
                        fill: ["white"],
                      })
                    }
                  />
                  <Sprite
                    texture={PIXI.Assets.get("LogoutBtn")}
                    width={isNotMobile ? 40 : 40}
                    height={isNotMobile ? 40 : 40}
                    anchor={[0.5, 0.5]}
                    position={[
                      rarityPanelBounds?.width * (isNotMobile ? 0.38 : 0.5),
                      0,
                    ]}
                    eventMode="static"
                    onpointertap={() => setIsRarityPanelVisible(false)}
                  />
                </Container>
              </Container>
            </Container>

            {/* Bottom component */}
          </Container>
        </Container>
      )}
    </>
  );
};

export default JPass;
