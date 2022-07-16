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

const SignUpForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ margin: 4}}>
      <button
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          color: '#e2725b',
          padding: 0,
          margin: 0,
        }}
        onClick={handleOpen}
      >
        Signup
      </button>
      <Dialog open={open} onClose={handleClose}>
        <Container>
          <DialogTitle variant='body2'>Create Hot Kicks account</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit} name={name}>
              <FormGroup row>
                <FormControl>
                  <TextField
                    variant='outlined'
                    label='First Name'
                    sx={{ mr: 2 }}
                    type='text'
                    name='firstname'
                  ></TextField>
                </FormControl>
                <FormControl>
                  <TextField
                    variant='outlined'
                    label='Last Name'
                    type='text'
                    name='lastname'
                  ></TextField>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl>
                  <TextField
                    sx={{ mt: 2, mb: 2 }}
                    variant='outlined'
                    label='Email'
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
        </Container>
      </Dialog>
    </div>
  );
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const firstname = evt.target.firstname.value;
      const lastname = evt.target.lastname.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, password, formName, firstname, lastname));
    },
  };
};

export const Signup = connect(mapSignup, mapDispatch)(SignUpForm);
