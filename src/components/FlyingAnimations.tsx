import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { useApp, Container } from "@pixi/react";
import { Spine } from "pixi-spine";

const BASE_URL = "https://ik.imagekit.io/cq9mywjfr";

function FlyingAnimations() {
  const app = useApp();
  // memoize dinoAssets from PIXI.Assets.get
  const [dinoAssets, setDinoAssets] = useState<any>(null);
  const [dinoAssets2, setDinoAssets2] = useState<any>(null);
  const [dinoAssets3, setDinoAssets3] = useState<any>(null);
  // const [dinoAssets4, setDinoAssets4] = useState<any>(null);

  const memoizedDinoAssets = useMemo(() => dinoAssets, [dinoAssets]);
  const memoizedDinoAssets2 = useMemo(() => dinoAssets2, [dinoAssets2]);
  const memoizedDinoAssets3 = useMemo(() => dinoAssets3, [dinoAssets3]);
  // const memoizedDinoAssets4 = useMemo(() => dinoAssets4, [dinoAssets4]);

  const [animationCounter, setAnimationCounter] = useState<number>(-1);
  // const memoizedDinoAssets4 = useMemo(() => dinoAssets4, [dinoAssets4]);

  // load assets locally without using assets.ts
  useEffect(() => {
    PIXI.Assets.add(
      "FlyingDino",
      `${BASE_URL}/animations/flying-dino/skeleton.json`
    );
    PIXI.Assets.add(
      "FlyingDino2",
      `${BASE_URL}/animations/flying-dino-2/skeleton.json`
    );
    PIXI.Assets.add(
      "FlyingDino3",
      `${BASE_URL}/animations/flying-dino-3/skeleton.json`
    );
    // PIXI.Assets.add(
    //   "FlyingDino4",
    //   `${BASE_URL}/animations/flying-dino-4/skeleton.json`
    // );

    PIXI.Assets.load(["FlyingDino", "FlyingDino2", "FlyingDino3"])
      .then((resources) => {
        console.log("res flyingDino", resources);
        // set a matched key to dinoAssets
        setDinoAssets(resources["FlyingDino"]);
        setDinoAssets2(resources["FlyingDino2"]);
        setDinoAssets3(resources["FlyingDino3"]);
        // setDinoAssets4(resources["FlyingDino4"]);
      })
      .catch((err) => {
        console.log("err flyingDino", err);
      });
  }, []);

  const containerRef = useRef<PIXI.Container>(null);
  // this will scale the animation to the screen size
  const scalePoint = app.screen.height / 1440;

  // load

  useEffect(() => {
    let flyingDino1: any = null;
    let flyingDino2: any = null;
    let flyingDino3: any = null;

    const duration = 300; // duration of the animation, set lower to make it faster

    // use waitDuration to wait for a few second before loading the next animation
    const waitDuration = 5000;
    const tickerOutside = new PIXI.Ticker();

    memoizedDinoAssets?.spineData?.animations?.forEach((animation: any) => {
      const flyingDino = new Spine(memoizedDinoAssets.spineData);
      flyingDino.state.setAnimation(0, animation.name, true);
      flyingDino.x = -100;
      flyingDino.y = 0;
      flyingDino.zIndex = -1;
      flyingDino.cullable = true;

      flyingDino.scale.set(0.05);

      flyingDino1 = flyingDino;
    });

    // 2nd flying dino
    memoizedDinoAssets2?.spineData?.animations?.forEach((animation: any) => {
      const flyingDino = new Spine(memoizedDinoAssets2.spineData);
      flyingDino.state.setAnimation(0, animation.name, true);
      flyingDino.x = -100;
      flyingDino.y = 0;
      flyingDino.zIndex = -1;
      flyingDino.cullable = true;

      flyingDino.scale.set(0.05);

      flyingDino2 = flyingDino;
    });

    // 2nd flying dino
    memoizedDinoAssets3?.spineData?.animations?.forEach((animation: any) => {
      const flyingDino = new Spine(memoizedDinoAssets3.spineData);
      flyingDino.state.setAnimation(0, animation.name, true);
      flyingDino.x = -100;
      flyingDino.y = 0;
      flyingDino.zIndex = -1;
      flyingDino.cullable = true;

      flyingDino.scale.set(0.05);

      flyingDino3 = flyingDino;
    });

    // wait for a few second, after that change the counter to 0, wrap it inside if
    if (animationCounter === -1 && flyingDino1) {
      // clear containerRef to make sure there is no other animation inside
      containerRef.current?.removeChildren();
      setTimeout(() => {
        setAnimationCounter(0);
        console.log("flyingDino timer triggered");
      }, 1000);
    }

    // load animation 1 first, then wait for a few second to load animation 2 and wait for a few second to load animation 3
    if (
      flyingDino1 !== null &&
      containerRef.current &&
      memoizedDinoAssets &&
      animationCounter === 0
    ) {
      // add timer to wait for a few second before loading the next animation
      containerRef.current?.addChild(flyingDino1);
      containerRef.current.x = -flyingDino1.width * 1.05;
      containerRef.current.scale.set(scalePoint);

      tickerOutside.add((delta) => {
        // increase containerRef x position by 10 * delta * scalePoint * direction
        // @ts-ignore
        containerRef.current.x += delta * (app.screen.width / duration);

        // if containerRef x position is greater than the screen width + flyingDino1 width * 1.2
        if (
          // @ts-ignore
          containerRef.current.x >
          app.screen.width + flyingDino1.width * 1.2
        ) {
          // increase the counter by 1 after waiting for a few second
          setTimeout(() => {
            setAnimationCounter((prev) => prev + 1);
          }, waitDuration);
          tickerOutside.stop();
        }
      });
      tickerOutside.start();
    }

    console.log("counter flyingDino outside", animationCounter);

    // check if 2nd flying dino is reached the screen edge and counter is 0 and direction is 1
    if (flyingDino2 && containerRef.current && animationCounter === 1) {
      containerRef.current?.removeChildAt(0);
      containerRef.current?.addChild(flyingDino2);
      containerRef.current.x = app.screen.width + flyingDino2.width * 1.05;

      // mirror the animation
      containerRef.current.scale.set(-1 * scalePoint, scalePoint);

      tickerOutside.add((delta) => {
        // @ts-ignore
        containerRef.current.x -= delta * (app.screen.width / duration);
        // console.log("speed flyingDino", delta * (app.screen.width / duration));

        if (
          // @ts-ignore
          containerRef.current.x <
          -flyingDino1.width * 1.2
        ) {
          setTimeout(() => {
            setAnimationCounter((prev) => prev + 1);
          }, waitDuration);
          tickerOutside.stop();
        }
      });
      tickerOutside.start();
    }

    // check if 3rd flying dino is reached the screen edge
    if (flyingDino3 && containerRef.current && animationCounter === 2) {
      containerRef.current?.removeChildAt(0);
      containerRef.current?.addChild(flyingDino3);
      containerRef.current.x = -flyingDino3.width * 1.05;
      // special scale for flying dino 3
      containerRef.current.scale.set(scalePoint / 1.5);

      tickerOutside.add((delta) => {
        // increase containerRef x position by 10 * delta * scalePoint * direction
        // @ts-ignore
        containerRef.current.x += delta * (app.screen.width / duration);

        // if containerRef x position is greater than the screen width + flyingDino1 width * 1.2
        if (
          // @ts-ignore
          containerRef.current.x >
          app.screen.width + flyingDino3.width * 1.2
        ) {
          setAnimationCounter(-1);
          tickerOutside.stop();
        }
      });
      tickerOutside.start();
    }
  }, [
    animationCounter,
    app.screen.width,
    memoizedDinoAssets,
    memoizedDinoAssets2,
    memoizedDinoAssets3,
    scalePoint,
  ]);

  useEffect(() => {
    if (containerRef.current && memoizedDinoAssets) {
      // set scale with respect to screen size
      containerRef.current.scale.set(scalePoint);
      if (app.screen.height > 800) {
        containerRef.current.y = app.screen.height * 0.3;
      }
      if (app.screen.height < 600) {
        containerRef.current.y = app.screen.height * 0.35;
      }
    }
  }, [app.screen.height, app.screen.width, memoizedDinoAssets, scalePoint]);

  return (
    <Container
      ref={containerRef}
      x={0}
      y={app.screen.height * 0.3}
      anchor={[0.5, 0.5]}
      width={app.screen.width}
    />
  );
}

export default memo(FlyingAnimations);
