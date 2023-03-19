import React, { Component } from "react";
import { Input, Button } from "@pixi/ui";
import * as PIXI from "pixi.js";
import { applyDefaultProps, PixiComponent } from "@pixi/react";
import { Graphics, Sprite } from "pixi.js";

import tile from "./tile.png";
const TextInput = require('pixi-text-input')

// text input pixi js in react way
new PIXI.Text()
export default PixiComponent("TextInput", {
  create: (onInput) => {
    const input = new TextInput({
      input: {
        fontSize: '36px',
        padding: '12px',
        width: '500px',
        color: '#26272E'
      },
      box: {
        default: {fill: 0xE8E9F3, rounded: 12, stroke: {color: 0xCBCEE0, width: 3}},
        focused: {fill: 0xE1E3EE, rounded: 12, stroke: {color: 0xABAFC6, width: 3}},
        disabled: {fill: 0xDBDBDB, rounded: 12}
      }
    })

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
    const { onInput, ...newP } = newProps;

    // apply rest props to PIXI.Text
    applyDefaultProps(instance, oldP, newP);

    // instance.onChange.connect(instance.value);
    // instance.onChange.connect((e) => newProps.onChange(e));
    // instance.x = newProps.x;
    // instance.y = newProps.y;
    // instance.width = newProps.width;
    // instance.height = newProps.height;
    // instance.placeholder = newProps.placeholder;
    // instance.visible = newProps.visible;

    // instance.onChange.connect(result);

    function result() {
      const info = instance.value;
      onInput(info);
    }

    // applyDefaultProps(instance, oldProps, newProps);
    // instance.onChange.connect((e) => newProps.onChange(e));
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
