import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import ChatFriendInfo from './ChatFriendInfo';
import ChatMessages from './ChatMessages';
import NewMessage from './NewMessage';

function Chat() {
  const { currentFriendTalk } = useContext(UserContext);

  return (
    <div className="chat">
      <div className="chat__friend-info">
        <ChatFriendInfo friend={currentFriendTalk} />
      </div>
      <div className="chat__messages">
        <ChatMessages />
      </div>
      <div className="chat__new-message">
        <NewMessage />
      </div>
    </div>
  );
}

export default Chat;
