import React, { Suspense, useEffect, useRef, useState } from "react";
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
  useTick,
} from "@pixi/react";
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
  const isNotMobile = app.screen.width > 450;

  const [isLoaded, setIsLoaded] = useState(false);
  const [toggleWithdrawal, setToggleWithdrawal] = useState(false);

  const profileBgRef = useRef();
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
          position={[isNotMobile ? 450 / 2 - 70 : app.screen.width * 0.31, 0]}
          anchor={[1, 0.5]}
        >
          <Text
            text={"ABC123"}
            position={[0, 0]}
            anchor={[0.5, 0.5]}
            style={
              new PIXI.TextStyle({
                fontFamily: "Magra Regular",
                fontSize: isNotMobile ? 20 : 14,
                fontWeight: "normal",
                fill: ["black"],
              })
            }
          />
          <Sprite
            texture={PIXI.Assets.get("CopyIcon")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 20 : 14}
            height={isNotMobile ? 20 : 14}
            position={[isNotMobile ? 42 : 30, 0]}
          />
        </Container>
      ),
    },
    {
      title: "Transactional Password",
      rightSection: (
        <Container
          position={[isNotMobile ? 450 / 2 - 70 : app.screen.width * 0.31, 0]}
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
                fontWeight: "normal",
                fill: ["green"],
              })
            }
          />
          <Sprite
            texture={PIXI.Assets.get("ChevronRightIcon")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 20 : 14}
            height={isNotMobile ? 20 : 14}
            position={[isNotMobile ? 42 : 30, 1]}
          />
        </Container>
      ),
    },
    {
      title: "Withdrawal Verification",
      rightSection: (
        <Container
          position={[isNotMobile ? 450 / 2 - 70 : app.screen.width * 0.31, 0]}
          anchor={[1, 0.5]}
        >
          <Sprite
            texture={PIXI.Assets.get(
              toggleWithdrawal ? "SwitchOnIcon" : "SwitchOffIcon"
            )}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 55 : 55}
            height={isNotMobile ? 30 : 30}
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
                fontWeight: "normal",
                fill: ["green"],
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
          position={[isNotMobile ? 450 / 2 - 135 : app.screen.width * 0.22, 0]}
          anchor={[1, 0.5]}
          interactiveChildren={true}
        >
          <Sprite
            texture={PIXI.Assets.get("BtnAudio")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 30 : 20}
            height={isNotMobile ? 30 : 20}
            position={[5, 0]}
            eventMode="static"
            onpointertap={() => {
              // window.open('https://www.facebook.com/Play2Win-100110000000000', '_blank')
              console.log("btn follow 1");
            }}
          />
          <Sprite
            texture={PIXI.Assets.get("BtnAudio")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 30 : 20}
            height={isNotMobile ? 30 : 20}
            position={[isNotMobile ? 50 : 30, 0]}
            eventMode="static"
            onpointertap={() => {
              // window.open('https://www.facebook.com/Play2Win-100110000000000', '_blank')
              console.log("btn follow 2");
            }}
          />
          <Sprite
            texture={PIXI.Assets.get("BtnAudio")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 30 : 20}
            height={isNotMobile ? 30 : 20}
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
          position={[isNotMobile ? 450 / 2 - 70 : app.screen.width * 0.31, 0]}
          anchor={[1, 0.5]}
        >
          <Sprite
            texture={PIXI.Assets.get("ChevronRightIcon")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 20 : 14}
            height={isNotMobile ? 20 : 14}
            position={[isNotMobile ? 42 : 30, 1]}
          />
        </Container>
      ),
    },
    {
      title: "My Social Media Account",
      rightSection: (
        <Container
          position={[isNotMobile ? 450 / 2 - 70 : app.screen.width * 0.31, 0]}
          anchor={[1, 0.5]}
        >
          <Text
            text={"Yet to bind"}
            position={[-10, 0]}
            anchor={[0.5, 0.5]}
            style={
              new PIXI.TextStyle({
                fontFamily: "Magra Regular",
                fontSize: isNotMobile ? 18 : 13,
                fontWeight: "normal",
                fill: ["darkred"],
              })
            }
          />
          <Sprite
            texture={PIXI.Assets.get("ChevronRightIcon")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 20 : 14}
            height={isNotMobile ? 20 : 14}
            position={[isNotMobile ? 42 : 30, 1]}
          />
        </Container>
      ),
    },
    {
      title: "Game Guide",
      rightSection: (
        <Container
          position={[isNotMobile ? 450 / 2 - 70 : app.screen.width * 0.31, 0]}
          anchor={[1, 0.5]}
        >
          <Sprite
            texture={PIXI.Assets.get("ChevronRightIcon")}
            anchor={[0.5, 0.5]}
            width={isNotMobile ? 20 : 14}
            height={isNotMobile ? 20 : 14}
            position={[isNotMobile ? 42 : 30, 1]}
          />
        </Container>
      ),
    },
  ];

  const ProfileBgBounds = PIXI.Assets.get("ProfileBg").orig;

  const onMenuItemClick = (title: string) => {
    // console.log('title', title)
    switch (title) {
      case "Referral Link":
        console.log("Referral Link");

        break;
      case "Transactional Password":
        console.log("Transactional Password");

        break;
      case "Withdrawal Verification":
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

        break;
      default:
        break;
    }
  };

  const bgGraphic = new PIXI.Graphics()
    .beginFill(0x9d9da6)
    .drawRoundedRect(0, 0, 1000, 1000, 15)
    .endFill();
  const bgTexture = app.renderer.generateTexture(bgGraphic);

  const bgWhite = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawRoundedRect(0, 0, 500, 100, 15)
    .endFill();
  const bgWhiteTexture = app.renderer.generateTexture(bgWhite);

  return (
    <>
      {console.log("menuItemBounds", menuItemBounds)}
      {isLoaded && (
        <Container>
          <Sprite
            texture={PIXI.Assets.get("MainBg")}
            width={isNotMobile ? app.screen.width : app.screen.width * 1.1}
            height={app.screen.height}
            anchor={[0.5, 0.5]}
            // scale={isNotMobile ? [1, 1] : [0.5, 1]}
            position={[app.screen.width / 2, app.screen.height / 2]}
          />

          <Container position={[app.screen.width / 2, 0]}>
            {/* Upper Button */}
            <Container
              // ref={upperComponentRef}
              x={0}
              y={isNotMobile ? 20 : 0}
              width={isNotMobile ? 450 : app.screen.width * 0.9}
            >
              <Sprite
                texture={PIXI.Assets.get("BackBtn")}
                width={isNotMobile ? 40 : 30}
                height={isNotMobile ? 40 : 30}
                anchor={[0.5, 0.5]}
                position={isNotMobile ? [-190, 50] : [-150, 60]}
                eventMode="static"
                onpointertap={() => onBackBtnClick()}
              />
              <Sprite
                texture={PIXI.Assets.get("LogoutBtn")}
                width={isNotMobile ? 40 : 30}
                height={isNotMobile ? 40 : 30}
                anchor={[0.5, 0.5]}
                position={isNotMobile ? [190, 50] : [150, 60]}
                eventMode="static"
                onpointertap={() => {
                  console.log("logout clicked");
                  logout();
                  changeScene('REGISTER')
                }}
              />
            </Container>

            {/* Profile */}
            <Container
              x={0}
              y={0}
              // height={app.screen.height}
              // scale={isNotMobile ? [1, 1] : [1, 1]}
              // width={app.screen.width > 450 ? 450 : app.screen.width}
            >
              <Sprite
                // ref={profileBgRef}
                texture={bgTexture}
                alpha={0.5}
                width={isNotMobile ? 450 : app.screen.width * 0.9}
                height={menuItemBounds?.height + menuItemBounds?.height / 2}
                anchor={[0.5, 0]}
                position={[0, isNotMobile ? 100 : 87]}
                // mask={mask}
                // isMask={true}
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
                    text="test1234"
                    position={[0, 0]}
                    anchor={[0.5, 0.5]}
                    style={
                      new PIXI.TextStyle({
                        fontFamily: "Magra Regular",
                        fontStyle: "italic",
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
                      texture={PIXI.Assets.get("SampleLogo")}
                      anchor={[0.5, 0.5]}
                      width={isNotMobile ? 40 : 35}
                      height={isNotMobile ? 40 : 35}
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
                          fontWeight: "normal",
                          fill: ["black"],
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
        </Container>
      )}
    </>
  );
};

export default ProfileTemp;
