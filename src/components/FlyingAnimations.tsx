import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { useApp, Container } from "@pixi/react";
import { Spine } from "pixi-spine";

function FlyingAnimations() {
  const app = useApp();
  // memoize dinoAssets from PIXI.Assets.get
  const [dinoAssets, setDinoAssets] = useState<any>(null);
  const memoizedDinoAssets = useMemo(() => dinoAssets, [dinoAssets]);

  useEffect(() => {
    const dinoAssets = PIXI.Assets.get("FlyingDino");
    setDinoAssets(dinoAssets);
  }, []);

  const containerRef = useRef<PIXI.Container>(null);
  // this will scale the animation to the screen size
  const scalePoint = app.screen.height / 1440;

  // load

  useEffect(() => {
    async function loadSpineAnimation(
      sprite: any,
      screenWidth: any,
      duration: any
    ) {
      const ticker = new PIXI.Ticker();
      let direction = 1; // 1 for right, -1 for left
      const waitDuration = 2000;

      memoizedDinoAssets.spineData.animations.forEach((animation: any) => {
        const flyingDino = new Spine(memoizedDinoAssets.spineData);
        flyingDino.state.setAnimation(0, animation.name, true);
        flyingDino.x = -100;
        flyingDino.y = 0;
        flyingDino.zIndex = -1;
        flyingDino.cullable = true;

        flyingDino.scale.set(0.05);

        containerRef.current?.addChild(flyingDino);
        // app.stage.addChild(flyingDino);
      });

      ticker.add((deltaTime) => {
        // timeElapsed += deltaTime;

        // Move sprite
        sprite.x += direction * ((screenWidth / duration) * deltaTime);
        // sprite.x += direction * 1;
        // reset flip to default

        // Check if sprite has reached screen edge
        if (
          sprite.x > screenWidth + sprite.width * 1.2 &&
          direction === 1 &&
          sprite
        ) {
          // Pause for 2 seconds
          ticker.stop();
          setTimeout(() => {
            direction = -1; // Change direction
            // mirror the sprite
            sprite.scale.x *= -1;

            // sprite.y = app.screen.height * Math.random() * 0.1 + 0.25;
            ticker.start();
          }, waitDuration);
        } else if (
          sprite.x < sprite.width * 1.2 &&
          direction === -1 &&
          sprite &&
          scalePoint
        ) {
          // Pause for 2 seconds
          ticker.stop();
          setTimeout(() => {
            direction = 1; // Change direction
            // sprite.y = app.screen.height * Math.random() * 0.1 + 0.25;
            sprite.scale.x = scalePoint;
            ticker.start();
          }, waitDuration);
        }
      });

      ticker.start();

      // Stop the ticker when the container is changed
      sprite.once("removed", () => {
        ticker.stop();
      });
    }
    if (containerRef.current && memoizedDinoAssets)
      // reduce the duration to increase the speed
      loadSpineAnimation(containerRef.current, app.screen.width, 250);
  }, [
    app.screen.height,
    app.screen.width,
    app.stage,
    memoizedDinoAssets,
    scalePoint,
  ]);

  useEffect(() => {
    if (containerRef.current && memoizedDinoAssets) {
      // set scale with respect to screen size
      containerRef.current.scale.set(scalePoint);
      if (app.screen.height > 800) {
        containerRef.current.y = app.screen.height * 0.3;
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
