import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

const SignUpForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <Container>
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
        Sign Up
      </h1>
      <hr></hr>
      <Container>
        <CardGroup>
          <Col className='d-flex'>
            <Card
              className='flex-fill'
              style={{
                width: '40rem',
                height: '30rem',
                color: '#4e4c4b',
                border: 'none',
                textAlign: 'center',
              }}
            >
              <Card.Title>Contact Information</Card.Title>
              <Form onSubmit={handleSubmit} name={name}>
                <Form.Group>
                  <Col style={{ width: '16rem' }}>
                    <Form.Label htmlFor='firstname'>First Name</Form.Label>
                    <Form.Control name='firstname' type='text'></Form.Control>
                  </Col>
                  <Col style={{ width: '16rem' }}>
                    <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                    <Form.Control name='lastname' type='text'></Form.Control>
                  </Col>
                  <Row>
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control name='email' type='text'></Form.Control>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control name='password' type='password'></Form.Control>
                    <Button
                      variant='secondary'
                      className='mt-auto'
                      style={{
                        width: '40rem',
                        position: 'absolute',
                        bottom: 0,
                      }}
                      type='submit'
                    >
                      {displayName}
                    </Button>
                  </Row>
                  {error && error.response && (
                    <div> {error.response.data} </div>
                  )}
                </Form.Group>
              </Form>
            </Card>
          </Col>
        </CardGroup>
      </Container>
    </Container>
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
