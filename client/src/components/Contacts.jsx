import React, { useState, useContext } from 'react';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
import Contact from './Contact';
import FriendsContext from '../contexts/FriendsContext';

function Contacts() {
  const [searchValue, setSearchValue] = useState('');
  const [newContacts, setNewContacts] = useState([]);
  const { friends } = useContext(FriendsContext);

  const changeSearchValue = async (event) => {
    setSearchValue(event.target.value);
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        params: {
          pseudoPattern: event.target.value,
        },
      });
      setNewContacts(response.data
        .filter((newContact) => !friends.some((friend) => friend.id === newContact.id)));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="contacts">
      <h3>Messages</h3>
      <div className="contacts__search">
        <div>
          <BsSearch />
        </div>
        <input type="text" value={searchValue} placeholder="Rechercher un contact" onChange={(event) => changeSearchValue(event)} />
      </div>
      {!searchValue && friends.map((friend) => (<Contact key={friend.id} friend={friend} />))}
      {searchValue && newContacts.map((newContact) => (
        <Contact key={newContact.id} newContact={newContact} />
      ))}
    </div>
  );
}

export default Contacts;
