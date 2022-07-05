import React, { Suspense, useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProduct, addToCart } from '../store/singleProduct';
import { fetchCart } from '../store/cart';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  useGLTF,
  OrbitControls,
} from '@react-three/drei';
import { HexColorPicker } from 'react-colorful';
import { proxy, useSnapshot } from 'valtio';

import Shoe from './3dShoe';
import Picker from './3dShoePicker';

const state = proxy({
  current: null,
  items: {
    laces: '#ffffff',
    mesh: '#ffffff',
    caps: '#ffffff',
    inner: '#ffffff',
    sole: '#ffffff',
    stripes: '#ffffff',
    band: '#ffffff',
    patch: '#ffffff',
  },
});

function SingleProduct(props) {
  const [count, setCount] = useState(0);
  const { getCart, getProduct, product, addItemToCart, user } = props;
  useEffect(() => {
    getProduct(props.match.params.id);
  }, []);

  const getDataPosition = (annot) => {
    return `${annot.position.x} ${annot.position.y} ${annot.position.z}`;
  };

  const getDataNormal = (annot) => {
    return `${annot.normal.x} ${annot.normal.y} ${annot.normal.z}`;
  };
  return (
    <Container>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#808080',
          marginBottom: '2rem',
        }}
      >
        Welcome {user.first_name || 'Guest'}
      </h1>

      <h3 style={{ color: '#808080' }}>Product Details</h3>
      <CardGroup>
        <Col>
          <Card
            className="mb-2"
            style={{
              width: '30rem',
              height: '50rem',
              color: '#4e4c4b',
              border: 'none',
            }}
          >
            <>
              <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 7], fov: 75 }}
              >
                <ambientLight intensity={0.7} />
                <spotLight
                  intensity={0.5}
                  angle={0.1}
                  penumbra={1}
                  position={[10, 15, 10]}
                  castShadow
                />
                <Suspense fallback={null}>
                  <Shoe state={state} />
                  <Environment preset="city" />
                  <ContactShadows
                    rotation-x={Math.PI / 2}
                    position={[0, -0.8, 0]}
                    opacity={0.25}
                    width={10}
                    height={10}
                    blur={1.5}
                    far={0.8}
                  />
                </Suspense>
                <OrbitControls
                  minPolarAngle={Math.PI / 2}
                  maxPolarAngle={Math.PI / 2}
                  enableZoom={false}
                  enablePan={false}
                />
              </Canvas>
              <Picker state={state} />
            </>

            {/* <Card.Img variant="top" src={product.image_url} /> */}
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>${product.price}</Card.Text>
            <Card.Text>Inventory: {product.inventory}</Card.Text>
            <Button
              className="mt-auto"
              variant="secondary"
              onMouseDown={async () => {
                await getProduct(props.match.params.id);
              }}
              onMouseUp={async () => {
                await addItemToCart(props.match.params.id, user.id);
              }}
            >
              Add to Cart
            </Button>
          </Card>
        </Col>
      </CardGroup>
    </Container>
  );
}

// class SingleProduct extends Component {
//   constructor() {
//     super();
//     this.state = { count: 0 };
//   }
//   async componentDidMount() {
//     this.props.getProduct(this.props.match.params.id);
//     this.props.getCart(101);
//   }

//   render() {
//     const { product, addItemToCart, user, getCart } = this.props;
//     return (
//       <Container>
//         <h1
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             color: '#808080',
//             marginBottom: '2rem',
//           }}
//         >
//           Welcome {this.props.user.first_name || 'Guest'}
//         </h1>
//         <h3 style={{ color: '#808080' }}>Product Details</h3>
//         <CardGroup>
//           <Col>
//             <Card
//               className="mb-2"
//               style={{
//                 width: '30rem',
//                 height: '50rem',
//                 color: '#4e4c4b',
//                 border: 'none',
//               }}
//             >
//               <Card.Img variant="top" src={product.image_url} />
//               <Card.Title>{product.name}</Card.Title>
//               <Card.Text>${product.price}</Card.Text>
//               <Card.Text>Inventory: {product.inventory}</Card.Text>
//               <Button
//                 className="mt-auto"
//                 variant="secondary"
//                 onMouseDown={async () => {
//                   await this.props.getProduct(this.props.match.params.id);
//                 }}
//                 onMouseUp={async () => {
//                   await addItemToCart(this.props.match.params.id, user.id);
//                 }}
//               >
//                 Add to Cart
//               </Button>
//             </Card>
//           </Col>
//         </CardGroup>
//       </Container>
//     );
//   }
// }

const mapStateToProps = (state) => ({
  product: state.product,
  user: state.auth,
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  getProduct: (id) => dispatch(fetchProduct(id)),
  addItemToCart: (productId, userId) => dispatch(addToCart(productId, userId)),
  getCart: (userId) => dispatch(fetchCart(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
