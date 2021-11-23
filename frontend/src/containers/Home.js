import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMovies } from '../store/actions/MovieActions';
import { allMovies } from '../store/selectors/MovieSelectors';
import MovieCard from '../component/MovieCard';

import Container from 'react-bootstrap/Container';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector(allMovies);

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  const renderMovies = () => {
    return movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
  };

  return (
    <div className="row">
      <Container className="col-8 row" style={{ marginLeft: '60px' }}>
        {renderMovies()}
      </Container>
      <Container className="col-3" style={{ borderLeft: '1px solid lightgrey' }}>
        <h3 className="offset-1 mt-3"> Popular Movies </h3>
      </Container>
    </div>
  );
};

export default Home;
