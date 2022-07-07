import React, { Suspense, useRef } from 'react';
import {
  Environment,
  PresentationControls,
  MeshReflectorMaterial,
} from '@react-three/drei';
import {
  Canvas, // Canvaas element
} from '@react-three/fiber';

import './SingleProduct3D.css';
import Shoe1 from './Shoe1';

// React Functional Component

function SingleProduct3D() {
  return (
    <>
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [-5, 14, 20], fov: 50 }}
        gl={{ alpha: true }}
      >
        <fog attach='fog' args={['#17171b', 30, 40]} />
        <color attach='background' args={['#17171b']} />
        <ambientLight intensity={0.25} />
        <directionalLight
          castShadow
          intensity={2}
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
          <PresentationControls global rotation={[0, 0, 0]} polar={[0, 0.3]}>
            <Shoe1 />
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
              color='#151515'
              metalness={0.6}
              roughness={1}
            />
          </mesh>
          <Environment preset='dawn' />
        </Suspense>
      </Canvas>
    </>
  );
}

export default SingleProduct3D;
