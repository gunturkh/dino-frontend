import * as PIXI from "pixi.js";
import {Stage, Container, Sprite, Text, useApp, AppProvider } from "@pixi/react";
import { Input } from "@pixi/ui";
import { useMemo, useState } from "react";



export const AppNew = () => {
  const [scene, setScene] = useState('HOME')



  const options = {
    backgroundColor: 0x1099bb,
    antialias: true,
    autoresize: true,
    autoStart: false,
    clearBeforeRender: false,
  };

  // const app = useApp();

  const appWidth = window.innerWidth;
  const appHeight = window.innerHeight;


  const blurFilter = useMemo(() => new PIXI.BlurFilter(4), []);
    return (
      // <AppProvider value={app} >
                <>
        <button onClick={() => setScene('GAME')}>Start Game</button><Stage width={appWidth} height={appHeight} options={options}>

          {scene === 'GAME' && (
            <Sprite
              image={'image/forest_background.jpg'}
              width={window.innerWidth}
              height={window.innerHeight} />)}
          {scene === 'HOME' && (
            <Sprite
              image={'logo192.png'}
              width={window.innerWidth}
              height={window.innerHeight} />
          )}

          <Container x={400} y={330} position={[appWidth / 2, appHeight / 2]}>


            <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]}
            interactive={true} 
              onclick={() => {
                console.log('click')
                setScene((prev) => prev === 'GAME' ?'HOME' : 'GAME')
              }}
              ontap={() => {
                console.log('click')
                setScene((prev) => prev === 'GAME' ?'HOME' : 'GAME')
              }}
            />

          </Container>

        </Stage></>
        // </AppProvider>
    );
};