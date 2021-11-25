import { call, put } from 'redux-saga/effects';

import { movieService } from '../../services/MovieService';
import { setMovies, setMovie, setGenres, updateMovie } from '../actions/MovieActions';

export function* moviesGet({ payload }) {
  try {
    const { data } = yield call(movieService.getMovies, payload);

    yield put(setMovies(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* movieGet({ payload }) {
  try {
    const { data } = yield call(movieService.getMovie, payload);

    yield put(setMovie(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* genresGet() {
  try {
    const { data } = yield call(movieService.getGenres);

    yield put(setGenres(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* movieView({ payload }) {
  try {
    const { data } = yield call(movieService.viewMovie, payload);

    yield put(setMovie(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* movieLike({ payload }) {
  try {
    const { data } = yield call(movieService.likeMovie, payload);

    yield put(setMovie(data));
    yield put(updateMovie(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* movieDislike({ payload }) {
  try {
    const { data } = yield call(movieService.dislikeMovie, payload);

    yield put(setMovie(data));
    yield put(updateMovie(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}
