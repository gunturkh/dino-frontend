import "pixi-spine"; // Do this once at the very start of your code. This registers the loader!
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import TextInput from "pixi-text-input";

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
  const app = new PIXI.Application();
  document.body.appendChild(app.view);
  let nameInput, passwordInput;

  PIXI.Assets.load("spineboy/spineboy.json").then((resource) => {
    console.log("resource", resource);
    console.log("app.screen", app.screen);
    // app.stage.interactive = true;
    const animation = new Spine(resource.spineData);

    // set the position
    animation.x = app.screen.width / 5;
    animation.y = app.screen.height;

    animation.scale.set(1);

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
      box: generateBox,
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
    passwordInput.x = 500;
    passwordInput.y = 150;
    passwordInput.pivot.x = passwordInput.width / 2;
    passwordInput.pivot.y = passwordInput.height / 2;
    passwordInput.on("keydown", (keycode) => {
      console.log("key pressed:", keycode);
    });
    passwordInput.on("input", (value) => {
      console.log("text typed:", value);
    });
    app.stage.addChild(nameInput);
    app.stage.addChild(passwordInput);

    app.stage.addChild(animation);

    // app.stage.on("pointerdown", () => {
    //   animation.state.setAnimation(0, "jump", false);
    //   animation.state.addAnimation(0, "walk", true, 0);
    // });

    // if (animation.state.hasAnimation("walk")) {
    //   // run forever, little boy!
    //   animation.state.setAnimation(0, "walk", true);
    //   // dont run too fast
    //   animation.state.timeScale = 1;
    //   // update yourself
    //   animation.autoUpdate = true;
    // }
  });
  PIXI.Assets.load("dragon/dragon.json").then(onAssetsLoaded);

  function onAssetsLoaded(dragonAsset) {
    // instantiate the spine animation
    const dragon = new Spine(dragonAsset.spineData);
    dragon.skeleton.setToSetupPose();
    dragon.update(0);
    dragon.autoUpdate = false;

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
      (app.screen.width - dragonCage.width) ,
      (app.screen.height - dragonCage.height)
    );

    // add the container to the stage
    app.stage.addChild(dragonCage);

    // once position and scaled, set the animation to play
    dragon.state.setAnimation(0, "flying", true);

    app.ticker.add(() => {
      // update the spine animation, only needed if dragon.autoupdate is set to false
      dragon.update(app.ticker.deltaMS / 1000); // IN SECONDS!
    });
  }
  return <div />;
}

export default Spineboy;
