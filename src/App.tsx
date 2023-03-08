import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Spineboy from './Spineboy';
import { SpineComponent } from './SpineComponent';

import * as PIXI from 'pixi.js';
import { Spine } from 'pixi-spine';

function App() {
const canvasRef = React.createRef<HTMLCanvasElement>();

// const app = new PIXI.Application({
//   backgroundAlpha: 0,
//   // width: 800,
//   // height: 600,
//   // antialias: true,
//   view: canvasRef?.current as HTMLCanvasElement,
// });
// useEffect(() => {
//   document.body.appendChild(app.view as HTMLCanvasElement);

//   // const container = new PIXI.Container()
//   // app.stage.addChild(container);

//   PIXI.Assets
//     .load('spineboy/spineboy.json')
//     .then((resource) => {
//       console.log('resource', resource)
//       const animation = new Spine(resource.spineData);

//       // set the position
//       // animation.x = app.screen.width / 2;
//       // animation.y = app.screen.height;
//       // animation.scale.set(0.5);

//       const animationWidth = animation.width;
//       console.log('.then ~ animationWidth:', animationWidth)
//       console.log('.then ~ screenWidth:', app.screen.width)
//       const animationHeight = animation.height;
//       console.log('.then ~ animationHeight:', animationHeight)
//       console.log('.then ~ screenHeight:', app.screen.height)
//       const scaleFactor = Math.min(app.screen.width / animationWidth, app.screen.height / animationHeight);
//       // animation.scale.set(scaleFactor);
//       // animation.x = (app.screen.width - animationWidth * scaleFactor) / 2;
//       // animation.y = (app.screen.height - animationHeight * scaleFactor);

//       app.renderer.resize(animationWidth, animationHeight);
//       animation.position.set(animationWidth / 2, animationHeight)
//       // container.addChild(animation);


//       app.stage.addChild(animation);

//       if (animation.state.hasAnimation('walk')) {
//         // run forever, little boy!
//         animation.state.setAnimation(0, 'walk', true);
//         // dont run too fast
//         animation.state.timeScale = 1;
//         // update yourself
//         animation.autoUpdate = true;
//       }
//     });

//   // pixiContainerRef.current.appendChild(app.view);

//   // return (
//   //   app.destroy(true)
//   // )
// }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        {/* <canvas ref={canvasRef} width="800" height="600" /> */}
        <SpineComponent />
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        

    </div>
  );
}

export default App;
