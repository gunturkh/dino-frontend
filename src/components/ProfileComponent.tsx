
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
  posX?: number;
  posY?: number;
  textXOffset?: number;
  textYOffset?: number;
  avatarXOffset?: number;
  avatarYOffset?: number;
  scaleX?: number;
  scaleY?: number;
  ref?: any;
  componentPosX: number;
  componentPosY: number;
  onPress?: () => void;
  width?: number;
  height?: number;
}

const ProfileComponent = ({
  spriteTexture,
  avatarTexture,
  text,
  textStyle,
  posX = 0,
  posY = 0,
  textXOffset = 0,
  textYOffset = 0,
  avatarXOffset = 0,
  avatarYOffset = 0,
  scaleX = 1,
  scaleY = 1,
  ref = null,
  componentPosX,
  componentPosY,
  width,
  height,
  onPress,
}: ProfileComponentProps) => {
  const app = useApp();
  const containerRef = React.useRef(null);

  return (
    <Container
      ref={ref || containerRef}
      // scale={[scaleX, scaleY]}
      eventMode="static"
      position={[componentPosX, componentPosY]}
      zIndex={1}
      width={width}
      height={height}
      onpointertap={onPress}>

      {spriteTexture && (
        <>
          <Sprite
            texture={spriteTexture || PIXI.Texture.EMPTY}
            anchor={[0.5, 0]}
            // scale={[0.5, 0.5]}
            position={[posX, posY]}
          // scale={[scaleX, scaleY]}
          />
          <Sprite
            texture={avatarTexture || PIXI.Texture.EMPTY}
            anchor={[0.5, 0.5]}
            // scale={[0.5, 0.5]}
            position={[0 + avatarXOffset, 18 + avatarYOffset]}
          />
          <Text
            text={text || ''}
            anchor={[0.5, 0.5]}
            position={[0 + textXOffset, 13 + textYOffset]}
            style={textStyle}
          // scale={[scaleX, scaleY]}
          />
        </>
      )}
    </Container>
  )
}

export default ProfileComponent