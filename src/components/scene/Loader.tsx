import * as PIXI from "pixi.js";
import { Container, Sprite, useApp, Text } from "@pixi/react";
import { manifest } from "../../assets";

type LoaderProps = {
  onFinishLoading: () => void;
  visible: boolean;
};

const Loader = ({ onFinishLoading, visible = true }: LoaderProps) => {
  const app = useApp();

  // @ts-ignore
  globalThis.__PIXI_APP__ = app;

  console.log("app.screen", app.screen.width, app.screen.height);
  // console.log('app.view', app.view.width, app.view.height)
  // console.log('app.renderer', app.renderer.width, app.renderer.height)
  // console.log('app.stage', app.stage.width, app.stage.height)

  // load assets
  async function initializeLoader() {
    await PIXI.Assets.init({ manifest: manifest });
    const bundleIds = manifest.bundles.map((bundle) => bundle.name);

    await PIXI.Assets.loadBundle(bundleIds, updateLoaderBar);
  }

  initializeLoader();
  console.log("testLoad asset outside", PIXI.Assets.get("MainBg"));

  const loaderBarWidth =
    app.screen.width < 450 ? app.screen.width * 0.8 : app.screen.width * 0.3;
  const loaderBarFill = new PIXI.Graphics();
  loaderBarFill.beginFill(0x009eb5);
  loaderBarFill.drawRect(10, 5, loaderBarWidth - 20, 10);
  loaderBarFill.endFill();
  loaderBarFill.position.x = 10;
  loaderBarFill.zIndex = 1;
  loaderBarFill.pivot.x = 10;
  // const loaderBarBorder = new PIXI.Graphics();
  // loaderBarBorder.lineStyle(2, 0xffffff);
  // loaderBarBorder.drawRect(0, 0, loaderBarWidth, 10);

  const loaderBar = new PIXI.Container();

  const loaderBarBackground = PIXI.Sprite.from("image/LoadingBar.png");
  loaderBarBackground.width = loaderBarWidth;
  loaderBarBackground.anchor.x = 0;
  loaderBarBackground.height = 20;
  loaderBarBackground.x = 0;
  loaderBarBackground.y = 0;

  loaderBar.addChild(loaderBarBackground);
  loaderBar.addChild(loaderBarFill);
  // loaderBar.addChild(loaderBarBorder);

  loaderBar.x = app.screen.width / 2 - loaderBar.width / 2;
  loaderBar.y = app.screen.height - 110;
  loaderBar.scale.x = 1;
  loaderBar.scale.y = 1;
  app.stage.addChild(loaderBar);

  console.log("app loaderBar.x", loaderBar.x, loaderBar.width);

  // need to expose this to loader props

  function updateLoaderBar(progress: number) {
    // useTick(progress);
    loaderBarFill.scale.x = progress;
    // console.log("progress", loaderBarFill.width);
    if (progress === 1) {
      onFinishLoading();
    }
  }

  return (
    <Container
      position={[app.screen.width / 2, app.screen.height / 2]}
      scale={[1, 1]}
    >
      <Sprite
        // texture={assets.LoaderScene['LoaderBarBg'].texture}
        image={"image/ListingBackground.png"}
        width={
          app.screen.width < 450 ? app.screen.width * 1.5 : app.screen.width
        }
        height={app.screen.height}
        anchor={[0.5, 0.5]}
        position={[0, 0]}
      />
      <Sprite
        texture={PIXI.Texture.WHITE}
        width={app.screen.width * 1.5}
        height={app.screen.height * 2}
        anchor={[0.5, 0.5]}
        // scale={isNotMobile ? [1, 1] : [0.5, 1]}
        position={[0, 0]}
        filters={[new PIXI.BlurFilter(10)]}
        tint={"black"}
        alpha={0.7}
        eventMode={"static"}
      />
      <Sprite
        image={"image/Logo Dino.png"}
        width={300}
        height={250}
        anchor={[0.5, 0.5]}
        position={[0, 0]}
      />
      <Text
        text={"Defi & Web 3.0 Concept"}
        position={[0, 150]}
        anchor={[0.5, 0.5]}
        style={
          new PIXI.TextStyle({
            fontFamily: "Magra Bold",
            fontSize: 20,
            fontWeight: "600",
            strokeThickness: 1,
            fill: ["0xFFB800"],
          })
        }
      />
    </Container>
  );
};

export default Loader;
