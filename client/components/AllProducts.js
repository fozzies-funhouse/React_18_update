import React, { Component, createContext } from 'react';
import { connect } from 'react-redux';
import products, { fetchProducts } from '../store/products';
import AllTheProducts from './AllTheProducts';
import AllSkis from './Skis';
import AllSnowboards from './Snowboards';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

export const ProductContext = createContext();

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: '',
    };
    this.changeFilter = this.changeFilter.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }

  changeFilter(evt) {
    this.setState({
      selectedFilter: evt.target.value,
    });
  }

  render() {
    const { products } = this.props;
    return (
      <ProductContext.Provider value={{ products }}>
        <div id="all-products">
          <h1
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#808080',
              marginBottom: '2rem',
            }}
          >
            Welcome {this.props.user.first_name || 'Guest'}
          </h1>
          <Container>
            <Form.Select
              size="lg"
              className="mb-3"
              onChange={this.changeFilter}
            >
              <option value="All">All Products</option>
              <option value="Skis">Skis</option>
              <option value="Snowboards">Snowboards</option>
            </Form.Select>
          </Container>
          <Container>
            {this.state.selectedFilter === 'All' ? (
              <AllTheProducts />
            ) : this.state.selectedFilter === 'Skis' ? (
              <AllSkis />
            ) : this.state.selectedFilter === 'Snowboards' ? (
              <AllSnowboards />
            ) : (
              <AllTheProducts />
            )}
          </Container>
        </div>
      </ProductContext.Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
