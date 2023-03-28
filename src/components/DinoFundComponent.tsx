
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
} from "@pixi/react";

type DinoFundProps = {
  spriteTexture: PIXI.Texture;
  text?: string;
  textStyle?: PIXI.TextStyle;
  posX: number;
  posY: number;
  textYOffest?: number;
  textXOffest?: number;
  scaleX?: number;
  scaleY?: number;
  ref?: any;
}

const DinoFundComponent = ({
  spriteTexture,
  text,
  textStyle,
  posX = 0,
  posY = 0,
  textXOffest = 0,
  textYOffest = 0,
  scaleX = 1,
  scaleY = 1,
  ref = null,
}: DinoFundProps) => {
  const app = useApp();
  const containerRef = React.useRef(null);

  return (
    <Container
      ref={ref || containerRef}
      scale={[scaleX, scaleY]}
      position={[posX, posY]}
      zIndex={1}
    >
      {spriteTexture && (
        <>
          <Sprite
            // texture={PIXI.Assets.get('DinoFundLogo')}
            texture={spriteTexture || PIXI.Texture.EMPTY}
            anchor={[0.5, 0]}
            // scale={[0.5, 0.5]}
            position={[0, 0]}
          // scale={[scaleX, scaleY]}
          />
          <Text
            text={text || ''}
            anchor={[0.5, 0]}
            position={[0 + textXOffest, 0 + textYOffest]}
            style={textStyle}
          // scale={[scaleX, scaleY]}
          />
        </>
      )}
    </Container>
  )
}

export default DinoFundComponent