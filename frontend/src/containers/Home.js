import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMovies } from '../store/actions/MovieActions';
import { allMovies, moviePages } from '../store/selectors/MovieSelectors';
import MovieCard from '../component/MovieCard';

import Container from 'react-bootstrap/Container';
import MoviePagination from '../component/MoviePagination';
import Form from 'react-bootstrap/Form';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector(allMovies);
  const pages = useSelector(moviePages);

  const [queryParams, setQueryParams] = useState({ active: 1, title: '' });
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    dispatch(getMovies(queryParams));
  }, []);

  const renderMovies = () => {
    return movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
  };

  const handleChangeActive = (page) => {
    dispatch(getMovies({ ...queryParams, active: page }));
    setQueryParams((prev) => ({ ...prev, active: page }));
  };

  const handleChangeTitle = (event) => {
    const params = { active: 1, title: event.target.value };
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        dispatch(getMovies(params));
      }, 750),
    );
    setQueryParams(params);
  };

  return (
    <div>
      <Container className="offset-4 col-4 mb-4 mt-4">
        <Form.Control
          className="shadow-none"
          type="text"
          placeholder="Search by movie title"
          value={queryParams.title}
          onChange={handleChangeTitle}
        />
      </Container>
      <Container className="row" style={{ marginLeft: '55px' }}>
        {renderMovies()}
      </Container>
      <Container className="offset-5 col-2">
        <MoviePagination
          active={queryParams.active}
          pages={Math.ceil(pages / 10)}
          onClick={handleChangeActive}
        />
      </Container>
    </div>
  );
};

export default Home;
