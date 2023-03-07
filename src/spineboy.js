import "pixi-spine"; // Do this once at the very start of your code. This registers the loader!
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";

function Spineboy() {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  PIXI.Assets.load("spineboy/spineboy.json").then((resource) => {
    console.log("resource", resource);
    console.log("app.screen", app.screen);
    app.stage.interactive = true;
    const animation = new Spine(resource.spineData);

    // set the position
    animation.x = app.screen.width / 2;
    animation.y = app.screen.height;

    animation.scale.set(1.5);

    // set up the mixes!
    animation.stateData.setMix("walk", "jump", 0.2);
    animation.stateData.setMix("jump", "walk", 0.4);

    // play animation
    animation.state.setAnimation(0, "walk", true);

    app.stage.addChild(animation);

    app.stage.on("pointerdown", () => {
      animation.state.setAnimation(0, "jump", false);
      animation.state.addAnimation(0, "walk", true, 0);
    });

    // if (animation.state.hasAnimation("walk")) {
    //   // run forever, little boy!
    //   animation.state.setAnimation(0, "walk", true);
    //   // dont run too fast
    //   animation.state.timeScale = 1;
    //   // update yourself
    //   animation.autoUpdate = true;
    // }
  });

  return <div />;
}

export default Spineboy;
