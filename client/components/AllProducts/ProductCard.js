import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { addToCart } from '../../store/singleProduct';
import './AllProducts.css';

const ProductCard = ({ product }) => {
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // Generating number of stars
  const productStars = () => {
    let str = '';
    for (let i = 0; i < Math.floor(product.rating); i++) {
      let star = '🌟';
      str += star;
    }
    return str;
  };

  return (
    <>
      <Card
        elevation={4}
        style={{
          margin: 10,
          marginTop: 15,
          maxWidth: 480,
        }}
        className='card'
        component={motion.div}
        whileInView={{ scale: [0.5, 1] }}
        transition={{ duration: 0.7 }}
      >
        <Link
          to={`/products/${product.id}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <CardMedia
            component='img'
            alt={`${product.name} img`}
            image={product.image_url.slice(7)}
            style={{
              objectFit: 'contained',
              height: 270,
              padding: 10,
            }}
          />
          <Grid container direction={'column'} spacing={1.5}>
            <CardContent>
              <Grid item>
                <Typography
                  variant='h5'
                  style={{
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    height: 50,
                  }}
                >
                  {product.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body1' style={{ marginLeft: 20 }}>
                  Price: ${product.price}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant='body1' style={{ marginLeft: 20 }}>
                  Ratings: {productStars()} {product.rating}
                </Typography>
              </Grid>
            </CardContent>
          </Grid>
        </Link>

        <CardActions>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            <Button
              size='small'
              style={{
                backgroundColor: '#f0cb11',
                color: 'black',
                marginBottom: 10,
                padding: 10,
              }}
              onClick={() => {
                // Check for inventory
                if (product.inventory < 1) {
                  alert(
                    `🤕  Sorry we have ${product.inventory} in stock
                                            ¯l_(ツ)_/¯`
                  );
                } else {
                  // Check for user id
                  if (user.id) {
                    dispatch(addToCart(product.id, user.id));
                  } else {
                    dispatch(addToCart(product.id));
                  }
                }
              }}
            >
              Add to Cart
            </Button>
          </Grid>
        </CardActions>

        {/* </Grid> */}
      </Card>
    </>
  );
};

export default ProductCard;
