import React from 'react';
import { NavLink } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

import { MOVIES } from '../routes/routes';

const MovieCard = ({ movie }) => {
  return (
    <Card className="mb-3" style={{ maxWidth: '20%' }}>
      <NavLink className="link-dark" to={`${MOVIES}/${movie.id}`}>
        <Card.Img variant="top" src={movie.cover} />
      </NavLink>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title> <Card.Text>{movie.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{movie.genre}</small>
      </Card.Footer>
    </Card>
  );
};

export default MovieCard;
