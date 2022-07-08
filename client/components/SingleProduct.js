import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { fetchProduct, addToCart } from '../store/singleProduct';
import { fetchCart } from '../store/cart';
import SingleProduct3D from './SingleProduct/SingleProduct3D';

import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Button,
} from '@mui/material';

const SingleProduct = (props) => {
  const [count, setCount] = useState(0);

  const { getProduct, match, product, addItemToCart, user } = props;

  useEffect(() => {
    getProduct(match.params.id);
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
      <Grid>
        <Grid>
          <Card>
            <SingleProduct3D />
          </Card>
          <Card
            className="mb-2"
            style={{
              width: '100%',
              minHeight: '300px',
              color: '#4e4c4b',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* <Card.Img variant="top" src={product.image_url} /> */}
            <CardHeader title={product.name} variant="top">
              {product.name}
            </CardHeader>
            <CardContent
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h4">${product.price}</Typography>
              <Typography variant="h6">
                Inventory: {product.inventory}
              </Typography>
              <Button
                className="mt-auto"
                variant="secondary"
                onMouseDown={async () => {
                  await getProduct(match.params.id);
                }}
                onMouseUp={async () => {
                  await addItemToCart(match.params.id, user.id);
                }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

// import React, { Component } from 'react';

// import { fetchProduct, addToCart } from '../store/singleProduct';
// import { fetchCart } from '../store/cart';
// import Container from 'react-bootstrap/Container';
// import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import SingleProduct3D from './SingleProduct/SingleProduct3D';

// class SingleProduct extends Component {
//   constructor() {
//     super();
//     this.state = { count: 0 };
//   }
//   async componentDidMount() {
//     this.props.getProduct(this.props.match.params.id);
//     // this.props.getCart(101);
//   }

//   render() {
//     const { product, addItemToCart, user, getCart } = this.props;
//     return (
// <Container>
//   <h1
//     style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       color: '#808080',
//       marginBottom: '2rem',
//     }}
//   >
//     Welcome {this.props.user.first_name || 'Guest'}
//   </h1>
//   <h3 style={{ color: '#808080' }}>Product Details</h3>
//   <CardGroup>
//     <Col>
//       <Card
//         className='mb-2'
//         style={{
//           width: '30rem',
//           height: '30rem',
//           color: '#4e4c4b',
//           border: 'none',
//         }}
//       >
//         <SingleProduct3D />
//         {/* <Card.Img variant="top" src={product.image_url} /> */}
//         <Card.Title>{product.name}</Card.Title>
//         <Card.Text>${product.price}</Card.Text>
//         <Card.Text>Inventory: {product.inventory}</Card.Text>
//         <Button
//           className='mt-auto'
//           variant='secondary'
//           onMouseDown={async () => {
//             await this.props.getProduct(this.props.match.params.id);
//           }}
//           onMouseUp={async () => {
//             await addItemToCart(this.props.match.params.id, user.id);
//           }}
//         >
//           Add to Cart
//         </Button>
//       </Card>
//     </Col>
//   </CardGroup>
// </Container>
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
