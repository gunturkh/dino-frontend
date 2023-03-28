
import React, { useEffect, useState, useRef } from 'react'
import * as PIXI from "pixi.js";
import {
  Stage,
  Container,
  Sprite,
  Text,
  useApp,
} from "@pixi/react";

type Props = {
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
  onPress?: () => void;
}

const DetailsComponent = ({
  spriteTexture,
  text,
  textStyle,
  posX,
  posY,
  textXOffest = 0,
  textYOffest = 0,
  scaleX = 1,
  scaleY = 1,
  ref = null,
  onPress,
}: Props) => {
  const app = useApp();
  const containerRef = useRef(null);

  return (
    <Container
      ref={ref || containerRef}
      scale={[scaleX, scaleY]}
      eventMode='static'
      onpointertap={onPress} >
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
          <Text
            text={text || ''}
            anchor={[0.5, 0]}
            position={[posX + textXOffest, posY + textYOffest]}
            style={textStyle}
          // scale={[scaleX, scaleY]}
          />
        </>
      )}
    </Container>
  )
}

export default DetailsComponent