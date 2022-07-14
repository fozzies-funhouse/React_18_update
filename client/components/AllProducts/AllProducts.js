import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProducts } from '../../store/products';
import Filter from './Filter';
import ProductCard from './ProductCard';
import { Container, Grid } from '@mui/material';

// let productsArr = [];

const AllProducts = (props) => {
  const [filter, setFilter] = useState('All');
  const [productsArr, setProductsArr] = useState([]);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    setFilter('All');
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setProductsArr(products);
    } else {
      const filteredArr = products.filter(
        (product) => product.tags[0].category === filter
      );
      setProductsArr(filteredArr);
    }

    console.log(productsArr);
  }, [filter, products]);

  let tagsArr = ['All']; // Array of tags including 'All'
  function tagsArray() {
    for (let i = 0; i < products.length; ++i) {
      let curVal = products[i].tags[0].category;
      if (!tagsArr.includes(curVal)) tagsArr.push(curVal);
    }
  }
  tagsArray();

  return (
    <>
      <Container>
        {/* Filters */}
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          style={{ padding: 20 }}
        >
          {tagsArr.map((tag, idx) => (
            <Grid
              item
              xs={4}
              md={1.8}
              key={idx}
              onClick={() => {
                setFilter(tag);
              }}
            >
              <Filter tag={tag} value={tag} />
            </Grid>
          ))}
        </Grid>

        {/* Product Card */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ marginBottom: 60 }} //Footer is overlapping this fixes it.
        >
          {productsArr.length > 0 ? (
            productsArr.map((product) => (
              <Grid item xs={12} md={6} lg={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <h3>Uh Oh, No Shoes!</h3>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default AllProducts;
