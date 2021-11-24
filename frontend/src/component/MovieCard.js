import React from 'react';

import Card from 'react-bootstrap/Card';

const MovieCard = ({ movie }) => {
  return (
    <Card className="mb-3" style={{ maxWidth: '20%' }}>
      <Card.Img variant="top" src={movie.cover} />
      <Card.Body>
        <Card.Title>{movie.title} </Card.Title>
        <Card.Text>{movie.description}</Card.Text>
      </Card.Body>
      <Card.Footer style={{ color: 'white' }}>
        <small className="text-muted">{movie.genre}</small>
      </Card.Footer>
    </Card>
  );
};

export default MovieCard;
