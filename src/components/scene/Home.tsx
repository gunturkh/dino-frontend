
import React, { useEffect, useRef } from 'react'
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


const Home = ({
  setSceneState,
}: any
) => {
  const app = useApp();
  console.log('app.screen', app.screen)

  const ProfileBgBounds = PIXI.Assets.get('ProfileBg').orig;
  console.log("🚀 ~ file: home.tsx:26 ~ ProfileBgBounds:", ProfileBgBounds)
  const ProfileAvatarDefaultBounds = PIXI.Assets.get('ProfileAvatarDefault').orig;
  console.log("🚀 ~ file: home.tsx:28 ~ ProfileAvatarDefaultBounds:", ProfileAvatarDefaultBounds)
  const DinoFundBgBounds = PIXI.Assets.get('DinoFundBg').orig;
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
  { console.log('avatar',) }
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

      <Container ref={upperContainerRef} x={app.screen.width} y={app.screen.height}>
        <ProfileComponent
          spriteTexture={PIXI.Assets.get('ProfileBg')}
          avatarTexture={PIXI.Assets.get('ProfileAvatarDefault')}
          text='test1234'
          posX={-app.screen.width / 2 - (ProfileBgBounds.width * 2) * 1.2}
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
          ref={dinoFundRef}
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
          {/* change to fancyButton pixi UI */}
          <Sprite
            texture={PIXI.Assets.get('BtnLngHome')}
            width={30}
            height={30}
            anchor={[0.5, 0.5]}
            x={-app.screen.width / 2 + 70}
            y={-(app.screen.height - DinoFundBgBounds.height * 0.5 + 3)}
          />
        </Container>

      </Container>


    </Container>
  )
}

export default Home
