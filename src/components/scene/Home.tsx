
import React, { useEffect, useRef, useState } from 'react'
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
} from "@pixi/react";
import DinoFundComponent from '../DinoFundComponent';
import ProfileComponent from '../ProfileComponent';
import DetailsComponent from '../DetailsComponent';
import LowerButtonComponent from '../LowerButtonComponent';

type Props = {
  onProfileClick: () => void;
}

const Home = ({
  onProfileClick,
}: Props
) => {
  const app = useApp();
  // @ts-ignore
  globalThis.__PIXI_APP__ = app;

  console.log('app.screen', app.screen)
  const [getHomeContainerBounds, setHomeContainerBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [toggleBtnAudio, setToggleBtnAudio] = useState(false);

  const ProfileBgBounds = PIXI.Assets.get('ProfileBg').orig;
  const ProfileAvatarDefaultBounds = PIXI.Assets.get('ProfileAvatarDefault').orig;
  const DinoFundBgBounds = PIXI.Assets.get('DinoFundBg').orig;
  const DetailsBounds = PIXI.Assets.get('DiamondDetails').orig;
  const BtnSmallBounds = PIXI.Assets.get('LowerBtnSmallBg').orig;
  const BtnBigBounds = PIXI.Assets.get('LowerBtnBigBg').orig;

  const upperContainerRef = useRef(null);
  const homecontainerRef = useRef(null);
  useEffect(() => {

    // @ts-ignore
    setHomeContainerBounds(homecontainerRef.current.getBounds())
  }, [])

  useEffect(() => {
    console.log('homeContainerBounds', getHomeContainerBounds)
  }, [getHomeContainerBounds])
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
    <Container
    >
      <Sprite
        texture={PIXI.Assets.get('MainBg')}
        width={app.screen.width < 450 ? app.screen.width * 1.5 : app.screen.width}
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
          // width={app.screen.width > 450 ? 450 : app.screen.width}
          anchor={[0.5, 0.5]}
        >
          <ProfileComponent
            spriteTexture={PIXI.Assets.get('ProfileBg')}
            avatarTexture={PIXI.Assets.get('ProfileAvatarDefault')}
            text={`h=${app.screen.height.toFixed()}`}
            componentPosX={app.screen.width > 450 ? -(ProfileBgBounds.width * 2.4) : -(ProfileBgBounds.width * 2.4)}
            componentPosY={0}
            avatarXOffset={0}
            avatarYOffset={(ProfileBgBounds.height / 2 - ProfileAvatarDefaultBounds.height / 2) * 0.5}
            textYOffset={ProfileBgBounds.height - 8}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 16,
              fontWeight: 'bold',
              fill: ['0x705802'],
            })}
            onPress={() => {
              onProfileClick()
            }}
          />

          <DinoFundComponent
            spriteTexture={PIXI.Assets.get('DinoFundBg')}
            text="9.000.000.000"
            // text={`w=${getHomeContainerBounds.width.toFixed()} h=${getHomeContainerBounds.height}`}
            posX={0}
            posY={0}
            scaleX={app.screen.width > 450 ? 0.87 : 0.75}
            textYOffest={(DinoFundBgBounds.height * 0.5 / 2 - 5)}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 24,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
          />

          <Container
            position={[
              DinoFundBgBounds.width / 2 * (app.screen.width > 450 ? 1.05 : 1),
              (DinoFundBgBounds.height / 2 - 7)
            ]}
          >
            {/* Button Language */}
            <Sprite
              texture={PIXI.Assets.get('BtnLngHome')}
              width={app.screen.width > 450 ? 35 : 30}
              height={app.screen.width > 450 ? 35 : 30}
              anchor={[0.5, 0.5]}
              x={0}
              y={0}
              eventMode={'static'}
              onpointertap={() => {
                console.log('BtnLngHome clicked')
              }}
            />
            {/* Button Share */}
            <Sprite
              texture={PIXI.Assets.get('BtnShareHome')}
              width={app.screen.width > 450 ? 35 : 30}
              height={app.screen.width > 450 ? 35 : 30}
              anchor={[0.5, 0.5]}
              x={20 * (app.screen.width > 450 ? 2 : 1.6)}
              y={0}
              eventMode={'static'}
              onpointertap={() => {
                console.log('BtnShareHome clicked')
              }}
            />
            {/* Button Audio on/mute */}
            <Sprite
              texture={PIXI.Assets.get(toggleBtnAudio ? 'BtnAudioHomeOn' : 'BtnAudioHomeMute')}
              width={app.screen.width > 450 ? 35 : 30}
              height={app.screen.width > 450 ? 35 : 30}
              anchor={[0.5, 0.5]}
              x={20 * (app.screen.width > 450 ? 4 : 3.2)}
              y={0}
              eventMode={'static'}
              onpointertap={() => {
                // set toggle audio
                setToggleBtnAudio(!toggleBtnAudio)
              }}
            />
          </Container>
        </Container>

        {/* Details Container */}
        <Container
          x={-(app.screen.width / 2)}
          y={app.screen.width > 450 ? 120 : 100}
          width={app.screen.width > 450 ? 450 : app.screen.width}
        // anchor={[0.5, 0.5]}
        >
          {/* left side */}
          <DetailsComponent
            spriteTexture={PIXI.Assets.get('DiamondDetails')}
            text={'123.123.123'}
            posX={app.screen.width / 2 - (DetailsBounds.width / 2) * 1.4}
            posY={20}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 20,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
            textYOffest={-3}
            textXOffest={10}
            onPress={() => {
              console.log('onPress DiamondDetails')
            }}
          />
          <DetailsComponent
            spriteTexture={PIXI.Assets.get('StarDetails')}
            text={'123.123.123'}
            posX={app.screen.width / 2 - (DetailsBounds.width / 2) * 1.4}
            posY={DetailsBounds.height + 35}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 20,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
            textYOffest={-2}
            textXOffest={10}
            onPress={() => {
              console.log('onPress DiamondDetails')
            }}
          />

          {/* right side */}
          <DetailsComponent
            spriteTexture={PIXI.Assets.get('BNBDetails')}
            text={'0.55012312'}
            posX={app.screen.width / 2 + (DetailsBounds.width / 2) * 1.4}
            posY={0}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 20,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
            textYOffest={-3}
            textXOffest={10}
            onPress={() => {
              console.log('onPress BNBDetails')
            }}
          />
          <DetailsComponent
            spriteTexture={PIXI.Assets.get('InGameTokenDetails')}
            text={'123.123.123'}
            posX={app.screen.width / 2 + (DetailsBounds.width / 2) * 1.4}
            posY={DetailsBounds.height + 12}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 20,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
            textYOffest={-1}
            textXOffest={10}
            onPress={() => {
              console.log('onPress BNBDetails')
            }}
          />

          <DetailsComponent
            spriteTexture={PIXI.Assets.get('HuntingBonusDetails')}
            text={'123.123.123'}
            posX={app.screen.width / 2 + (DetailsBounds.width / 2) * 1.4}
            posY={(DetailsBounds.height * 2) + 30}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 20,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
            textYOffest={-1}
            textXOffest={10}
            onPress={() => {
              console.log('onPress BNBDetails')
            }}
          />
        </Container>

        {/* Lower Button Container */}
        {getHomeContainerBounds && <Container
          anchor={[0.5, 0.5]}
          x={0}
          y={app.screen.height - (BtnSmallBounds.height * 2) - 15}
          width={app.screen.width > 450 ? 450 : app.screen.width}
        >
          {/* left side */}
          <LowerButtonComponent
            spriteTexture={PIXI.Assets.get('LowerBtnSmallBg')}
            imageIcon={PIXI.Assets.get('ImgDinoCenter')}
            text={'Dino Center'}
            posX={-155}
            posY={15}
            imageYOffset={10}
            textYOffset={BtnSmallBounds.height / 2 + 13}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 12,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
          />
          <LowerButtonComponent
            spriteTexture={PIXI.Assets.get('LowerBtnSmallBg')}
            imageIcon={PIXI.Assets.get('ImgGameTask')}
            text={'Game Task'}
            posX={BtnSmallBounds.width - 155}
            posY={15}
            imageYOffset={10}
            textYOffset={BtnSmallBounds.height / 2 + 13}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 12,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
          />
          <LowerButtonComponent
            spriteTexture={PIXI.Assets.get('LowerBtnSmallBg')}
            imageIcon={PIXI.Assets.get('ImgBulletin')}
            text={'Bulletin'}
            posX={-155}
            posY={BtnSmallBounds.height + 10}
            imageYOffset={10}
            textYOffset={BtnSmallBounds.height / 2 + 13}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 12,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
          />
          <LowerButtonComponent
            spriteTexture={PIXI.Assets.get('LowerBtnSmallBg')}
            imageIcon={PIXI.Assets.get('ImgComrade')}
            text={'Comrade'}
            posX={BtnSmallBounds.width - 155}
            posY={BtnSmallBounds.height + 10}
            imageYOffset={10}
            textYOffset={BtnSmallBounds.height / 2 + 13}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 12,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
          />

          {/* center button */}
          <LowerButtonComponent
            spriteTexture={PIXI.Assets.get('LowerBtnBigBg')}
            imageIcon={PIXI.Assets.get('ImgUpass')}
            text={'U Pass'}
            posX={0}
            posY={BtnSmallBounds.height + 20}
            scaleX={0.8}
            scaleY={0.8}
            imageYOffset={13}
            textYOffset={BtnBigBounds.height / 2 + 20}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 14,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
          />
          {/* center button */}

          {/* right side */}
          <LowerButtonComponent
            spriteTexture={PIXI.Assets.get('LowerBtnSmallBg')}
            imageIcon={PIXI.Assets.get('ImgAlbum')}
            text={'Album'}
            posX={155}
            posY={15}
            imageYOffset={10}
            textYOffset={BtnSmallBounds.height / 2 + 13}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 12,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
          />
          <LowerButtonComponent
            spriteTexture={PIXI.Assets.get('LowerBtnSmallBg')}
            imageIcon={PIXI.Assets.get('ImgMiniGames')}
            text={'Mini Games'}
            posX={155 - BtnSmallBounds.width}
            posY={15}
            imageYOffset={10}
            textYOffset={BtnSmallBounds.height / 2 + 13}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 12,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
          />
          <LowerButtonComponent
            spriteTexture={PIXI.Assets.get('LowerBtnSmallBg')}
            imageIcon={PIXI.Assets.get('ImgProfile')}
            text={'Profile'}
            posX={155}
            posY={BtnSmallBounds.height + 10}
            imageYOffset={10}
            textYOffset={BtnSmallBounds.height / 2 + 13}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 12,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
          />
          <LowerButtonComponent
            spriteTexture={PIXI.Assets.get('LowerBtnSmallBg')}
            imageIcon={PIXI.Assets.get('ImgHistory')}
            text={'History'}
            posX={155 - BtnSmallBounds.width}
            posY={BtnSmallBounds.height + 10}
            imageYOffset={10}
            textYOffset={BtnSmallBounds.height / 2 + 13}
            textStyle={new PIXI.TextStyle({
              fontFamily: 'Magra Bold',
              fontSize: 12,
              fontWeight: 'bold',
              fill: ['0xFFC700'],
            })}
          />
        </Container>}
      </Container>
    </Container>
  )
}

export default Home
