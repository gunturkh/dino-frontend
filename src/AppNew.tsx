import * as PIXI from "pixi.js";
import {Stage, Container, Sprite, Text, useApp, AppProvider } from "@pixi/react";
import { useMemo } from "react";



export const AppNew = () => {
  const options = {
    backgroundColor: 0x1099bb,
    // antialias: true,
    // autoresize: true,
    // autoStart: false,
    // clearBeforeRender: false,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // const app = useApp();


  const blurFilter = useMemo(() => new PIXI.BlurFilter(4), []);
    return (
      // <AppProvider value={app} >
        <Stage options={options} >
          <Container width={window.innerWidth} height={window.innerHeight}>

                  <Sprite 
                    image={'image/forest_background.jpg'}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    // anchor={{ x: 0.5, y: 0.5 }}
                    // x={0}
                    // y={0}
                  />
                <Container x={400} y={330}>
        <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />
      </Container>
      </Container>

        </Stage>
        // </AppProvider>
    );
};