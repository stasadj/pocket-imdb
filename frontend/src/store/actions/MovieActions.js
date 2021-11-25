import {
  GET_MOVIES,
  SET_MOVIES,
  GET_MOVIE,
  SET_MOVIE,
  GET_GENRES,
  SET_GENRES,
  INCREMENT_VIEWS,
  LIKE,
  DISLIKE,
  UPDATE_MOVIE,
} from './ActionTypes';

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

export const getGenres = () => {
  return {
    type: GET_GENRES,
  };
};

export const setGenres = (payload) => {
  return {
    type: SET_GENRES,
    payload,
  };
};

export const incrementViews = (payload) => {
  return {
    type: INCREMENT_VIEWS,
    payload,
  };
};

export const likeMovie = (payload) => {
  return {
    type: LIKE,
    payload,
  };
};

export const dislikeMovie = (payload) => {
  return {
    type: DISLIKE,
    payload,
  };
};

export const updateMovie = (payload) => {
  return {
    type: UPDATE_MOVIE,
    payload,
  };
};
