import {
  GET_MOVIES,
  SET_MOVIES,
  GET_MOVIE,
  SET_MOVIE,
  GET_GENRES,
  SET_GENRES,
  GET_COMMENTS,
  SET_COMMENTS,
  GET_POPULAR,
  SET_POPULAR,
  GET_RELATED,
  SET_RELATED,
  INCREMENT_VIEWS,
  LIKE,
  DISLIKE,
  UPDATE_MOVIE,
  CREATE_MOVIE,
  POST_COMMENT,
  ADD_COMMENT,
  GET_WATCH_LIST,
  SET_WATCH_LIST,
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

export const getComments = (payload) => {
  return {
    type: GET_COMMENTS,
    payload,
  };
};

export const setComments = (payload) => {
  return {
    type: SET_COMMENTS,
    payload,
  };
};

export const getPopular = () => {
  return {
    type: GET_POPULAR,
  };
};

export const setPopular = (payload) => {
  return {
    type: SET_POPULAR,
    payload,
  };
};

export const getRelated = (payload) => {
  return {
    type: GET_RELATED,
    payload,
  };
};

export const setRelated = (payload) => {
  return {
    type: SET_RELATED,
    payload,
  };
};

export const getWatchList = () => {
  return {
    type: GET_WATCH_LIST,
  };
};

export const setWatchList = (payload) => {
  return {
    type: SET_WATCH_LIST,
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

export const postComment = (payload) => {
  return {
    type: POST_COMMENT,
    payload,
  };
};

export const addComment = (payload) => {
  return {
    type: ADD_COMMENT,
    payload,
  };
};

export const createMovie = (payload) => {
  return {
    type: CREATE_MOVIE,
    payload,
  };
};
