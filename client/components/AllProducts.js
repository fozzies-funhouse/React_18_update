import React, { createContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';

import FilteredProducts from './FilteredProducts';

import {
  Select,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

export const ProductContext = createContext();

function AllProducts(props) {
  const [selectedFilter, setSelectedFilter] = useState('');

  const { getProducts, products, user } = props;

  useEffect(() => {
    getProducts();
  }, []);

  let tagsArr = [];

  function tagsArray() {
    for (let i = 0; i < products.length; ++i) {
      let curVal = products[i].tags[0].category;
      if (!tagsArr.includes(curVal)) tagsArr.push(curVal);
    }
  }
  tagsArray();

  function changeFilter(evt) {
    setSelectedFilter(evt.target.value);
  }
  return (
    <ProductContext.Provider value={{ products }}>
      <div id="all-products">
        <h1
          id="all-products-title"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#808080',
            marginBottom: '2rem',
          }}
        >
          Welcome {user.first_name || 'Guest'}
        </h1>
        <Container>
          <FormControl fullWidth>
            <InputLabel id="filter-select-tag">Filter By Brand</InputLabel>
            <Select size="lg" className="mb-3" onChange={changeFilter}>
              <MenuItem value={''}>All Brands</MenuItem>
              {tagsArr.map((tag, idx) => (
                <MenuItem key={idx} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Container>
        <Container>
          <FilteredProducts filter={selectedFilter} />
        </Container>
      </div>
    </ProductContext.Provider>
  );
}

const mapStateToProps = (state) => ({
  products: state.products,
  user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
