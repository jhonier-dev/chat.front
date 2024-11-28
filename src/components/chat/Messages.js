import React from 'react';
import Message from './Message';
import { useLayoutEffect } from 'react';

const Messages = ({ messages, currentUser, messageContainerRef }) => {

    useLayoutEffect(() => {
        if (messageContainerRef?.current) {
          // Desplazarse automáticamente al último mensaje
          messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]); // Se ejecuta cada vez que los mensajes cambian, o cuando se renderiza el componente

    return (
        <div className="messages" ref={messageContainerRef}>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}> 
                        <Message 
                            user={msg.nickName} 
                            text={msg.message} 
                            type={msg.nickName.toLowerCase() === currentUser.toLowerCase() ? 'sent' : 'received'} 
                            status= {msg.status}
                            timestamp={msg.createDate}
                            recipientNickName= {msg.recipientNickName}
                            currentUser={currentUser}
                        /> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Messages;
