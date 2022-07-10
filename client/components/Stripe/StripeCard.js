import React, { useMemo } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from "axios";
import useResponsiveFontSize from './useResponsiveFontSize';
import { exportTotal as importTotal } from '../Checkout';

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const StripeCard = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    console.log("imported total", importTotal)

    const { paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    console.log('[PaymentMethod]', paymentMethod);

    try {
      const { id } = paymentMethod;
      const response = await axios.post(
        "https://samori-stripe-microservice.web.app/api/charge",
        {
          amount: importTotal,
          id: id
        }
      );

      console.log("response data", response.data.success);
      if (response.data.success) {
        console.log("payment successful!");
      }
    } catch (error) {
      console.log("payment error", error);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        style={{
          border: 'none',
          width: '100%',
        }}
      >
        Card details
        <CardElement
          options={options}
          onReady={() => {
            console.log('CardElement [ready]');
          }}
          onChange={(event) => {
            console.log('CardElement [change]', event);
          }}
          onBlur={() => {
            console.log('CardElement [blur]');
          }}
          onFocus={() => {
            console.log('CardElement [focus]');
          }}
        />
      </label>
      <button
        type="submit"
        disabled={!stripe}
        style={{
          width: '100%',
        }}
      >
        Pay
      </button>
    </form>
  );
};

export default StripeCard;
