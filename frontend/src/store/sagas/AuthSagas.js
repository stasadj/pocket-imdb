import { call, put } from 'redux-saga/effects';
import { push, go } from 'connected-react-router';

import { authUser, loginError, registerError } from '../actions/AuthActions';
import AuthService from '../../services/AuthService';

export function* userLogin({ payload }) {
  try {
    yield call(AuthService.login, payload);

    yield put(authUser(true));
    yield put(loginError(false));
    yield put(push('/home'));
  } catch (error) {
    yield put(loginError(true));
  }
}

export function* userRegister({ payload }) {
  try {
    yield call(AuthService.signup, payload);

    yield put(authUser(false));
    yield put(registerError(false));
    yield put(push('/login'));
    yield put(go());
  } catch (error) {
    yield put(registerError(true));
  }
}

export function* userLogout({ payload }) {
  try {
    yield call(AuthService.logout, payload);

    yield put(authUser(false));
    yield put(push('/login'));
  } catch (error) {}
}
