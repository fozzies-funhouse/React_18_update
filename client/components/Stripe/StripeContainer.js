import React, { useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './AppStyle.css';

import { BrowserRouter } from 'react-router-dom';

import StripeCard from './StripeCard';

const stripePromise = loadStripe(
  'pk_test_51LDBGaHtk0V3Nu7lBzBtudF4WV08WWlvokTHwPDPJ6r2mXjVX5BuOKh1Ht33ma0NwDlKuoNIIy8VN2Y9YteDU0BC00XOrE3ztp'
);

export default function StripeContainer(props) {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <div>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <StripeCard />
        </Elements>
      </BrowserRouter>
    </div>
  );
}
