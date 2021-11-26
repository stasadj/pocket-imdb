import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { getPopular } from '../store/actions/MovieActions';
import { popularMovies } from '../store/selectors/MovieSelectors';

import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import { MOVIES } from '../routes/routes';

const PopularMovies = () => {
  const dispatch = useDispatch();
  const popular = useSelector(popularMovies);

  useEffect(() => {
    dispatch(getPopular());
  }, []);

  const renderPopular = () => {
    return popular.map((movie, index) => (
      <NavLink className="link-light" to={`${MOVIES}/${movie.id}`}>
        <ListGroupItem className="text-muted" style={{ textAlign: 'left' }}>
          <h6>
            {index + 1}. {movie.title}
          </h6>
        </ListGroupItem>
      </NavLink>
    ));
  };

  return (
    <div style={{ marginTop: '90px' }}>
      <h5 className="mt-2"> Popular movies </h5>
      <ListGroup>{renderPopular()}</ListGroup>
    </div>
  );
};

export default PopularMovies;
