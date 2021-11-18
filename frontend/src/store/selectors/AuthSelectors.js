import { createSelector } from 'reselect';

const selectAuthErrorState = state => state.error;

export const selectLoginError = createSelector(
  selectAuthErrorState,
  state => state.loginError
);

export const selectRegisterError = createSelector(
  selectAuthErrorState,
  state => state.registerError
);

export const selectAuthUser = createSelector(
  state => state,
  state => state.authUser
);

export const selectIsLoggedIn = createSelector(
  state => state,
  state => !!state.authUser
);

