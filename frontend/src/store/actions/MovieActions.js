import { GET_MOVIES, SET_MOVIES, GET_MOVIE, SET_MOVIE } from './ActionTypes';

export const getMovies = (payload) => {
  return {
    type: GET_MOVIES,
    payload,
  };
};

export const setMovies = (payload) => {
  return {
    type: SET_MOVIES,
    payload,
  };
};

export const getMovie = (payload) => {
  return {
    type: GET_MOVIE,
    payload,
  };
};

export const setMovie = (payload) => {
  return {
    type: SET_MOVIE,
    payload,
  };
};
