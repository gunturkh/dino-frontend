import 'pixi-spine' // Do this once at the very start of your code. This registers the loader!
import * as PIXI from 'pixi.js';
import {Spine} from 'pixi-spine';


function Spineboy() {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  PIXI.Assets
  .load('spineboy/spineboy.json')
  .then((resource) => {
    console.log('resource', resource)
    const animation = new Spine(resource.spineData);
 
    // set the position
    animation.x = app.screen.width / 2;
    animation.y = app.screen.height;

    animation.scale.set(0.5);
    
    app.stage.addChild(animation);

    if (animation.state.hasAnimation('walk')) {
      // run forever, little boy!
      animation.state.setAnimation(0, 'walk', true);
      // dont run too fast
      animation.state.timeScale = 1;
      // update yourself
      animation.autoUpdate = true;
    }
  });

  return (
    <div/>
  )
}

export default Spineboy;