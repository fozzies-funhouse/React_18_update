import React, { useState, useMemo } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import useResponsiveFontSize from './useResponsiveFontSize';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const StripeCard = (props) => {
  const { stripeProps } = props;
  const { checkout, cartTotal, userID, email } = stripeProps;
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [confirmationNumber, setConfirmationNumber] = useState('');

  function toggleModal() {
    let newValue = !modalVisible;
    setModalVisible(newValue);
  }

  function redirectToHome() {
    toggleModal();

    const logo = document.querySelector(
      '#app > div > header > div > div > button:nth-child(1) > a'
    );
    logo.click();
  }

  const spinnerDisplay = paymentLoading ? 'block' : 'none';

  // styles object defined within the fucntion
  // because it needs access to "spinnerDisplay" variable
  const styles = {
    box: {
      backgroundColor: 'white',
      alignItems: 'center',
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    modal: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      position: 'absolute',
      height: 400,
      width: 400,
      top: '33%',
      left: '33%',
    },
    modalHeader: {
      color: '#808080',
      marginBottom: '2rem',
      marginTop: '2rem',
      textAlign: 'center',
    },
    payButton: {
      width: '100%',
    },
    spinner: {
      display: spinnerDisplay,
      alignSelf: 'center',
    },
    stripeForm: {
      marginBottom: '2rem',
      marginTop: '2rem',
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const { paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    try {
      const { id } = paymentMethod;
      const response = await axios.post(
        'https://samori-stripe-microservice.web.app/api/charge',
        {
          amount: cartTotal * 100,
          id: id,
        }
      );

      if (response.data.success) {
        console.log(response.data.message);
        console.log('DATA', response.data);

        setConfirmationNumber(response.data.confirmationNumber || 'WE FAILED');

        checkout(cartTotal, userID, email);
        toggleModal();
      }
      setPaymentLoading(false);
    } catch (error) {
      console.log('payment error', error);
      setPaymentLoading(false);
      alert('An error occured processing your payment.');
    }
  };

  return (
    <>
      <form style={styles.stripeForm} onSubmit={handleSubmit}>
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
        <ButtonBase
          style={styles.payButton}
          type="submit"
          disabled={!stripe || cartTotal === 0}
        >
          Pay
          <CircularProgress style={styles.spinner} />
        </ButtonBase>
      </form>
      <Modal
        style={styles.modal}
        open={modalVisible}
        onClose={(_, reason) => {
          if (reason === 'backdropClick') {
            redirectToHome();
          }
        }}
      >
        <Box style={styles.box}>
          <Typography variant="h5" style={styles.modalHeader}>
            Order In {'\u2705'}
          </Typography>
          <Typography variant="div" style={styles.modalHeader}>
            Confirmation Number:
            <br></br>
            {confirmationNumber}
          </Typography>
          <ButtonBase onClick={redirectToHome} style={styles.payButton}>
            KEEP SHOPPING
          </ButtonBase>
        </Box>
      </Modal>
    </>
  );
};

export default StripeCard;

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
