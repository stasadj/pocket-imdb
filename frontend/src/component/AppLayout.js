import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import NavBar from './NavBar';
import Home from '../containers/Home';

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../store/selectors/AuthSelectors';

import { REGISTER, ANY } from '../routes/routes';

const AppLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        {isLoggedIn && <Route path={ANY} element={<Home />} />}
        {!isLoggedIn && <Route path={ANY} element={<Login />} />}
        {!isLoggedIn && <Route exact path={REGISTER} element={<Register />} />}
      </Routes>
    </div>
  );
};

export default AppLayout;
