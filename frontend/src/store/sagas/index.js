import { all, takeLatest } from 'redux-saga/effects';
import {
  LOGIN,
  REGISTER,
  GET_MOVIES,
  GET_MOVIE,
  INCREMENT_VIEWS,
  LOGOUT,
} from '../actions/ActionTypes';
import { userLogin, userRegister, userLogout } from './AuthSagas';
import { moviesGet, movieGet, moviePatch } from './MovieSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN, userLogin),
    takeLatest(LOGOUT, userLogout),
    takeLatest(REGISTER, userRegister),
    takeLatest(GET_MOVIES, moviesGet),
    takeLatest(GET_MOVIE, movieGet),
    takeLatest(INCREMENT_VIEWS, moviePatch),
  ]);
}
