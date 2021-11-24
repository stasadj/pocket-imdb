import { all, takeLatest } from 'redux-saga/effects';
import { LOGIN, REGISTER, GET_MOVIES, GET_MOVIE, LOGOUT } from '../actions/ActionTypes';
import { userLogin, userRegister, userLogout } from './AuthSagas';
import { moviesGet, movieGet } from './MovieSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN, userLogin),
    takeLatest(LOGOUT, userLogout),
    takeLatest(REGISTER, userRegister),
    takeLatest(GET_MOVIES, moviesGet),
    takeLatest(GET_MOVIE, movieGet),
  ]);
}
