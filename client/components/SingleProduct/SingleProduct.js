import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct, addToCart } from '../../store/singleProduct';
import { fetchCart } from '../../store/cart';
import SingleProduct3D from './SingleProduct3D';
import { ShoeModel } from './Shoe';

import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Tooltip,
} from '@mui/material';
const SingleProduct = (props) => {
  // Pulling state from redux
  const user = useSelector((state) => state.auth);
  const product = useSelector((state) => state.product);

  // actions distpatcher
  const dispatch = useDispatch();

  const id = props.match.params.id; // product ID variable

  useEffect(() => {
    dispatch(fetchProduct(id));
    dispatch(fetchCart()); //if user is not logged in this thunk creates a local storage cart
  }, []);

  // Generating number of stars
  const productStars = () => {
    let str = '';
    for (let i = 0; i < Math.floor(product.rating); i++) {
      let star = '🌟';
      str += star;
    }
    return str;
  };

  const selectOptions = [...Array(10)];

  return (
    <>
      <Container>
        <Grid container spacing={4} direction='column' alignItems='center' style={{ minHeight: '90vh' }}>
          <Grid
            container
            item
            spacing={2}
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            <Tooltip
              title='Drag to interact'
              placement='right-end'
              arrow={true}
            >
              <Grid
                item
                xs={12}
                md={8}
                lg={8}
                style={{ height: 600, width: 600 }}
              >
                {/* This is the 3D Scene  it only renders if is items 1-9 the
                  rest renders the product pic */}
                {id < ShoeModel.length ? (
                  <SingleProduct3D id={id} />
                ) : (
                  <img
                    src={product.image_url.slice(7)}
                    style={{ height: 600, width: 600 }}
                  />
                )}
              </Grid>
            </Tooltip>

            <Grid item xs={10} md={4} lg={4}>
              <Card elevation={5}>
                <CardContent>
                  <Grid container direction={'column'} spacing={1.5}>
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
                    {/* Checking inventory if inventory = 0 It will display
                      'Out of stock' */}
                    {product.inventory > 0 ? (
                      <Grid item>
                        <Typography
                          variant='body1'
                          style={{ marginLeft: 20, color: 'green' }}
                        >
                          {product.inventory} In Stock
                        </Typography>
                      </Grid>
                    ) : (
                      <Grid item>
                        <Typography
                          variant='body1'
                          style={{ marginLeft: 20, color: 'red' }}
                        >
                          Out of stock
                        </Typography>
                      </Grid>
                    )}

                    <Grid item alignSelf={'center'}>
                      <Button
                        size='small'
                        style={{
                          backgroundColor: '#f0cb11',
                          color: 'black',
                          marginTop: 30,
                          marginBottom: 20,
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
                              dispatch(addToCart(id, user.id));
                            } else {
                              dispatch(addToCart(id));
                            }
                          }
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={6} md={8} lg={8}>
            <Card
              sx={{ textAlign: 'center' }}
              elevation={5}
              style={{ marginBottom: 80, maxWidth: 600 }}
            >
              <CardContent>
                <Typography
                  variant='h5'
                  style={{
                    textTransform: 'uppercase',
                    height: 60,
                  }}
                >
                  Product Description
                </Typography>
                <Typography variant='body1'>{product.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default SingleProduct;
