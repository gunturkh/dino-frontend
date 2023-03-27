
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
  posX,
  posY,
  textXOffest = 0,
  textYOffest = 0,
  scaleX = 1,
  scaleY = 1,
  ref = null,
}: DinoFundProps) => {
  const app = useApp();
  const containerRef = React.useRef(null);
  const [containerBounds, setContainerBounds] = React.useState(null)

  useEffect(() => {
    // @ts-ignore
    // console.log('containerRef getBounds', containerRef.current.getBounds())
    // @ts-ignore
    // console.log('containerRef getLocalBounds', containerRef.current.getLocalBounds())
    // @ts-ignore
    setContainerBounds(containerRef?.current.getLocalBounds())
    // @ts-ignore
    // console.log('containerRef getGlobalPosition', containerRef.current.getGlobalPosition())
  }, [containerRef])
  console.log('containerBounds', containerBounds)

  return (
    <Container ref={ref || containerRef} scale={[scaleX, scaleY]} >
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

export default DinoFundComponent