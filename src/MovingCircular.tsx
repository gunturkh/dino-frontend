// @ts-nocheck

import React, { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as PIXI from "pixi.js";
// import { Spine } from "pixi-spine";

import { BlurFilter } from "pixi.js";

export const MyComponent = () => {
  const blurFilter = useMemo(() => new BlurFilter(4), []);

  return (
    <div />
  );
};
