import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSesion } from '../services/userService';
import constants from '../utils/constants';
import '../pages/pages.css';

const Home = () => {

  const [nickName, setNickName]  = useState('');
  const [password, setPassword]  = useState('');
  const navigate = useNavigate();
  
  const joinChat = async (e) => {
    
    e.preventDefault();

    try {
      const result = await createSesion({ nickName, password });
      if (result.status === constants.STATUSES.OK) {
        navigate(`/chat-room?nickname=${encodeURIComponent(nickName)}`);
      }

    } catch (error) {
      console.log(error)
    }

  };

  return (
    <div className="Chat">
      <header className="Chat-header">
        <div className="BoxMain">
          <h1>Chat online</h1>
          <h6>Company Name</h6>
          <input
            type="text"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="   Digite su usuario"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="   Digite su contraseña"
          />
          <button onClick={joinChat}>Unirse al chat</button>
          <button type="button" className="help-link">
            ¿Necesitas ayuda?
          </button>
        </div>
      </header>
    </div>
  );
};

export default Home;