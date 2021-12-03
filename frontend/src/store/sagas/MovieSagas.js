import { call, put } from 'redux-saga/effects';
import { push, go } from 'connected-react-router';

import { movieService } from '../../services/MovieService';
import {
  setMovies,
  setMovie,
  setGenres,
  setComments,
  setPopular,
  setRelated,
  updateMovie,
  addComment,
  setWatchList,
} from '../actions/MovieActions';

import { HOME } from '../../routes/routes';

import socket from '../../socket';

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

export function* popularGet() {
  try {
    const { data } = yield call(movieService.getPopular);

    yield put(setPopular(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* relatedGet({ payload }) {
  try {
    const { data } = yield call(movieService.getRelated, payload);

    yield put(setRelated(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* watchListGet() {
  try {
    const { data } = yield call(movieService.getWatchList);

    yield put(setWatchList(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* commentsGet({ payload }) {
  try {
    const { data } = yield call(movieService.getComments, payload);

    yield put(setComments(data.results));
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
    socket.emit('dislike');
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* movieDislike({ payload }) {
  try {
    const { data } = yield call(movieService.dislikeMovie, payload);

    yield put(setMovie(data));
    yield put(updateMovie(data));
    socket.emit('dislike');
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* movieComment({ payload }) {
  try {
    const { data } = yield call(movieService.postComment, payload);

    yield put(addComment(data));
    socket.emit('comment');
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* movieCreate({ payload }) {
  try {
    yield call(movieService.postMovie, payload);
    yield put(push(HOME));
    yield put(go());
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* watchListAddRemove({ payload }) {
  try {
    const { data } = yield call(movieService.addRemoveWatchList, payload);
    yield put(setMovie(data));
    yield put(updateMovie(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* watchedUpdate({ payload }) {
  try {
    const { data } = yield call(movieService.updateWatched, payload);
    yield put(setMovie(data));
    yield put(updateMovie(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}
