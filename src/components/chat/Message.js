import React from 'react';

const Message = ({ user, text, type, status, timestamp }) => {

    const capitalizeWords = (str) => {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
      <div className={`message ${type}`}>
        {/* Primera fila: usuario y texto */}
        <div className="message-content">
          <p>
            <strong>{capitalizeWords(user)}: </strong>
            {text}
          </p>
        </div>

        {/* Segunda fila: fecha y estado */}
        <div className="message-footer">
          <span className={`date ${type}`}>{timestamp}</span>
          <div className={`status ${status}`}>
            {status === 'received' ? (
                // Comilla doble SVG
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-all" viewBox="0 0 16 16">
                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
                </svg>
            ) : (
                // Comilla simple SVG
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                </svg>
            )}

          </div>
        </div>
      </div>
    );
};

export default Message;
