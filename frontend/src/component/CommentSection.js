import React from 'react';
import { useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import { FaUserAstronaut } from 'react-icons/fa';

import { postComment } from '../store/actions/MovieActions';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  content: Yup.string()
    .max(500, 'Must be 500 characters or less')
    .required('You can not post an empty comment'),
});

const CommentSection = ({ movieId, comments }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(postComment({ id: movieId, content: values.content }));
      values.content = '';
    },
  });

  const renderComments = () => {
    return comments
      ? comments.map((comment) => (
          <ListGroupItem key={comment.id}>
            <small>
              <FaUserAstronaut size={20} />
              <b>{comment.username}:&nbsp; </b>
            </small>
            <small>{comment.content}</small>
          </ListGroupItem>
        ))
      : [];
  };

  return (
    <Card style={{ maxWidth: '70%', marginBottom: '50px', border: '0px' }}>
      <ListGroup
        className="list-group-flush"
        style={{ border: '1px solid lightgrey', textAlign: 'left' }}
      >
        {renderComments()}
      </ListGroup>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Control
          id="content"
          name="content"
          as="textarea"
          row={2}
          className="shadow-none"
          placeholder="Leave a comment"
          style={{ borderTop: '0px' }}
          value={formik.values.content}
          onChange={formik.handleChange}
        />
        <Button variant="success" type="submit">
          Post
        </Button>

        {formik.touched.content && formik.errors.content && (
          <div className="form-text text-danger mt-2">{formik.errors.content}</div>
        )}
      </Form>
      <Row></Row>
    </Card>
  );
};

export default CommentSection;
