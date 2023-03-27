
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

const Home = ({
  setSceneState,
}: any
) => {
  const app = useApp();
  console.log('app.screen', app.screen)

  const [toggleBtnAudio, setToggleBtnAudio] = useState(false);

  const ProfileBgBounds = PIXI.Assets.get('ProfileBg').orig;
  const ProfileAvatarDefaultBounds = PIXI.Assets.get('ProfileAvatarDefault').orig;
  const DinoFundBgBounds = PIXI.Assets.get('DinoFundBg').orig;
  const DetailsBounds = PIXI.Assets.get('DiamondDetails').orig;

  console.log("🚀 ~ file: home.tsx:26 ~ ProfileBgBounds:", ProfileBgBounds)
  console.log("🚀 ~ file: home.tsx:28 ~ ProfileAvatarDefaultBounds:", ProfileAvatarDefaultBounds)
  console.log("🚀 ~ file: home.tsx:30 ~ DinoFundBgBounds:", DinoFundBgBounds)

  const upperContainerRef = useRef(null);
  const dinoFundRef = useRef(null);
  // console.log('dinoFundRef', dinoFundRef.current)
  useEffect(() => {
    // @ts-ignore
    console.log('upperContainerRef', upperContainerRef.current.getBounds())
    // @ts-ignore
    console.log('upperContainerRef getGlobalPosition', upperContainerRef.current.getGlobalPosition())
  }, [])
  console.log('avatar')
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

      {/* Upper  Container */}
      <Container ref={upperContainerRef} x={app.screen.width} y={app.screen.height}>
        <ProfileComponent
          spriteTexture={PIXI.Assets.get('ProfileBg')}
          avatarTexture={PIXI.Assets.get('ProfileAvatarDefault')}
          text='test1234'
          posX={-app.screen.width / 2 - (ProfileBgBounds.width * 2) * 1.3}
          posY={-app.screen.height + 5}
          avatarXOffset={0}
          avatarYOffset={(ProfileBgBounds.height / 2 - ProfileAvatarDefaultBounds.height / 2) * 0.5}
          textYOffset={ProfileBgBounds.height - 8}
          textStyle={new PIXI.TextStyle({
            fontFamily: 'Magra',
            fontSize: 18,
            fontWeight: 'bold',
            fill: ['0x705802'],
          })}
          onPress={() => {
            console.log('onPress ProfileComponent')
          }}
        />

        <DinoFundComponent
          // ref={dinoFundRef}
          spriteTexture={PIXI.Assets.get('DinoFundBg')}
          // text="9.000.000.000"
          text={`x=${app.screen.width} y=${app.screen.height}`}
          posX={-app.screen.width / 2}
          posY={-app.screen.height + 5}
          // posY={-app.screen.height + 100}
          textYOffest={(DinoFundBgBounds.height * 0.5 / 2 - 5)}
          textStyle={new PIXI.TextStyle({
            fontFamily: 'Magra',
            fontSize: 24,
            fontWeight: 'bold',
            fill: ['0xFFC700'],
          })}
        />

        <Container
          position={[
            DinoFundBgBounds.width / 2 * 1.17,
            0
          ]}
        >
          {/* Button Language */}
          <Sprite
            texture={PIXI.Assets.get('BtnLngHome')}
            width={30}
            height={30}
            anchor={[0.5, 0.5]}
            x={-app.screen.width / 2}
            y={-(app.screen.height - DinoFundBgBounds.height * 0.5 + 3)}
            eventMode={'static'}
            onpointertap={() => {
              console.log('BtnLngHome clicked')
            }}
          />
          {/* Button Share */}
          <Sprite
            texture={PIXI.Assets.get('BtnShareHome')}
            width={30}
            height={30}
            anchor={[0.5, 0.5]}
            x={-app.screen.width / 2 + 35}
            y={-(app.screen.height - DinoFundBgBounds.height * 0.5 + 3)}
            eventMode={'static'}
            onpointertap={() => {
              console.log('BtnShareHome clicked')
            }}
          />
          {/* Button Audio on/mute */}
          <Sprite
            texture={PIXI.Assets.get(toggleBtnAudio ? 'BtnAudioHomeOn' : 'BtnAudioHomeMute')}
            width={30}
            height={30}
            anchor={[0.5, 0.5]}
            x={-app.screen.width / 2 + 70}
            y={-(app.screen.height - DinoFundBgBounds.height * 0.5 + 3)}
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
        position={[
          0,
          100
        ]}
      >
        {/* left side */}
        <DetailsComponent
          spriteTexture={PIXI.Assets.get('DiamondDetails')}
          text={'123.123.123'}
          posX={app.screen.width / 2 - (DetailsBounds.width / 2) * 1.4}
          posY={20}
          textStyle={new PIXI.TextStyle({
            fontFamily: 'Magra',
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
            fontFamily: 'Magra',
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
            fontFamily: 'Magra',
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
            fontFamily: 'Magra',
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
            fontFamily: 'Magra',
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


    </Container>
  )
}

export default Home
