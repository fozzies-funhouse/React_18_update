import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function Ordering(props) {
  const setSortedProducts = props.setSortedProducts;
  const products = props.products;

  return (
    <div id='ordering-buttons'>
      {'    '}
      &nbsp;&nbsp;&nbsp;
      <Button
        variant='light'
        className='mb-3'
        onClick={() =>
          setSortedProducts(
            [...products].sort(function (a, b) {
              const nameA = a.name.split(' ').join('').toUpperCase(); // ignore upper and lowercase
              const nameB = b.name.split(' ').join('').toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            })
          )
        }
      >
        A - Z
      </Button>{' '}
      {'    '}
      &nbsp;&nbsp;&nbsp;
      <Button
        className='mb-3'
        variant='light'
        onClick={() =>
          setSortedProducts(
            [...products].sort(function (a, b) {
              const nameA = a.name.split(' ').join('').toUpperCase(); // ignore upper and lowercase
              const nameB = b.name.split(' ').join('').toUpperCase(); // ignore upper and lowercase
              if (nameB < nameA) {
                return -1;
              }
              if (nameB > nameA) {
                return 1;
              }

              // names must be equal
              return 0;
            })
          )
        }
      >
        {' '}
        Z - A
      </Button>{' '}
      {'    '}
      &nbsp;&nbsp;&nbsp;
      <Button
        variant='light'
        className='mb-3'
        onClick={() => setSortedProducts(products)}
      >
        {' '}
        Reset
      </Button>
    </div>
  );
}
