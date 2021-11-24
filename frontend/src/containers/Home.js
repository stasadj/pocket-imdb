import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMovies } from '../store/actions/MovieActions';
import { allMovies, moviePages } from '../store/selectors/MovieSelectors';
import MovieCard from '../component/MovieCard';

import Container from 'react-bootstrap/Container';
import MoviePagination from '../component/MoviePagination';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector(allMovies);
  const pages = useSelector(moviePages);

  const [active, setActive] = useState(1);

  useEffect(() => {
    dispatch(getMovies(active));
  }, []);

  const renderMovies = () => {
    return movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
  };

  const handleChangeActive = (page) => {
    dispatch(getMovies(page));
    setActive(page);
  };

  return (
    <div>
      <Container className="row" style={{ marginLeft: '55px' }}>
        {renderMovies()}
      </Container>
      <Container className="offset-5 col-4">
        <MoviePagination
          active={active}
          pages={Math.ceil(pages / 10)}
          onClick={handleChangeActive}
        />
      </Container>
    </div>
  );
};

export default Home;
