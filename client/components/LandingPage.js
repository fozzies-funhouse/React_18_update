import React, { Component } from 'react';
import * as THREE from 'three';
import * as dat from 'lil-gui'; // gui debugger
import gsap from 'gsap';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class LandingPage extends Component {
  componentDidMount() {
    //Editor gui
    const gui = new dat.GUI();

    // Scene

    this.scene = new THREE.Scene();

    // Renderer

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.mount.appendChild(this.renderer.domElement);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75, // fov
      (window.innerWidth * 0.5) / (window.innerHeight * 0.5),
      0.5, // near
      1000 // far
    );
    this.camera.position.z = 5;
    this.camera.position.x = 5;
    this.camera.position.y = 5;

    // Test Box
    // const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    // const boxMaterial = new THREE.MeshBasicMaterial({
    //   color: 0xff0000,
    // });
    // this.cube = new THREE.Mesh(boxGeometry, boxMaterial);

    // Adding cube to scene
    // this.scene.add(this.cube);

    // Loading 3D Model

    const gltfLoader = new GLTFLoader();

    gltfLoader.load(
      '../../jedi_star_fighter/scene.gltf',
      (gltf) => {
        console.log(gltf);
        gltf.scene.scale.set(0.02, 0.02, 0.02);
        this.scene.add(gltf.scene);
      },
      () => {
        console.log('Processing');
      },
      () => {
        console.log('couldnt load');
      }
    );

    // Ambiant Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    // ambientLight.castShadow = true;

    // Directional light

    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 7;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    this.scene.add(ambientLight);

    // Call Animation function
    this.animation();

    // Render Scene
    this.renderer.render(this.scene, this.camera);

    // Orbit Controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Window resizing event handler
    window.addEventListener('resize', this.handleWindowResize);

    controls.update();
  }

  // Animaton
  animation = () => {
    requestAnimationFrame(this.animation);
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    // this.scene.rotation.y += 0.003;

    this.renderer.render(this.scene, this.camera);
  };

  handleWindowResize = () => {
    this.camera.aspect = (window.innerWidth * 0.8) / (window.innerHeight * 0.6);
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.6);
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div>
        <div
          ref={(mount) => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}

export default LandingPage;

// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';

// const Landing = (props) => {
//   return (
//     <div>Hello</div>

// <div
//   className='container-fluid'
//   style={{
//     backgroundImage:
//       'url(https://cdn.pixabay.com/photo/2017/02/26/09/43/beatenberg-2099823_960_720.jpg)',
//     height: '100vh',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//   }}
// >
//   <h1
//     style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       color: '#808080',
//     }}
//   >
//     Welcome to Trekkies Snowboards and Skis!
//   </h1>
//   <Container
//     style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: '27rem',
//     }}
//   >
//     <Link to='/login'>
//       <Button
//         style={{ marginRight: '5rem', width: '15rem', height: '3rem' }}
//         variant='secondary'
//       >
//         Login
//       </Button>
//     </Link>
//     <Link to='/signup'>
//       <Button
//         style={{ marginRight: '5rem', width: '15rem', height: '3rem' }}
//         variant='secondary'
//       >
//         Sign Up
//       </Button>
//     </Link>
//     <Link to='/products'>
//       <Button
//         style={{ marginRight: '5rem', width: '15rem', height: '3rem' }}
//         variant='secondary'
//       >
//         Guest
//       </Button>
//     </Link>
//   </Container>
// </div>
//   );
// };

// export default Landing;
