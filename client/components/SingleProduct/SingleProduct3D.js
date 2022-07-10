import React, { Suspense } from 'react';
import {
  Environment,
  PresentationControls,
  MeshReflectorMaterial,
} from '@react-three/drei';
import {
  Canvas, // Canvas element
} from '@react-three/fiber';

import Shoe from './Shoe';

// React Functional Component

function SingleProduct3D(props) {
  const { id } = props;

  return (
    <>
      {/* This the single product 3D Scene created with React Three Fiber */}
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [0, 8, 15], fov: 75 }}
        gl={{ alpha: true }}
        className='canvas'
      >
        <fog attach='fog' args={['white', 30, 40]} />
        <color attach='background' args={['#ffffff']} />
        <ambientLight intensity={0.25} />
        <directionalLight
          castShadow
          intensity={0.4}
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
          {/* Shoe model */}
          <PresentationControls global polar={[0, 0.3]}>
            <Shoe id={id} />
          </PresentationControls>

          {/* Reflective plane as floor */}
          <mesh position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[80, 80]} />
            <MeshReflectorMaterial
              blur={[400, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={5}
              depthScale={1}
              minDepthThreshold={0.85}
              color='#c0c0c0'
              metalness={0.5}
              roughness={0.6}
            />
          </mesh>

          <Environment preset='dawn' />
        </Suspense>
      </Canvas>
    </>
  );
}

export default SingleProduct3D;
