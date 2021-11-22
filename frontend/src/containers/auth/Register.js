import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../../store/actions/AuthActions';
import { selectRegisterError } from '../../store/selectors/AuthSelectors';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .max(255, 'Must be 255 characters or less')
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Must be 5 characters at least')
    .max(30, 'Must be 30 characters or less')
    .required('Required'),
  name: Yup.string()
    .min(2, 'Must be 2 characters at least')
    .max(30, 'Must be 30 characters or less')
    .required('Required'),
});

const Register = () => {
  const dispatch = useDispatch();
  const registerError = useSelector(selectRegisterError);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => dispatch(register(values)),
  });

  return (
    <Container>
      <h2 className="mb-4 mt-5">Register to see movies</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="col-4 offset-4 mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            id="email"
            name="email"
            type="text"
            placeholder="Enter your email address"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <small className="form-text text-danger">{formik.errors.email}</small>
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
            <small className="form-text text-danger">{formik.errors.password}</small>
          )}
        </Form.Group>
        <Form.Group className="col-4 offset-4 mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <small className="form-text text-danger">{formik.errors.name}</small>
          )}
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
        {registerError && <p className="form-text text-danger mt-2">User already exists</p>}
      </Form>
    </Container>
  );
};

export default Register;
