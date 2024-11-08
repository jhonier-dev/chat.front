import React from 'react';
import Message from './Message';

const Messages = ({ messages, currentUser }) => {
    return (
        <div className="messages">
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}> 
                        <Message 
                            user={msg.nickName} 
                            text={msg.message} 
                            type={msg.nickName === currentUser ? 'sent' : 'received'} 
                            status= {msg.status}
                            timestamp={msg.timestamp}
                        /> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Messages;
