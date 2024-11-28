import React, { useEffect, useState } from 'react';
import '../../pages/NewMessageAlert.css';

const NewMessageAlert = ({ message, onDismiss }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Oculta automáticamente la alerta después de 7 segundos
    const timeout = setTimeout(() => {
      setVisible(false);
      onDismiss(); // Llama a la función para remover la alerta
    }, 7000);

    return () => clearTimeout(timeout);
  }, [onDismiss]);

  if (!visible) return null;

  return (
    <div className="new-message-alert">
      <p>
        <strong>Nuevo mensaje</strong> de <span>{message.nickName}</span>
      </p>
      <button onClick={onDismiss} className="dismiss-button">
        ×
      </button>
    </div>
  );
};

export default NewMessageAlert;
