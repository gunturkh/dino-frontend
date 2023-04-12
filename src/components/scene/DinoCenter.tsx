import { useCallback, useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { Container, Sprite, useApp, Text } from "@pixi/react";
import { List, ProgressBar } from "@pixi/ui";
import DinoFundComponent from "../DinoFundComponent";
import ProfileComponent from "../ProfileComponent";
import DetailsComponent from "../DetailsComponent";
import EggListingComponent from "../EggListingComponent";
import { useStore } from "../../utils/store";
import { axiosInstance } from "../../utils/api";

const dummyListingData = [
  {
    id: "43d0dc7559ab1d630b1255b4bc073368",
    ticket: 2,
    total: "5125.371",
    openat: 1681341402,
  },
  {
    id: "1b866c80f12fa4f67b80879b10badbfb",
    ticket: 1,
    total: "5125.371",
    openat: 1681198665,
  },
  {
    id: "c17ec81751eb424c57ccbb6b22e7842d",
    ticket: 1,
    total: "5125.371",
    openat: 1681198765,
  },
  {
    id: "8bc77b6cdfa78deba5fde023653acea9",
    ticket: 3,
    total: "5125.371",
    openat: 1681198865,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    total: "5125.371",
    openat: 1681185515,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    total: "5125.371",
    openat: 1681185515,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    total: "5125.371",
    openat: 1681185515,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    total: "5125.371",
    openat: 1681185515,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    total: "5125.371",
    openat: 1681185515,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    total: "5125.371",
    openat: 1681185515,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    total: "5125.371",
    openat: 1681185515,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    total: "5125.371",
    openat: 1681185515,
  },
];

const DinoCenter = ({ scene, onBackBtnClick }: any) => {
  const app = useApp();
  const changeScene = useStore((state) => state.changeScene);
  const isNotMobile = app.screen.width > 430;
  console.log("app.screen", app.screen);
  console.log("scene", scene);

  const [rankDetailBounds, setRankDetailBounds] = useState({
    x: 0, y: 0, width: 0, height: 0,
  });

  const [listingItemBounds, setListingItemBounds] = useState({
    x: 0, y: 0, width: 0, height: 0,
  });

  console.log("rankDetailBounds:", rankDetailBounds)

  const [eggLists, setEggLists] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationPageNumbers, setPaginationPageNumbers] = useState([1]);
  const [postsPerPage] = useState(3);
  const [selectedPanel, setSelectedPanel] = useState("Listing");

  const [isLoaded, setIsLoaded] = useState(false);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dummyListingData.slice(indexOfFirstPost, indexOfLastPost);

  const containerRef = useCallback((node: any) => {
    if (node !== null) {
      node.width = isNotMobile ? 450 * 0.99 : app.screen.width * 0.95;
      console.log('containerRef bounds', node.getBounds())
    }
  }, [app.screen.width, isNotMobile]);

  const listingItemBgRef = useCallback((node: any) => {
    if (node !== null) {
      setListingItemBounds(node.getBounds());
    }
  }, []);

  const RankDetailsRef = useCallback((node: any) => {
    if (node !== null) {
      setRankDetailBounds(node.getBounds());
      node.width = isNotMobile ? 450 : app.screen.width;
    }
  }, [app.screen.width, isNotMobile]);

  const listingActionBtnRef = useCallback((node: any) => {
    if (node !== null && listingItemBounds.height > 0) {
      node.y = listingItemBounds.height * (isNotMobile ? 0.25 : 0.3)
    }
  }, [isNotMobile, listingItemBounds.height]);

  const eggListingComponentRef = useCallback((node: any) => {
    if (node !== null) {
      node.width = isNotMobile ? 450 : app.screen.width * 0.95;
      node.height = app.screen.height * (isNotMobile ? 0.6 : 0.57);
      // node.x = -(listingItemBounds.width * (isNotMobile ? 2.5 : 2.5))
      node.x = -(node.width / 2 + listingItemBounds.width / 2) - (listingItemBounds.width * (isNotMobile ? 0.09 : 0.04))
      console.log('test x', node.width / 2 + listingItemBounds.width / 2)
      console.log('eggListingComponentRef bounds', node.getBounds())
    }
  }, [app.screen.height, app.screen.width, isNotMobile, listingItemBounds.width]);


  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    };
  }, []);

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
    return listingItemBounds.width + 95 * (index % 4);
  };
  const calculateEggYPosition = (index: number) => {
    return Math.floor(index / 4) * 135;
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(dummyListingData.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    setPaginationPageNumbers(pageNumbers)
  }, [postsPerPage])

  const Paginate = ({ postsPerPage, totalPosts, paginate }: { postsPerPage: number, totalPosts: number, paginate: (val: number) => void }) => {

    return (
      <div className="pagination-container">
        <ul className="pagination">
          {paginationPageNumbers.map((number) => (
            <li
              key={number}
              onClick={() => paginate(number)}
              className="page-number"
            >
              {number}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const barView = new PIXI.Container();
  // const barAssets = [PIXI.Assets.get('RankExpBarBg'), PIXI.Assets.get('RankExpBarFill')];
  const barAssets = ['image/rankExpBarBg.png', 'image/imgRankExpBarFill.png'];

  const progressBarComponent = new ProgressBar({
    bg: barAssets[0],
    fill: barAssets[1],
    progress: 50,
  });
  progressBarComponent.width = 230
  // progressBarComponent.width = rankDetailBounds.width * 0.5;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const expText = new PIXI.Text('1000/2000', {
    align: 'center',
    fontFamily: 'Magra Bold',
    fontSize: isNotMobile ? 15 : 14,
    fontWeight: '600',
    // strokeThickness: 1,
    fill: ['white'],
  });
  barView.addChild(progressBarComponent);

  const progressBarComponentRef = useCallback((node: any) => {
    if (node !== null) {
      console.log("progressBarComponentRef", node.getBounds());

      expText.anchor.set(0, 0.5);
      // barView.width = rankDetailBounds.width * 0.4;
      expText.position.set(-expText.width / 2, 10);
      barView.position.set(-barView.width / 2, 0);
      // barView
      node.addChild(barView);
      node.addChild(expText)
    }
  }, [barView, expText]);

  const [expiryTime, setExpiryTime] = useState(0);
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
        }, 1000);
      }
    };
    countdown();
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const countdownText = () => {
    // setExpiryTime(expTime)
    console.log('expiryTime', expiryTime)
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
    <>
      {isLoaded && (<Container>
        <Sprite
          texture={PIXI.Assets.get('ListingBackground')}
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
          tint={'white'}
          alpha={0.3}
        />

        <Container position={[app.screen.width / 2, 0]}
          ref={containerRef}
        >
          {/* Upper Button */}
          <Container
            x={0}
            y={isNotMobile ? 20 : 0}
            width={isNotMobile ? 450 : app.screen.width * 0.9}
          >
            {/* left side */}
            <Container
              position={isNotMobile ? [-190, 30] : [-150, 40]}
            >
              <Sprite
                texture={PIXI.Assets.get('BackBtn')}
                width={isNotMobile ? 40 : 30}
                height={isNotMobile ? 40 : 30}
                anchor={[0.5, 0.5]}
                position={[0, 0]}
                eventMode='static'
                onpointertap={() => onBackBtnClick()}
              />
            </Container>

            {/* Text */}
            <Container
              position={[0, isNotMobile ? 30 : 40]}
            >
              <Text
                text={'Jurassic Market'}
                position={[-2, 0]}
                anchor={[0.5, 0.5]}
                style={new PIXI.TextStyle({
                  fontFamily: 'Magra Bold',
                  fontSize: isNotMobile ? 24 : 18,
                  fontWeight: '600',
                  strokeThickness: 1,
                  fill: ['white'],
                })}
              />
            </Container>

            {/* right side */}
            <Container
              position={isNotMobile ? [190, 30] : [150, 40]}
            >
              < Sprite
                texture={PIXI.Assets.get('LogoutBtn')}
                width={isNotMobile ? 40 : 30}
                height={isNotMobile ? 40 : 30}
                anchor={[0.5, 0.5]}
                position={[0, 0]}
                eventMode="static"
              // onpointertap={() => {
              //   console.log("logout clicked");
              //   setConfirmQuitPanelVisible(true);
              // }}
              />
            </Container>
            {/* divider */}
            {/* <Container
              position={[0, isNotMobile ? 15 : 10]}
            >
              <Sprite
                texture={PIXI.Assets.get('UpperDivider')}
                anchor={[0.5, 0.5]}
                position={isNotMobile ? [0, 50] : [0, 60]}
              />
            </Container> */}
          </Container>

          {/* Rank Details */}
          <Container
            position={[0, isNotMobile ? 135 : 120]}
            ref={RankDetailsRef}
          >
            <Sprite
              texture={PIXI.Assets.get('PnlJurassicMarketBackground')}
              anchor={[0.5, 0.5]}
            />
            <Text
              text={'Trainer\'s Rank'}
              position={[0, -rankDetailBounds?.height / 2 + 28]}
              anchor={[0.5, 0.5]}
              style={new PIXI.TextStyle({
                fontFamily: 'Magra Bold',
                fontSize: isNotMobile ? 18 : 16,
                fontWeight: '600',
                strokeThickness: 1,
                fill: ['white'],
              })}
            />
            {/* left side */}
            <Container
              x={-rankDetailBounds?.width / 2 + (rankDetailBounds?.width * 0.01)}
              y={-rankDetailBounds?.height / 2 + (rankDetailBounds?.height * 0.43)}
            >
              <Text
                text={'Requalification'}
                position={[0, 0]}
                anchor={[0, 0.5]}
                style={new PIXI.TextStyle({
                  fontFamily: 'Magra Bold',
                  fontSize: isNotMobile ? 16 : 14,
                  fontWeight: '600',
                  fill: ['white'],
                })}
              />
              <Text
                text={'10050'}
                position={[0, 15]}
                anchor={[0, 0.5]}
                style={new PIXI.TextStyle({
                  fontFamily: 'Magra Bold',
                  fontSize: isNotMobile ? 16 : 14,
                  fontWeight: '600',
                  fill: ['white'],
                })}
              />

            </Container>

            {/* progressbar component */}
            <Container
              ref={progressBarComponentRef}
            >
              <Container
                y={rankDetailBounds.width * (isNotMobile ? 0.072 : 0.082)}
              >
                <Text
                  text={'Novice'}
                  y={0}
                  x={-(barView.width / 2)}
                  anchor={[0.5, 0.5]}
                  style={new PIXI.TextStyle({
                    fontFamily: 'Magra Bold',
                    fontSize: isNotMobile ? 15 : 14,
                    fontWeight: '600',
                    fill: ['0xF82424'],
                  })}
                />
                <Text
                  text={'Rookie'}
                  y={0}
                  x={barView.width / 2}
                  anchor={[0.5, 0.5]}
                  style={new PIXI.TextStyle({
                    fontFamily: 'Magra Bold',
                    fontSize: isNotMobile ? 15 : 14,
                    fontWeight: '600',
                    fill: ['white'],
                  })}
                />
              </Container>

            </Container>

            {/* right side */}
            <Container
              x={rankDetailBounds?.width / 2 - (rankDetailBounds?.width * 0.01)}
              y={-rankDetailBounds?.height / 2 + (rankDetailBounds?.height * 0.43)}
            >
              <Text
                text={'Current Rank'}
                position={[0, 0]}
                anchor={[1, 0.5]}
                style={new PIXI.TextStyle({
                  fontFamily: 'Magra Bold',
                  fontSize: isNotMobile ? 16 : 14,
                  fontWeight: '600',
                  strokeThickness: 1,
                  fill: ['white'],
                })}
              />
              <Text
                text={'Novice'}
                position={[0, 15]}
                anchor={[1, 0.5]}
                style={new PIXI.TextStyle({
                  fontFamily: 'Magra Bold',
                  fontSize: isNotMobile ? 16 : 14,
                  fontWeight: '600',
                  strokeThickness: 1,
                  fill: ['white'],
                })}
              />

            </Container>
          </Container>

          {/* filter & Panel */}
          <Container
            y={rankDetailBounds?.height * (isNotMobile ? 1.85 : 1.65)}
          >
            <Container
              position={[0, 0]}
            >
              {/* Listing */}
              <Container
                y={0}
                x={rankDetailBounds?.width * (isNotMobile ? -0.4 : -0.35)}
                anchor={[0.5, 0.5]}
                eventMode='static'
                onpointerup={() => {
                  setSelectedPanel('Listing')
                  console.log('Listing')
                }}
              >
                <Text
                  text={'Listings'}
                  position={[0, 0]}
                  anchor={[0.5, 0.5]}
                  style={new PIXI.TextStyle({
                    fontFamily: 'Magra Bold',
                    fontSize: isNotMobile ? 22 : 15,
                    fontWeight: '600',
                    fill: [selectedPanel === 'Listing' ? '0xFFB800' : 'white'],
                  })}
                />
                <Text
                  text={'/'}
                  position={[rankDetailBounds.width * (isNotMobile ? 0.1 : 0.085), 0]}
                  anchor={[0.5, 0.5]}
                  style={new PIXI.TextStyle({
                    fontFamily: 'Magra Bold',
                    fontSize: isNotMobile ? 22 : 15,
                    fontWeight: '600',
                    fill: ['white'],
                  })}
                />
              </Container>

              {/* My Listings */}
              <Container
                y={0}
                x={rankDetailBounds?.width * (isNotMobile ? -0.15 : -0.15)}
                anchor={[0.5, 0.5]}
                eventMode='static'
                onpointerup={() => {
                  setSelectedPanel('My Listing')
                  console.log('My Listings')
                }}
              >
                <Text
                  text={'My Listings'}
                  position={[0, 0]}
                  anchor={[0.5, 0.5]}
                  style={new PIXI.TextStyle({
                    fontFamily: 'Magra Bold',
                    fontSize: isNotMobile ? 22 : 15,
                    fontWeight: '600',
                    fill: [selectedPanel === 'My Listing' ? '0xFFB800' : 'white'],
                  })}
                />
              </Container>
            </Container>

            {/* filter Price */}
            <Container
              y={0}
              x={rankDetailBounds?.width * (isNotMobile ? 0.15 : 0.15)}
              anchor={[0.5, 0.5]}
              eventMode='static'
            // onpointertap={() => setIsRarityPanelVisible(!isRarityPanelVisible)}
            >
              <Text
                text={'Price'}
                position={[0, 0]}
                anchor={[0.5, 0.5]}
                style={new PIXI.TextStyle({
                  fontFamily: 'Magra Bold',
                  fontSize: isNotMobile ? 22 : 15,
                  fontWeight: '600',
                  fill: ['white'],
                })}
              />
              <Sprite
                texture={PIXI.Assets.get('AlbumPrevPageBtn') || PIXI.Texture.EMPTY}
                anchor={[0.5, 0.5]}
                rotation={Math.PI * 1.5}
                scale={isNotMobile ? [0.4, 0.4] : [0.25, 0.25]}
                position={[isNotMobile ? 40 : 27, 1]}
              />
            </Container>

            {/* filter Time */}
            <Container
              y={0}
              x={rankDetailBounds?.width * (isNotMobile ? 0.35 : 0.35)}
              anchor={[0.5, 0.5]}
              eventMode='static'
            // onpointertap={() => setIsRarityPanelVisible(!isRarityPanelVisible)}
            >
              <Text
                text={'Time'}
                position={[0, 0]}
                anchor={[0.5, 0.5]}
                style={new PIXI.TextStyle({
                  fontFamily: 'Magra Bold',
                  fontSize: isNotMobile ? 22 : 15,
                  fontWeight: '600',
                  fill: ['white'],
                })}
              />
              <Sprite
                texture={PIXI.Assets.get('AlbumPrevPageBtn') || PIXI.Texture.EMPTY}
                anchor={[0.5, 0.5]}
                rotation={Math.PI * 1.5}
                scale={isNotMobile ? [0.4, 0.4] : [0.25, 0.25]}
                position={[isNotMobile ? 40 : 27, 1]}
              />
            </Container>
          </Container>

          {/* Listing Component */}
          <Container
            ref={eggListingComponentRef}
            y={app.screen.height * (isNotMobile ? 0.28 : app.screen.width >= 430 ? 0.3 : 0.38)}
            anchor={[0, 0.5]}
            visible={selectedPanel === 'Listing'}
          >
            {dummyListingData.length > 0 &&
              dummyListingData.map((d: any, idx: number) => {
                // setExpiryTime(d.openat)
                return (
                  <>
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
                        texture={PIXI.Assets.get(d.ticket === 3 ? "EggIcon3" : d.ticket === 2 ? "EggIcon2" : "EggIcon1")}
                        anchor={[0.5, 0.5]}
                        scale={isNotMobile ? [0.75, 0.85] : [0.8, 0.9]}
                      />

                      {/* Action Button */}
                      <Container
                        ref={listingActionBtnRef}
                      // y={listingItemBounds.height + listingItemBounds.height * (isNotMobile ? 0.0 : 0.74)}
                      >
                        <Text
                          text={d.total}
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
                  </>
                );
              })}
          </Container>

          {/* My Listing Component */}
          <Container
            y={app.screen.height * (isNotMobile ? 0.28 : app.screen.width >= 430 ? 0.3 : 0.38)}
            anchor={[0, 0.5]}
            visible={selectedPanel === 'My Listing'}
          >
            <Text
              text={'No Data'}
              position={[0, isNotMobile ? 10 : 7]}
              anchor={[0.5, 0.5]}
              style={new PIXI.TextStyle({
                fontFamily: 'Magra Bold',
                fontSize: isNotMobile ? 24 : 20,
                fontWeight: '600',
                strokeThickness: 1,
                fill: ['white'],
              })}
            />
          </Container>
        </Container>

        {/* Pagination & Refresh */}
        <Container
          x={app.screen.width * 0.5}
          y={app.screen.height * (isNotMobile ? 0.9 : app.screen.width >= 430 ? 0.9 : 0.935)}
        >
          {/* Pagination */}
          <Container>

          </Container>

          {/* Refresh button */}
          <Sprite
            texture={PIXI.Assets.get('BtnRefreshListing')}
            anchor={[0.5, 0.5]}
            x={rankDetailBounds?.width * (isNotMobile ? 0.3 : 0.35)}
          />

        </Container>
      </Container>
      )}
    </>
  );
};

export default DinoCenter;
