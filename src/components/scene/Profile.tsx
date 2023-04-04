
import React, { Suspense, useEffect } from 'react'
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
import ProfileComponent from '../ProfileComponent';


type Props = {
  onBackBtnClick: () => void;
}

const Profile = ({
  onBackBtnClick,
}: Props) => {

  const app = useApp();
  // @ts-ignore
  globalThis.__PIXI_APP__ = app;

  const [isLoaded, setIsLoaded] = React.useState(false);
  console.log('app profile screen', app.screen)

  const isNotMobile = app.screen.width > 450;

  const ProfileBgBounds = PIXI.Assets.get('ProfileBg').orig;
  const ProfileAvatarDefaultBounds = PIXI.Assets.get('ProfileAvatarDefault').orig;

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    }
  }, []);

  const menuItem = [
    {
      title: 'Referral Link',
    },
    {
      title: 'Transactional Password',
    },
    {
      title: 'Withdrawal Verification',
    },
    {
      title: 'Mobile',
    },
    {
      title: 'Email',
    },
    {
      title: 'Follow Us',
    },
    {
      title: 'Customer Service',
    },
    {
      title: 'My Social Media Account',
    },
    {
      title: 'Game Guide',
    },
  ]

  return (
    <>
      {/* {isLoaded && */}
      <Container>
        <Sprite
          texture={PIXI.Assets.get('MainBg')}
          width={isNotMobile ? app.screen.width * 1.5 : app.screen.width}
          height={app.screen.height}
          anchor={[0.5, 0.5]}
          position={[app.screen.width / 2, app.screen.height / 2]}
        />

        <Container
          x={app.screen.width / 2}
          y={0}
        // width={app.screen.width > 450 ? 450 : app.screen.width}
        >

          {/* Upper Button */}
          <Container
            x={0}
            y={isNotMobile ? 20 : 0}
            width={isNotMobile ? 450 : app.screen.width * 0.9}
          >
            <Sprite
              texture={PIXI.Assets.get('BackBtn')}
              width={isNotMobile ? 40 : 30}
              height={isNotMobile ? 40 : 30}
              anchor={[0.5, 0.5]}
              position={isNotMobile ? [-190, 50] : [-150, 60]}
              eventMode='static'
              onpointertap={() => onBackBtnClick()}
            />
            < Sprite
              texture={PIXI.Assets.get('LogoutBtn')}
              width={isNotMobile ? 40 : 30}
              height={isNotMobile ? 40 : 30}
              anchor={[0.5, 0.5]}
              position={isNotMobile ? [190, 50] : [150, 60]}
              eventMode='static'
              onpointertap={() => console.log('logout clicked')}
            />
          </Container>

          {/* Profile */}
          <Container
            x={0}
            y={isNotMobile ? 20 : 0}

            height={700}
          // scale={isNotMobile ? [1, 1] : [1, 1]}
          // width={app.screen.width > 450 ? 450 : app.screen.width}
          // height={app.screen.height}
          >
            <Sprite
              texture={PIXI.Texture.WHITE}
              tint={0x9d9da6}
              alpha={0.5}
              width={isNotMobile ? 450 : app.screen.width * 0.9}
              height={app.screen.height / (isNotMobile ? 1.1 : 1.15)}
              anchor={[0.5, 0]}
              position={[0, 87]}
            />

            {/* Avatar Container */}
            <Container
              position={[0, isNotMobile ? 155 : 135]}
            >
              <Sprite
                texture={PIXI.Assets.get('ProfileBg')}
                anchor={[0.5, 0.5]}
                position={[0, 0]}
                scale={isNotMobile ? [2, 2] : [1.4, 1.4]}
              />
              <Sprite
                texture={PIXI.Assets.get('ImgProfile')}
                anchor={[0.5, 0.5]}
                position={[0, -3]}
                scale={isNotMobile ? [2, 2] : [1.4, 1.4]}
              />

              {/* nickname */}
              <Container
                position={[0, ProfileBgBounds.height / 2 + (isNotMobile ? 55 : 25)]}
              >
                <Text
                  text='test1234'
                  position={[0, 0]}
                  anchor={[0.5, 0.5]}
                  style={new PIXI.TextStyle({
                    fontFamily: 'Magra Regular',
                    fontStyle: 'italic',
                    fontSize: isNotMobile ? 24 : 18,
                    fontWeight: 'bold',
                    fill: ['0xFFC700'],
                  })}
                />
                {/* TODO: add rewrite icon */}
              </Container>

              <Text
                text={`ID:${'test1234'}`}
                position={[0, ProfileBgBounds.height / 2 + (isNotMobile ? 90 : 50)]}
                anchor={[0.5, 0.5]}
                style={new PIXI.TextStyle({
                  fontFamily: 'Magra Regular',
                  fontSize: isNotMobile ? 24 : 18,
                  fontWeight: 'normal',
                  fill: ['white'],
                })}
              />
            </Container>


            {/* Menu Component */}

            {/* {[...Array(8)].map((_, i) =>
                <ProfileComponent
                  spriteTexture={PIXI.Texture.WHITE}
                  componentPosX={0}
                  componentPosY={10 + (isNotMobile ? (i * 100) : (i * 70))}
                  width={isNotMobile ? 430 : app.screen.width * 0.85}
                  height={isNotMobile ? 150 : 100}
                  onPress={() => console.log('profile component clicked')}
                />
              )} */}

            <Container
              position={[
                0,
                isNotMobile ? 340 : 275
              ]}
            >
              {menuItem.map((item, i) =>
                <Container position={[
                  0,
                  10 + (isNotMobile ? (i * 105) : (i * 70))
                ]}>
                  <Sprite
                    texture={PIXI.Texture.WHITE}
                    width={isNotMobile ? 430 : app.screen.width * 0.85}
                    height={isNotMobile ? 80 : 50}
                    position={[0, 0]}
                    anchor={[0.5, 0.5]}
                  />

                  <Sprite
                    texture={PIXI.Assets.get('SampleLogo')}
                    anchor={[0.5, 0.5]}
                    width={isNotMobile ? 55 : 35}
                    height={isNotMobile ? 55 : 35}
                    position={isNotMobile ?
                      [-(430 / 2 * 0.8), 0] :
                      [-(app.screen.width / 2 * 0.7), 0]
                    }
                  />
                  <Text
                    text={item.title}
                    position={isNotMobile ?
                      [-(430 / 2 * 0.63), 0] :
                      [-(app.screen.width / 2 * 0.6), 0]
                    }
                    anchor={[0, 0.5]}
                    style={new PIXI.TextStyle({
                      fontFamily: 'Magra Bold',
                      fontSize: isNotMobile ? 24 : 18,
                      fontWeight: 'normal',
                      fill: ['black'],
                    })}
                  />
                </Container>
              )}


            </Container>
          </Container>
        </Container>
      </Container>
      {/* } */}
    </>
  )
}

export default Profile