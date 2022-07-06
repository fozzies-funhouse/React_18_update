import React, { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  Environment,
  PresentationControls,
  Text,
  MeshReflectorMaterial,
} from '@react-three/drei';
import {
  Canvas, // Canvaas element
  useLoader, // #3D model loader
} from '@react-three/fiber';

import './Landing3D.css';

// Shoe Component

const Shoe = () => {
  const gltf = useLoader(GLTFLoader, '../Sneaker/scene.gltf');
  // console.log(gltf.scene);
  gltf.scene.scale.set(0.005, 0.005, 0.005);
  gltf.scene.rotation.y = Math.PI;

  return <primitive object={gltf.scene} />;
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
            <Shoe />
          </PresentationControls>

          <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
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

export default Landing3D;
