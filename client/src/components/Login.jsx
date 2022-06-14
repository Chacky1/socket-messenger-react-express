import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { userDispatch } = useContext(UserContext);

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      userDispatch({ type: 'login', payload: response.data });
      navigate('/messenger');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="login">
      <h2>Connexion</h2>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <div className="login-form__group">
          <label htmlFor="email">
            <p>Email</p>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div className="login-form__group">
          <label htmlFor="password">
            <p>Mot de passe</p>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button className="btn-light" type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
