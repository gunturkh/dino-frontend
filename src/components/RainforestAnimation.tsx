import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { useApp, Container } from "@pixi/react";
import { Spine } from "pixi-spine";

const BASE_URL = "https://cdn.jurassicegg.co";

function RainforestAnimation() {
  const app = useApp();
  // memoize rainforestAsset from PIXI.Assets.get
  const [rainforestAsset, setRainforestAsset] = useState<any>(null);
  // const [dinoAssets4, setDinoAssets4] = useState<any>(null);

  const memoizedRainforestAsset = useMemo(() => rainforestAsset, [rainforestAsset]);
  // const memoizedDinoAssets4 = useMemo(() => dinoAssets4, [dinoAssets4]);

  const [animationCounter] = useState<number>(-1);
  // const memoizedDinoAssets4 = useMemo(() => dinoAssets4, [dinoAssets4]);

  // load assets locally without using assets.ts
  useEffect(() => {
    PIXI.Assets.add(
      "Rainforest",
      `${BASE_URL}/animations/rainforest/skeleton.json`
    );

    PIXI.Assets.load(["Rainforest"])
      .then((resources) => {
        console.log("res flyingDino", resources);
        // set a matched key to rainforestAsset
        setRainforestAsset(resources["Rainforest"]);
      })
      .catch((err) => {
        console.log("err rainforest", err);
      });
  }, []);

  const containerRef = useRef<PIXI.Container>(null);
  // this will scale the animation to the screen size
  // const scalePoint = app.screen.height / 1440;
  // const scalePoint = 1;

  // load

  useEffect(() => {
    let rainforest: any = null;

    // const duration = 300; 
    // duration of the animation, set lower to make it faster

    // use waitDuration to wait for a few second before loading the next animation
    // const waitDuration = 5000;
    // const tickerOutside = new PIXI.Ticker();

    memoizedRainforestAsset?.spineData?.animations?.forEach((animation: any) => {
      const rainForestAnimation = new Spine(memoizedRainforestAsset.spineData);
      rainForestAnimation.state.setAnimation(0, animation.name, true);
      rainForestAnimation.x = app.screen.width / 2;
      rainForestAnimation.y = 0;
      rainForestAnimation.zIndex = -1;
      rainForestAnimation.cullable = true;

      rainForestAnimation.scale.set(3);

      rainforest = rainForestAnimation;
    });

    // wait for a few second, after that change the counter to 0, wrap it inside if
    // if (animationCounter === -1 && rainforest) {
    //   // clear containerRef to make sure there is no other animation inside
    //   containerRef.current?.removeChildren();
    //   setTimeout(() => {
    //     setAnimationCounter(0);
    //     console.log("rainforest timer triggered");
    //   }, 1000);
    // }

    // load animation 1 first, then wait for a few second to load animation 2 and wait for a few second to load animation 3
    if (
      rainforest !== null &&
      containerRef.current &&
      memoizedRainforestAsset
      // animationCounter === 0
    ) {
      // add timer to wait for a few second before loading the next animation
      containerRef.current?.addChild(rainforest);
      // containerRef.current.x = -rainforest.width * 1.05;
      // containerRef.current.scale.set(scalePoint);

      // tickerOutside.add((delta) => {
      //   // increase containerRef x position by 10 * delta * scalePoint * direction
      //   // @ts-ignore
      //   containerRef.current.x += delta * (app.screen.width / duration);

      //   // if containerRef x position is greater than the screen width + rainforest width * 1.2
      //   if (
      //     // @ts-ignore
      //     containerRef.current.x >
      //     app.screen.width + rainforest.width * 1.2
      //   ) {
      //     // increase the counter by 1 after waiting for a few second
      //     setTimeout(() => {
      //       setAnimationCounter((prev) => prev + 1);
      //     }, waitDuration);
      //     tickerOutside.stop();
      //   }
      // });
      // tickerOutside.start();
    }

    console.log("counter rainforest outside", animationCounter);
  }, [
    animationCounter,
    app.screen.width,
    memoizedRainforestAsset,
    // scalePoint,
  ]);

  useEffect(() => {
    if (containerRef.current && memoizedRainforestAsset) {
      // set scale with respect to screen size
      // containerRef.current.scale.set(scalePoint);

      if (app.screen.height >= 800) {
        containerRef.current.y = app.screen.height * 0.35;
      }
      if (app.screen.height >= 700 && app.screen.height < 800) {
        containerRef.current.y = app.screen.height * 0.34;
      }
      if (app.screen.height >= 600 && app.screen.height < 700) {
        containerRef.current.y = app.screen.height * 0.35;
      }
      if (app.screen.height >= 500 && app.screen.height < 600) {
        containerRef.current.y = app.screen.height * 0.35;
      }
      if (app.screen.height >= 400 && app.screen.height < 500) {
        containerRef.current.y = app.screen.height * 0.37;
      }
      if (app.screen.height < 400) {
        containerRef.current.y = app.screen.height * 0.39;
      }
    }
  }, [app.screen.height, app.screen.width, memoizedRainforestAsset]);

  return (
    <Container
      ref={containerRef}
      x={0}
      // y={app.screen.height * 0.3}
      anchor={[0.5, 0.5]}
      width={app.screen.width}
    />
  );
}

export default memo(RainforestAnimation);
