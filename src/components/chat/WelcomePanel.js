import React from 'react';
import '../../pages/WelcomePanel.css'; // Opcional: Estilo personalizado para el panel de bienvenida

const WelcomePanel = ({ nickName }) => {
  return (
    <div className="welcome-panel">
      <h3>¡Hola, {nickName}!</h3>
      <p>
        Bienvenido a la sala de chat. Para comenzar, selecciona un chat de la lista o
        envía un mensaje en el <strong>Chat General</strong>.
      </p>
      <p>Disfruta de la conversación 😊</p>
    </div>
  );
};

export default WelcomePanel;
