import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { useApp, Container } from "@pixi/react";
import { Spine } from "pixi-spine";

function FlyingAnimations() {
  const app = useApp();
  // const [dinoAssets, setDinoAssets] = useState<any>(null);

  const containerRef = useRef<PIXI.Container>(null);

  // load

  useEffect(() => {
    async function loadSpineAnimation(
      sprite: any,
      screenWidth: any,
      duration: any
    ) {
      const ticker = new PIXI.Ticker();
      let direction = 1; // 1 for right, -1 for left
      // let timeElapsed = 0;

      PIXI.Assets.add(
        "spineDino",
        "https://ik.imagekit.io/cq9mywjfr/animations/flying-dino/skeleton.json"
      );
      const dinoAssets = await PIXI.Assets.load("spineDino");
      // console.log("spine dinoAssets", dinoAssets);

      dinoAssets.spineData.animations.forEach((animation: any) => {
        const flyingDino = new Spine(dinoAssets.spineData);
        flyingDino.state.setAnimation(0, animation.name, true);
        flyingDino.x = -100;
        flyingDino.y = app.screen.height * 0.37;
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
        if (sprite.x > screenWidth + sprite.width * 1.2 && direction === 1) {
          // Pause for 2 seconds
          ticker.stop();
          setTimeout(() => {
            direction = -1; // Change direction
            // mirror the sprite
            sprite.scale.x *= -1;

            // sprite.y = app.screen.height * Math.random() * 0.1 + 0.25;
            ticker.start();
          }, 8000);
        } else if (sprite.x < sprite.width * 1.2 && direction === -1) {
          // Pause for 2 seconds
          ticker.stop();
          setTimeout(() => {
            direction = 1; // Change direction
            // sprite.y = app.screen.height * Math.random() * 0.1 + 0.25;
            sprite.scale.x = 1;
            ticker.start();
          }, 8000);
        }
      });

      ticker.start();
    }
    loadSpineAnimation(containerRef.current, app.screen.width, 400);
  }, [app.screen.height, app.screen.width, app.stage]);

  if (containerRef.current) {
    // set scale with respect to screen size
    containerRef.current.scale.set(app.screen.height / 1440);
    if (app.screen.height > 800) {
      containerRef.current.y = app.screen.height * -0.1;
    }
  }

  return (
    <Container
      ref={containerRef}
      x={0}
      y={app.screen.height * 0.1}
      width={app.screen.width}
    />
  );
}

export default FlyingAnimations;
