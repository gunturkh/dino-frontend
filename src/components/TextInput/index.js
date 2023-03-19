import React, { Component } from "react";
import { Input, Button } from "@pixi/ui";
import { applyDefaultProps, PixiComponent } from "@pixi/react";
import { Graphics, Sprite } from "pixi.js";

import tile from "./tile.png";

// text input pixi js in react way

export default PixiComponent("TextInput", {
  create: (onInput) => {
    console.log("props", onInput);
    const input = new Input({
      bg: new Graphics()
        .beginFill(0xdcb000)
        .drawRoundedRect(0, 0, 280, 55, 11 + 5),
      // .beginFill(0xf1d583)
      // .drawRoundedRect(5, 5, 280 - 5 * 2, 55 - 5 * 2, 11),
      textStyle: {
        fill: 0x000000,
        fontSize: 22,
      },
      padding: [11, 11],
      maxLength: 20,
      align: "center",
      // placeholder: placeholderA,
      // placeholder:,
    });
//  console.log('placeholder', input.placeholder.text)

    // updateBackground(input, bgProps);

    // function updateBackground(input, bgProps) {
    //   const { width, height, radius, fillColor } = bgProps;
    
    //   const bg = input.bg;
    //   bg.clear();
    //   bg.beginFill(fillColor);
    //   bg.drawRoundedRect(0, 0, width, height, radius);
    //   bg.endFill();
    // }

    return input;
  },
  didMount: (instance, parent) => {
    console.log("didMount instance", instance);
    console.log("didMount parent", parent);
    // apply custom logic on mount
  },
  // willUnmount: (instance, parent) => {
  //   console.log("willUnmount text", instance, parent);
  //   // clean up before removal
  // },
  applyProps: (instance, oldProps, newProps) => {
    const { ...oldP } = oldProps;
    const { onChange, placeholder, ...newP } = newProps;

    // apply rest props to PIXI.Text
    applyDefaultProps(instance, oldP, newP);
    instance.eventMode = 'static'

    // add default placeholder
    instance.placeholder.text = placeholder;

    // updateBackground(instance, bgProps);

    // instance.onChange.connect(result);

    function result() {
      const info = instance.value;
      onChange(info);
    }
  },
  config: {
    // destroy instance on unmount?
    // default true
    destroy: true,

    /// destroy its children on unmount?
    // default true
    destroyChildren: true,
  },
});


