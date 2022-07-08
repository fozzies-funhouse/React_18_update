import React, { Suspense, useRef } from 'react';
import {
  Environment,
  PresentationControls,
  MeshReflectorMaterial,
  useGLTF,
} from '@react-three/drei';
import {
  Canvas, // Canvaas element
  useFrame, // useFrame  hook for getting the animation loop each frame
} from '@react-three/fiber';

import './Landing3D.css';

// Shoe Component

const Shoe = () => {
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

// React Functional Component

function Landing3D() {
  return (
    <>
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [-5, 14, 20], fov: 50 }}
        gl={{ alpha: true }}
      >
        <fog attach="fog" args={['#17171b', 30, 40]} />
        <color attach="background" args={['#17171b']} />
        <ambientLight intensity={0.25} />
        <directionalLight
          castShadow
          intensity={2}
          position={[10, 6, 6]}
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera
            attach="shadow-camera"
            left={-20}
            right={20}
            top={20}
            bottom={-20}
          />
        </directionalLight>
        <Suspense fallback={null}>
          <PresentationControls global rotation={[0, 0, 0]} polar={[0, 0.3]}>
            <Shoe />
          </PresentationControls>

          <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[80, 80]} />
            <MeshReflectorMaterial
              blur={[400, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={15}
              depthScale={1}
              minDepthThreshold={0.85}
              color="#151515"
              metalness={0.6}
              roughness={1}
            />
          </mesh>
          <Environment preset="dawn" />
        </Suspense>
      </Canvas>
    </>
  );
}

export default Landing3D;
