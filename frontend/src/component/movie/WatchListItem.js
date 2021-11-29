import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import { MOVIES } from '../../routes/routes';

import { IoEyeSharp } from 'react-icons/io5';
import { FaPlus, FaMinus } from 'react-icons/fa';

const WatchListItem = ({ movie }) => {
  const location = useLocation();
  return (
    <Card className="mb-3" style={{ maxWidth: '20%' }}>
      <NavLink className="link-dark" to={`${MOVIES}/${movie.id}`}>
        <Card.Img variant="top" src={movie.cover} />
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
      {movie.watched_by_user ? (
        <Button variant="warning" className="shadow-none mb-2" title="Remove from watch list">
          <FaMinus /> wathced
        </Button>
      ) : (
        <Button variant="outline-warning" className="shadow-none mb-2" title="Add to watch list">
          <FaPlus /> watched
        </Button>
      )}
      {movie.in_users_watchlist ? (
        <Button variant="danger" className="shadow-none mb-2" title="Remove from watch list">
          <FaMinus /> watch list
        </Button>
      ) : (
        <Button variant="primary" className="shadow-none mb-2" title="Add to watch list">
          <FaPlus /> watch list
        </Button>
      )}
      <small className="text-muted mt-2">
        {movie.views} <IoEyeSharp />
      </small>
      <Card.Footer style={{ border: '1px solid lightgrey' }}>
        <small className="text-muted">{movie.genre}</small>
      </Card.Footer>
    </Card>
  );
};

export default WatchListItem;
