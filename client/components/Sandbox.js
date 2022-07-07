import React, { useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import '../AppStyle.css';

import { BrowserRouter } from 'react-router-dom';

import ElementDemos from './ElementDemos';
import CardForm from './demos/CardForm';
import FpxBankForm from './demos/FpxBankForm';
import IbanForm from './demos/IbanForm';
import IdealBankForm from './demos/IdealBankForm';
import PaymentRequestForm from './demos/PaymentRequestForm';
import SplitForm from './demos/SplitForm';
import AfterpayClearpayMessage from './demos/AfterpayClearpayMessage';
const demos = [
  {
    path: '/card-element',
    label: 'CardElement',
    component: CardForm,
  },
  {
    path: '/split-card-elements',
    label: 'Split Card Elements',
    component: SplitForm,
  },
  {
    path: '/payment-request-button-element',
    label: 'PaymentRequestButtonElement',
    component: PaymentRequestForm,
  },
  {
    path: '/ideal-bank-element',
    label: 'IdealBankElement',
    component: IdealBankForm,
  },
  {
    path: '/iban-element',
    label: 'IbanElement',
    component: IbanForm,
  },
  {
    path: '/fpx-bank-element',
    label: 'FpxBankElement',
    component: FpxBankForm,
  },
  {
    path: '/afterpay-clearpay-message',
    label: 'AfterpayClearpayMessageElement',
    component: AfterpayClearpayMessage,
  },
];

const stripePromise = loadStripe(
  'pk_test_51LDBGaHtk0V3Nu7lBzBtudF4WV08WWlvokTHwPDPJ6r2mXjVX5BuOKh1Ht33ma0NwDlKuoNIIy8VN2Y9YteDU0BC00XOrE3ztp'
);

export default function Sandbox(props) {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <div>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <ElementDemos demos={demos} />
        </Elements>
      </BrowserRouter>
    </div>
  );
}
