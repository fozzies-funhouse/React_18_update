import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Container,
  FormControl,
  FormGroup,
  TextField,
} from '@mui/material';
import { Signup } from './SignUpForm';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none',  fontWeight: 20, height: '45px'}}
        onClick={handleOpen}
      >
        Login
      </button>
      <Dialog open={open} onClose={handleClose}>
        <Container>
          <DialogTitle variant='body2'>Sign in to Hot Kicks</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit} name={name}>
              <FormGroup row>
                <FormControl>
                  <TextField
                    variant='outlined'
                    label='Email'
                    sx={{ mr: 2 }}
                    required={true}
                    type='email'
                    name='email'
                  ></TextField>
                </FormControl>
                <FormControl>
                  <TextField
                    variant='outlined'
                    label='Password'
                    type='password'
                    required={true}
                    name='password'
                  ></TextField>
                </FormControl>
              </FormGroup>
              <Button
                type='submit'
                sx={{ mt: 2, width: '100%' }}
                size='large'
                variant='contained'
                onClick={handleClose}
              >
                {displayName}
              </Button>
              {error && error.response && <div> {error.response.data} </div>}
            </form>
          </DialogContent>
          <div style={{ display: 'flex' }}>
            Don't have an account? <Signup />
          </div>
        </Container>
      </Dialog>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
