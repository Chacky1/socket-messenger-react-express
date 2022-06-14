import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import Authentication from './pages/Authentication';
import Home from './pages/Home';

function App() {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/auth" element={<Authentication />} />
      {user.id !== -1 && <Route path="/messenger" element={Home} />}
      <Route path="/" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

export default App;
