import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Pagination, PaginationItem } from '@mui/material';

import { fetchProducts } from '../../store/products';
import Filter from './Filter';
import ProductCard from './ProductCard';
import './AllProducts.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import usePagination from './UsePagination';

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
  }, [filter, products]);

  let tagsArr = ['All']; // Array of tags including 'All'
  function tagsArray() {
    for (let i = 0; i < products.length; ++i) {
      let curVal = products[i].tags[0].category;
      if (!tagsArr.includes(curVal)) tagsArr.push(curVal);
    }
  }
  tagsArray();

  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const count = Math.ceil(productsArr.length / PER_PAGE);
  const _DATA = usePagination(productsArr, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Filters */}
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        style={{ padding: 20, marginBottom: 20, marginTop: 15 }}
      >
        {tagsArr.map((tag, idx) => (
          <Grid
            item
            xs={4}
            md={1.8}
            key={idx}
            className="card-item"
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
        spacing={5}
      >
        {_DATA.currentData().length > 0 ? (
          _DATA.currentData().map((product) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={product.id}
              style={{
                marginTop: 30,
              }}
            >
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <h3>Uh Oh, No Shoes!</h3>
        )}
      </Grid>
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        style={{ alignSelf: 'center' }}
        // shape="rounded"
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            size="large"
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Container>
  );
};

export default AllProducts;
