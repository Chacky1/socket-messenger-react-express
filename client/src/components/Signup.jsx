import React, { useReducer } from 'react';
import axios from 'axios';

const initialUserInfos = {
  email: '',
  pseudo: '',
  password: '',
};

const userInfosReducer = (userInfos, action) => {
  switch (action.type) {
    case 'changeEmail':
      return { ...userInfos, email: action.payload };
    case 'changePseudo':
      return { ...userInfos, pseudo: action.payload };
    case 'changePassword':
      return { ...userInfos, password: action.payload };
    default:
      return userInfos;
  }
};

function Signup() {
  const [userInfos, userInfosDispatch] = useReducer(userInfosReducer, initialUserInfos);

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', userInfos);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="signup">
      <h2>Inscription</h2>
      <form className="signup-form" onSubmit={(event) => handleSignupSubmit(event)}>
        <div className="signup-form__group">
          <label htmlFor="email">
            <p>Email</p>
            <input
              type="email"
              name="email"
              id="email"
              value={userInfos.email}
              onChange={(event) => userInfosDispatch({ type: 'changeEmail', payload: event.target.value })}
            />
          </label>
        </div>
        <div className="signup-form__group">
          <label htmlFor="pseudo">
            <p>Pseudo</p>
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              value={userInfos.pseudo}
              onChange={(event) => userInfosDispatch({ type: 'changePseudo', payload: event.target.value })}
            />
          </label>
        </div>
        <div className="signup-form__group">
          <label htmlFor="password">
            <p>Mot de passe</p>
            <input
              type="password"
              name="password"
              id="password"
              value={userInfos.password}
              onChange={(event) => userInfosDispatch({ type: 'changePassword', payload: event.target.value })}
            />
          </label>
        </div>
        <button type="submit">S&apos;inscrire</button>
      </form>
    </div>
  );
}

export default Signup;
