import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AiOutlineUserAdd } from 'react-icons/ai';

import UserContext from '../contexts/UserContext';
import FriendsContext from '../contexts/FriendsContext';

function Contact({ friend, newContact }) {
  const { user, setCurrentFriendTalk } = useContext(UserContext);
  const { friends, setFriends } = useContext(FriendsContext);

  const handleNewUser = async () => {
    try {
      await axios.post(`http://localhost:5000/api/users/${user.id}/friends`, { newContactId: newContact.id });
      const newFriends = [...friends, newContact];
      setFriends(newFriends);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleContactClick = () => {
    setCurrentFriendTalk(friend);
  };

  return (
    <div className="contact" role="button" tabIndex={0} onClick={handleContactClick} onKeyDown={handleContactClick}>
      {friend.id !== -1 && (
        <div className="contact__pseudo">
          <h4>{friend.pseudo}</h4>
        </div>
      )}
      {newContact.id !== -1 && (
        <div className="contact__pseudo">
          <h4>{newContact.pseudo}</h4>
          <button
            type="button"
            aria-label="Add user"
            onClick={handleNewUser}
            onKeyDown={handleNewUser}
          >
            <AiOutlineUserAdd />
          </button>
        </div>
      )}
    </div>
  );
}

Contact.propTypes = {
  friend: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    pseudo: PropTypes.string,
  }),
  newContact: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    pseudo: PropTypes.string,
  }),
};

Contact.defaultProps = {
  friend: {
    id: -1,
    email: '',
    pseudo: '',
  },
  newContact: {
    id: -1,
    email: '',
    pseudo: '',
  },
};

export default Contact;
