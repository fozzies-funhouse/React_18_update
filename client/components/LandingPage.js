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
      <Typography
        variant='h2'
        component='div'
        sx={{ textAlign: 'center', m: 5, border: 5 }}
      >
        3D Interactive Canvas
      </Typography>
      <Grid item xs={12} container>
        <Grid item xs={6} spacing={3} container>
          {products.length === 0 || product1 === undefined
            ? 'Loading'
            : products.map((product, idx) =>
                idx > 1 ? (
                  <Grid item key={product.id} xs={8} sx={{ ml: 7, mb: 5 }}>
                    <Card>
                      <CardMedia
                        component='img'
                        image={product.image_url}
                        height={300}
                        width={300}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          sx={{ fontSize: 16 }}
                          width={150}
                          color='text.secondary'
                        >
                          {product.name}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          ${product.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ) : (
                  <Grid item key={product.id} xs={5}>
                    <Card>
                      <CardMedia
                        component='img'
                        image={product.image_url}
                        height={300}
                        width={300}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          sx={{ fontSize: 16 }}
                          width={150}
                          color='text.secondary'
                        >
                          {product.name}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          ${product.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              )}
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <CardHeader title='About the product' />
              <Typography
                sx={{ fontSize: 12 }}
                color='text.secondary'
                paragraph
              >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Commodi
                <br />
                officiis ipsa, culpa non quos nulla, nisi sequi distinctio
                minima
                <br />
                vitae in quod adipisci, rem dolore?
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
