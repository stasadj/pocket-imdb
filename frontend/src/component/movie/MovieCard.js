import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addRemoveWatchList } from '../../store/actions/MovieActions';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import { MOVIES } from '../../routes/routes';

import { IoEyeSharp } from 'react-icons/io5';
import { GrLike, GrDislike } from 'react-icons/gr';
import { FaPlus, FaMinus } from 'react-icons/fa';

import config from '../../config';

const MovieCard = ({ movie, onLike, onDislike }) => {
  const dispatch = useDispatch();

  return (
    <Card className="mb-3" style={{ maxWidth: '20%' }}>
      <NavLink className="link-dark" to={`${MOVIES}/${movie.id}`}>
        <Card.Img variant="top" src={`${config.API_BASE_URL}${movie.thumbnail}`} />
      </NavLink>
      <Card.Body>
        <Card.Title>
          {movie.title}
          <h6>
            {movie.watched_by_user && (
              <Badge pill bg="warning">
                Watched
              </Badge>
            )}
          </h6>
        </Card.Title>
        <Card.Text>{movie.description}</Card.Text>
      </Card.Body>
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
      <small className="text-muted">
        {movie.likes}
        <Button
          variant={movie.liked_by_user ? 'success' : 'outline-success'}
          className="mx-1"
          onClick={() => onLike(movie.id)}
        >
          <GrLike />
        </Button>
        <Button
          variant={movie.disliked_by_user ? 'danger' : 'outline-danger'}
          className="mx-1"
          onClick={() => onDislike(movie.id)}
        >
          <GrDislike />
        </Button>
        {movie.dislikes}
      </small>
      <small className="text-muted mt-2">
        {movie.views} <IoEyeSharp />
      </small>
      <Card.Footer style={{ border: '1px solid lightgrey' }}>
        <small className="text-muted">{movie.genre}</small>
      </Card.Footer>
    </Card>
  );
};

export default MovieCard;
