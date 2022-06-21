/* eslint-disable react/prop-types */
import React, { useState, useReducer, useMemo } from 'react';

import UserContext from './UserContext';

const initialUser = {
  id: -1,
  email: '',
  pseudo: '',
};

const userReducer = (userState, action) => {
  switch (action.type) {
    case 'login':
      return action.payload;
    case 'changeEmail':
      return { ...userState, email: action.payload };
    case 'changePseudo':
      return { ...userState, pseudo: action.payload };
    default:
      return userState;
  }
};

function UserContextWrapper({ children }) {
  const [user, userDispatch] = useReducer(userReducer, initialUser);
  const [currentFriendTalk, setCurrentFriendTalk] = useState(initialUser);

  const memoizedValue = useMemo(() => ({
    user, userDispatch, currentFriendTalk, setCurrentFriendTalk,
  }), [user, currentFriendTalk]);

  return (
    <UserContext.Provider value={memoizedValue}>
      { children }
    </UserContext.Provider>
  );
}

export default UserContextWrapper;
