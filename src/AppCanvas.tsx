import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'

import * as THREE from 'three'
import ForestBg from './assets/image/forest_background.jpg'

function Image() {
  const texture = useLoader(THREE.TextureLoader, ForestBg)
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[20, 10]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
    </mesh>
  )
}

export default function AppCanvas() {
  return (
    // canvas full screen
    <div style={{ width: "100vw", height: "100vh" }}>
    <Canvas flat linear eventPrefix="client" camera={{ position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        <Image />
        </Suspense>
      </Canvas>
      </div>
  )
}