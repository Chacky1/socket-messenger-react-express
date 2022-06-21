import React, {
  useState, useEffect, useContext, useMemo,
} from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import Contacts from './Contacts';
import Chat from './Chat';
import FriendsContext from '../contexts/FriendsContext';

function MainDashboardMessaging() {
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${user.id}/friends`);
        if (response.data) {
          setFriends(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchFriends();
  }, []);

  const memoizedFriends = useMemo(() => ({ friends, setFriends }), [friends]);

  return (
    <FriendsContext.Provider value={memoizedFriends}>
      <Contacts />
      <Chat />
    </FriendsContext.Provider>
  );
}

export default MainDashboardMessaging;
