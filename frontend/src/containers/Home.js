import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getGenres, getMovies, likeMovie, dislikeMovie } from '../store/actions/MovieActions';
import { allMovies, movieGenres, moviePages } from '../store/selectors/MovieSelectors';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MovieCard from '../component/movie/MovieCard';
import PopularMovies from '../component/movie/PopularMovies';
import MoviePagination from '../component/movie/MoviePagination';

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
        Any genre
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
    return movies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        onLike={handleLikeMovie}
        onDislike={handleDislikeMovie}
      />
    ));
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

  const handleLikeMovie = (id) => {
    dispatch(likeMovie(id));
  };

  const handleDislikeMovie = (id) => {
    dispatch(dislikeMovie(id));
  };

  return (
    <div>
      <Row>
        <Col md={9} style={{ border: '1px solid lightgrey' }}>
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
          <Row>{renderMovies()}</Row>
          <Col className="offset-5" md={3}>
            <MoviePagination
              active={queryParams.active}
              pages={Math.ceil(pages / 10)}
              onClick={handleChangeActive}
            />
          </Col>
        </Col>
        <Col
          md={3}
          style={{ borderTop: '1px solid lightgrey', borderBottom: '1px solid lightgrey' }}
        >
          <PopularMovies />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
