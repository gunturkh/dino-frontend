
import React from 'react'
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


const Home = ({
  setSceneState,
}: any
) => {
  const app = useApp();
  console.log('app.screen', app.screen)
  return (
    <Container
    >
      <Sprite
        image={"image/Background.png"}
        width={app.screen.width < 450 ? app.screen.width * 1.5 : app.screen.width}
        height={app.screen.height}
        anchor={[0.5, 0.5]}
        position={[app.screen.width / 2, app.screen.height / 2]}
      />

      {/* TODO: need to make a function to change scene into Register again */}
      <Text
        text="Register"
        eventMode='static'
        x={0}
        y={0}
        pointertap={() => console.log('Login clicked')}
      />
      {/* <Sprite
        image="image/pills.png"
        anchor={[0.5, 0.5]}
        scale={[0.2, 0.2]}
        position={[50, 50]}
        eventMode='static'
        // interactive={true}
        pointertap={() => console.log('btn1 clicked')}
      /> */}

    </Container>
  )
}

export default Home
