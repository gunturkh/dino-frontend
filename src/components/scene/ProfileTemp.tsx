/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { Container, Sprite, Text, useApp, useTick } from "@pixi/react";
import { useAuthStore, useStore } from "../../utils/store";

type Props = {
  onBackBtnClick: () => void;
};

const ProfileTemp = ({ onBackBtnClick }: Props) => {
  const app = useApp();
  // @ts-ignore
  globalThis.__PIXI_APP__ = app;

  const logout = useAuthStore((state) => state.logout);
  const changeScene = useStore((state) => state.changeScene);
  const userData = useStore((state) => state.userData);
  const isNotMobile = app.screen.width > 450;

  const [isLoaded, setIsLoaded] = useState(false);
  const [toggleWithdrawal, setToggleWithdrawal] = useState(false);
  const [confirmQuitPanelBounds, setConfirmQuitPanelBounds] = useState<any>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [confirmQuitPanelVisible, setConfirmQuitPanelVisible] = useState(false);

  useTick((delta) => {
    // console.log('delta', delta)
  });

  const obscureEmail = (email: string) => {
    const [name, domain] = email.split("@");
    return `${name[0]}${new Array(4).join("*")}${
      name[name.length - 1]
    }@${domain}`;
  };

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    };
  }, []);
  console.log("isLoaded", isLoaded);
  console.log("app profile screen", app.screen);
  const [menuItemBounds, setMenuItemBounds] = useState<any>(null);

  const upperComponentRef = useRef(null);
  // @ts-ignore
  const upperComponentBounds = upperComponentRef?.current?.getBounds();

  useEffect(() => {
    // @ts-ignore
    if (isLoaded) {
      // @ts-ignore
      const menuItemBounds = upperComponentRef?.current?.getBounds();
      setMenuItemBounds(menuItemBounds);
      // @ts-ignore
      // profileBgRef.current.mask = mask
    }
  }, [isLoaded, upperComponentBounds]);

  const menuItem = [
    {
      title: "Referral Link",
      rightSection: (
        <Container
          position={[isNotMobile ? 450 / 2 - 70 : app.screen.width * 0.3, 0]}
          anchor={[1, 0.5]}
        >
          <Text
            text={"ABC123"}
            position={[-2, 0]}
            anchor={[0.5, 0.5]}
            style={
              new PIXI.TextStyle({
                fontFamily: "Magra Regular",
                fontSize: isNotMobile ? 20 : 14,
                fontWeight: "600",
                fill: ["white"],
              })
            }
          />
          <Sprite
            texture={PIXI.Assets.get("CopyIcon")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 30 : 25}
            height={isNotMobile ? 30 : 25}
            position={[isNotMobile ? 42 : 30, 0]}
          />
        </Container>
      ),
    },
    {
      title: "Transaction Password",
      rightSection: (
        <Container
          position={[isNotMobile ? 450 / 2 - 70 : app.screen.width * 0.29, 0]}
          anchor={[1, 0.5]}
        >
          <Text
            text={"Amend"}
            position={[0, 0]}
            anchor={[0.5, 0.5]}
            style={
              new PIXI.TextStyle({
                fontFamily: "Magra Regular",
                fontSize: isNotMobile ? 18 : 13,
                fontWeight: "600",
                fill: ["0x04BA00"],
              })
            }
          />
          <Sprite
            texture={PIXI.Assets.get("ArrowRightIcon")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 30 : 25}
            height={isNotMobile ? 30 : 25}
            position={[isNotMobile ? 42 : 30, 1]}
          />
        </Container>
      ),
    },
    {
      title: "Withdraw Verification",
      rightSection: (
        <Container
          position={[isNotMobile ? 450 / 2 - 69 : app.screen.width * 0.305, 0]}
          anchor={[1, 0.5]}
        >
          <Sprite
            texture={PIXI.Assets.get(
              userData?.ga_key ? "SwitchOnIcon" : "SwitchOffIcon"
            )}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 50 : 52}
            height={isNotMobile ? 25 : 22}
            position={[isNotMobile ? 20 : 5, 1]}
          />
        </Container>
      ),
    },
    // {
    //   title: 'Mobile',
    // },
    {
      title: "Email",
      rightSection: (
        <Container
          position={[isNotMobile ? 450 / 2 - 30 : app.screen.width * 0.39, 0]}
          anchor={[1, 0.5]}
        >
          <Text
            text={obscureEmail("test1234@gmail.com")}
            position={[0, 0]}
            anchor={[1, 0.5]}
            style={
              new PIXI.TextStyle({
                fontFamily: "Magra Regular",
                fontSize: isNotMobile ? 18 : 13,
                fontWeight: "600",
                fill: ["0x04BA00"],
              })
            }
          />
        </Container>
      ),
    },
    {
      title: "Follow Us",
      rightSection: (
        <Container
          position={[isNotMobile ? 450 / 2 - 130 : app.screen.width * 0.22, 0]}
          anchor={[1, 0.5]}
          interactiveChildren={true}
        >
          <Sprite
            texture={PIXI.Assets.get("TwitterIcon")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 25 : 20}
            height={isNotMobile ? 25 : 20}
            position={[5, 0]}
            eventMode="static"
            onpointertap={() => {
              // window.open('https://www.facebook.com/Play2Win-100110000000000', '_blank')
              console.log("btn follow 1");
            }}
          />
          <Sprite
            texture={PIXI.Assets.get("TiktokIcon")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 25 : 20}
            height={isNotMobile ? 25 : 20}
            position={[isNotMobile ? 50 : 30, 0]}
            eventMode="static"
            onpointertap={() => {
              // window.open('https://www.facebook.com/Play2Win-100110000000000', '_blank')
              console.log("btn follow 2");
            }}
          />
          <Sprite
            texture={PIXI.Assets.get("TelegramIcon")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 25 : 20}
            height={isNotMobile ? 25 : 20}
            position={[isNotMobile ? 95 : 55, 0]}
            eventMode="static"
            onpointertap={() => {
              // window.open('https://www.facebook.com/Play2Win-100110000000000', '_blank')
              console.log("btn follow 3");
            }}
          />
        </Container>
      ),
    },
    {
      title: "Customer Service",
      rightSection: (
        <Container
          position={[isNotMobile ? 450 / 2 - 70 : app.screen.width * 0.29, 0]}
          anchor={[1, 0.5]}
        >
          <Sprite
            texture={PIXI.Assets.get("ArrowRightIcon")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 30 : 25}
            height={isNotMobile ? 30 : 25}
            position={[isNotMobile ? 42 : 30, 1]}
          />
        </Container>
      ),
    },
    {
      title: "My Social Media Account",
      rightSection: (
        <Container
          position={[isNotMobile ? 450 / 2 - 70 : app.screen.width * 0.29, 0]}
          anchor={[1, 0.5]}
        >
          <Text
            text={"Yet to bind"}
            position={[-12, 0]}
            anchor={[0.5, 0.5]}
            style={
              new PIXI.TextStyle({
                fontFamily: "Magra Regular",
                fontSize: isNotMobile ? 18 : 13,
                fontWeight: "600",
                fill: ["0xFF0000"],
              })
            }
          />
          <Sprite
            texture={PIXI.Assets.get("ArrowRightIcon")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 30 : 25}
            height={isNotMobile ? 30 : 25}
            position={[isNotMobile ? 42 : 30, 1]}
          />
        </Container>
      ),
    },
    {
      title: "Game Guide",
      rightSection: (
        <Container
          position={[isNotMobile ? 450 / 2 - 70 : app.screen.width * 0.29, 0]}
          anchor={[1, 0.5]}
        >
          <Sprite
            texture={PIXI.Assets.get("ArrowRightIcon")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 30 : 25}
            height={isNotMobile ? 30 : 25}
            position={[isNotMobile ? 42 : 30, 1]}
          />
        </Container>
      ),
    },
  ];

  const ProfileBgBounds = PIXI.Assets.get("ProfileBg")?.orig;
  console.log(
    "🚀 ~ file: ProfileTemp.tsx:264 ~ ProfileBgBounds:",
    ProfileBgBounds
  );

  const onMenuItemClick = (title: string) => {
    // console.log('title', title)
    switch (title) {
      case "Referral Link":
        console.log("Referral Link");

        break;
      case "Transaction Password":
        console.log("Transactional Password");

        break;
      case "Withdraw Verification":
        console.log("Withdrawal Verification");
        setToggleWithdrawal(!toggleWithdrawal);

        break;
      case "Mobile":
        console.log("Mobile");

        break;
      case "Email":
        console.log("Email");

        break;
      // case 'Follow Us':

      //   console.log('Follow Us')

      //   break;
      case "Customer Service":
        console.log("Customer Service");

        break;
      case "My Social Media Account":
        console.log("My Social Media Account");

        break;
      case "Game Guide":
        console.log("Game Guide");
        changeScene("GAMEGUIDE");

        break;
      default:
        break;
    }
  };

  const bgGraphic = new PIXI.Graphics()
    .beginFill(0xc9c9c9)
    .drawRoundedRect(0, 0, 1000, 1000, 15)
    .endFill();
  const bgTexture = app.renderer.generateTexture(bgGraphic);

  const bgWhite = new PIXI.Graphics()
    .beginFill(0x031a22)
    .drawRoundedRect(0, 0, 500, 100, 15)
    .endFill();
  const bgWhiteTexture = app.renderer.generateTexture(bgWhite);

  const confirmQuitPanelRef = useCallback((node: any) => {
    if (node !== null) {
      node.width = isNotMobile ? 410 : app.screen.width * 0.75;
      node.height = app.screen.height * 0.3;
      setConfirmQuitPanelBounds(node.getBounds());
    }
  }, []);

  const confirmQuitBtnItems = [
    {
      title: "Confirm",
    },
    {
      title: "Cancel",
    },
  ];

  return (
    <>
      {console.log("menuItemBounds", menuItemBounds)}
      {isLoaded && (
        <Container>
          <Sprite
            texture={PIXI.Assets.get("ProfileBackground")}
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

          <Container
            position={[app.screen.width / 2, 0]}
            height={app.screen.height * 0.8}
          >
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
                  texture={PIXI.Assets.get("BackBtn")}
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
                  text={"Profile"}
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

              {/* right side */}
              <Container position={isNotMobile ? [190, 30] : [150, 40]}>
                <Sprite
                  texture={PIXI.Assets.get("LogoutBtn")}
                  width={isNotMobile ? 40 : 30}
                  height={isNotMobile ? 40 : 30}
                  anchor={[0.5, 0.5]}
                  position={[0, 0]}
                  eventMode="static"
                  onpointertap={() => {
                    console.log("logout clicked");
                    setConfirmQuitPanelVisible(true);
                  }}
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

            {/* Profile */}
            <Container x={0} y={0} height={app.screen.height * 0.85}>
              <Sprite
                // ref={profileBgRef}
                texture={bgTexture}
                alpha={0.85}
                width={isNotMobile ? 450 : app.screen.width * 0.9}
                height={
                  // menuItemBounds?.height + menuItemBounds?.height / 2 + 20
                  app.screen.height * 0.8
                }
                anchor={[0.5, 0]}
                position={[0, isNotMobile ? 100 : 87]}
              />

              {/* Avatar Container */}
              <Container position={[0, isNotMobile ? 160 : 135]}>
                <Sprite
                  texture={PIXI.Assets.get("ProfileBg")}
                  anchor={[0.5, 0.5]}
                  position={[0, 0]}
                  scale={isNotMobile ? [1.7, 1.7] : [1.4, 1.4]}
                />
                <Sprite
                  texture={PIXI.Assets.get("ImgProfile")}
                  anchor={[0.5, 0.5]}
                  position={[0, -3]}
                  scale={isNotMobile ? [1.7, 1.7] : [1.4, 1.4]}
                />

                {/* nickname */}
                <Container
                  position={[
                    0,
                    ProfileBgBounds.height / 2 + (isNotMobile ? 40 : 25),
                  ]}
                >
                  <Text
                    text="DQh1234"
                    position={[0, 0]}
                    anchor={[0.5, 0.5]}
                    style={
                      new PIXI.TextStyle({
                        fontFamily: "Magra Regular",
                        // fontStyle: 'italic',
                        fontSize: isNotMobile ? 24 : 18,
                        fontWeight: "bold",
                        fill: ["0xFFC700"],
                      })
                    }
                  />
                  <Sprite
                    texture={PIXI.Assets.get("RenameIcon")}
                    anchor={[0.5, 0.5]}
                    width={15}
                    height={15}
                    position={isNotMobile ? [54, 3] : [42, 1]}
                  />
                </Container>

                <Text
                  text={`ID:${"12345678"}`}
                  position={[
                    0,
                    ProfileBgBounds.height / 2 + (isNotMobile ? 70 : 50),
                  ]}
                  anchor={[0.5, 0.5]}
                  style={
                    new PIXI.TextStyle({
                      fontFamily: "Magra Regular",
                      fontSize: isNotMobile ? 24 : 16,
                      fontWeight: "normal",
                      fill: ["white"],
                    })
                  }
                />
              </Container>

              {/* Profile Menu */}
              <Container
                position={[0, isNotMobile ? 295 : 240]}
                ref={upperComponentRef}
              >
                {menuItem.map((item, i) => (
                  <Container
                    position={[0, 10 + (isNotMobile ? i * 51 : i * 45)]}
                    eventMode="static"
                    onpointertap={() => onMenuItemClick(item.title)}
                  >
                    <Sprite
                      texture={bgWhiteTexture}
                      width={isNotMobile ? 430 : app.screen.width * 0.85}
                      height={isNotMobile ? 40 : 37}
                      position={[0, 0]}
                      anchor={[0.5, 0.5]}
                    />

                    <Sprite
                      texture={PIXI.Assets.get("MenuLeftIcon")}
                      anchor={[0.5, 0.5]}
                      width={isNotMobile ? 30 : 29}
                      height={isNotMobile ? 26 : 25}
                      position={
                        isNotMobile
                          ? [-((430 / 2) * 0.85), 0]
                          : [-((app.screen.width / 2) * 0.72), 0]
                      }
                    />
                    <Text
                      text={item.title}
                      position={
                        isNotMobile
                          ? [-((430 / 2) * 0.7), 0]
                          : [-((app.screen.width / 2) * 0.59), 0]
                      }
                      anchor={[0, 0.5]}
                      style={
                        new PIXI.TextStyle({
                          fontFamily: "Magra Bold",
                          fontSize: isNotMobile ? 20 : 14,
                          fontWeight: "600",
                          fill: ["0xFFC700"],
                        })
                      }
                    />

                    {/* Render right section */}
                    {item.rightSection}
                  </Container>
                ))}
              </Container>
            </Container>
          </Container>
          {/* Confirm Logout Panel */}
          <Container
            position={[0, app.screen.height * 0.5]}
            anchor={[0.5, 0.5]}
            visible={confirmQuitPanelVisible}
            height={window.innerHeight}
          >
            <Sprite
              texture={PIXI.Texture.WHITE}
              width={app.screen.width}
              height={app.screen.height}
              anchor={[0, 0.5]}
              // scale={isNotMobile ? [1, 1] : [0.5, 1]}
              position={[0, 0]}
              filters={[new PIXI.BlurFilter(10)]}
              tint={"black"}
              alpha={0.7}
              eventMode="static"
            />

            <Container
              ref={confirmQuitPanelRef}
              position={[app.screen.width / 2, 0]}
            >
              <Sprite
                texture={PIXI.Assets.get("RarityPanelBg")}
                anchor={[0.5, 0.5]}
                position={[0, 0]}
              />

              {/* upper panel component */}
              <Container
                position={[
                  0,
                  confirmQuitPanelBounds?.height * (isNotMobile ? -0.35 : -0.4),
                ]}
              >
                <Text
                  text={"Quit"}
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
                    confirmQuitPanelBounds?.width * (isNotMobile ? 0.38 : 0.5),
                    0,
                  ]}
                  eventMode="static"
                  onpointertap={() => setConfirmQuitPanelVisible(false)}
                />
              </Container>

              {/* Action Button */}
              <Container
                position={[
                  0,
                  confirmQuitPanelBounds?.height * (isNotMobile ? 0.27 : 0.35),
                ]}
              >
                <Text
                  text={"Log Out?"}
                  position={[
                    0,
                    isNotMobile ? -100 : -confirmQuitPanelBounds?.height * 0.4,
                  ]}
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
                {confirmQuitBtnItems?.map((item: any, index: number) => {
                  return (
                    <Container
                      key={index}
                      position={[(index % 2) * 120, Math.floor(index / 2) * 55]}
                      eventMode="static"
                      onpointertap={() => {
                        if (item?.title === "Confirm") {
                          logout();
                          changeScene("REGISTER");
                        } else {
                          setConfirmQuitPanelVisible(false);
                        }
                      }}
                    >
                      <Sprite
                        texture={
                          PIXI.Assets.get("RarityBtnFilter") ||
                          PIXI.Texture.EMPTY
                        }
                        anchor={[1, 0.5]}
                        position={[0, 0]}
                      />
                      <Text
                        text={item?.title}
                        position={[-55, 0]}
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
                    </Container>
                  );
                })}
              </Container>
            </Container>
          </Container>
        </Container>
      )}
    </>
  );
};

export default ProfileTemp;
