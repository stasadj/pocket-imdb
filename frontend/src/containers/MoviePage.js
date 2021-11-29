import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  incrementViews,
  likeMovie,
  dislikeMovie,
  addRemoveWatchList,
} from '../store/actions/MovieActions';
import { currentMovie } from '../store/selectors/MovieSelectors';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import { GoCommentDiscussion } from 'react-icons/go';
import { IoEyeSharp } from 'react-icons/io5';
import { GrLike, GrDislike } from 'react-icons/gr';
import { FaPlus, FaMinus } from 'react-icons/fa';

import CommentSection from '../component/movie/CommentSection';
import RelatedMovies from '../component/movie/RelatedMovies';

const MoviePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const movie = useSelector(currentMovie);

  useEffect(() => {
    dispatch(incrementViews(params.id));
  }, [params.id]);

  return (
    <Row className="offset-1">
      <Col md={8} style={{ border: '1px solid lightgrey' }}>
        <Card style={{ maxWidth: '100%', border: '0px' }}>
          <div style={{ display: 'flex', flex: '1 1 auto' }}>
            <Card.Img src={movie.cover} style={{ maxWidth: '50%' }} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {movie.genre}
                <h6>
                  {movie.watched_by_user && (
                    <Badge pill bg="warning">
                      Watched
                    </Badge>
                  )}
                </h6>
              </Card.Subtitle>
              <Card.Text>{movie.description}</Card.Text>
              {movie.in_users_watchlist ? (
                <Button
                  variant="danger"
                  className="shadow-none mb-2"
                  title="Remove from watch list"
                  onClick={() => dispatch(addRemoveWatchList(movie.id))}
                >
                  <FaMinus /> watch list
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="shadow-none mb-2"
                  title="Add to watch list"
                  onClick={() => dispatch(addRemoveWatchList(movie.id))}
                >
                  <FaPlus /> watch list
                </Button>
              )}
              <br />
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
          <Card.Footer
            style={{ borderRight: '1px solid lightgrey', borderLeft: '1px solid lightgrey' }}
          >
            <small className="text-muted">
              <b>
                Comments <GoCommentDiscussion />
              </b>
            </small>
          </Card.Footer>
        </Card>
        <CommentSection />
      </Col>
      <Col
        md={3}
        style={{
          borderTop: '1px solid lightgrey',
          borderBottom: '1px solid lightgrey',
          borderRight: '1px solid lightgrey',
        }}
      >
        <RelatedMovies />
      </Col>
    </Row>
  );
};

export default MoviePage;
