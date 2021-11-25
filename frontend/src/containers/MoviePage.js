import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { incrementViews, likeMovie, dislikeMovie } from '../store/actions/MovieActions';
import { currentMovie } from '../store/selectors/MovieSelectors';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { GoCommentDiscussion } from 'react-icons/go';
import { IoEyeSharp } from 'react-icons/io5';
import { GrLike, GrDislike } from 'react-icons/gr';
import CommentSection from '../component/CommentSection';

const MoviePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const movie = useSelector(currentMovie);

  useEffect(() => {
    dispatch(incrementViews(params.id));
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
            <small className="text-muted">
              {movie.likes}
              <Button
                variant={movie.liked_by_user ? 'success' : 'outline-success'}
                className="mx-1"
                onClick={() => dispatch(likeMovie(movie.id))}
              >
                <GrLike />
              </Button>
              <Button
                variant={movie.disliked_by_user ? 'danger' : 'outline-danger'}
                className="mx-1"
                onClick={() => dispatch(dislikeMovie(movie.id))}
              >
                <GrDislike />
              </Button>
              {movie.dislikes}
            </small>
            <div className="text-muted mt-2">
              {movie.views} <IoEyeSharp />
            </div>
          </Card.Body>
        </div>
        <Card.Footer>
          <small className="text-muted">
            <b>
              Comments <GoCommentDiscussion />
            </b>
          </small>
        </Card.Footer>
      </Card>
      <CommentSection movieId={movie.id} comments={movie.comments} />
    </Container>
  );
};

export default MoviePage;
