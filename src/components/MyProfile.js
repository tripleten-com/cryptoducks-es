import React from "react";
import NavBar from "./NavBar.js";
import "./styles/MyProfile.css";

function MyProfile({ userData = {} }) {
  const { username, email } = userData;
  return (
    <>
      <NavBar />
      <div className="my-profile">
        <div className="my-profile__container">
          <div className="my-profile__header">
            <p>My perfil</p>
            <hr className="my-profile__rule" />
          </div>
          <div className="my-profile__info">
            <div className="my-profile__user">
              <p className="my-profile__key">Iniciar sesión:</p>
              <p className="my-profile__value">{username}</p>
            </div>
            <div className="my-profile__user">
              <p className="my-profile__key">Correo electrónico:</p>
              <p className="my-profile__value">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
