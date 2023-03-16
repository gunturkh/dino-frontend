import React, { Component } from "react";
import { Input, Button } from "@pixi/ui";
import { applyDefaultProps, PixiComponent } from "@pixi/react";
import { Graphics, Sprite } from "pixi.js";

import tile from "./tile.png";

// text input pixi js in react way

export default PixiComponent("TextInput", {
  create: (props) => {
    console.log("props", props);
    return new Input({
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
      placeholder: props.placeholder,
    });
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
    // applyDefaultProps(instance, oldProps, newProps);
    instance.onChange.connect((e) => newProps.onChange(e));
    // instance.placeholder = newProps.placeholder;
    // console.log("applyProps instance", instance);
    // console.log("applyProps oldProps", oldProps);
    // console.log("applyProps newProps", newProps);
    // const { fill, x, y, width, height, onClick } = newProps;
    // props changed
    // apply logic to the instance
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
