import React from 'react';
import { NavLink } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { MOVIES } from '../routes/routes';

import { IoEyeSharp } from 'react-icons/io5';
import { GrLike, GrDislike } from 'react-icons/gr';

const MovieCard = ({ movie, onLike, onDislike }) => {
  return (
    <Card className="mb-3" style={{ maxWidth: '20%' }}>
      <NavLink className="link-dark" to={`${MOVIES}/${movie.id}`}>
        <Card.Img variant="top" src={movie.cover} />
      </NavLink>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title> <Card.Text>{movie.description}</Card.Text>
      </Card.Body>
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
