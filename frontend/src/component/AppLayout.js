import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import NavBar from './NavBar';

const AppLayout = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AppLayout;
