import React from 'react';

const MessageBox = ({handleSendMessage, message , setMessage}) => {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita el salto de línea en el input
            handleSendMessage(e); // Llama a la función de enviar mensaje
        }
    };

    return (
        <div onSubmit={handleSendMessage} className='message-input'>
            <input
                type='text'
                value={message}
                placeholder="Ingrese su mensaje"
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown} // Cambiado a onKeyDown
            />
            <button type='button' onClick={handleSendMessage}>Enviar</button>
        </div>
    );
};

export default MessageBox;