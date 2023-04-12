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
    ticket: 4,
    total: "5125.371",
    openat: 1681198865,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 4,
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

const duplicateListingData = [
  dummyListingData,
  dummyListingData,
  dummyListingData,
  dummyListingData,
].flat();
console.log("🚀 ~ file: DinoCenter.tsx:91 ~ duplicateListingData:", duplicateListingData)


const DinoCenter = ({ scene, onBackBtnClick }: any) => {
  const app = useApp();
  const changeScene = useStore((state) => state.changeScene);
  const isNotMobile = app.screen.width >= 430;
  console.log("app.screen", app.screen);
  console.log("scene", scene);

  const [rankDetailBounds, setRankDetailBounds] = useState({
    x: 0, y: 0, width: 0, height: 0,
  });

  console.log("rankDetailBounds:", rankDetailBounds)

  const [eggLists, setEggLists] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationPageNumbers, setPaginationPageNumbers] = useState([1]);
  const [eggPerPage] = useState(12);
  const [selectedPanel, setSelectedPanel] = useState("Listing");

  const [isLoaded, setIsLoaded] = useState(false);

  const indexOfLastPost = currentPage * eggPerPage;
  const indexOfFirstPost = indexOfLastPost - eggPerPage;
  const currentEggs = duplicateListingData.slice(indexOfFirstPost, indexOfLastPost);

  const RankDetailsRef = useCallback((node: any) => {
    if (node !== null) {
      setRankDetailBounds(node.getBounds());
      if (app.screen.width > 430) {

        node.width = 450 * 1.2;
      } else if (app.screen.width > 400) {
        node.width = 450 * 0.94;
      } else {
        node.width = app.screen.width * 0.95;
      }
    }
  }, [app.screen.width]);

  const eggListingComponentRef = useCallback((node: any) => {
    if (node !== null) {
      node.height = app.screen.height * (isNotMobile ? 0.6 : 0.57);
      // node.x = -(listingItemBounds.width * (isNotMobile ? 2.5 : 2.5))
      if (app.screen.width > 430) {
        node.x = -(node.width / 2 + rankDetailBounds.width * 0.125)
        node.y = app.screen.height * 0.27
        node.width = 450 * 1.2;
      } else if (app.screen.width > 400) {
        node.x = -(node.width / 2 + rankDetailBounds.width * 0.122)
        node.y = app.screen.height * 0.31
        node.width = 450 * 0.94;
      } else {
        node.x = -(node.width / 2 + rankDetailBounds.width * 0.12)
        node.y = app.screen.height * 0.37
        node.width = app.screen.width * 0.95;
      }
      // node.x = -(node.width / 2 + rankDetailBounds.width * 0.125)
      console.log('test x', -(node.width / 2 + rankDetailBounds.width * 0.08))
      console.log('eggListingComponentRef bounds', node.getBounds())
    }
  }, [app.screen.height, app.screen.width, isNotMobile, rankDetailBounds.width]);

  const paginationRef = useCallback((node: any) => {
    if (node !== null) {
      if (app.screen.width > 430) {
        node.width = 450 * 0.7;
      } else if (app.screen.width > 400) {
        node.width = 450 * 0.58;
      } else {
        node.width = app.screen.width * 0.6;
      }
    }
  }, [app.screen.width]);


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

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(duplicateListingData.length / eggPerPage); i++) {
      pageNumbers.push(i);
    }
    setPaginationPageNumbers(pageNumbers)
  }, [eggPerPage])
  console.log("data::", {
    currentPage,
    currentEggs,
  })

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

  return (
    <>
      {isLoaded && (
        <Container
        >
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
              anchor={[0, 0.5]}
              visible={selectedPanel === 'Listing'}
            >
              {currentEggs.length > 0 &&
                currentEggs?.map((d: any, idx: number) => {
                  // setExpiryTime(d.openat)
                  return (
                    <>
                      <EggListingComponent
                        key={`egg-list-${idx}`}
                        index={`egg-list-${idx}`}
                        idx={idx}
                        priceText={d?.total.toString()}
                        timerText={d?.openat.toString()}
                        eggType={d?.ticket}
                        onBtnKeepPress={(eggIndex) => {
                          // TODO: action button for keep, using idx from props as a differentiator
                          console.log('onBtnKeepPress', eggIndex)
                        }}
                      />
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
            x={app.screen.width * 0.48}
            y={app.screen.height * (isNotMobile ? 0.92 : 0.935)}
            ref={paginationRef}
          >
            {/* Pagination */}
            <Container
              x={isNotMobile ? 0 : 0}
              anchor={[0.5, 0.5]}

            >
              <Sprite
                texture={PIXI.Assets.get('BtnPagePaginationRest')}
                position={[isNotMobile ? -120 : -120, 0]}
                anchor={[0.5, 0.5]}
                width={50}
                height={50}
              />
              <Container
                position={[isNotMobile ? -60 : -60, 0]}
                eventMode="static"
                onpointertap={() => {
                  paginate(1)
                }}
              >
                <Sprite
                  texture={PIXI.Assets.get(currentPage === 1 ? 'BtnPagePaginationActive' : 'BtnPagePaginationNumberInactive')}
                  anchor={[0.5, 0.5]}
                  width={55}
                  height={55}

                />
                <Text
                  text={'1'}
                  position={[0, 0]}
                  anchor={[0.5, 0.6]}
                  style={new PIXI.TextStyle({
                    fontFamily: 'Magra Bold',
                    fontSize: isNotMobile ? 26 : 20,
                    fontWeight: '600',
                    strokeThickness: 1,
                    fill: ['white'],
                  })}
                />
              </Container>
              <Container
                eventMode="static"
                onpointertap={() => {
                  paginate(2)
                }}
              >
                <Sprite
                  texture={PIXI.Assets.get(currentPage === 2 ? 'BtnPagePaginationActive' : 'BtnPagePaginationNumberInactive')}
                  anchor={[0.5, 0.5]}
                  width={55}
                  height={55}
                />
                <Text
                  text={'2'}
                  position={[0, isNotMobile ? 0 : 0]}
                  anchor={[0.5, 0.6]}
                  style={new PIXI.TextStyle({
                    fontFamily: 'Magra Bold',
                    fontSize: isNotMobile ? 26 : 20,
                    fontWeight: '600',
                    strokeThickness: 1,
                    fill: ['white'],
                  })}
                />
              </Container>
              <Container
                position={[isNotMobile ? 60 : 60, 0]}
                eventMode="static"
                onpointertap={() => {
                  paginate(3)
                }}
              >
                <Sprite
                  texture={PIXI.Assets.get(currentPage === 3 ? 'BtnPagePaginationActive' : 'BtnPagePaginationNumberInactive')}
                  anchor={[0.5, 0.5]}
                  width={55}
                  height={55}
                />
                <Text
                  text={'3'}
                  position={[0, isNotMobile ? 0 : 0]}
                  anchor={[0.5, 0.6]}
                  style={new PIXI.TextStyle({
                    fontFamily: 'Magra Bold',
                    fontSize: isNotMobile ? 26 : 20,
                    fontWeight: '600',
                    strokeThickness: 1,
                    fill: ['white'],
                  })}
                />
              </Container>
              <Sprite
                texture={PIXI.Assets.get('BtnPagePaginationRest')}
                position={[isNotMobile ? 120 : 120, 0]}
                anchor={[0.5, 0.5]}
                width={50}
                height={50}
              />
            </Container>

            {/* Refresh button */}
            <Sprite
              texture={PIXI.Assets.get('BtnRefreshListing')}
              anchor={[0.5, 0.5]}
              x={rankDetailBounds?.width *
                (app.screen.width > 430 ? 0.5 : app.screen.width > 400 ? 0.44 : 0.42)}
              scale={app.screen.width > 430 ? [1.7, 1.7] : app.screen.width > 400 ? [1.5, 1.5] : [1.2, 1.2]}
            />

          </Container>
        </Container>
      )}
    </>
  );
};

export default DinoCenter;
