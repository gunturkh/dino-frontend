// @ts-nocheck

import React, { useState, useEffect, useCallback } from "react";
import * as PIXI from "pixi.js";
import { Loader } from '@pixi/loaders';


import { Stage, useApp } from "@pixi/react";
import Spine from "./Spine";

window.PIXI = PIXI;

const mixes = [
    {
        from: "walk",
        to: "jump",
        duration: 0.2
    },
    {
        from: "jump",
        to: "walk",
        duration: 0.4
    },
    {
        from: "portal",
        to: "walk",
        duration: 0.4
    }
];

export const AppSpine: React.FC = () => {
    const [spineData, setSpineData] = useState();
    const [animationState, setAnimationState] = useState<
        PIXI.spine.core.AnimationState | undefined
    >();

    useEffect(() => {
        const initSpine = async () => {
            const loader = new Loader();

            loader
                .add("spineboy", "/public/assets/spineboy/spineboy.json")
                .load((loader, res) => {
                    setSpineData(res?.spineboy?.spineData);
                });
        };
        initSpine();
    }, []);

    const stateRef = useCallback((state: PIXI.spine.core.AnimationState) => {
        if (state) {
            state.setAnimation(0, "portal", false);
            state.addAnimation(0, "walk", true, 0);
        }
        setAnimationState(state);
    }, []);

    const jump = useCallback(() => {
        if (animationState) {
            animationState.setAnimation(0, "jump", false);
            animationState.addAnimation(0, "walk", true, 0);
        }
    }, [animationState]);

    return (
        <div>
            <button onClick={jump}>Jump</button>
            <Stage options={{ transparent: true }}>
                {spineData && (
                    <Spine
                        x={200}
                        y={590}
                        spineData={spineData}
                        scale={0.5}
                        mixes={mixes}
                        animationStateCallback={stateRef}
                    />
                )}
            </Stage>
        </div>
    );
};