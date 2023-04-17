/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import { Container, Sprite, useApp, Text } from "@pixi/react";
import { ProgressBar } from "@pixi/ui";

import EggListingComponent from "../EggListingComponent";
import { EggTransactionData, useStore } from "../../utils/store";
import { axiosInstance } from "../../utils/api";
import { useSendTransaction, useTokenAllowance } from "@usedapp/core";
import { PAYGATEWAY_ADDR, RPC_ENDPOINT, USDT_ABI, USDT_ADDR } from "../../utils/config";
import { ethers, utils } from "ethers";
const ethProvider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
const dummyListingData = [
  {
    id: "43d0dc7559ab1d630b1255b4bc073368",
    ticket: 2,
    // total: "5125.371",
    total: "1",
    openat: 1681640817,
  },
  {
    id: "1b866c80f12fa4f67b80879b10badbfb",
    ticket: 1,
    // total: "5125.371",
    total: "2",
    openat: 1681642817,
  },
  {
    id: "c17ec81751eb424c57ccbb6b22e7842d",
    ticket: 1,
    // total: "5125.371",
    total: "3",
    openat: 1681645817,
  },
  {
    id: "8bc77b6cdfa78deba5fde023653acea9",
    ticket: 4,
    // total: "5125.371",
    total: "4",
    openat: 1681647817,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 4,
    // total: "5125.371",
    total: "5",
    openat: 1681648817,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    // total: "5125.371",
    total: "6",
    openat: 1681649817,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    // total: "5125.371",
    total: "7",
    openat: 1681650817,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    // total: "5125.371",
    total: "8",
    openat: 1681651817,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    // total: "5125.371",
    total: "9",
    openat: 1681653817,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    // total: "5125.371",
    total: "10",
    openat: 1681654817,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    // total: "5125.371",
    total: "11",
    openat: 1681655817,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    // total: "5125.371",
    total: "12",
    openat: 1681656817,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    // total: "5125.371",
    total: "13",
    openat: 1681658817,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    // total: "5125.371",
    total: "14",
    openat: 1681660817,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    // total: "5125.371",
    total: "15",
    openat: 1681662817,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    // total: "5125.371",
    total: "16",
    openat: 1681664817,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    // total: "5125.371",
    total: "17",
    openat: 1681684817,
  },
  {
    id: "086f39a21e9925ec873f528d9d19794d",
    ticket: 1,
    // total: "5125.371",
    total: "18",
    openat: 1681686817,
  },
];

const duplicateListingData = [
  dummyListingData,
  // dummyListingData,
  // dummyListingData,
  // dummyListingData,
].flat();
console.log("🚀 ~ file: DinoCenter.tsx:91 ~ duplicateListingData:", duplicateListingData)


const DinoCenter = ({ scene, onBackBtnClick }: any) => {
  const app = useApp();
  // const { account } = useEthers()
  const isNotMobile = app.screen.width >= 430;
  console.log("app.screen", app.screen);
  console.log("scene", scene);

  const [rankDetailBounds, setRankDetailBounds] = useState({
    x: 0, y: 0, width: 0, height: 0,
  });

  console.log("rankDetailBounds:", rankDetailBounds)
  const walletAddress = useStore(state => state.walletAddress)
  const eggListsData = useStore(state => state.eggListsData)
  const setEggListsData = useStore(state => state.setEggListsData)
  const eggTransactionData = useStore(state => state.eggTransactionData)
  const setEggTransactionData = useStore(state => state.setEggTransactionData)
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState("Listing");
  // const [eggLists, setEggLists] = useState([]);

  const [eggPerPage] = useState(12);
  const [paginationPageNumbers, setPaginationPageNumbers] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  // TODO: tempCards should be set with the actual data from the API
  // const [tempCards, setTempCards] = useState<any>([])
  const totalPages = Math.ceil(eggListsData.length / eggPerPage);
  const startIndex = (currentPage - 1) * eggPerPage;
  const endIndex = startIndex + eggPerPage;
  const currentEggs = eggListsData.slice(startIndex, endIndex);

  const allowance = useTokenAllowance(USDT_ADDR, walletAddress, PAYGATEWAY_ADDR)
  const { sendTransaction, state } = useSendTransaction({ transactionName: 'Send Ethereum' })
  console.log('allowance token', allowance)
  console.log('account', walletAddress)
  console.log('transaction state', state)
  const [listingItemBounds, setListingItemBounds] = useState({
    x: 0, y: 0, width: 0, height: 0
  });

  const [eggListingBounds, setEggListingBounds] = useState({
    x: 0, y: 0, width: 0, height: 0,
  });

  const listingItemBgRef = useCallback((node: any) => {
    if (node !== null) {
      setListingItemBounds(node.getBounds());
    }
  }, []);

  const eggListingComponentRef = useCallback((node: any) => {
    if (node !== null) {
      // node.height = app.screen.height * (isNotMobile ? 0.6 : 0.57);

      if (app.screen.width > 430) {
        node.x = -(node.width / 2 + listingItemBounds.width * 0.5)
        node.y = app.screen.height * 0.3
        node.height = app.screen.height * 0.6
        // node.width = 450 * 1;
      } else if (app.screen.width > 400 && app.screen.width <= 430) {
        node.x = -(node.width / 2 + listingItemBounds.width * 0.5)
        node.y = app.screen.height * 0.3
        node.height = app.screen.height * 0.6
        // node.width = 450 * 0.94;
      } else if (app.screen.width < 400) {
        node.x = -(node.width / 2 + rankDetailBounds.width * 0.12)
        node.y = app.screen.height * 0.37
        node.height = app.screen.height * 0.57
        // node.width = app.screen.width * 0.95;
      }
      setEggListingBounds(node.getBounds())
      // node.x = -(node.width / 2 + rankDetailBounds.width * 0.125)
      console.log('eggListingComponentRef bounds', node.getBounds())
    }
  }, [app.screen.height, app.screen.width, listingItemBounds.width, rankDetailBounds.width]);

  const paginationRef = useCallback((node: any) => {
    if (node !== null) {

      // x={app.screen.width * 0.4}

      if (app.screen.width > 430) {
        node.width = 450 * 0.5;
        node.x = app.screen.width * 0.47
        node.y = app.screen.height * 0.92
      } else if (app.screen.width > 400 && app.screen.width <= 430) {
        node.width = 450 * 0.58;
        node.x = app.screen.width * 0.42
        node.y = app.screen.height * 0.92
      } else if (app.screen.width < 400) {
        node.width = app.screen.width * 0.6;
        node.x = app.screen.width * 0.4
        node.y = app.screen.height * 0.935
      }
    }
  }, [app.screen.height, app.screen.width]);

  // running this once to get the first 12 eggs
  useEffect(() => {
    if (duplicateListingData) setEggListsData(duplicateListingData)
  }, [])

  useEffect(() => {
    const pageNumbers = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage === 1) {
        pageNumbers.push(1, 2, 3);
      } else if (currentPage === totalPages) {
        pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    setPaginationPageNumbers(pageNumbers)
  }, [currentPage, eggPerPage, totalPages])

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const RankDetailsRef = useCallback((node: any) => {
    if (node !== null) {
      setRankDetailBounds(node.getBounds());
      if (app.screen.width > 430) {
        node.width = 450 * 1;
      } else if (app.screen.width > 400 && app.screen.width <= 430) {
        node.width = 450 * 0.94;
      } else if (app.screen.width < 400) {
        node.width = app.screen.width * 0.95;
      }
    }
  }, [app.screen.width]);




  const calculateEggXPosition = (index: number) => {
    return listingItemBounds.width + 95 * (index % 4) as number;
  };
  const calculateEggYPosition = (index: number) => {
    return Math.floor(index / 4) * 135 as number;
  };


  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    };
  }, []);

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

  const processTransaction = async (id: string, ticket: number) => {
    const data: any = await axiosInstance({
      url: `/egg/detail?id=${id}`,
      method: "GET",
    });
    console.log("processTransaction Result:", data);
    if (data?.data?.success) {
      setEggTransactionData({ ...data?.data?.result, ticket })
      setSelectedPanel("My Listing")
    }
  };

  const handleKeep = async (id: string, ticket: number) => {
    const { data }: any = await axiosInstance({
      url: "/egg/keep",
      method: "POST",
      data: { id }
    });
    console.log("handleKeep Result:", data);
    if (data?.success) {
      processTransaction(id, ticket)
    }
    else {
      window.alert(data.message)
    }
  };
  useEffect(() => {
    // /egg/lists
    getEggList();
  }, []);



  console.log("data::", {
    currentPage,
    currentEggs,
  })

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

          {/* let it false, just for reference bounds */}
          <Sprite
            ref={listingItemBgRef}
            texture={PIXI.Assets.get("ListingItemBg")}
            anchor={[0.5, 0.5]}
            scale={isNotMobile ? [0.9, 0.85] : [0.9, 0.9]}
            visible={false}
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
              anchor={[0.5, 0.5]}
              visible={selectedPanel === 'Listing'}
              width={eggListingBounds?.width}
            >
              {currentEggs.length > 0 &&
                currentEggs?.map((d: any, idx: number) => {
                  // setExpiryTime(d.openat)
                  return (
                    <>
                      <EggListingComponent
                        id={`${d.id}`}
                        key={`egg-list-${idx + ((currentPage - 1) * 12)}`}
                        index={`egg-list-${idx + ((currentPage - 1) * 12)}`}
                        idx={idx}
                        priceText={d?.total}
                        timerText={d?.openat.toString()}
                        eggType={d?.ticket}
                        listingItemBgRef={listingItemBgRef}
                        listingItemBounds={listingItemBounds}
                        selectedPanel={selectedPanel}
                        calculateEggXPosition={calculateEggXPosition(idx)}
                        calculateEggYPosition={calculateEggYPosition(idx)}
                        onBtnKeepPress={(eggIndex) => {
                          // TODO: action button for keep, using idx from props as a differentiator
                          console.log('onBtnKeepPress', d.id)
                          handleKeep(d.id, d.ticket)
                        }}
                        onBtnPurchasePress={(idx) => {
                          console.log('approve ', idx)
                        }
                        }
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
                visible={eggTransactionData?.length === 0}
              />

              {eggTransactionData.length > 0 &&
                eggTransactionData?.map((d: EggTransactionData, idx: number) => {
                  // setExpiryTime(d.openat)
                  return (
                    <>
                      <EggListingComponent
                        id={`${d.id}`}
                        key={`egg-transaction-${idx + ((currentPage - 1) * 12)}`}
                        index={`egg-transaction-${idx + ((currentPage - 1) * 12)}`}
                        idx={idx}
                        priceText={d?.total}
                        timerText={d?.expired.toString()}
                        eggType={d?.ticket}
                        listingItemBgRef={listingItemBgRef}
                        listingItemBounds={listingItemBounds}
                        selectedPanel={selectedPanel}
                        calculateEggXPosition={calculateEggXPosition(idx)}
                        calculateEggYPosition={calculateEggYPosition(idx)}
                        onBtnKeepPress={(eggIndex) => {
                          // TODO: action button for keep, using idx from props as a differentiator
                          console.log('onBtnKeepPress', d.id)
                          handleKeep(d.id, d.ticket)
                        }}
                        onBtnPurchasePress={async (idx) => {
                          console.log('allowance ', allowance)
                          console.log('account approve', walletAddress)
                          const contract = new ethers.Contract(USDT_ADDR, USDT_ABI, ethProvider);
                          console.log('contract', contract)
                          let checkallw = await contract?.allowance(walletAddress, PAYGATEWAY_ADDR);
                          checkallw = checkallw.toString();
                          console.log('checkallw', checkallw)
                          const txReq = { to: USDT_ADDR, from: walletAddress, data: d.TxRawApproval, value: utils.parseEther(d.total) }
                          console.log('txReq', txReq)
                          const txSend = await sendTransaction(txReq)
                          console.log('txSend', txSend)
                        }}
                      />
                    </>
                  );
                })}
            </Container>
          </Container>

          {/* Pagination & Refresh */}
          <Container
            ref={paginationRef}
          >
            {/* Pagination */}
            <Container
              x={isNotMobile ? 0 : 0}
              anchor={[0.5, 0.5]}

            >
              <Sprite
                texture={currentPage <= 2 ? PIXI.Texture.EMPTY : PIXI.Assets.get('BtnPagePaginationRest')}
                position={[isNotMobile ? -120 : -120, 0]}
                anchor={[0.5, 0.5]}
                width={50}
                height={50}
              />
              {paginationPageNumbers?.map((pageNumber, index) => {
                console.log('pageNumber', pageNumber)
                return (
                  <Container
                    key={`page-${pageNumber}`}
                    position={[isNotMobile ? -60 + ((index) * 60) : -60 + ((index) * 60), 0]}
                    eventMode="static"
                    onpointertap={() => {
                      paginate(pageNumber)
                    }}
                  >
                    <Sprite
                      texture={PIXI.Assets.get(pageNumber === currentPage ? 'BtnPagePaginationActive' : 'BtnPagePaginationNumberInactive')}
                      anchor={[0.5, 0.5]}
                      width={55}
                      height={55}
                    />
                    <Text
                      text={pageNumber.toString()}
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
                )
              })}
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
              eventMode="static"
              onpointertap={() => {
                getEggList()
                // reset pagination
                setCurrentPage(1)
              }}
            />

          </Container>
        </Container>
      )}
    </>
  );
};

export default DinoCenter;
