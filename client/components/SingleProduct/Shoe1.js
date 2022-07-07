import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

// Shoe Component

const Shoe1 = () => {
  const shoeRef = useRef(); // useRef hook
  const gltf = useGLTF('../Shoes/Shoe1.glb');
  // console.log(gltf.scene);
  gltf.scene.scale.set(0.005, 0.005, 0.005);
  gltf.scene.rotation.y = Math.PI;

  // Animation
  useFrame(() => {
    shoeRef.current.rotation.y += 0.003;
  });

  return <primitive ref={shoeRef} object={gltf.scene} />;
};

export default Shoe1;
