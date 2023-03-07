import "pixi-spine"; // Do this once at the very start of your code. This registers the loader!
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import TextInput from "pixi-text-input";

function Spineboy() {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);
  let nameInput;

  PIXI.Assets.load("spineboy/spineboy.json").then((resource) => {
    console.log("resource", resource);
    console.log("app.screen", app.screen);
    // app.stage.interactive = true;
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

    nameInput = new TextInput({
      input: {
        fontSize: "36px",
        padding: "12px",
        width: "500px",
        color: "#26272E",
      },
      box: {
        default: {
          fill: 0xe8e9f3,
          rounded: 12,
          stroke: { color: 0xcbcee0, width: 3 },
        },
        focused: {
          fill: 0xe1e3ee,
          rounded: 12,
          stroke: { color: 0xabafc6, width: 3 },
        },
        disabled: { fill: 0xdbdbdb, rounded: 12 },
      },
    });

    nameInput.placeholder = "Enter your username";
    nameInput.x = 500;
    nameInput.y = 50;
    nameInput.pivot.x = nameInput.width / 2;
    nameInput.pivot.y = nameInput.height / 2;
    nameInput.on("keydown", (keycode) => {
      console.log("key pressed:", keycode);
    });
    nameInput.on("input", (value) => {
      console.log("text typed:", value);
    });
    app.stage.addChild(nameInput);

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
