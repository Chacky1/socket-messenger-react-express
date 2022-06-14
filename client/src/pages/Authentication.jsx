import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

function Authentication() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const changeAuthPage = () => {
    setIsLoginPage((prevLoginPage) => !prevLoginPage);
  };

  return (
    <section className="authentication">
      {isLoginPage && <Login />}
      {!isLoginPage && <Signup />}
      <button className="authentication__change-mode" type="button" onClick={changeAuthPage}>
        {isLoginPage ? 'Aller sur la page d\'inscription' : 'Aller sur la page de connexion'}
      </button>
    </section>
  );
}

export default Authentication;
