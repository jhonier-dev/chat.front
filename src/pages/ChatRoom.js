import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { connectSocket, disconnectSocket, onEvent, emitEvent } from '../services/socketService';
import UsersList from '../components/chat/UsersList';
import Messages from '../components/chat/Messages';
import MessageBox from '../components/chat/MessageBox';
import WelcomePanel from '../components/chat/WelcomePanel'; // Nuevo componente
import NewMessageAlert from '../components/chat/NewMessageAlert';
import './styleChat.css';

const Chatroom = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [selectedChat, setSelectedChat] = useState(''); // Por defecto, vacío
  const [unreadMessages, setUnreadMessages] = useState({});  //Contador de mensajes nuevos
  const selectedChatRef = useRef(selectedChat);
  const messageContainerRef = useRef(null);
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
    });

    onEvent('userList', (userList) => {
      const filteredUsers = userList.filter(user => user.nickName.toLowerCase() !== nickName.toLowerCase());
      setUsers(filteredUsers);
    });

    onEvent('receiveMessage', (msg) => {
      console.log('Mensaje recibido:', msg);
  
      // Siempre agrega el mensaje a la lista general
      setMessages((prevMessages) => [...prevMessages, msg]);
  
      // Logs para depuración
      console.log('Unread Messages:', unreadMessages);
  
      const isGroupChatActive =
        selectedChatRef.current === 'generalgroup' && msg.recipientNickName === 'generalgroup';
  
      const isPrivateChatActive =
        selectedChatRef.current !== 'generalgroup' &&
        ((nickName.toLowerCase() === msg.nickName.toLowerCase() &&
          selectedChatRef.current.toLowerCase() === msg.recipientNickName.toLowerCase()) ||
          (nickName.toLowerCase() === msg.recipientNickName.toLowerCase() &&
            selectedChatRef.current.toLowerCase() === msg.nickName.toLowerCase()));
  
      const isInActiveChat = isGroupChatActive || isPrivateChatActive;
  
      const isForCurrentUser =
        msg.recipientNickName.toLowerCase() === nickName.toLowerCase() || msg.recipientNickName === 'generalgroup';
  
      if (!isInActiveChat && isForCurrentUser) {
        console.log("Mensaje no leído para el usuario actual.");
        // Generar alerta
        setAlerts((prevAlerts) => [...prevAlerts, msg]);
  
        // Incrementar contador de mensajes no leídos
        setUnreadMessages((prev) => ({
          ...prev,
          [msg.nickName]: (prev[msg.nickName] || 0) + 1,
        }));
      }
    });
    
    emitEvent('joinChat', nickName);

    return () => disconnectSocket();
  }, []);

  // Sincroniza el valor de selectedChat con la referencia
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

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

  const handleDismissAlert = (alertIndex) => {
    setAlerts((prevAlerts) => prevAlerts.filter((_, index) => index !== alertIndex));
  };

  const filteredMessages = selectedChat === 'generalgroup'
  ? messages.filter(msg => msg.recipientNickName === 'generalgroup')
  : messages.filter(msg =>
      (msg.nickName.toLowerCase() === nickName.toLowerCase() && msg.recipientNickName.toLowerCase() === selectedChat.toLowerCase()) ||
      (msg.nickName.toLowerCase() === selectedChat.toLowerCase() && msg.recipientNickName.toLowerCase() === nickName.toLowerCase())
    );

  return (
    <div className="container">

      <UsersList 
        users={users} 
        onChatSelect={(chat) => {
          setSelectedChat(chat);
          
          // Resetear el contador de mensajes no leídos para el chat seleccionado
          setUnreadMessages((prev) => {
            const updated = { ...prev };
            delete updated[chat];
            return updated;
          });
        }}
        
        unreadMessages={unreadMessages}
      />

      <div className="chat-area">
        <div className="chat-header">
         <h2>
            {selectedChat === ''
              ? 'Bienvenido a la sala de chat'
              : selectedChat === 'generalgroup'
              ? 'Chat General'
              : `Chat con ${selectedChat}`}
          </h2>
        </div>

        {selectedChat === '' ? (
          <WelcomePanel nickName={nickName} />
        ) : (
          <Messages messages={filteredMessages} currentUser={nickName} messageContainerRef={messageContainerRef} />
        )}

        {selectedChat !== '' && (
          <MessageBox handleSendMessage={handleSendMessage} message={message} setMessage={setMessage} />
        )}
        
      </div>

      {alerts.map((alert, index) => (
        <NewMessageAlert
          key={index}
          message={alert}
          onDismiss={() => handleDismissAlert(index)}
        />
      ))}

    </div>
  );
};

export default Chatroom;
