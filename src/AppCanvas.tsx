import React, { Suspense, useMemo, useRef } from 'react'
import { useGLTF, Html, shaderMaterial, useTexture, Plane } from '@react-three/drei'
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer, DepthOfField, Bloom } from "@react-three/postprocessing";

import ForestBg from './assets/image/forest_background.jpg'

function BlurredBackground() {
  const planeRef = useRef();
  const map = useTexture(ForestBg)
  const { viewport } = useThree();


  // useFrame(({ camera }) => {
  //   // update the plane's position to always face the camera
  //   // @ts-ignore
  //   planeRef?.current?.lookAt(camera.position);
  // });

  return (
    <>
      <Plane
        ref={planeRef}
        // position={[0, 0, -5]}
        args={[16, 10]}
        // rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial attach="material" map={map} transparent opacity={0.5} toneMapped={false}/>
      </Plane>
      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={8}
          height={viewport?.height}
        />
        <Bloom 
        luminanceThreshold={0} 
        luminanceSmoothing={0.6} 
        height={viewport.height} 
        opacity={1}  
        />
      </EffectComposer>
    </>
  );
}


const signUpForm = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '12vw',
      height: '40vh',
      backgroundColor: 'white',
    }}>
      <label htmlFor="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required />
    </div>
  )
}

export default function AppCanvas() {
  return (
    // canvas full screen
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas flat linear eventPrefix="client">
        <Suspense fallback={null}>
          <BlurredBackground />
          <Html transform>
            {signUpForm()}
          </Html>
        </Suspense>
      </Canvas>
    </div>
  )
}