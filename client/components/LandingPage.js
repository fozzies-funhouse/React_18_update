import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/products';
import {
  Container,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Grid,
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
      <Landing3D />
      <Grid item xs={12} container>
        <Grid item xs={10} spacing={4} container>
          {products.length === 0 || product1 === undefined
            ? 'Loading'
            : products.map((product, idx) =>
                idx > 1 ? (
                  <Grid item key={product.id} xs={8} sx={{ ml: 7, mb: 5 }}>
                    < ProductCard key={product.id} product={product} />
                  </Grid>
                ) : (
                  <Grid item key={product.id} xs={5}>
                    < ProductCard key={product.id} product={product} />
                  </Grid>
                )
              )}
        </Grid>
        <Grid item xs={12} sx={{ alignSelf: 'center' }}>
          <Card sx={{ textAlign: 'center' }} elevation={5}>
            <CardContent>
              <CardHeader title='About the Team' />
              <Typography
                sx={{ fontSize: 12 }}
                color='text.secondary'
                paragraph
              >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Commodi officiis ipsa, culpa non quos nulla, nisi sequi distinctio
                minima vitae in quod adipisci, rem dolore?
                <br />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Commodi officiis ipsa, culpa non quos nulla, nisi sequi distinctio
                minima vitae in quod adipisci, rem dolore?
                <br />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Commodi officiis ipsa, culpa non quos nulla, nisi sequi distinctio
                minima vitae in quod adipisci, rem dolore?
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={3}>
          <Avatar
            alt='Allah Jackson'
            src='/allah.png'
            sx={{ height: 100, width: 100, mt: 5, ml: 3 }}
          />
          <Typography variant='bio' color='text.secondary' paragraph>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ullam
            earum esse numquam?
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ mb: 10 }}>
          <Avatar
            alt='Allah Jackson'
            src='/allah.png'
            sx={{ height: 100, width: 100, mt: 5, ml: 3 }}
          />
          <Typography variant='bio' color='text.secondary' paragraph>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ullam
            earum esse numquam?
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Avatar
            alt='Allah Jackson'
            src='/allah.png'
            sx={{ height: 100, width: 100, mt: 5, ml: 3 }}
          />
          <Typography variant='bio' color='text.secondary' paragraph>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ullam
            earum esse numquam?
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Avatar
            alt='Allah Jackson'
            src='/allah.png'
            sx={{ height: 100, width: 100, mt: 5, ml: 3 }}
          />
          <Typography variant='bio' color='text.secondary' paragraph>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ullam
            earum esse numquam?
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Landing;
