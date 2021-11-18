import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectIsLoggedIn } from '../store/selectors/AuthSelectors';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Route
      {...rest}
      render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
