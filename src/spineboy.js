import "pixi-spine"; // Do this once at the very start of your code. This registers the loader!
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import TextInput from "pixi-text-input";
import ForestBg from "./assets/image/forest_background.jpg";
import { Viewport } from "pixi-viewport";
function generateBox(w, h, state) {
  var box = new PIXI.Container();
  var sprite = new PIXI.TilingSprite(PIXI.Texture.from("tile.png"), w, h);
  var mask = new PIXI.Graphics();

  mask.beginFill(0);
  mask.drawRoundedRect(0, 0, w, h, 36);

  box.addChild(sprite);
  box.addChild(mask);
  sprite.mask = mask;

  switch (state) {
    case "DEFAULT":
      sprite.tint = 0xffffff;
      break;
    case "FOCUSED":
      sprite.tint = 0x7edfff;
      break;
    case "DISABLED":
      sprite.alpha = 0.5;
      break;
  }

  return box;
}

function Spineboy() {
  // make the canvas fill the browser window
  console.log("window", window);

  const app = new PIXI.Application({
    // width: a,
    // height: 1080,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  document.body.appendChild(app.view);

  PIXI.Assets.load([
    ForestBg,
    "spineboy/spineboy.json",
    "dragon/dragon.json",
  ]).then((resource) => {
    console.log("resource array", resource);
    const background = PIXI.Sprite.from(ForestBg);
    console.log('background', background.width, background.height)
    const container = new PIXI.Container();
    container.sortableChildren = true;
    container.addChild(background)
    app.stage.addChild(container);

    // scale stage container to match the background size
    background.width = app.screen.width;
    background.height = app.screen.height;

    {
      /* <Spineboy /> */
    }
    const spineboy = PIXI.Assets.cache.get("spineboy/spineboy.json").spineData;
    const SpineboyAnimation = new Spine(spineboy);

    // set the position
    SpineboyAnimation.x = app.screen.width / 5;
    SpineboyAnimation.y = app.screen.height;

    SpineboyAnimation.scale.set(1);

    // set up the mixes!
    SpineboyAnimation.stateData.setMix("walk", "jump", 0.2);
    SpineboyAnimation.stateData.setMix("jump", "walk", 0.4);

    // play animation
    SpineboyAnimation.state.setAnimation(0, "walk", true);
    // app.stage.addChild(SpineboyAnimation);
    container.addChild(SpineboyAnimation);
    {
      /* <Spineboy /> */
    }

    {
      /* Name Input */
    }
    let nameInput, passwordInput;

    nameInput = new TextInput({
      input: {
        fontSize: "36px",
        padding: "12px",
        width: "500px",
        color: "#26272E",
      },
      box: generateBox,
    });

    nameInput.placeholder = "Enter your username";
    nameInput.x = window.innerWidth/2;
    nameInput.y = window.innerHeight/2;
    nameInput.pivot.x = nameInput.width / 2;
    nameInput.pivot.y = nameInput.height / 2;
    nameInput.on("keydown", (keycode) => {
      console.log("key pressed:", keycode);
    });
    nameInput.on("input", (value) => {
      console.log("text typed:", value);
    });

    passwordInput = new TextInput({
      input: {
        fontSize: "36px",
        padding: "12px",
        width: "500px",
        color: "#26272E",
      },
      box: generateBox,
    });

    passwordInput.placeholder = "Enter your password";
    passwordInput.x = window.innerWidth/2;
    passwordInput.y = window.innerHeight/2 + 100;
    passwordInput.pivot.x = passwordInput.width / 2;
    passwordInput.pivot.y = passwordInput.height / 2;
    passwordInput.on("keydown", (keycode) => {
      console.log("key pressed:", keycode);
    });
    passwordInput.on("input", (value) => {
      console.log("text typed:", value);
    });

    nameInput.zIndex = 2
    passwordInput.zIndex = 2
    // app.stage.addChild(nameInput);
    // app.stage.addChild(passwordInput);
    container.addChild(nameInput);
    container.addChild(passwordInput);
    {
      /* Name Input */
    }

    {
      /* <Dragon /> */
    }
    const dragonAsset = PIXI.Assets.cache.get("dragon/dragon.json").spineData;
    const dragon = new Spine(dragonAsset);
    dragon.skeleton.setToSetupPose();
    dragon.update(0);
    dragon.autoUpdate = false;
    dragon.zIndex = 0;

    // create a container for the spine animation and add the animation to it
    const dragonCage = new PIXI.Container();
    dragonCage.addChild(dragon);

    // measure the spine animation and position it inside its container to align it to the origin
    const localRect = dragon.getLocalBounds();
    dragon.position.set(-localRect.x, -localRect.y);

    // now we can scale, position and rotate the container as any other display object
    const scale = Math.min(
      (app.screen.width * 0.7) / dragonCage.width,
      (app.screen.height * 0.7) / dragonCage.height
    );
    dragonCage.scale.set(scale, scale);
    dragonCage.position.set(
      app.screen.width - dragonCage.width,
      app.screen.height - dragonCage.height
    );
    dragonCage.zIndex = 0

    // add the container to the stage
    container.addChild(dragonCage);

    // once position and scaled, set the animation to play
    dragon.state.setAnimation(0, "flying", true);

    app.ticker.add(() => {
      // update the spine animation, only needed if dragon.autoupdate is set to false
      dragon.update(app.ticker.deltaMS / 1000); // IN SECONDS!
    });
    {
      /* <Dragon /> */
    }
  });
  return <div />;
}

export default Spineboy;
