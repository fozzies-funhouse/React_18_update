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

import Shoe from '../SingleProduct/Shoe';
import './Landing3D.css';

// React Functional Component

function Landing3D(props) {
  const { id } = props;
  const { offset } = props;
  let shoePosition = [];

  if (offset) {
    shoePosition = [4, -2, -3];
  } else {
    shoePosition = [-2, -2, -3];
  }

  return (
    <>
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [0, 8, 15], fov: 75 }}
        gl={{ alpha: true }}
        className={offset ? '' : 'landingscene1'}
      >
        <ambientLight intensity={0.25} />
        <directionalLight
          castShadow
          intensity={0.8}
          position={[10, 6, 6]}
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera
            attach='shadow-camera'
            left={-20}
            right={20}
            top={20}
            bottom={-20}
          />
        </directionalLight>
        <Suspense fallback={null}>
          <group position={shoePosition}>
            <PresentationControls global rotation={[0, 0, 0]} polar={[-1, 1]}>
              <Shoe id={id} />
            </PresentationControls>
          </group>
          <Environment preset='dawn' />
        </Suspense>
      </Canvas>
    </>
  );
}

export default Landing3D;
