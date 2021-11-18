import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../../store/actions/AuthActions';
import { selectRegisterError } from '../../store/selectors/AuthSelectors';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const dispatch = useDispatch();
  const registerError = useSelector(selectRegisterError);

  const handleInputChange = field => event => setRegisterData({
    ...registerData,
    [field]: event.target.value
  });

  const submit = event => {
    event.preventDefault();

    dispatch(register(registerData));
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Email"
          value={registerData.email}
          onChange={handleInputChange('email')}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={handleInputChange('password')}
        />
        <input
          type="text"
          placeholder="Name"
          value={registerData.name}
          onChange={handleInputChange('name')}
        />
        <input type="submit" value="Register" />
        {registerError && <p>registerError</p>}
      </form>
    </div>
  );
}

export default Register;
