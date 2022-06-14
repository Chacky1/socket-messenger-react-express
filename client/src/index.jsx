import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.scss';
import UserContextWrapper from './contexts/UserContextWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextWrapper>
  </React.StrictMode>,
);
