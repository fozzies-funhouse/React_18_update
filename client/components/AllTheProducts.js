import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from './AllProducts';
import ProductOrdering from './ProductOrdering';

import {
  Container,
  Card,
  Typography,
  Grid,
  CardMedia,
  CardHeader,
} from '@mui/material';

export default function AllTheProducts(props) {
  const { products } = useContext(ProductContext);
  const [sortedProducts, setSortedProducts] = useState([]);

  const finalProds = sortedProducts.length > 0 ? sortedProducts : products;
  return (
    <Container>
      <ProductOrdering
        setSortedProducts={setSortedProducts}
        products={products}
      />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {finalProds.map((product) => (
          <Grid item xs={6} key={product.id}>
            <Card
              className="mb-2"
              style={{
                width: '30rem',
                height: '40rem',
                color: '#4e4c4b',
              }}
            >
              <Link to={`/products/${product.id}`}>
                <CardMedia
                  variant="top"
                  component="img"
                  image={product.image_url}
                />
              </Link>
              <Link
                style={{ textDecoration: 'none', color: '#4e4c4b' }}
                to={`/products/${product.id}`}
              >
                <CardHeader title={product.name}></CardHeader>
                <Typography variant="h5">${product.price}</Typography>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
