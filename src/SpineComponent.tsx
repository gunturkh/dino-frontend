// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import { Stage, PixiComponent, Container, AnimatedSprite, useApp, useTick, AppProvider } from '@pixi/react'
import * as PIXI from 'pixi.js';
import { Spine } from 'pixi-spine';

export function SpineComponent() {
  const pixieApp = new PIXI.Application({

  });
  const stageRef = useRef(null);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);

  const spritesheet =
    "https://pixijs.io/examples/examples/assets/spritesheet/fighter.json";



  const JetFighter = () => {
    const [frames, setFrames] = React.useState([]);
    const app = useApp();
    console.log('app screen w', app.screen.width)
    console.log('app screen h', app.screen.height)
    console.log('app renderer w', app.renderer.view.width)
    console.log('app renderer h', app.renderer.view.height)
    // setWidth(app.screen.width);

    // load
    React.useEffect(() => {
      PIXI.Assets.load(spritesheet).then((resource) => {
        // app.loader.add(spritesheet).load((_, resource) => {
        setFrames(
          Object.keys(resource.data.frames).map((frame) =>
            PIXI.Texture.from(frame)
          )
        );
      });
    }, []);

    if (frames.length === 0) {
      return null;
    }

    return (
      <AnimatedSprite
        x={width / 2}
        y={height / 2}
        animationSpeed={0.5}
        textures={frames}
        initialFrame={0}
        isPlaying={true}
        loop
        anchor={0.5}
        onComplete={() => console.log('complete')}
      />
    );
  };


  return (
    // <AppProvider value={pixieApp}>
    // <Stage ref={stageRef} transparent={true}>
    <Stage width={width} height={height} options={{
      backgroundAlpha: 0,
    }}>
      <JetFighter />
    </Stage>
    // </AppProvider>
  );
};


