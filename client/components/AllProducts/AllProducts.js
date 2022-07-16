import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';

import { fetchProducts } from '../../store/products';
import Filter from './Filter';
import ProductCard from './ProductCard';
import './AllProducts.css';

const AllProducts = (props) => {
  const [filter, setFilter] = useState('All');
  const [productsArr, setProductsArr] = useState([]);
  //Framer motion piece of state
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

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

    // Bring cards up again
    setAnimateCard([{ y: 0, opacity: 1 }]);
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
          direction='row'
          justifyContent='space-evenly'
          alignItems='center'
          style={{ padding: 20 }}
        >
          {tagsArr.map((tag, idx) => (
            <Grid
              item
              xs={4}
              md={1.8}
              key={idx}
              className='card-item'
              onClick={() => {
                // Drop cards down
                setAnimateCard([{ y: 100, opacity: 0 }]);

                // We need a second for the animation to take place
                setTimeout(() => {
                  setFilter(tag);
                }, 1000);
              }}
            >
              <Filter tag={tag} value={tag} />
            </Grid>
          ))}
        </Grid>

        {/* Product Card */}
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          style={{ marginBottom: 60 }} //Footer is overlapping this fixes it.
        >
          {productsArr.length > 0 ? (
            productsArr.map((product) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={product.id}
                className='card-item'
                component={motion.div} // Framer motion component
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut',
                  delayChildren: 0.2,
                }}
                animate={animateCard}
              >
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
