/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/device/body.glb -t -r public
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Osidinum_Tama: THREE.Mesh
  }
  materials: {
    ['Material.010']: THREE.MeshStandardMaterial
  }
}

export function Body(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/device/body.glb') as GLTFResult
  return (
    <group {...props} dispose={null} scale={300}>
      <mesh geometry={nodes.Osidinum_Tama.geometry} material={materials['Material.010']} position={[0, -0.07, -0.03]} rotation={[1.95, 0, 0]} scale={0.01} />
    </group>
  )
}

useGLTF.preload('/device/body.glb')
