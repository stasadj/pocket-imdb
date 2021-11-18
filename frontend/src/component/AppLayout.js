import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import Home from '../containers/Home';
import PrivateRoute from '../containers/PrivateRoute';

const AppLayout = () => {
  return (
    <div>
      <PrivateRoute exact path="/home" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </div>
  );
}

export default AppLayout;
