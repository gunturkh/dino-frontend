/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import { Container, Sprite, Text, useApp, useTick } from "@pixi/react";
import { useStore } from "../../utils/store";

type Props = {
  onBackBtnClick: () => void;
};

const GameGuide = ({ onBackBtnClick }: Props) => {
  const app = useApp();
  // @ts-ignore
  globalThis.__PIXI_APP__ = app;

  const changeScene = useStore((state) => state.changeScene);
  const isNotMobile = app.screen.width > 450;

  const [isLoaded, setIsLoaded] = useState(false);

  useTick((delta) => {
    // console.log('delta', delta)
  });

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    };
  }, []);
  console.log("isLoaded", isLoaded);

  const bgGraphic = new PIXI.Graphics()
    .beginFill(0xc9c9c9)
    .drawRoundedRect(0, 0, 1000, 1000, 15)
    .endFill();
  const bgTexture = app.renderer.generateTexture(bgGraphic);

  const gameGuideContainerRef = useCallback((node: any) => {
    if (node !== null) {
    }
  }, []);

  return (
    <>
      {isLoaded && (
        <Container>
          <Sprite
            texture={PIXI.Assets.get("ProfileBackground")}
            width={isNotMobile ? app.screen.width : app.screen.width * 1.1}
            height={app.screen.height}
            anchor={[0.5, 0.5]}
            // scale={isNotMobile ? [1, 1] : [0.5, 1]}
            position={[app.screen.width / 2, app.screen.height / 2]}
          />
          {/* apply white layer and filter */}
          <Sprite
            texture={PIXI.Texture.WHITE}
            width={app.screen.width * 1.5}
            height={app.screen.height}
            anchor={[0.5, 0.5]}
            position={[app.screen.width / 2, app.screen.height / 2]}
            filters={[new PIXI.BlurFilter(10)]}
            tint={"black"}
            alpha={0.7}
            eventMode={"static"}
          />

          <Container position={[app.screen.width / 2, 0]}>
            {/* Upper Button */}
            <Container
              // ref={upperComponentRef}
              x={0}
              y={isNotMobile ? 20 : 0}
              width={isNotMobile ? 450 : app.screen.width * 0.9}
            >
              {/* left side */}
              <Container position={isNotMobile ? [-190, 30] : [-150, 40]}>
                <Sprite
                  texture={PIXI.Assets.get("BackBtn")}
                  width={isNotMobile ? 40 : 30}
                  height={isNotMobile ? 40 : 30}
                  anchor={[0.5, 0.5]}
                  position={[0, 0]}
                  eventMode="static"
                  onpointertap={() => onBackBtnClick()}
                />
              </Container>

              {/* Text */}
              <Container position={[0, isNotMobile ? 30 : 40]}>
                <Text
                  text={"Game Guide"}
                  position={[-2, 0]}
                  anchor={[0.5, 0.5]}
                  style={
                    new PIXI.TextStyle({
                      fontFamily: "Magra Bold",
                      fontSize: isNotMobile ? 24 : 18,
                      fontWeight: "600",
                      strokeThickness: 1,
                      fill: ["white"],
                    })
                  }
                />
              </Container>

              {/* right side */}
              <Container
                position={isNotMobile ? [190, 30] : [150, 40]}
                visible={false}
              >
                {/* put content here if needed */}
              </Container>
              {/* divider */}
              <Container position={[0, isNotMobile ? 15 : 10]}>
                <Sprite
                  texture={PIXI.Assets.get("UpperDivider")}
                  anchor={[0.5, 0.5]}
                  position={isNotMobile ? [0, 50] : [0, 60]}
                />
              </Container>
            </Container>

            {/* Profile */}
            <Container
              x={0}
              y={0}
              height={app.screen.height * 0.8}
              scale={[1, 1]}
              ref={gameGuideContainerRef}
            >
              <Sprite
                texture={bgTexture}
                alpha={0.85}
                width={isNotMobile ? 450 : app.screen.width * 0.9}
                height={app.screen.height * 0.8}
                anchor={[0.5, 0]}
                position={[0, app.screen.height * 0.135]}
              />
            </Container>
          </Container>
        </Container>
      )}
    </>
  );
};

export default GameGuide;
