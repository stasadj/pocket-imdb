import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getWatchList } from '../store/actions/MovieActions';
import { watchListMovies } from '../store/selectors/MovieSelectors';

import Row from 'react-bootstrap/Row';

import WatchListItem from '../component/movie/WatchListItem';

const WatchList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(watchListMovies);

  useEffect(() => {
    dispatch(getWatchList());
  }, []);

  const renderMovies = () => {
    return movies.map((movie) => <WatchListItem key={movie.id} movie={movie} />);
  };
  return <Row>{renderMovies()}</Row>;
};

export default WatchList;
