import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../../store/actions/AuthActions';
import { selectRegisterError } from '../../store/selectors/AuthSelectors';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const dispatch = useDispatch();
  const registerError = useSelector(selectRegisterError);

  const handleInputChange = (field) => (event) =>
    setRegisterData({
      ...registerData,
      [field]: event.target.value,
    });

  const submit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      dispatch(register(registerData));
    }
  };

  const validateForm = () => {
    document.getElementById('small-email').style.visibility = 'hidden';
    document.getElementById('small-password').style.visibility = 'hidden';
    document.getElementById('small-name').style.visibility = 'hidden';

    let valid = true;

    if (!registerData.email.match('([a-zA-Z]+[0-9.]?){3,255}@[.a-z]{2,10}')) {
      document.getElementById('small-email').style.visibility = 'visible';
      valid = false;
    }

    if (!registerData.password.match('[0-9A-Za-z]{4,}')) {
      document.getElementById('small-password').style.visibility = 'visible';
      valid = false;
    }

    if (!registerData.name.match('[A-Z][a-z]{2,}')) {
      document.getElementById('small-name').style.visibility = 'visible';
      valid = false;
    }

    return valid;
  };

  return (
    <Container>
      <h2 className="mb-4 mt-5">Register to see movies</h2>
      <Form onSubmit={submit}>
        <Form.Group className="col-4 offset-4 mb-2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email address"
            value={registerData.email}
            onChange={handleInputChange('email')}
          />
          <small
            id="small-email"
            className="form-text text-danger"
            style={{ visibility: 'hidden' }}
          >
            Invalid email address.
          </small>
        </Form.Group>
        <Form.Group className="col-4 offset-4 mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={registerData.password}
            onChange={handleInputChange('password')}
          />
          <small
            id="small-password"
            className="form-text text-danger"
            style={{ visibility: 'hidden' }}
          >
            Invalid password.
          </small>
        </Form.Group>
        <Form.Group className="col-4 offset-4 mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={registerData.name}
            onChange={handleInputChange('name')}
          />
          <small id="small-name" className="form-text text-danger" style={{ visibility: 'hidden' }}>
            Invalid name.
          </small>
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
        {registerError && (
          <p className="form-text text-danger mt-2">There was an error while trying to register.</p>
        )}
      </Form>
    </Container>
  );
};

export default Register;
