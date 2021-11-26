import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { getRelated } from '../store/actions/MovieActions';
import { relatedMovies } from '../store/selectors/MovieSelectors';

import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import { MOVIES } from '../routes/routes';

const RelatedMovies = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const related = useSelector(relatedMovies);

  useEffect(() => {
    dispatch(getRelated(params.id));
  }, [params.id]);

  const renderPopular = () => {
    return related.length > 0 ? (
      related.map((movie, index) => (
        <NavLink className="link-light" to={`${MOVIES}/${movie.id}`}>
          <ListGroupItem className="text-muted">
            <h6>
              {index + 1}. {movie.title}
            </h6>
          </ListGroupItem>
        </NavLink>
      ))
    ) : (
      <small className="text-muted">No related movies</small>
    );
  };

  return (
    <div>
      <h5 className="mt-3"> Related movies </h5>
      <ListGroup>{renderPopular()}</ListGroup>
    </div>
  );
};

export default RelatedMovies;
