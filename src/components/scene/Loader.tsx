
import React, { useEffect } from 'react'
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
import { manifest } from '../../assets';

type LoaderProps = {
  onFinishLoading: () => void;
  visible: boolean;
}

const Loader = ({
  onFinishLoading,
  visible = true,
}: LoaderProps) => {
  const app = useApp();
  console.log('app.screen', app.screen.width, app.screen.height)
  // console.log('app.view', app.view.width, app.view.height)
  // console.log('app.renderer', app.renderer.width, app.renderer.height)
  // console.log('app.stage', app.stage.width, app.stage.height)

  // load assets
  async function initializeLoader() {
    await PIXI.Assets.init({ manifest: manifest })
    const bundleIds = manifest.bundles.map((bundle) => bundle.name);

    await PIXI.Assets.loadBundle(bundleIds, updateLoaderBar);
  }

  initializeLoader();
  console.log('testLoad asset outside', PIXI.Assets.get('MainBg'))

  const loaderBarWidth = app.screen.width < 450 ? app.screen.width * 0.8 : app.screen.width * 0.3;
  const loaderBarFill = new PIXI.Graphics();
  loaderBarFill.beginFill(0x009eb5);
  loaderBarFill.drawRect(10, 5, loaderBarWidth - 20, 10);
  loaderBarFill.endFill();
  loaderBarFill.scale.x = 0;
  loaderBarFill.zIndex = 1;
  // const loaderBarBorder = new PIXI.Graphics();
  // loaderBarBorder.lineStyle(2, 0xffffff);
  // loaderBarBorder.drawRect(0, 0, loaderBarWidth, 10);

  const loaderBar = new PIXI.Container();
  // use sprite as a background container loaderBar

  const loaderBarBackground = PIXI.Sprite.from('image/LoadingBar.png');
  loaderBarBackground.width = loaderBarWidth;
  loaderBarBackground.height = 20
  loaderBarBackground.x = 0;
  loaderBarBackground.y = 0;

  loaderBar.addChild(loaderBarBackground);
  loaderBar.addChild(loaderBarFill);
  // loaderBar.addChild(loaderBarBorder);

  loaderBar.x = app.screen.width / 2 - loaderBar.width / 2;
  loaderBar.y = app.screen.height - 110;
  app.stage.addChild(loaderBar);
  if (!visible) {
    // loaderBar.visible = true;
    app.stage.removeChild(loaderBar);
  }
  console.log('app loaderBar.x', loaderBar.x, loaderBar.width)

  // need to expose this to loader props



  function updateLoaderBar(progress: number) {
    // useTick(progress);
    loaderBarFill.scale.x = progress;
    if (progress === 1) {
      onFinishLoading();
    }
  }

  return (
    <Container
    >
      <Sprite
        // texture={assets.LoaderScene['LoaderBarBg'].texture}
        image={"image/Background.png"}
        width={app.screen.width < 450 ? app.screen.width * 1.5 : app.screen.width}
        height={app.screen.height}
        anchor={[0.5, 0.5]}
        position={[app.screen.width / 2, app.screen.height / 2]}
      />
      <Sprite
        image={"image/Logo Dino.png"}
        width={200}
        height={200}
        anchor={[0.5, 0.5]}
        position={[app.screen.width / 2, app.screen.height - 250]}
      />

    </Container>
  )
}

export default Loader