import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from '../../store/actions/AuthActions';
import { selectLoginError } from '../../store/selectors/AuthSelectors';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useFormik } from 'formik';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required.';
  } else if (!values.email.match('([a-zA-Z]+[0-9.]?){3,255}@[.a-z]{2,10}')) {
    errors.email = 'Invalid email address.';
  }
  if (!values.password) {
    errors.password = 'Required.';
  }

  return errors;
};

const Login = () => {
  const dispatch = useDispatch();
  const loginError = useSelector(selectLoginError);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => dispatch(logIn(values)),
  });

  return (
    <Container>
      <h2 className="mb-4 mt-5">Log in to see movies</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="col-4 offset-4 mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            id="email"
            name="email"
            type="text"
            placeholder="Enter email address"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <p className="form-text text-danger mt-2">{formik.errors.email}</p>
          )}
        </Form.Group>
        <Form.Group className="col-4 offset-4 mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <p className="form-text text-danger mt-2">{formik.errors.password}</p>
          )}
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
