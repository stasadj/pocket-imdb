import { createSelector } from 'reselect';

const movieStateSelector = (state) => state.movie;

export const allMovies = createSelector(movieStateSelector, (state) => state.all);

export const currentMovie = createSelector(movieStateSelector, (state) => state.current);

export const moviePages = createSelector(movieStateSelector, (state) => state.count);

export const movieGenres = createSelector(movieStateSelector, (state) => state.genres);

export const movieComments = createSelector(movieStateSelector, (state) => state.comments);

export const popularMovies = createSelector(movieStateSelector, (state) => state.popular);

export const relatedMovies = createSelector(movieStateSelector, (state) => state.related);

export const watchListMovies = createSelector(movieStateSelector, (state) => state.watch_list);
