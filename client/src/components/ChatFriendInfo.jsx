import React from 'react';
import PropTypes from 'prop-types';

function ChatFriendInfo({ friend }) {
  return (
    <div className="chat-friend-info">
      <h3>{friend.pseudo}</h3>
    </div>
  );
}

ChatFriendInfo.propTypes = {
  friend: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    pseudo: PropTypes.string,
  }),
};

ChatFriendInfo.defaultProps = {
  friend: {
    id: -1,
    email: '',
    pseudo: '',
  },
};

export default ChatFriendInfo;
