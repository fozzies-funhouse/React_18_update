export const style = {
  image: { objectFit: 'contained', height: '150px', width: '250px' },
  select: {
    width: '150px',
    height: '30px',
    borderRadius: '5px',
    marginTop: 15,
  },
  button: {
    closeButton: {
      position: 'absolute',
      right: '20px',
      padding: 0,
      border: 'none',
      background: 'none',
      backgroundColor: 'transparent',
      zIndex: 2,
    },
  },
};

export const cartTotal = (cart) => {
  if (cart.cart_details === undefined) return 0;

  return cart.cart_details.reduce((acc, item) => {
    const total =
      parseFloat(item.product_quantity) * parseFloat(item.product.price);
    acc += total;
    return acc;
  }, 0);
};

export const selectOptions = [...Array(10)];
