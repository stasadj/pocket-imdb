import { all, takeLatest } from 'redux-saga/effects';
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  GET_MOVIES,
  GET_MOVIE,
  GET_GENRES,
  GET_COMMENTS,
  INCREMENT_VIEWS,
  LIKE,
  DISLIKE,
  POST_COMMENT,
} from '../actions/ActionTypes';
import { userLogin, userRegister, userLogout } from './AuthSagas';
import {
  moviesGet,
  movieGet,
  genresGet,
  commentsGet,
  movieView,
  movieLike,
  movieDislike,
  movieComment,
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
    takeLatest(INCREMENT_VIEWS, movieView),
    takeLatest(LIKE, movieLike),
    takeLatest(DISLIKE, movieDislike),
    takeLatest(POST_COMMENT, movieComment),
  ]);
}
