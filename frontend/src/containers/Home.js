import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMovies } from '../store/actions/MovieActions';
import { allMovies } from '../store/selectors/MovieSelectors';
import MovieCard from '../component/MovieCard';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector(allMovies);

  useEffect(() => {
    dispatch(getMovies());
  }, [])

  const renderMovies = () => {
    return movies.map(movie => <MovieCard key={movie.id} movie={movie} />);
  };

  return (
    <div>
      <p>Welcome to Pocket IMDb</p>
      <h4>Movies</h4>
      {renderMovies()}
    </div>
  );
}

export default Home;

