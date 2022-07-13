import React from 'react';
import { Card, CardContent, Typography, Grid, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
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
                  Ratings: {productStars()} {product.rating}/ 5.0
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Link>
      </Card>
    </>
  );
};

export default ProductCard;
