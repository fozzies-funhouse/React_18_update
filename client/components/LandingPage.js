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
    <>
      {/* <Tooltip title='Drag to interact' placement='bottom' arrow={true}> */}
      <Grid item xs={12} md={12} lg={12}>
        <Landing3D id={1} />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Landing3D id={2} offset={true} />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Landing3D id={7} />
      </Grid>
      {/* </Tooltip> */}

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
                <CardHeader title='About the Product' />
                <Typography
                  sx={{ fontSize: 12 }}
                  color='text.secondary'
                  paragraph
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi officiis ipsa, culpa non quos nulla, nisi sequi
                  distinctio minima vitae in quod adipisci, rem dolore?
                  <br />
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi officiis ipsa, culpa non quos nulla, nisi sequi
                  distinctio minima vitae in quod adipisci, rem dolore?
                  <br />
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi officiis ipsa, culpa non quos nulla, nisi sequi
                  distinctio minima vitae in quod adipisci, rem dolore?
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        container
        direction='row'
        justifyContent='space-evenly'
        alignItems='center'
        sx={{ mb: 10 }}
      >
        <Grid
          container
          item
          xs={5.8}
          md={3}
          direction='column'
          alignItems='center'
        >
          <Avatar
            alt='Allah Jackson'
            src='/allah.png'
            sx={{ height: 100, width: 100, mt: 5 }}
          />
          <Typography variant='bio' color='text.secondary' paragraph>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ullam
            earum esse numquam?
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={5.8}
          md={3}
          direction='column'
          alignItems='center'
        >
          <Avatar
            alt='Allah Jackson'
            src='/allah.png'
            sx={{ height: 100, width: 100, mt: 5 }}
          />
          <Typography variant='bio' color='text.secondary' paragraph>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ullam
            earum esse numquam?
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={5.8}
          md={3}
          direction='column'
          alignItems='center'
        >
          <Avatar
            alt='Allah Jackson'
            src='/allah.png'
            sx={{ height: 100, width: 100, mt: 5 }}
          />
          <Typography variant='bio' color='text.secondary' paragraph>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ullam
            earum esse numquam?
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={5.8}
          md={3}
          direction='column'
          alignItems='center'
        >
          <Avatar
            alt='Allah Jackson'
            src='/allah.png'
            sx={{ height: 100, width: 100, mt: 5 }}
          />
          <Typography variant='bio' color='text.secondary' paragraph>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ullam
            earum esse numquam?
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Landing;
