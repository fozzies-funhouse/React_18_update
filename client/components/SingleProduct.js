import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchProduct, addToCart } from '../store/singleProduct';
import { fetchCart } from '../store/cart';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function SingleProduct(props) {
  const [count, setCount] = useState(0);
  const { getCart, getProduct, product, addItemToCart, user } = props;
  useEffect(() => {
    getProduct(props.match.params.id);
  }, []);

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
            <div>
              <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
              </Canvas>
            </div>
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
