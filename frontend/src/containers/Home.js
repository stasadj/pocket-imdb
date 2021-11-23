import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMovies } from '../store/actions/MovieActions';
import { allMovies } from '../store/selectors/MovieSelectors';
import MovieCard from '../component/MovieCard';

import Container from 'react-bootstrap/Container';
import MoviePagination from '../component/MoviePagination';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector(allMovies);

  const [active, setActive] = useState(0);

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  const renderMovies = () => {
    const moviesPage = movies.filter(
      (movie, index) => index >= active * 10 && index < active * 10 + 10,
    );
    return moviesPage.map((movie) => <MovieCard key={movie.id} movie={movie} />);
  };

  const handleChangeActive = (page) => {
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
          pages={Math.ceil(movies.length / 10)}
          onClick={handleChangeActive}
        />
      </Container>
    </div>
  );
};

export default Home;
