
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

type props = {
  spriteTexture: PIXI.Texture;
  imageIcon?: PIXI.Texture;
  text?: string;
  textStyle?: PIXI.TextStyle;
  posX: number;
  posY: number;
  textXOffset?: number;
  textYOffset?: number;
  imageXOffset?: number;
  imageYOffset?: number;
  scaleX?: number;
  scaleY?: number;
  ref?: any;
  x?: number;
  y?: number;
  scaleImgX?: number;
  scaleImgY?: number;
  onPress?: () => void;
}

const LowerButtonComponent = ({
  spriteTexture,
  imageIcon,
  text,
  textStyle,
  posX,
  posY,
  textXOffset = 0,
  textYOffset = 0,
  imageXOffset = 0,
  imageYOffset = 0,
  scaleX = 1,
  scaleY = 1,
  ref = null,
  x = 0,
  y = 0,
  scaleImgX = 1,
  scaleImgY = 1,
  onPress,
}: props) => {
  const app = useApp();
  const containerRef = React.useRef(null);

  return (
    <Container
      ref={ref || containerRef}
      scale={[scaleX, scaleY]}
      //  x={x} 
      //  y={y}
      anchor={[0, 0]}
      eventMode="static" onpointertap={onPress}>
      {spriteTexture && (
        <>
          <Sprite
            // texture={PIXI.Assets.get('DinoFundLogo')}
            texture={spriteTexture || PIXI.Texture.EMPTY}
            anchor={[0.5, 0]}
            // scale={[0.5, 0.5]}
            position={[posX, posY]}
          // scale={[scaleX, scaleY]}
          />
          <Sprite
            texture={imageIcon || PIXI.Texture.EMPTY}
            anchor={[0.5, 0]}
            scale={[scaleImgX, scaleImgY]}
            position={[posX + imageXOffset, posY + imageYOffset]}
          />
          <Text
            text={text || ''}
            anchor={[0.5, 0]}
            position={[posX + textXOffset, posY + textYOffset]}
            style={textStyle}
          // scale={[scaleX, scaleY]}
          />
        </>
      )}
    </Container>
  )
}

export default LowerButtonComponent