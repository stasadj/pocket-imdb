import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from '../../store/actions/AuthActions';
import { selectLoginError } from '../../store/selectors/AuthSelectors';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [invalidEmail, setInvalidEmail] = useState(false);
  const dispatch = useDispatch();
  const loginError = useSelector(selectLoginError);

  const handleInputChange = (field) => (event) =>
    setLoginData({
      ...loginData,
      [field]: event.target.value,
    });

  const submit = (event) => {
    event.preventDefault();
    setInvalidEmail(false);

    if (!loginData.email.match('([a-zA-Z]+[0-9.]?){3,255}@[.a-z]{2,10}')) {
      setInvalidEmail(true);
      return;
    }

    dispatch(logIn(loginData));
  };

  return (
    <Container>
      <h2 className="mb-4 mt-5">Log in to see the movies!</h2>
      <Form onSubmit={submit}>
        <Form.Group className="col-4 offset-4 mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email address"
            value={loginData.email}
            onChange={handleInputChange('email')}
          />
          {invalidEmail && <p className="form-text text-danger mt-2">Invalid email address.</p>}
        </Form.Group>
        <Form.Group className="col-4 offset-4 mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={loginData.password}
            onChange={handleInputChange('password')}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Log in
        </Button>
        {loginError && <p className="form-text text-danger mt-2">Invalid email or password.</p>}
      </Form>
    </Container>
  );
};

export default Login;
