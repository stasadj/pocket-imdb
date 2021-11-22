import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from '../../store/actions/AuthActions';
import { selectLoginError } from '../../store/selectors/AuthSelectors';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().max(255).email('Invalid email address').required('Required'),
  password: Yup.string().min(5, 'Must be 5 characters at least').required('Required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const loginError = useSelector(selectLoginError);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
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
          {formik.touched.email && formik.errors.email && (
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
          {formik.touched.password && formik.errors.password && (
            <p className="form-text text-danger mt-2">{formik.errors.password}</p>
          )}
        </Form.Group>
        <Button variant="success" type="submit">
          Log in
        </Button>
        {loginError && (
          <p className="form-text text-danger mt-2">
            Use not found. Check your credentials and try again
          </p>
        )}
      </Form>
    </Container>
  );
};

export default Login;
