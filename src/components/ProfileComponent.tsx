
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

type ProfileComponentProps = {
  spriteTexture: PIXI.Texture;
  avatarTexture?: PIXI.Texture;
  text?: string;
  textStyle?: PIXI.TextStyle;
  posX: number;
  posY: number;
  textXOffset?: number;
  textYOffset?: number;
  avatarXOffset?: number;
  avatarYOffset?: number;
  scaleX?: number;
  scaleY?: number;
  ref?: any;
  onPress?: () => void;
}

const ProfileComponent = ({
  spriteTexture,
  avatarTexture,
  text,
  textStyle,
  posX,
  posY,
  textXOffset = 0,
  textYOffset = 0,
  avatarXOffset = 0,
  avatarYOffset = 0,
  scaleX = 1,
  scaleY = 1,
  ref = null,
  onPress,
}: ProfileComponentProps) => {
  const app = useApp();
  const containerRef = React.useRef(null);

  useEffect(() => {
    // @ts-ignore
    console.log('first', containerRef.current.getBounds())
  }, [])

  return (
    <Container ref={ref || containerRef} scale={[scaleX, scaleY]} eventMode="static" onpointertap={onPress}>
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
            texture={avatarTexture || PIXI.Texture.EMPTY}
            anchor={[0.5, 0]}
            // scale={[0.5, 0.5]}
            position={[posX + avatarXOffset, posY + avatarYOffset]}
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

export default ProfileComponent