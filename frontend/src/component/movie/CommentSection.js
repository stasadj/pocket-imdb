import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import { FaUserAstronaut } from 'react-icons/fa';

import { getComments, postComment } from '../../store/actions/MovieActions';
import { movieComments } from '../../store/selectors/MovieSelectors';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  content: Yup.string()
    .max(500, 'Must be 500 characters or less')
    .required('You can not post an empty comment'),
});

const CommentSection = () => {
  const dispatch = useDispatch();
  const pathParams = useParams();
  const comments = useSelector(movieComments);

  const [params, setParams] = useState({});

  useEffect(() => {
    const newParams = { id: pathParams.id, limit: 5 };
    dispatch(getComments(newParams));
    setParams(newParams);
  }, [pathParams.id]);

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(postComment({ id: params.id, content: values.content }));
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

  const handleShowMore = () => {
    const newParams = { ...params, limit: params.limit + 5 };
    dispatch(getComments(newParams));
    setParams(newParams);
  };

  return (
    <Card style={{ maxWidth: '100%', marginBottom: '50px', border: '0px' }}>
      <ListGroup
        className="list-group-flush"
        style={{ border: '1px solid lightgrey', textAlign: 'left' }}
      >
        {renderComments()}
      </ListGroup>
      <Button className="shadow-none" variant="secondary" onClick={handleShowMore}>
        Show more
      </Button>
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
        <Button className="shadow-none" variant="success" type="submit">
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
