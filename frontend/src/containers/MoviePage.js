import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getMovie } from '../store/actions/MovieActions';
import { currentMovie } from '../store/selectors/MovieSelectors';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import { GoCommentDiscussion } from 'react-icons/go';
import { FcLike, FcDislike } from 'react-icons/fc';

const MoviePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const movie = useSelector(currentMovie);

  useEffect(() => {
    dispatch(getMovie(params.id));
  }, []);
  return (
    <Container className="offset-2 col-11" style={{ marginTop: '90px' }}>
      <Card style={{ maxWidth: '70%' }}>
        <div style={{ display: 'flex', flex: '1 1 auto' }}>
          <Card.Img src={movie.cover} style={{ maxWidth: '50%' }} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{movie.genre}</Card.Subtitle>
            <Card.Text>{movie.description}</Card.Text>
            <Card.Title>
              <small>123</small>
              <FcLike />
              <FcDislike />
              <small>6</small>
            </Card.Title>
            <Card.Footer className="mt-5" style={{ border: '1px solid lightgrey' }}>
              <small className="text-muted">
                Comments <GoCommentDiscussion />
              </small>
            </Card.Footer>
            <Card>
              <ListGroup className="list-group-flush" style={{ textAlign: 'left' }}>
                <ListGroupItem>
                  Cras justo odio
                  <span style={{ marginLeft: '290px' }}>
                    <small>17</small>
                    <FcLike />
                    <FcDislike />
                    <small>3</small>
                  </span>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Card.Body>
        </div>
      </Card>
    </Container>
  );
};

export default MoviePage;
