import { all, takeLatest } from 'redux-saga/effects';
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  GET_MOVIES,
  GET_MOVIE,
  GET_GENRES,
  GET_COMMENTS,
  GET_POPULAR,
  GET_RELATED,
  INCREMENT_VIEWS,
  LIKE,
  DISLIKE,
  POST_COMMENT,
  CREATE_MOVIE,
  GET_WATCH_LIST,
  ADD_REMOVE_WATCH_LIST,
  UPDATE_WATCHED,
} from '../actions/ActionTypes';
import { userLogin, userRegister, userLogout } from './AuthSagas';
import {
  moviesGet,
  movieGet,
  genresGet,
  commentsGet,
  popularGet,
  relatedGet,
  movieView,
  movieLike,
  movieDislike,
  movieComment,
  movieCreate,
  watchListGet,
  watchListAddRemove,
  watchedUpdate,
} from './MovieSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN, userLogin),
    takeLatest(LOGOUT, userLogout),
    takeLatest(REGISTER, userRegister),
    takeLatest(GET_MOVIES, moviesGet),
    takeLatest(GET_MOVIE, movieGet),
    takeLatest(GET_GENRES, genresGet),
    takeLatest(GET_COMMENTS, commentsGet),
    takeLatest(GET_POPULAR, popularGet),
    takeLatest(GET_RELATED, relatedGet),
    takeLatest(INCREMENT_VIEWS, movieView),
    takeLatest(LIKE, movieLike),
    takeLatest(DISLIKE, movieDislike),
    takeLatest(POST_COMMENT, movieComment),
    takeLatest(CREATE_MOVIE, movieCreate),
    takeLatest(GET_WATCH_LIST, watchListGet),
    takeLatest(ADD_REMOVE_WATCH_LIST, watchListAddRemove),
    takeLatest(UPDATE_WATCHED, watchedUpdate),
  ]);
}
