import { call, put } from 'redux-saga/effects';

import { movieService } from '../../services/MovieService';
import { setMovies } from '../actions/MovieActions';

export function* moviesGet({ payload }) {
  try {
    const { data } = yield call(movieService.getMovies, payload);

    yield put(setMovies(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}
