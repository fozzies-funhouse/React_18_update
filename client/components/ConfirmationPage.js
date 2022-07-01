import React from 'react';

const Confirmation = (props) => {
  return (
    <div>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#808080',
          marginBottom: '2rem',
          marginTop: '2rem',
        }}
      >
        Purchase Complete!
      </h1>
      <h3 style={{ color: '#808080', marginTop: '2rem', textAlign: 'center' }}>
        Thank you for shopping with us!
      </h3>
    </div>
  );
};

export default Confirmation;
