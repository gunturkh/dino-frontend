import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import * as PIXI from "pixi.js";
import { Container, Sprite, useApp, Text, Graphics } from "@pixi/react";
// import { useSendTransaction } from "@usedapp/core";
import DinoFundComponent from "../DinoFundComponent";
import ProfileComponent from "../ProfileComponent";
import DetailsComponent from "../DetailsComponent";
import LowerButtonComponent from "../LowerButtonComponent";
import { EggPendingListData, useAuthStore, useStore } from "../../utils/store";
import { axiosInstance } from "../../utils/api";
import { ethers } from "ethers";
import { manifest } from "../../assets";
import FlyingAnimations from "../FlyingAnimations";
import { toast } from "react-toastify";
import NormalEggComponent from "../NormalEggComponent";
import gsap from "gsap";
import { Spine } from "pixi-spine";
// import { TICKET_ADDR } from "../../utils/config";
type Props = {
  onProfileClick: () => void;
  setScene?: (value: string) => void;
  scene: string;
};
// temporary commented
// const rawBuyTickets = async (qty: number) => {
//   const data: any = await axiosInstance({
//     url: "/ticket/createRawBuyTickets",
//     method: "POST",
//     data: { qty }
//   });
//   console.log("rawBuyTickets Result:", data);
//   if (data?.data?.success) {
//     // processTransaction(id, ticket)
//   }
// };

interface Draggable extends PIXI.DisplayObject {
  data: any;
  dragging: boolean;
}
const Home = ({ onProfileClick, scene }: Props) => {
  const app = useApp();
  const pathRef = useRef(null);
  const eggRef = useRef(null);
  const setEggPendingListData = useStore(
    (state) => state.setEggPendingListData
  );
  const changeScene = useStore((state) => state.changeScene);
  // const walletAddress = useStore((state) => state.walletAddress);
  const walletBalance = useStore((state) => state.walletBalance);
  const userData = useStore((state) => state.userData);
  const setUserData = useStore((state) => state.setUserData);
  const eggPendingListData = useStore((state) => state.eggPendingListData);
  const eggListsData = useStore((state) => state.eggListsData);
  const setEggListsData = useStore((state) => state.setEggListsData);
  const setTicketPanel = useStore((state) => state.setTicketPanel);
  const setWithdrawPanel = useStore((state) => state.setWithdrawPanel);
  // const notification = useStore((state) => state.notification);
  const setNotification = useStore((state) => state.setNotification);
  const jFundBalance = useStore((state) => state.jFundBalance);
  const setJFundBalance = useStore((state) => state.setJFundBalance);
  const setWithdrawalHistory = useStore((state) => state.setWithdrawalHistory);

  const token = useAuthStore((state) => state.token);

  // const { sendTransaction, state } = useSendTransaction({ transactionName: 'Buy Ticket' })
  console.log("token from home", token);
  const isNotMobile = app.screen.width > 450;
  // @ts-ignore
  globalThis.__PIXI_APP__ = app;

  const defaultBounds = { x: 0, y: 0, width: 0, height: 0 };

  const [isLoaded, setIsLoaded] = useState(false);

  const [buyTicketPanelVisible, setBuyTicketPanelVisible] = useState(false);
  const [toggleBtnAudio, setToggleBtnAudio] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  console.log(
    "currentTime",
    Math.floor(currentTime / 1000),
    Math.floor(currentTime / 1000) % 8
  );

  const onDragStart = useCallback((event: any) => {
    // console.log('eggRef', eggRef)
    const sprite = event.currentTarget as Draggable;
    sprite.alpha = 0.5;
    sprite.data = event.data;
    sprite.dragging = true;
    if (eggRef && eggRef?.current) {
      gsap.to(eggRef, { rotation: 360, duration: 5 });
    }
  }, []);

  const onDragEnd = useCallback((event: any) => {
    const sprite = event.currentTarget as Draggable;
    sprite.alpha = 1;
    sprite.dragging = false;
    sprite.data = null;
  }, []);

  const onDragMove = useCallback((event: any) => {
    const sprite = event.currentTarget as Draggable;
    // let values = [];
    if (sprite.dragging) {
      // console.log('pathRef', pathRef && (pathRef?.current as any)?.geometry?.graphicsData[0]?.points)
      // const points = (pathRef?.current as any)?.geometry?.graphicsData[0]?.points
      // console.log("points", points)
      // for (var i = 0; i < points.length; i += 2) {
      //   values.push({ x: points[i], y: points[i + 1] });
      // }

      const newPosition = sprite.data!.getLocalPosition(sprite.parent);
      // console.log('points', points)
      // console.log('newPosition', newPosition)
      sprite.x = newPosition.x;
      sprite.y = newPosition.y;
      // sprite.x = points[5];
      // sprite.y = points[6];
      // console.log('points', points)
      // console.log('sprite position', sprite)
    }
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
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    };
  }, []);

  console.log("app.screen", app.screen);
  console.log("scene", scene);

  const ProfileBgBounds = PIXI?.Assets?.get("ProfileBg")?.orig || defaultBounds;
  const ProfileAvatarDefaultBounds =
    PIXI?.Assets?.get("ProfileAvatarDefault")?.orig || defaultBounds;
  const DinoFundBgBounds =
    PIXI?.Assets?.get("DinoFundBg")?.orig || defaultBounds;
  const BtnSmallBounds =
    PIXI?.Assets?.get("LowerBtnSmallBg")?.orig || defaultBounds;
  const BtnBigBounds =
    PIXI?.Assets?.get("LowerBtnBigBg")?.orig || defaultBounds;

  // initialize background assets loader
  async function loadBackgroundAssets() {
    await PIXI.Assets.init({ manifest: manifest });
    // initialize assets that have big size
    const bundleIds = manifest.bundles
      .filter((bundle) => {
        return ["CollectionScene"].includes(bundle.name);
      })
      .map((bundle) => bundle.name);

    // load asset in background
    await PIXI.Assets.backgroundLoadBundle(bundleIds);
    await PIXI.Assets.loadBundle(bundleIds);
  }

  loadBackgroundAssets();
  // TODO: need to trigger resolve/mark something after all assets loaded
  // so we can make validation for scene that need to load all assets first

  // const dummyEggLists = [
  //   {
  //     id: 1,
  //     type: 1,
  //     hidden: true,
  //   },
  //   {
  //     id: 2,
  //     type: 1,
  //     hidden: true,
  //   },
  //   {
  //     id: 3,
  //     type: 1,
  //     hidden: true,
  //   },
  //   {
  //     id: 4,
  //     type: 1,
  //     hidden: true,
  //   },
  //   {
  //     id: 5,
  //     type: 1,
  //     hidden: true,
  //   },
  //   {
  //     id: 6,
  //     type: 1,
  //     hidden: true,
  //   },
  //   {
  //     id: 7,
  //     type: 1,
  //     hidden: true,
  //   },
  //   {
  //     id: 8,
  //     type: 1,
  //     hidden: true,
  //   },
  // ];

  const upperContainerRef = useCallback((node: any) => {
    // if (node !== null) {
    //   if (app.screen.width > 430) {
    //     node.width = 450 * 1;
    //   } else if (app.screen.width > 400 && app.screen.width <= 430) {
    //     node.width = 450 * 0.95;
    //   } else if (app.screen.width < 400) {
    //     node.width = app.screen.width * 0.95;
    //   }
    //   console.log('upperContainerRef node.height', node.height, node.width, node.y, node.x)
    // }
  }, []);

  const homecontainerRef = useCallback(
    (node: any) => {
      if (node !== null) {
        node.x = app.screen.width / 2;
        node.y = 0;
        node.scale.set(1, 0.9);

        // if (app.screen.height >= 700 && app.screen.height <= 800) {
        //   node.scale.set(1, 0.9);
        // }

        // if (app.screen.width > 430) {
        //   node.scale.set(1.1, 1);
        // } else if (app.screen.width > 400 && app.screen.width <= 430) {
        //   // node.width = 450 * 0.95;
        //   node.scale.set(0.95, 1);
        //   // node.height = app.screen.height * 0.97
        // } else if (app.screen.width < 400) {
        //   node.scale.set(0.9, 1);
        //   if (app.screen.height > 800) {
        //     node.scale.set(0.9, 1);
        //   } else if (app.screen.height >= 700 && app.screen.height <= 800) {
        //     node.scale.set(0.9, 1);
        //   } else if (app.screen.height >= 500 && app.screen.height <= 600) {
        //     node.scale.set(0.9, 0.6);
        //   } else if (app.screen.height >= 400 && app.screen.height <= 500) {
        //     node.scale.set(0.9, 1);
        //   } else if (app.screen.height < 400) {
        //     node.scale.set(0.9, 1);
        //   }
        // }
        // else if (app.screen.width < 400) {
        //   // node.width = app.screen.width * 0.95;
        //   node.height = app.screen.height * 0.9
        //   node.scale.set(0.9, 1)
        // }
        console.log(
          "upperContainerRef node.height",
          node.height,
          node.width,
          node.y,
          node.x
        );
      }
    },
    [app.screen.width]
  );
  console.log("homecontainerRef", homecontainerRef);

  const detailsContainerRef = useCallback(
    (node: any) => {
      if (node !== null) {
        node.y = app.screen.height * 0.2;
        // if (app.screen.width > 430) {
        //   node.y = app.screen.height * 0.19;
        // } else if (app.screen.width > 400 && app.screen.width <= 430) {
        //   node.y = app.screen.height * 0.15;
        // } else if (app.screen.width < 400) {
        //   node.y = app.screen.height * 0.15;
        //   if (app.screen.height > 800) {
        //     node.scale.set(0.9, 1);
        //   } else if (app.screen.height >= 700 && app.screen.height <= 800) {
        //     node.scale.set(0.9, 1);
        //   } else if (app.screen.height >= 400 && app.screen.height <= 500) {
        //     node.scale.set(0.9, 1);
        //   } else if (app.screen.height < 400) {
        //     node.scale.set(0.9, 1);
        //   }
        // }
        console.log(
          "upperContainerRef node.height",
          node.height,
          node.width,
          node.y,
          node.x
        );
      }
    },
    [app.screen.height]
  );

  // const [lowerContainerBounds, setLowerContainerBounds] = useState(defaultBounds);

  const lowerSectionContainerRef = useCallback(
    (node: any) => {
      if (node !== null && isLoaded) {
        node.y = app.screen.height * 0.9;

        if (app.screen.height >= 700 && app.screen.height <= 800) {
          node.y = app.screen.height * 0.85;
        }
        if (app.screen.height >= 600 && app.screen.height <= 700) {
          node.y = app.screen.height * 0.82;
        }
        if (app.screen.height >= 500 && app.screen.height <= 600) {
          node.y = app.screen.height * 0.8;
        }
        if (app.screen.height >= 400 && app.screen.height <= 500) {
          node.y = app.screen.height * 0.75;
        }
        if (app.screen.height < 400) {
          node.y = app.screen.height * 0.7;
        }

        // console.log('lowerSectionContainerRef node.height', node.height, node.width, node.y, node.x)
      }
    },
    [app.screen.height, isLoaded]
  );

  // const [eggPlateContainerBounds, setEggPlateContainerBounds] = useState({
  //   x: 0, y: 0, width: 0, height: 0
  // });

  const eggPlateContainerRef = useCallback(
    (node: any) => {
      if (node !== null) {
        if (app.screen.width > 430) {
          node.y = app.screen.height / 2;
          node.scale.set(1, 1);
          // node.height = app.screen.height * 0.6
          node.width = 450 * 1;
        } else if (app.screen.width > 400 && app.screen.width <= 430) {
          node.y = app.screen.height / 2;
          node.scale.set(1, 1);
          // node.height = app.screen.height * 0.6
          // node.width = 450 * 0.94;
        } else if (app.screen.width < 400) {
          node.y = app.screen.height / 2 + 20;
          node.height = app.screen.height * 0.35;
          node.width = app.screen.width * 0.7;
          node.scale.set(0.8, 0.8);
        }

        if (app.screen.height > 800) {
          node.y = app.screen.height / 2;
          node.scale.set(1, 1);
        }
        if (app.screen.height >= 700 && app.screen.height <= 800) {
          node.y = app.screen.height * 0.61;
        }
        if (app.screen.height >= 600 && app.screen.height <= 700) {
          node.y = app.screen.height * 0.6;
        }
        if (app.screen.height >= 500 && app.screen.height <= 600) {
          node.y = app.screen.height * 0.6;
        }
        if (app.screen.height >= 400 && app.screen.height <= 500) {
          node.y = app.screen.height * 0.6;
        }
        if (app.screen.height < 400) {
          node.y = app.screen.height * 0.59;
        }
      }
    },
    [app.screen.height, app.screen.width]
  );

  const [gatchaAnimation1, setGatchaAnimation1] = useState<any>(null);
  const [gatchaAnimation2, setGatchaAnimation2] = useState<any>(null);
  const [gatchaAnimation3, setGatchaAnimation3] = useState<any>(null);

  const memoizedGatchaAnimation1 = useMemo(
    () => gatchaAnimation1,
    [gatchaAnimation1]
  );
  const memoizedGatchaAnimation2 = useMemo(
    () => gatchaAnimation2,
    [gatchaAnimation2]
  );
  const memoizedGatchaAnimation3 = useMemo(
    () => gatchaAnimation3,
    [gatchaAnimation3]
  );

  useEffect(() => {
    PIXI.Assets.load([
      "GatchaAnimation1",
      "GatchaAnimation2",
      "GatchaAnimation3",
    ])
      .then((resources) => {
        console.log("res gatchaAnimation", resources);
        // set a matched key to dinoAssets
        setGatchaAnimation1(resources["GatchaAnimation1"]);
        setGatchaAnimation2(resources["GatchaAnimation2"]);
        setGatchaAnimation3(resources["GatchaAnimation3"]);
      })
      .catch((err) => {
        console.log("err flyingDino", err);
      });
  }, []);

  const [gatchaAnimationStatus, setGatchaAnimationStatus] = useState(false);
  // gatcha ticket count
  const [ticketCnt, setTicketCnt] = useState(0);

  const onGatchaAnimationEnd = useCallback(() => {
    console.log("onGatchaAnimationEnd");
    setGatchaAnimationStatus(false);
    setTicketCnt(0);
  }, []);

  const gatchaAnimationRef = useCallback(
    (node: PIXI.Container) => {
      if (node !== null) {
        node.x = 0;
        node.y = app.screen.height / 2;
        node.scale.set(0.8, 0.8);
      }

      let gatcha1: any = null;
      let gatcha2: any = null;
      let gatcha3: any = null;

      // load animation
      memoizedGatchaAnimation1?.spineData?.animations?.forEach(
        (animation: any) => {
          const gatcha = new Spine(memoizedGatchaAnimation1.spineData);
          gatcha.state.setAnimation(0, animation.name, false);

          gatcha.x = 0;
          gatcha.y = 0;
          // gatcha.zIndex = -1;
          // gatcha.cullable = true;

          gatcha.scale.set(0.2);

          // node?.addChild(gatcha);
          gatcha1 = gatcha;
        }
      );

      memoizedGatchaAnimation2?.spineData?.animations?.forEach(
        (animation: any) => {
          const gatcha = new Spine(memoizedGatchaAnimation2.spineData);
          gatcha.state.setAnimation(0, animation.name, false);

          gatcha.x = 0;
          gatcha.y = 0;
          // gatcha.zIndex = -1;
          // gatcha.cullable = true;

          gatcha.scale.set(0.2);

          // node?.addChild(gatcha);
          gatcha2 = gatcha;
        }
      );

      memoizedGatchaAnimation3?.spineData?.animations?.forEach(
        (animation: any) => {
          const gatcha = new Spine(memoizedGatchaAnimation3.spineData);
          gatcha.state.setAnimation(0, animation.name, false);

          gatcha.x = 0;
          gatcha.y = 0;
          // gatcha.zIndex = -1;
          // gatcha.cullable = true;

          gatcha.scale.set(0.2);

          // node?.addChild(gatcha);
          gatcha3 = gatcha;
        }
      );

      if (gatchaAnimationStatus) {
        if (gatcha1 && ticketCnt === 1) {
          gatcha1.visible = true;
          node?.addChild(gatcha1);
        } else if (gatcha2 && ticketCnt === 2) {
          gatcha2.visible = true;
          node?.addChild(gatcha2);
        } else if (gatcha3 && ticketCnt === 4) {
          gatcha3.visible = true;
          node?.addChild(gatcha3);
        }
      }

      if (gatcha1) {
        // node?.addChild(gatcha1);
        gatcha1.state.addListener({
          complete: (entry: any) => {
            gatcha1.visible = false;
            onGatchaAnimationEnd();
            // node?.removeChildren();
          },
        });
      }
      if (gatcha2) {
        // node?.addChild(gatcha2);
        gatcha2.state.addListener({
          complete: (entry: any) => {
            gatcha2.visible = false;
            onGatchaAnimationEnd();
            // node?.removeChildren();
          },
        });
      }
      if (gatcha3) {
        // node?.addChild(gatcha3);
        gatcha3.state.addListener({
          complete: (entry: any) => {
            gatcha3.visible = false;
            onGatchaAnimationEnd();
            // node?.removeChildren();
          },
        });
      }
    },
    [
      memoizedGatchaAnimation1,
      memoizedGatchaAnimation2,
      memoizedGatchaAnimation3,
      gatchaAnimationStatus,
      app.screen.height,
      ticketCnt,
      onGatchaAnimationEnd,
    ]
  );

  console.log("gatchaAnimationStatus", gatchaAnimationStatus);

  const [buyTicketPanelBounds, setBuyTicketPanelBounds] =
    useState(defaultBounds);

  const buyTicketPanelRef = useCallback(
    (node: any) => {
      if (node !== null) {
        setBuyTicketPanelBounds(node.getBounds());

        if (app.screen.height > 600) {
          node.scale.set(1, 1.2);
        }
      }
    },
    [app.screen.height]
  );

  const getJFundBalance = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const { data }: any = await axiosInstance({
      url: "/JFundBalance",
      method: "GET",
      headers: options.headers,
    });
    console.log("get jfund Result:", data);
    if (data?.balance) {
      setJFundBalance(data?.balance);
    } else {
      toast(data.message);
    }
  };

  const getNotification = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const { data }: any = await axiosInstance({
      url: "/notification",
      method: "GET",
      headers: options.headers,
    });
    console.log("get notification gacha egg Result:", data);
    if (data?.success) {
      setNotification(data?.result);
      setTimeout(getNotification, 300000);
    } else {
      toast(data.message);
    }
  };

  const getPendingListingEgg = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const { data }: any = await axiosInstance({
      url: "/egg/pendingListing",
      method: "GET",
      headers: options.headers,
    });
    console.log("get pendingListing egg Result:", data);
    if (data?.success) {
      setEggPendingListData(data?.result);
    } else {
      toast(data.message);
    }
  };

  const getWithdrawHistory = async () => {
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const { data }: any = await axiosInstance({
      url: "/bonus/history",
      method: "GET",
      headers: options.headers,
    });
    console.log("getWithdrawHistory Result:", data);
    if (data?.success) {
      setWithdrawalHistory(data?.result);
    } else {
      toast(data.message);
    }
  };

  useEffect(() => {
    // /user/getUserData
    let options = {
      headers: {
        "my-auth-key": token,
      },
    };
    const getUserData = async () => {
      const result = await axiosInstance({
        url: "/user/getUserData",
        method: "GET",
        headers: options.headers,
      });
      console.log("getUserData Result:", result);
      if (result && result.data && result.data.result) {
        setUserData(result.data.result);
      }
    };

    const getEggList = async () => {
      const data: any = await axiosInstance({
        url: "/egg/lists",
        method: "GET",
        headers: options.headers,
      });
      console.log("getEggList Result:", data);
      if (data?.status === 200 && data?.data?.result?.lists) {
        setEggListsData(data?.data?.result);
      }
    };

    if (token && token?.length > 0) {
      getUserData();
      getEggList();
      getPendingListingEgg();
      getNotification();
      getJFundBalance();
      getWithdrawHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const NormalEggComponent = ({
    data,
    currentTime,
    eggTexture,
    ref,
    posX,
    posY,
    onPress,
    scaleEgg,
    scaleBtn,
    posBtn,
    text,
    visible,
  }: any) => {
    const [expiryTime, setExpiryTime] = useState(data?.listedat);
    console.log("expiryTime NormalEgg", expiryTime);
    // console.log('currentTime', currentTime, 'index: ', index)
    const [countdownTime, setCountdownTime] = useState({
      countdownHours: 0,
      countdownMinutes: 0,
      countdownSeconds: 0,
    });

    const formatText = () => {
      if (expiryTime === 0 && data?.posted === 0) return "Pre-List";
      if (expiryTime === 0 && data?.posted === 1) return "Gatcha";
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
        // }, 1000);
      }
      // };
      // countdown();
      // return () => {
      //     clearInterval(timeInterval);
      // };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTime]);
    return (
      <Container
        ref={ref || null}
        x={posX || 0}
        y={posY || 0}
        visible={visible}
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
          onpointertap={async () => {
            if (formatText() === "Pre-List") {
              let options = {
                headers: {
                  "my-auth-key": token,
                },
              };
              const result = await axiosInstance({
                url: "/egg/postEgg",
                method: "POST",
                headers: options.headers,
                data: { id: data?.id },
              });
              // console.log(result.data);
              if (result.data.success) {
                toast("Pre-List Egg Success");
                getPendingListingEgg();
                // window.location.reload()
                // changeScene('HOME')
              } else {
                toast("Error when trying to pre-list egg");
              }
            }
            if (formatText() === "Gatcha") {
              let options = {
                headers: {
                  "my-auth-key": token,
                },
              };
              const result = await axiosInstance({
                url: "/egg/gatcha",
                method: "POST",
                headers: options.headers,
                data: { id: data?.id },
              });
              // console.log(result.data);
              if (result.data.success) {
                const p = result.data.result;
                if (p.reward_name === "")
                  toast("Oh no! The Dinosaur broke free!");
                else
                  toast(
                    `Horray, you get ${p.reward_name} valued $ ` +
                      ethers.utils.formatEther(p.reward_value)
                  );
                getPendingListingEgg();
                // window.location.reload()
              } else {
                toast("Error when trying to open egg");
              }
            }
          }}
        >
          <Sprite
            position={[0, 0]}
            texture={
              PIXI.Assets.get(
                true ? "BtnPurchaseActive" : "BtnPurchaseCountdown"
              ) || PIXI.Texture.EMPTY
            }
            anchor={[0.5, 0.5]}
          />
          <Text
            text={formatText()}
            position={[0, 0]}
            anchor={[0.5, 0.5]}
            style={
              new PIXI.TextStyle({
                fontFamily: "Magra Bold",
                fontSize: 13,
                fontWeight: "600",
                strokeThickness: 1,
                fill: ["white"],
              })
            }
          />
        </Container>
      </Container>
    );
  };

  const EggPlateComponent = (eggData: any) => {
    // console.log("eggData", eggData);
    const draw = useCallback((g: any) => {
      g.lineStyle(2, 0xaaaaaa, 1);
      g.moveTo(10, -75);
      g.lineTo(-53, -112);
      g.lineTo(-92, -65);
      g.lineTo(-79, -2);
      g.lineTo(7, 29);
      g.lineTo(98, -2);
      g.lineTo(109, -65);
      g.lineTo(70, -112);
      // g.arcTo(350, 200, 450, 900, 100)
      // g.lineTo(200, 500)
      // g.lineTo(700, 100)
      // g.bezierCurveTo(700, 100, 700, 400, 100, 100);
    }, []);
    // console.log('draw', draw)
    const position = [
      {
        posX: 10,
        posY: -75,
        posBtn: [0, 50],
        scaleBtn: [1.2, 1.3],
        scaleEgg: [0.95, 0.95],
      },
      {
        posX: -53,
        posY: -112,
        posBtn: [-3, 25],
      },
      {
        posX: -92,
        posY: -65,
      },
      {
        posX: -79,
        posY: -2,
      },
      {
        posX: 7,
        posY: 29,
      },
      {
        posX: 98,
        posY: -2,
      },
      {
        posX: 109,
        posY: -65,
      },
      {
        posX: 70,
        posY: -112,
      },
    ];

    return (
      <Container
        ref={eggPlateContainerRef}
        x={-5}
        scale={[0.9, 0.9]}
        height={app.screen.height * 0.4}
        // width={app.screen.width * 0.9}
      >
        <Sprite
          texture={PIXI.Assets.get("EggPlate") || PIXI.Texture.EMPTY}
          anchor={[0.5, 0.5]}
        />

        <Graphics draw={draw} ref={pathRef} />

        {eggData?.map((egg: EggPendingListData, eggIndex: number) => {
          if (eggIndex === 0) {
            return (
              <NormalEggComponent
                ref={eggRef}
                data={egg}
                currentTime={currentTime}
                eggTexture={PIXI.Assets.get(
                  `BigEggIcon${egg?.ticket === 4 ? "3" : egg?.ticket}`
                )}
                posX={position[eggIndex]?.posX}
                posY={position[eggIndex]?.posY}
                posBtn={position[eggIndex]?.posBtn}
                // posX={position[currentTime % 8]?.posX}
                // posY={position[currentTime % 8]?.posY}
                // posBtn={position[currentTime % 8]?.posBtn}
                scaleBtn={[1.2, 1.3]}
                scaleEgg={[0.95, 0.95]}
                onPress={() => console.log("egg 1 clicked")}
                onDragStart={onDragStart}
                onDragMove={onDragMove}
                onDragEnd={onDragEnd}
                // visible={!eggData[0]}
              />
            );
          } else
            return (
              <NormalEggComponent
                data={egg}
                currentTime={currentTime}
                eggTexture={PIXI.Assets.get(
                  `EggIcon${egg?.ticket === 4 ? "3" : egg?.ticket}`
                )}
                posX={position[eggIndex]?.posX}
                posY={position[eggIndex]?.posY}
                posBtn={position[eggIndex]?.posBtn}
                // posX={position[currentTime % 8]?.posX}
                // posY={position[currentTime % 8]?.posY}
                // posBtn={position[currentTime % 8]?.posBtn}
                // text={"Pre-List"}
                onPress={() => console.log(`egg ${eggIndex} clicked`)}
                // visible={!eggData[1]}
                onDragStart={onDragStart}
                onDragMove={onDragMove}
                onDragEnd={onDragEnd}
              />
            );
        })}
        {/* egg 2 */}
        {/* <NormalEggComponent
          eggTexture={PIXI.Assets.get(`EggIcon${eggData[1]?.ticket}`)}
          posX={-53}
          posY={-112}
          posBtn={[-3, 25]}
          text={"Pre-List"}
          onPress={() => console.log("egg 2 clicked")}
          visible={!eggData[1]}
        /> */}

        {/* egg 3 */}
        {/* <NormalEggComponent
          eggTexture={PIXI.Assets.get(`EggIcon${eggData[2]?.ticket}`)}
          posX={-92}
          posY={-65}
          text={"Reveal"}
          onPress={() => console.log("egg 3 clicked")}
          visible={!eggData[2]}
        /> */}

        {/* egg 4 */}
        {/* <NormalEggComponent
          eggTexture={PIXI.Assets.get(`EggIcon${eggData[3]?.ticket}`)}
          posX={-79}
          posY={-2}
          onPress={() => console.log("egg 4 clicked")}
          visible={!eggData[3]}
        /> */}

        {/* egg 5 */}
        {/* <NormalEggComponent
          // ref={normalEggref}
          eggTexture={PIXI.Assets.get(`EggIcon${eggData[4]?.ticket}`)}
          posX={7}
          posY={29}
          onPress={() => console.log("egg 5 clicked")}
          visible={!eggData[4]}
        /> */}

        {/* egg 6 */}
        {/* <NormalEggComponent
          eggTexture={PIXI.Assets.get(`EggIcon${eggData[5]?.ticket}`)}
          posX={98}
          posY={-2}
          onPress={() => console.log("egg 6 clicked")}
          visible={!eggData[5]}
        /> */}

        {/* egg 7 */}
        {/* <NormalEggComponent
          eggTexture={PIXI.Assets.get(`EggIcon${eggData[6]?.ticket}`)}
          posX={109}
          posY={-65}
          onPress={() => console.log("egg 7 clicked")}
          visible={!eggData[6]}
        /> */}

        {/* egg 8 */}
        {/* <NormalEggComponent
          eggTexture={PIXI.Assets.get(`EggIcon${eggData[7]?.ticket}`)}
          posX={70}
          posY={-112}
          posBtn={[5, 25]}
          onPress={() => console.log("egg 8 clicked")}
          visible={!eggData[7]}
        /> */}

        {/* egg 1 (big) */}
        {/* <NormalEggComponent
          eggTexture={PIXI.Assets.get(`BigEggIcon${eggData[0]?.ticket}`)}
          posX={10}
          posY={-75}
          posBtn={[0, 50]}
          scaleBtn={[1.2, 1.3]}
          scaleEgg={[0.95, 0.95]}
          onPress={() => console.log("egg 1 clicked")}
          visible={!eggData[0]}
        /> */}
      </Container>
    );
  };

  return (
    <>
      {true && (
        <Container height={app.screen.height}>
          <Sprite
            texture={PIXI?.Assets?.get("MainBg") || PIXI.Texture.EMPTY}
            width={
              app.screen.width < 450 ? app.screen.width * 1.5 : app.screen.width
            }
            height={app.screen.height}
            anchor={[0.5, 0.5]}
            position={[app.screen.width / 2, app.screen.height / 2]}
          />
          <FlyingAnimations />
          <Container ref={homecontainerRef}>
            {/* Upper  Container */}

            <Container
              ref={upperContainerRef}
              // x={0}
              y={app.screen.width > 450 ? 20 : 0}
              // height={app.screen.height * 0.1}
              // width={app.screen.width * 0.95}
              anchor={[0.5, 0.5]}
            >
              <ProfileComponent
                spriteTexture={
                  PIXI?.Assets?.get("ProfileBg") || PIXI.Texture.EMPTY
                }
                avatarTexture={
                  PIXI?.Assets?.get("ProfileAvatarDefault") ||
                  PIXI.Texture.EMPTY
                }
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
                // text="0"
                text={
                  jFundBalance !== ""
                    ? parseFloat(
                        ethers.utils.formatUnits(jFundBalance, 18)
                      ).toFixed(2)
                    : "0"
                }
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
                  texture={
                    PIXI?.Assets?.get("BtnLngHome") || PIXI.Texture.EMPTY
                  }
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
                  texture={
                    PIXI?.Assets?.get("BtnShareHome") || PIXI.Texture.EMPTY
                  }
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
                  texture={
                    PIXI?.Assets?.get(
                      toggleBtnAudio ? "BtnAudioHomeOn" : "BtnAudioHomeMute"
                    ) || PIXI.Texture.EMPTY
                  }
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
              ref={detailsContainerRef}
              x={0}
              // width={app.screen.width > 450 ? 450 : app.screen.width}
              anchor={[0.5, 0.5]}
            >
              {/* right side */}
              <Container
                // position={[app.screen.width / 2 - (lfSideBounds.width / 2), 0]}
                position={[isNotMobile ? 110 : 90, 10]}
                anchor={[0.5, 0.5]}
                // width={app.screen.width > 450 ? 450 : app.screen.width}
              >
                <DetailsComponent
                  spriteTexture={PIXI?.Assets?.get("ImgDetailsBg")}
                  IconTexture={PIXI?.Assets?.get("USDTIcon")}
                  text={parseFloat(
                    parseFloat(walletBalance).toFixed(4)
                  ).toString()}
                  // text={parseFloat(parseFloat('7.8568777655').toFixed(4)).toString()}
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
                  onPress={async () => {
                    console.log("onPress USDTDetails");
                    setTicketCnt(1);
                    setGatchaAnimationStatus(true);
                  }}
                />
                <DetailsComponent
                  spriteTexture={PIXI?.Assets?.get("ImgDetailsBg")}
                  IconTexture={PIXI?.Assets?.get("BonusIcon")}
                  text={ethers.utils.formatUnits(userData?.bonuses, 18)}
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
                    setWithdrawPanel({ show: true, mode: "WITHDRAW" });
                  }}
                />
              </Container>

              {/* left side */}
              <Container
                // pos for 3 details
                // position={[isNotMobile ? -100 : -85, 0]}
                position={[isNotMobile ? -100 : -85, -25]}
                scale={[0.8, 1]}
              >
                <DetailsComponent
                  isVisible={false}
                  spriteTexture={PIXI?.Assets?.get("ImgDetailsBg")}
                  IconTexture={PIXI?.Assets?.get("EventFragmentIcon")}
                  text={userData?.bonuses?.toString() || "0"}
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
                  rightIconVisible
                  text={userData?.tickets?.toString() || "0"}
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
                    // await rawBuyTickets(100)
                    // setBuyTicketPanelVisible(true)
                    setTicketPanel({ show: true, mode: "BUY" });
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
                  text={eggListsData?.remaining?.toString()}
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
            {/* {EggPlateComponent(dummyEggLists)} */}
            {EggPlateComponent(eggPendingListData)}

            {/* Lower Button Container */}
            <Container
              ref={lowerSectionContainerRef}
              anchor={[0.5, 0.5]}
              x={0}
              // width={app.screen?.width > 450 ? 450 : app.screen.width * 0.95}
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
                posY={BtnSmallBounds?.height + 6}
                imageYOffset={10}
                textYOffset={BtnSmallBounds?.height / 2 + 17}
                textStyle={
                  new PIXI.TextStyle({
                    fontFamily: "Magra Bold",
                    fontSize: 12,
                    fontWeight: "bold",
                    fill: ["0xFFC700"],
                  })
                }
                onPress={() => {
                  setTicketCnt(4);
                  setGatchaAnimationStatus(true);
                }}
              />
              <LowerButtonComponent
                spriteTexture={PIXI?.Assets?.get("LowerBtnSmallBg")}
                imageIcon={PIXI?.Assets?.get("ImgComrade")}
                text={"Buddy"}
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
                onPress={() => changeScene("BUDDIES")}
              />

              {/* center button */}
              <LowerButtonComponent
                spriteTexture={PIXI?.Assets?.get("LowerBtnBigBg")}
                imageIcon={PIXI?.Assets?.get("ImgUpass")}
                text={"J-Pass"}
                posX={0}
                posY={BtnSmallBounds?.height - 30}
                scaleX={1}
                scaleY={1}
                imageYOffset={13}
                textYOffset={BtnBigBounds?.height / 2 + 30}
                textStyle={
                  new PIXI.TextStyle({
                    fontFamily: "Magra Bold",
                    fontSize: 14,
                    fontWeight: "bold",
                    fill: ["0xFFC700"],
                  })
                }
                onPress={() => changeScene("JPASS")}
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
                posY={BtnSmallBounds?.height + 2}
                imageYOffset={10}
                textYOffset={BtnSmallBounds?.height / 2 + 20}
                textStyle={
                  new PIXI.TextStyle({
                    fontFamily: "Magra Bold",
                    fontSize: 12,
                    fontWeight: "bold",
                    fill: ["0xFFC700"],
                  })
                }
                onPress={() => {
                  setTicketCnt(2);
                  setGatchaAnimationStatus(true);
                }}
              />
            </Container>

            {/* Buy Ticket Panel */}
            <Container
              position={[0, app.screen.height * 0.5]}
              anchor={[0.5, 0.5]}
              visible={buyTicketPanelVisible}
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
                eventMode={"static"}
              />
              <Container ref={buyTicketPanelRef} position={[0, 0]}>
                <Sprite
                  texture={PIXI.Assets.get("RarityPanelBg")}
                  anchor={[0.5, 0.5]}
                  position={[0, 0]}
                />

                {/* upper panel component */}
                <Container
                  position={[0, -(buyTicketPanelBounds?.height * 0.39)]}
                >
                  <Text
                    text={"Buy Ticket"}
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
                      buyTicketPanelBounds?.width * 0.5 -
                        (isNotMobile ? 50 : 25),
                      0,
                    ]}
                    eventMode="static"
                    onpointertap={() => setBuyTicketPanelVisible(false)}
                  />
                </Container>
              </Container>
            </Container>

            {/* Google Authenticator Panel */}
            <Container
              position={[0, app.screen.height * 0.5]}
              anchor={[0.5, 0.5]}
              visible={false}
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
                eventMode={"static"}
              />
              <Container ref={buyTicketPanelRef} position={[0, 0]}>
                <Sprite
                  texture={PIXI.Assets.get("RarityPanelBg")}
                  anchor={[0.5, 0.5]}
                  position={[0, 0]}
                />

                {/* upper panel component */}
                <Container
                  position={[0, -(buyTicketPanelBounds?.height * 0.29)]}
                >
                  <Text
                    text={"Set 2FA"}
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
                      buyTicketPanelBounds?.width * 0.5 -
                        (isNotMobile ? 50 : 25),
                      0,
                    ]}
                    eventMode="static"
                    // onpointertap={() => setGoogleAuthVisible(false)}
                  />
                </Container>

                {/* Action Button */}
                <Container position={[0, 0]}>
                  {/* put content here */}
                  {/* {googleAuthData && googleAuthData.qr &&
                    <Sprite
                      // texture={PIXI.Assets.get('LogoutBtn')}
                      width={150}
                      height={150}
                      anchor={[0.5, 0.5]}
                      // position={[buyTicketPanelBounds?.width * 0.5 - (isNotMobile ? 50 : 25), 0]}
                      position={[0, 0]}
                      // eventMode='static'
                      // onpointertap={() => setGoogleAuthVisible(false)}
                      image={googleAuthData?.qr}
                    />
                  } */}
                  <Text
                    // text={`SECRET : ${googleAuthData?.secret}`}
                    text={``}
                    // position={[0, isNotMobile ? -100 : -confirmQuitPanelBounds?.height * 0.4]}
                    position={[0, 100]}
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
                  {/* <input type="text" placeholder="validation" />  */}
                </Container>
              </Container>
            </Container>

            {/* Gatcha Animation */}
            <Container ref={gatchaAnimationRef}></Container>
          </Container>
        </Container>
      )}
    </>
  );
};

export default Home;
