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

/**
 * COMPONENT
 */
const AuthForm = (props) => {
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
        Login
      </h1>
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
              textAlign: 'center'
            }}>
              <Form onSubmit={handleSubmit} name={name}>
                <Form.Group>
                  <Col style={{ width: '16rem' }}>
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control name='email' type='text'></Form.Control>
                  </Col>
                  <Col style={{ width: '16rem' }}>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control name='password' type='password'></Form.Control>
                  </Col>
                  <Row>
                    <Button
                      variant='secondary'
                      className='mt-auto'
                      style={{
                        width: '38rem',
                        position: 'absolute',
                      }}
                      type='submit'
                    >
                      {displayName}
                    </Button>
                    {error && error.response && (
                      <div> {error.response.data} </div>
                    )}
                  </Row>
                </Form.Group>
              </Form>
            </Card>
          </Col>
        </CardGroup>
      </Container>
    </Container>
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
