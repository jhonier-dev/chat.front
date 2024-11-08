import React, { useEffect, useState  } from 'react';
import { useLocation } from 'react-router-dom';
import { connectSocket, disconnectSocket, onEvent, emitEvent } from '../services/socketService';
import UsersList from '../components/chat/UsersList';
import Messages from '../components/chat/Messages';
import MessageBox from '../components/chat/MessageBox';
import './styleChat.css';

const Chatroom = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nickName = params.get('nickname');

  useEffect(() => {
    
    connectSocket();

    onEvent('userList', (userList) => {
      setUsers(userList);
    });

    onEvent('receiveMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    emitEvent('joinChat', nickName);

    return () => disconnectSocket();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message) {
      const currentDate = new Date();
      emitEvent('sendMessage', 
        { message,
          nickName,
          timestamp: currentDate.toLocaleString(),
          status: users.length > 1 ? 'received' : 'notReceived'
        });
      setMessage('');
    }
  };

  return (


    <div className="container">

      {users.length && <UsersList users={users} messages={messages} />}

      <div className="chat-area">

        <div className="chat-header">
          <h2>Chat Area</h2>
        </div>

        {messages && <Messages  messages={messages} currentUser={nickName}/>}

        <MessageBox handleSendMessage={handleSendMessage} message={message} setMessage={setMessage} />

      </div>

    </div>
  );
};

export default Chatroom;