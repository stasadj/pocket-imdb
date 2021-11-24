import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getGenres, getMovies } from '../store/actions/MovieActions';
import { allMovies, movieGenres, moviePages } from '../store/selectors/MovieSelectors';
import MovieCard from '../component/MovieCard';

import Container from 'react-bootstrap/Container';
import MoviePagination from '../component/MoviePagination';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector(allMovies);
  const genres = useSelector(movieGenres);
  const pages = useSelector(moviePages);

  const [queryParams, setQueryParams] = useState({ active: 1, title: '', genre: '' });
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    dispatch(getMovies(queryParams));
    dispatch(getGenres());
  }, []);

  const getOptions = () => {
    const defaultOption = [
      <option key="Any" value="">
        Any
      </option>,
    ];
    return defaultOption.concat(
      genres.map((genre) => {
        return (
          <option key={genre} value={genre}>
            {genre}
          </option>
        );
      }),
    );
  };

  const renderMovies = () => {
    return movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
  };

  const handleChangeActive = (page) => {
    dispatch(getMovies({ ...queryParams, active: page }));
    setQueryParams((prev) => ({ ...prev, active: page }));
  };

  const handleChangeTitle = (event) => {
    const params = { ...queryParams, active: 1, title: event.target.value };
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        dispatch(getMovies(params));
      }, 750),
    );
    setQueryParams(params);
  };

  const handleChangeGenre = (event) => {
    dispatch(getMovies({ ...queryParams, active: 1, genre: event.target.value }));
    setQueryParams((prev) => ({ ...prev, active: 1, genre: event.target.value }));
  };

  return (
    <div>
      <Row className="mt-4 mb-4 offset-3 g-2">
        <Col md={5}>
          <Form.Control
            className="shadow-none"
            type="text"
            placeholder="Search by movie title"
            value={queryParams.title}
            onChange={handleChangeTitle}
          />
        </Col>
        <Col md={3}>
          <Form.Select className="shadow-none" onChange={handleChangeGenre}>
            {getOptions()}
          </Form.Select>
        </Col>
      </Row>
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
