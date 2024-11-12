import React from 'react';
import perfilDefault from '../../img/defaultProfile.jpg'; // Imagen predeterminada si no existe una personalizada

const UsersList = ({ users }) => {
  const getProfileImage = (nickName) => {
    try {
      // Importa la imagen de perfil usando el nombre de usuario en minúsculas
      return require(`../../img/perfil${nickName.toLowerCase()}.jpg`);
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
        {users.map((user) => (
          <li key={user.id}>
            <img
              className="user-perfil"
              alt={`${user.nickName}'s profile`}
              src={getProfileImage(user.nickName)}
            />
            <div className="user-info">
              <strong>{user.nickName}</strong>
              <span className="user-cargo">{user.cargo}</span>
              <span className="user-correo">{user.correo}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
