import React, { useEffect, useState } from 'react';
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
  const [selectedChat, setSelectedChat] = useState('generalgroup'); // Default to group chat
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nickName = params.get('nickname');

  useEffect(() => {
    connectSocket();

    onEvent('messagesList', (messagesList)=>{
      const updatedMessages = messagesList.map(msg => ({
        ...msg,
        type: msg.nickName.toLowerCase() === nickName.toLowerCase() ? 'sent' : 'received',
      }));
      setMessages(updatedMessages);
      console.log("Los mensajes que se consultaron son: " + messagesList);
    });

    onEvent('userList', (userList) => {
      const filteredUsers = userList.filter(user => user.nickName.toLowerCase() !== nickName.toLowerCase());
      setUsers(filteredUsers);
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
      const recipientNickName = selectedChat === 'generalgroup' ? 'generalgroup' : selectedChat;

      emitEvent('sendMessage', 
        { message,
          nickName, // Sender's nickname
          recipientNickName,
          status: users.length >= 1 ? 'received' : 'notReceived'
        });
      setMessage('');
    }
  };

  // Filter messages based on the selected chat (group or private)
  const filteredMessages = selectedChat === 'generalgroup'
  ? messages.filter(msg => msg.recipientNickName === 'generalgroup')
  : messages.filter(msg =>
      // Convertimos todos los nombres de usuario a minúsculas para una comparación consistente
      (msg.nickName.toLowerCase() === nickName.toLowerCase() && msg.recipientNickName.toLowerCase() === selectedChat.toLowerCase()) ||
      (msg.nickName.toLowerCase() === selectedChat.toLowerCase() && msg.recipientNickName.toLowerCase() === nickName.toLowerCase())
    );

  return (
    <div className="container">

      <UsersList users={users} onChatSelect={setSelectedChat} />

      <div className="chat-area">
        <div className="chat-header">
          <h2>{selectedChat === 'generalgroup' ? 'Chat General' : `Chat con ${selectedChat}`}</h2>
        </div>

        {messages && <Messages messages={filteredMessages} currentUser={nickName} />}

        <MessageBox handleSendMessage={handleSendMessage} message={message} setMessage={setMessage} />
      </div>
    </div>
  );
};

export default Chatroom;
