import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/products';
import {
  Container,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Tooltip,
} from '@mui/material';

import Landing3D from './LandingScene/Landing3D';
import ProductCard from './AllProducts/ProductCard';

const Landing = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const productList = useSelector((state) => state.products);
  const [product1, product2, product3] = productList;
  const products = [product1, product2, product3];
  return (
    <Container>
      <Tooltip title='Drag to interact' placement='bottom' arrow={true}>
        <Grid item xs={12} md={12} lg={12}>
          <Landing3D />
        </Grid>
      </Tooltip>

      <Grid container>
        <Grid item container spacing={3}>
          <Grid
            item
            container
            xs={12}
            md={7}
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            {products.length === 0 || product1 === undefined
              ? 'Loading'
              : products.map((product, idx) => (
                  <Grid item key={product.id} xs={12} md={5.5}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
          </Grid>
          <Grid item xs={12} md={5} sx={{ alignSelf: 'center' }}>
            <Card sx={{ textAlign: 'center' }} elevation={5}>
              <CardContent>
                <CardHeader title='About Us' />
                <Typography
                  sx={{ fontSize: 12 }}
                  color='text.secondary'
                  paragraph
                >
                  "In an age where online shopping is rapidly growing users
                  should have the ability to interact with the product they are
                  looking to buy. To tackle this problem we used React three
                  fiber to transform the traditional model of an e-commerce site
                  into an Immersive 3D Experience where users can see their
                  product in 360 degrees. This will allow our users to have a
                  retail experience in our online shopping environment!"
                </Typography>
                <Typography
                  sx={{ fontSize: 12, textAlign: 'right', mr: 5 }}
                  color='text.secondary'
                  paragraph
                >
                  - Team Hot Kicks
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Landing;
