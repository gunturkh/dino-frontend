import { useCallback, useEffect, useState } from 'react'
import * as PIXI from "pixi.js";
import {
  Container,
  Sprite,
  Text,
  useApp,
} from "@pixi/react";

type Props = {
  onBackBtnClick: () => void;
  visible: boolean;
  scene: string;
}

const Album = ({
  onBackBtnClick, visible = true, scene,
}: Props) => {
  const app = useApp();
  // @ts-ignore
  globalThis.__PIXI_APP__ = app;

  const isNotMobile = app.screen.width > 450;

  const [isLoaded, setIsLoaded] = useState(false);
  const [rarityPanelBounds, setRarityPanelBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [isRarityPanelVisible, setIsRarityPanelVisible] = useState(false);
  console.log("🚀 ~ file: Album.tsx:32 ~ rarityPanelBounds:", rarityPanelBounds)


  // create a ref with container type
  const cardListRef = useCallback((node: any) => {
    if (node !== null) {
      // scale height to 70% of screen height
      node.height = app.screen.height * (isNotMobile ? 0.725 : 0.7);
      node.width = (isNotMobile ? 450 : app.screen.width * 0.9);
    }
  }, [])

  const bottomComponentRef = useCallback((node: any) => {
    if (node !== null) {
      node.width = (isNotMobile ? 450 : app.screen.width * 0.9);
    }
  }, [])

  const rarityPanelRef = useCallback((node: any) => {
    if (node !== null) {
      node.width = (isNotMobile ? 410 : app.screen.width * 0.75);
      node.height = app.screen.height * 0.3;
      setRarityPanelBounds(node.getBounds());
    }
  }, [])

  const calculateCardXPosition = (index: number) => {
    return 90 * (index % 4);
  };
  const calculateCardYPosition = (index: number) => {
    return Math.floor(index / 4) * 110;
  };

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    }
  }, []);
  console.log('isLoaded', isLoaded)
  console.log('app profile screen', app.screen)

  const rarityItems = [
    {
      id: 0,
      name: 'ALL',
      image: PIXI.Assets.get('RarityBtnAllFilter'),
    },
    {
      id: 1,
      name: 'H',
      image: PIXI.Assets.get('RarityBtnFilter'),
    },
    {
      id: 2,
      name: 'E',
      image: PIXI.Assets.get('RarityBtnFilter'),
    },
    {
      id: 3,
      name: 'A',
      image: PIXI.Assets.get('RarityBtnFilter'),
    },
    {
      id: 4,
      name: 'M',
      image: PIXI.Assets.get('RarityBtnFilter'),
    },
    {
      id: 5,
      name: 'I',
      image: PIXI.Assets.get('RarityBtnFilter'),
    },
  ];

  const cardItemHerald = [
    {
      id: 1,
      rarity: 1,
      name: 'ALANGASAURUS',
      image: PIXI.Assets.get('AlangasaurusLocked'),
      imageUnlock: PIXI.Assets.get('AlangasaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 2,
      rarity: 1,
      name: 'ALANQA',
      image: PIXI.Assets.get('AlanqaLocked'),
      imageUnlock: PIXI.Assets.get('AlanqaUnlocked'),
      isLocked: true,
    },
    {
      id: 3,
      rarity: 1,
      name: 'ARGENTINASAURUS',
      image: PIXI.Assets.get('ArgentinosaurusLocked'),
      imageUnlock: PIXI.Assets.get('ArgentinosaurusUnlocked'),
      isLocked: false,
    },
    {
      id: 4,
      rarity: 1,
      name: 'BONITASAURA',
      image: PIXI.Assets.get('BonitasauraLocked'),
      imageUnlock: PIXI.Assets.get('BonitasauraUnlocked'),
      isLocked: false,
    },
    {
      id: 5,
      rarity: 1,
      name: 'COLOBORHYNCHUS',
      image: PIXI.Assets.get('ColoborhynchusLocked'),
      imageUnlock: PIXI.Assets.get('ColoborhynchusUnlocked'),
      isLocked: true,
    },
    {
      id: 6,
      rarity: 1,
      name: 'DIPLOCAULUS',
      image: PIXI.Assets.get('DiplocaulusLocked'),
      imageUnlock: PIXI.Assets.get('DiplocaulusUnlocked'),
      isLocked: true,
    },
    {
      id: 7,
      rarity: 1,
      name: 'GUANLONG',
      image: PIXI.Assets.get('GuanlongLocked'),
      imageUnlock: PIXI.Assets.get('GuanlongUnlocked'),
      isLocked: true,
    },
    {
      id: 8,
      rarity: 1,
      name: 'HATZEGOPTERYX',
      image: PIXI.Assets.get('HatzegopteryxLocked'),
      imageUnlock: PIXI.Assets.get('HatzegopteryxUnlocked'),
      isLocked: true,
    },
    {
      id: 9,
      rarity: 1,
      name: 'LABYRINTHODONTIA',
      image: PIXI.Assets.get('LabyrinthodontiaLocked'),
      imageUnlock: PIXI.Assets.get('LabyrinthodontiaUnlocked'),
      isLocked: true,
    },
    {
      id: 10,
      rarity: 1,
      name: 'LABYRINTHOSAURUS',
      image: PIXI.Assets.get('LabyrinthosaurusLocked'),
      imageUnlock: PIXI.Assets.get('LabyrinthosaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 11,
      rarity: 1,
      name: 'LIMNOSCELIS',
      image: PIXI.Assets.get('LimnoscelisLocked'),
      imageUnlock: PIXI.Assets.get('LimnoscelisUnlocked'),
      isLocked: true,
    },
    {
      id: 12,
      rarity: 1,
      name: 'MAJUNGASAURUS',
      image: PIXI.Assets.get('MajungasaurusLocked'),
      imageUnlock: PIXI.Assets.get('MajungasaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 13,
      rarity: 1,
      name: 'PELECANIMIMUS',
      image: PIXI.Assets.get('PelecanimimusLocked'),
      imageUnlock: PIXI.Assets.get('PelecanimimusUnlocked'),
      isLocked: true,
    },
    {
      id: 14,
      rarity: 1,
      name: 'TRICERATOPS',
      image: PIXI.Assets.get('TriceratopsLocked'),
      imageUnlock: PIXI.Assets.get('TriceratopsUnlocked'),
      isLocked: true,
    },
    {
      id: 15,
      rarity: 1,
      name: 'TROPEOGNATHUS',
      image: PIXI.Assets.get('TropeognathusLocked'),
      imageUnlock: PIXI.Assets.get('TropeognathusUnlocked'),
      isLocked: true,
    },
    {
      id: 16,
      rarity: 1,
      name: 'TUOJIANGOSAURUS',
      image: PIXI.Assets.get('TuojiangosaurusLocked'),
      imageUnlock: PIXI.Assets.get('TuojiangosaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 17,
      rarity: 1,
      name: 'UTAHRAPTOR',
      image: PIXI.Assets.get('UtahraptorLocked'),
      imageUnlock: PIXI.Assets.get('UtahraptorUnlocked'),
      isLocked: true,
    },
  ]

  const cardItemElite = [
    {
      id: 18,
      rarity: 2,
      name: 'ALLOSAURUS',
      image: PIXI.Assets.get('AllosaurusLocked'),
      imageUnlock: PIXI.Assets.get('AllosaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 19,
      rarity: 2,
      name: 'CARNOTAURUS',
      image: PIXI.Assets.get('CarnotaurusLocked'),
      imageUnlock: PIXI.Assets.get('CarnotaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 20,
      rarity: 2,
      name: 'CORYTHOSAURUS',
      image: PIXI.Assets.get('CorythosaurusLocked'),
      imageUnlock: PIXI.Assets.get('CorythosaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 21,
      rarity: 2,
      name: 'DILPHOSAURUS',
      image: PIXI.Assets.get('DilophosaurusLocked'),
      imageUnlock: PIXI.Assets.get('DilophosaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 22,
      rarity: 2,
      name: 'DIMENTROCARNUS',
      image: PIXI.Assets.get('DimetrocarnusLocked'),
      imageUnlock: PIXI.Assets.get('DimetrocarnusUnlocked'),
      isLocked: true,
    },
    {
      id: 23,
      rarity: 2,
      name: 'DIPLODOCUS',
      image: PIXI.Assets.get('DiplodocusLocked'),
      imageUnlock: PIXI.Assets.get('DiplodocusUnlocked'),
      isLocked: true,
    },
    {
      id: 24,
      rarity: 2,
      name: 'DIPLOTATOR',
      image: PIXI.Assets.get('DiplotatorLocked'),
      imageUnlock: PIXI.Assets.get('DiplotatorUnlocked'),
      isLocked: true,
    },
    {
      id: 25,
      rarity: 2,
      name: 'DSUNGARIPTERUS',
      image: PIXI.Assets.get('DsungaripterusLocked'),
      imageUnlock: PIXI.Assets.get('DsungaripterusUnlocked'),
      isLocked: true,
    },
    {
      id: 26,
      rarity: 2,
      name: 'GALLIMIMUS',
      image: PIXI.Assets.get('GallimimusLocked'),
      imageUnlock: PIXI.Assets.get('GallimimusUnlocked'),
      isLocked: true,
    },
    {
      id: 27,
      rarity: 2,
      name: 'GIGANOTOSAURUS',
      image: PIXI.Assets.get('GiganotosaurusLocked'),
      imageUnlock: PIXI.Assets.get('GiganotosaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 28,
      rarity: 2,
      name: 'IRRITATOR',
      image: PIXI.Assets.get('IrritatorLocked'),
      imageUnlock: PIXI.Assets.get('IrritatorUnlocked'),
      isLocked: true,
    },
    {
      id: 29,
      rarity: 2,
      name: 'MONOLOPHOSAURUS',
      image: PIXI.Assets.get('MonolophosaurusLocked'),
      imageUnlock: PIXI.Assets.get('MonolophosaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 30,
      rarity: 2,
      name: 'NASUTOCERATOPS',
      image: PIXI.Assets.get('NasutoceratopsLocked'),
      imageUnlock: PIXI.Assets.get('NasutoceratopsUnlocked'),
      isLocked: true,
    },
    {
      id: 31,
      rarity: 2,
      name: 'NUNDAGOSAURUS',
      image: PIXI.Assets.get('NundagosaurusLocked'),
      imageUnlock: PIXI.Assets.get('NundagosaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 32,
      rarity: 2,
      name: 'NUNDASUCHUS',
      image: PIXI.Assets.get('NundasuchusLocked'),
      imageUnlock: PIXI.Assets.get('NundasuchusUnlocked'),
      isLocked: true,
    },
  ]

  const cardItemAncient = [
    {
      id: 33,
      rarity: 3,
      name: 'ANDREWTHERIUM',
      image: PIXI.Assets.get('AndrewtheriumLocked'),
      imageUnlock: PIXI.Assets.get('AndrewtheriumUnlocked'),
      isLocked: true,
    },
    {
      id: 34,
      rarity: 3,
      name: 'DIMENTRODON',
      image: PIXI.Assets.get('DimetrodonLocked'),
      imageUnlock: PIXI.Assets.get('DimetrodonUnlocked'),
      isLocked: true,
    },
    {
      id: 35,
      rarity: 3,
      name: 'DIMORPHODON',
      image: PIXI.Assets.get('DimorphodonLocked'),
      imageUnlock: PIXI.Assets.get('DimorphodonUnlocked'),
      isLocked: true,
    },
    {
      id: 36,
      rarity: 3,
      name: 'EDAPHOSAURUS',
      image: PIXI.Assets.get('EdaphosaurusLocked'),
      imageUnlock: PIXI.Assets.get('EdaphosaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 37,
      rarity: 3,
      name: 'HAUFFIOSAURUS',
      image: PIXI.Assets.get('HauffiosaurusLocked'),
      imageUnlock: PIXI.Assets.get('HauffiosaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 38,
      rarity: 3,
      name: 'KRONOSAURUS',
      image: PIXI.Assets.get('KronosaurusLocked'),
      imageUnlock: PIXI.Assets.get('KronosaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 39,
      rarity: 3,
      name: 'LEEDSICHTHYS',
      image: PIXI.Assets.get('LeedsichthysLocked'),
      imageUnlock: PIXI.Assets.get('LeedsichthysUnlocked'),
      isLocked: true,
    },
    {
      id: 40,
      rarity: 3,
      name: 'LIOPLEURODON',
      image: PIXI.Assets.get('LiopleurodonLocked'),
      imageUnlock: PIXI.Assets.get('LiopleurodonUnlocked'),
      isLocked: true,
    },
    {
      id: 41,
      rarity: 3,
      name: 'MARSUPIAL LION',
      image: PIXI.Assets.get('marsupial LionLocked'),
      imageUnlock: PIXI.Assets.get('marsupial LionUnlocked'),
      isLocked: true,
    },
    {
      id: 42,
      rarity: 3,
      name: 'MICROPOSASAURUS',
      image: PIXI.Assets.get('MicroposaurusLocked'),
      imageUnlock: PIXI.Assets.get('MicroposaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 43,
      rarity: 3,
      name: 'OSTAFRIKASAURUS',
      image: PIXI.Assets.get('OstafrikasaurusLocked'),
      imageUnlock: PIXI.Assets.get('OstafrikasaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 44,
      rarity: 3,
      name: 'PLIOSAURUS',
      image: PIXI.Assets.get('PliosaurusLocked'),
      imageUnlock: PIXI.Assets.get('PliosaurusUnlocked'),
      isLocked: true,
    },
  ]

  const cardItemMythical = [
    {
      id: 45,
      rarity: 4,
      name: 'ALLONOGMIUS',
      image: PIXI.Assets.get('AllonogmiusLocked'),
      imageUnlock: PIXI.Assets.get('AllonogmiusUnlocked'),
      isLocked: true,
    },
    {
      id: 46,
      rarity: 4,
      name: 'ARMORMATA',
      image: PIXI.Assets.get('ArmormataLocked'),
      imageUnlock: PIXI.Assets.get('ArmormataUnlocked'),
      isLocked: true,
    },
    {
      id: 47,
      rarity: 4,
      name: 'BAGEHESAUROUS',
      image: PIXI.Assets.get('BagehesaurusLocked'),
      imageUnlock: PIXI.Assets.get('BagehesaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 48,
      rarity: 4,
      name: 'CHROMASPINUS',
      image: PIXI.Assets.get('ChromaspinusLocked'),
      imageUnlock: PIXI.Assets.get('ChromaspinusUnlocked'),
      isLocked: true,
    },
    {
      id: 49,
      rarity: 4,
      name: 'DRACOCERATOPS',
      image: PIXI.Assets.get('DracoceratopsLocked'),
      imageUnlock: PIXI.Assets.get('DracoceratopsUnlocked'),
      isLocked: true,
    },
    {
      id: 50,
      rarity: 4,
      name: 'ERLIPHOSAURUS',
      image: PIXI.Assets.get('ErliphosaurusLocked'),
      imageUnlock: PIXI.Assets.get('ErliphosaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 51,
      rarity: 4,
      name: 'GORGOSUCHUS',
      image: PIXI.Assets.get('GorgosuchusLocked'),
      imageUnlock: PIXI.Assets.get('GorgosuchusUnlocked'),
      isLocked: true,
    },
    {
      id: 52,
      rarity: 4,
      name: 'IGUANOSUCHUS',
      image: PIXI.Assets.get('IguanosuchusLocked'),
      imageUnlock: PIXI.Assets.get('IguanosuchusUnlocked'),
      isLocked: true,
    },
    {
      id: 53,
      rarity: 4,
      name: 'SMILODON',
      image: PIXI.Assets.get('SmilodonLocked'),
      imageUnlock: PIXI.Assets.get('SmilodonUnlocked'),
      isLocked: true,
    },
    {
      id: 54,
      rarity: 4,
      name: 'TROODON',
      image: PIXI.Assets.get('TroodonLocked'),
      imageUnlock: PIXI.Assets.get('TroodonUnlocked'),
      isLocked: true,
    },
  ]

  const cardItemImmortal = [
    {
      id: 55,
      rarity: 5,
      name: 'GIANTORTHOCONE',
      image: PIXI.Assets.get('GiantOrthoconeLocked'),
      imageUnlock: PIXI.Assets.get('GiantOrthoconeUnlocked'),
      isLocked: true,
    },
    {
      id: 56,
      rarity: 5,
      name: 'HYAENODON',
      image: PIXI.Assets.get('HyaenodonLocked'),
      imageUnlock: PIXI.Assets.get('HyaenodonUnlocked'),
      isLocked: true,
    },
    {
      id: 57,
      rarity: 5,
      name: 'OVIRAPTOR',
      image: PIXI.Assets.get('OviraptorLocked'),
      imageUnlock: PIXI.Assets.get('OviraptorLocked'),
      isLocked: true,
    },
    {
      id: 58,
      rarity: 5,
      name: 'PLOTOSAURUS',
      image: PIXI.Assets.get('PlotosaurusLocked'),
      imageUnlock: PIXI.Assets.get('PlotosaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 59,
      rarity: 5,
      name: 'PROCERATOSAURUS',
      image: PIXI.Assets.get('ProceratosaurusLocked'),
      imageUnlock: PIXI.Assets.get('ProceratosaurusUnlocked'),
      isLocked: true,
    },
    {
      id: 60,
      rarity: 5,
      name: 'PROCOPTODON',
      image: PIXI.Assets.get('ProcoptodonLocked'),
      imageUnlock: PIXI.Assets.get('ProcoptodonUnlocked'),
      isLocked: true,
    },
    {
      id: 61,
      rarity: 5,
      name: 'STYGIMOLOCH',
      image: PIXI.Assets.get('StygimolochLocked'),
      imageUnlock: PIXI.Assets.get('StygimolochUnlocked'),
      isLocked: true,
    },
    {
      id: 62,
      rarity: 5,
      name: 'TUSOTEUTHIS',
      image: PIXI.Assets.get('TusoteuthisLocked'),
      imageUnlock: PIXI.Assets.get('TusoteuthisUnlocked'),
      isLocked: true,
    },
  ]

  const cardItems = [
    ...cardItemHerald,
    ...cardItemElite,
    ...cardItemAncient,
    ...cardItemMythical,
    ...cardItemImmortal,
  ]
  // TODO: integrate cardItems to backend data
  console.log("cardItems.length", cardItems.length)

  const [currentPage, setCurrentPage] = useState(1);
  const cardPerPage = 16;

  const indexOfLastPost = currentPage * cardPerPage;
  const indexOfFirstPost = indexOfLastPost - cardPerPage;
  const [tempCards, setTempCards] = useState<any>([])
  const currentCards = tempCards?.slice(indexOfFirstPost, indexOfLastPost)

  const disabledNext = currentPage === Math.ceil((tempCards?.length / cardPerPage))
  const disabledPrev = currentPage === 1
  console.group("Group Test")
  console.log("indexOfLastPost:", indexOfLastPost)
  console.log("indexOfFirstPost:", indexOfFirstPost)

  console.log("tempCards:", tempCards)
  console.log("currentCards:", currentCards)
  console.groupEnd()



  // running this once to get the first 16 cards
  useEffect(() => {
    if (cardItems)
      setTempCards(cardItems)
  }, [])

  const filterCards = (rarity: number) => {
    setCurrentPage(1)
    const filteredCards = cardItems.filter((card: any) => card.rarity === rarity)
    // sort by id
    filteredCards.sort((a: any, b: any) => a.id - b.id)
    setTempCards(filteredCards)

    if (rarity === 0) {
      setTempCards(cardItems)
    }
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil((tempCards?.length / cardPerPage))) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {isLoaded && (<Container visible={visible}>
        <Sprite
          texture={PIXI.Assets.get('AlbumBackground')}
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

        <Container position={[app.screen.width / 2, 0]}>

          {/* Upper Button */}
          <Container
            // ref={upperComponentRef}
            x={0}
            y={isNotMobile ? 20 : 0}
            width={isNotMobile ? 450 : app.screen.width * 0.9}
          >
            {/* left side */}
            <Container
              position={isNotMobile ? [-190, 30] : [-150, 40]}
            >
              <Sprite
                texture={PIXI.Assets.get('BackBtn') || PIXI.Texture.EMPTY}
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
                text={'My Collections'}
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
            {/* divider */}
            <Container
              position={[0, isNotMobile ? 15 : 10]}
            >
              <Sprite
                texture={PIXI.Assets.get('UpperDivider')}
                anchor={[0.5, 0.5]}
                position={isNotMobile ? [0, 50] : [0, 60]}
              />
            </Container>
          </Container>

          {/* Rarity filter */}
          <Container
            position={isNotMobile ? [-145, 110] : [-135, 95]}
            anchor={[0.5, 0.5]}
            eventMode='static'
            onpointertap={() => setIsRarityPanelVisible(!isRarityPanelVisible)}
          >
            <Text
              text={'Rarity'}
              position={[0, 0]}
              anchor={[0.5, 0.5]}
              style={new PIXI.TextStyle({
                fontFamily: 'Magra Bold',
                fontSize: isNotMobile ? 24 : 20,
                fontWeight: '600',
                strokeThickness: 1,
                fill: ['white'],
              })}
            />
            <Sprite
              texture={PIXI.Assets.get('AlbumPrevPageBtn') || PIXI.Texture.EMPTY}
              anchor={[0.5, 0.5]}
              rotation={Math.PI * 1.5}
              scale={isNotMobile ? [0.4, 0.4] : [0.3, 0.3]}
              position={[isNotMobile ? 45 : 40, 2]}
            />
          </Container>

          {/* Album list */}
          <Container
            position={[0, 0]}
          >
            <Container
              ref={cardListRef}
              position={isNotMobile ?
                [-(450 * 0.38), app.screen.height - app.screen.height * 0.76] :
                [-(app.screen.width * 0.35), app.screen.height * 0.265]
              }
              anchor={[0.5, 0.5]}
            // jitter at first render when set height
            >
              {currentCards?.length !== 0 && currentCards?.map((item: any, index: number) => {
                return (
                  <Sprite
                    key={index}
                    texture={item?.isLocked ? item?.imageUnlock : item?.image}
                    anchor={[0.5, 0.5]}
                    scale={isNotMobile ? [0.1, 0.1] : [0.095, 0.1]}
                    x={calculateCardXPosition(index)}
                    y={calculateCardYPosition(index)}
                  />
                )
              })}
            </Container>
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
              tint={'black'}
              alpha={0.7}
            />
            <Container
              ref={rarityPanelRef}
              position={[0, 0]}
            >
              <Sprite
                texture={PIXI.Assets.get('RarityPanelBg')}
                anchor={[0.5, 0.5]}
                position={[0, 0]}
              />

              {/* upper panel component */}
              <Container
                position={[0, rarityPanelBounds?.height * (isNotMobile ? -0.35 : -0.4)]}
              >
                <Text
                  text={'Rarity'}
                  position={[0, 0]}
                  anchor={[0.5, 0.5]}
                  style={new PIXI.TextStyle({
                    fontFamily: 'Magra Bold',
                    fontSize: isNotMobile ? 20 : 18,
                    fontWeight: '600',
                    strokeThickness: 1,
                    fill: ['white'],
                  })}
                />
                <Sprite
                  texture={PIXI.Assets.get('LogoutBtn')}
                  width={isNotMobile ? 40 : 40}
                  height={isNotMobile ? 40 : 40}
                  anchor={[0.5, 0.5]}
                  position={[rarityPanelBounds?.width * (isNotMobile ? 0.38 : 0.5), 0]}
                  eventMode='static'
                  onpointertap={() => setIsRarityPanelVisible(false)}
                />
              </Container>

              {/* filter Button */}
              <Container
                position={[0, rarityPanelBounds?.height * (isNotMobile ? -0.1 : -0.15)]}
              >
                {rarityItems?.map((item: any, index: number) => {
                  return (
                    <Container
                      key={index}
                      position={[((index % 2) * 120), Math.floor(index / 2) * 55]}
                      eventMode='static'
                      onpointertap={() => {
                        filterCards(item?.id)
                        setIsRarityPanelVisible(false)
                      }}
                    >
                      <Sprite
                        texture={item?.image}
                        anchor={[1, 0.5]}
                        position={[0, 0]}
                      />
                      <Text
                        text={item?.name}
                        position={[-55, 0]}
                        anchor={[0.5, 0.5]}
                        style={new PIXI.TextStyle({
                          fontFamily: 'Magra Bold',
                          fontSize: isNotMobile ? 20 : 18,
                          fontWeight: '600',
                          strokeThickness: 1,
                          fill: ['white'],
                        })}
                      />
                    </Container>
                  )
                })}
              </Container>
            </Container>
          </Container>


          {/* page number */}
          <Container
            position={[0, app.screen.height * 0.85]}
          >
            <Text
              text={`${currentPage}/${Math.ceil(tempCards?.length / 16)}`}
              position={[0, 0]}
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

          {/* Bottom component */}
          <Container
            ref={bottomComponentRef}
            position={[0, app.screen.height * (isNotMobile ? 0.94 : 0.93)]}
          >
            <Sprite
              texture={PIXI.Assets.get(disabledPrev ? 'AlbumPrevPageBtnDisabled' : 'AlbumPrevPageBtn') || PIXI.Texture.EMPTY}
              anchor={[0.5, 0.5]}
              scale={isNotMobile ? [0.9, 0.9] : [0.7, 0.7]}
              position={[isNotMobile ? -160 : -150, 0]}
              eventMode='static'
              onpointertap={() => previousPage()}
            />
            {/* Claim Button */}
            <Container>
              <Sprite
                texture={PIXI.Assets.get(true ? 'AlbumClaimBtnDisabled' : 'AlbumClaimBtn') || PIXI.Texture.EMPTY}
                anchor={[0.5, 0.5]}
                position={[0, 0]}
              />
              <Text
                text={'Claim'}
                position={[0, 0]}
                anchor={[0.5, 0.5]}
                style={new PIXI.TextStyle({
                  fontFamily: 'Magra Regular',
                  fontSize: isNotMobile ? 15 : 13,
                  fontWeight: '600',
                  fill: ['white'],
                })}
              />

            </Container>

            <Sprite
              texture={PIXI.Assets.get(disabledNext ? 'AlbumNextPageBtnDisabled' : 'AlbumNextPageBtn') || PIXI.Texture.EMPTY}
              anchor={[0.5, 0.5]}
              scale={isNotMobile ? [0.9, 0.9] : [0.7, 0.7]}
              position={[isNotMobile ? 160 : 150, 0]}
              eventMode='static'
              onpointertap={() => nextPage()}
            />
          </Container>

        </Container>
      </Container>)}
    </>
  )
}

export default Album;