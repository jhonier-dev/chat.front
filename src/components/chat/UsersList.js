import React from 'react';
import perfilDefault from '../../img/defaultProfile.jpg'; // Imagen predeterminada si no existe una personalizada
import '../../pages/NewMessageAlert.css';

const UsersList =  ({ users, onChatSelect, unreadMessages   }) => {
  
  console.log("El contador que llega a la lista de usuarios es: ",unreadMessages);
  
  const getProfileImage = (nickName) => {
    try {
      // Convierte a minúsculas y elimina los espacios en blanco
      const formattedNickName = nickName.toLowerCase().replace(/\s+/g, '');
      // Importa la imagen de perfil usando el nombre de usuario formateado
      return require(`../../img/perfil${formattedNickName}.jpg`);
    } catch (err) {
      // Si no encuentra la imagen, usa la imagen predeterminada
      return perfilDefault;
    }
  };

  return (
    <div className="user-list">
      <div className="user-header">
        <h2>Usuarios conectados</h2>
      </div>

      <ul>
        <li key="generalgroup" onClick={() => onChatSelect("generalgroup")}>
            <img
              className="user-perfil"
              alt=""
              src={getProfileImage("generalgroup")}
            />
            <div className="user-info">
              <strong>Chat general</strong>
            </div>
        </li>

        {users.map((user) => (
          <li key={user.id} onClick={() => onChatSelect(user.nickName)}>
            <img
              className="user-perfil"
              alt={`${user.nickName}'s profile`}
              src={getProfileImage(user.nickName)}
            />
            <div className="user-info">
              <strong>{user.nickName}</strong>
              <span className="user-cargo">{user.cargo}</span>
              <span className="user-correo">{user.correo}</span>
            </div >
              
            <div className="user-counter">
              {unreadMessages[user.nickName.toLowerCase()] > 0 && (
                <span className="unread-counter">
                  {unreadMessages[user.nickName.toLowerCase()]}
                </span>
              )}
          </div>

          </li>
        ))}

      </ul>
    </div>
  );
};

export default UsersList;
