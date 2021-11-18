import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from '../../store/actions/AuthActions';
import { selectLoginError } from '../../store/selectors/AuthSelectors';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const loginError = useSelector(selectLoginError);

  const handleInputChange = (field) => (event) =>
    setLoginData({
      ...loginData,
      [field]: event.target.value,
    });

  const submit = (event) => {
    event.preventDefault();

    dispatch(logIn(loginData));
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h2>Log In</h2>
        <input
          type="text"
          placeholder="Email"
          value={loginData.email}
          onChange={handleInputChange('email')}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleInputChange('password')}
        />
        <input type="submit" value="Log in" />
        {loginError && <p>Login error</p>}
      </form>
    </div>
  );
};

export default Login;
