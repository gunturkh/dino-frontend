/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import { Container, Sprite, useApp } from "@pixi/react";

type Props = {
  onBackBtnClick?: () => void;
  visible: boolean;
  scene?: string;
};

const DinoCenter = ({ visible = true }: Props) => {
  const app = useApp();
  // @ts-ignore
  globalThis.__PIXI_APP__ = app;

  const isNotMobile = app.screen.width > 450;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    };
  }, []);

  return (
    <>
      {isLoaded && (
        <Container visible={visible}>
          <Sprite
            texture={PIXI.Assets.get("ListingBackground")}
            width={isNotMobile ? app.screen.width : app.screen.width * 1.1}
            height={app.screen.height}
            anchor={[0.5, 0.5]}
            // scale={isNotMobile ? [1, 1] : [0.5, 1]}
            position={[app.screen.width / 2, app.screen.height / 2]}
          />
          {/* apply white layer and filter */}
          <Sprite
            texture={PIXI.Texture.WHITE}
            width={isNotMobile ? app.screen.width : app.screen.width * 1.1}
            height={app.screen.height}
            anchor={[0.5, 0.5]}
            // scale={isNotMobile ? [1, 1] : [0.5, 1]}
            position={[app.screen.width / 2, app.screen.height / 2]}
            filters={[new PIXI.BlurFilter(10)]}
            tint={"white"}
            alpha={0.3}
          />
        </Container>
      )}
    </>
  );
};

export default DinoCenter;
