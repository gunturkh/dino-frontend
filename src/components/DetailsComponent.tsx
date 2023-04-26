import React, { useEffect, useState, useRef } from "react";
import * as PIXI from "pixi.js";
import { Container, Sprite, Text, useApp } from "@pixi/react";

type Props = {
  spriteTexture: PIXI.Texture;
  IconTexture?: PIXI.Texture;
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
  isVisible?: boolean;
  rightIconVisible?: boolean;
};

const DetailsComponent = ({
  spriteTexture,
  IconTexture,
  text,
  textStyle,
  posX = 0,
  posY = 0,
  textXOffest = 0,
  textYOffest = 0,
  scaleX = 1,
  scaleY = 1,
  ref = null,
  rightIconVisible = false,
  onPress,
  isVisible = true,
}: Props) => {
  const app = useApp();
  const containerRef = useRef();
  // const referenceBounds = PIXI.Assets?.get('BNBDetails')?.orig;
  const [isLoaded, setIsLoaded] = useState(false);

  // const [bounds, setBounds] = useState(referenceBounds)
  // console.log("🚀 ~ file: DetailsComponent.tsx:47 ~ setBounds ~ setBounds:", bounds)

  useEffect(() => {
    if (app && !isLoaded) {
      setIsLoaded(true);
    }
  }, [app, isLoaded]);
  // @ts-ignore

  useEffect(() => {
    // if (isLoaded) {
    // @ts-ignore
    console.log("useRef", containerRef?.current?.getBounds());
    // }
  });

  return (
    <>
      {isLoaded && (
        <Container
          ref={ref || containerRef}
          scale={[scaleX, scaleY]}
          position={[posX, posY]}
          eventMode="static"
          onpointertap={onPress}
          visible={isVisible}
        >
          {spriteTexture && IconTexture && (
            <>
              {/* @ts-ignore */}
              {/* {console.log('containerBounds', containerRef)} */}
              <Sprite
                // texture={PIXI.Assets.get('DinoFundLogo')}
                texture={spriteTexture || PIXI.Texture.EMPTY}
                anchor={[0.5, 0.5]}
                // scale={[0.5, 0.5]}
                position={[0, 0]}
                // scale={[scaleX, scaleY]}
              />
              <Sprite
                texture={IconTexture || PIXI.Texture.EMPTY}
                anchor={[0.5, 0.5]}
                position={[-85, 0]}
              />
              <Text
                text={text || ""}
                anchor={[0.5, 0.5]}
                position={[0 + textXOffest, 0 + textYOffest]}
                style={textStyle}
                // scale={[scaleX, scaleY]}
              />
              <Sprite
                texture={PIXI.Assets.get("PlusIcon") || PIXI.Texture.EMPTY}
                anchor={[0.5, 0.5]}
                position={[80, 0]}
                // scale={[scaleX, scaleY]}
                visible={rightIconVisible}
              />
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default DetailsComponent;
