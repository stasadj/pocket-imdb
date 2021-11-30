import React from 'react';
import { useDispatch } from 'react-redux';

import { createMovie } from '../../store/actions/MovieActions';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
});

const CreateOMDB = () => {
  const dispatch = useDispatch();

  const getFormData = (data, blob) => {
    const file = new File([blob], `${data['Title'].toLowerCase().replace(' ', '-')}`, {
      type: blob.type,
    });
    const formData = new FormData();
    formData.append('title', data['Title']);
    formData.append('description', data['Plot']);
    formData.append('cover', file, file.name);
    formData.append('genre', data['Genre'].split(',')[0].trim());
    return formData;
  };

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetch(`http://www.omdbapi.com/?apikey=5f0252f3&t=${values.title}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data['Error']) {
            fetch(data['Poster'])
              .then((response) => response.blob())
              .then((blob) => {
                dispatch(createMovie(getFormData(data, blob)));
              });
          } else {
            formik.setErrors({ title: 'Movie with given name does not exist' });
          }
        });
    },
  });

  return (
    <Container>
      <h2 className="mb-4 mt-5">Create a movie</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="col-4 offset-4 mb-3">
          <Form.Label>Movie title</Form.Label>
          <Form.Control
            id="title"
            name="title"
            type="text"
            placeholder="Enter movie title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && (
            <small className="form-text text-danger">{formik.errors.title}</small>
          )}
        </Form.Group>
        <Button variant="success" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default CreateOMDB;
