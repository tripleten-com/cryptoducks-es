import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { setToken } from "../utils/token";
import Logo from "./Logo.js";
import * as duckAuth from "../duckAuth.js";
import "./styles/Login.css";

class __Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.username || !this.state.password) {
      return;
    }
    duckAuth
      .authorize(this.state.username, this.state.password)
      .then((data) => {
        if (!data) {
          return this.setState({
            message: "¡Algo salió mal!",
          });
        }
        if (data.jwt) {
          this.setState({ email: "", password: "", message: "" }, () => {
            this.props.handleLogin(data.user);
            this.props.history.push("/ducks");
            return;
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div onSubmit={this.handleSubmit} className="login">
        <Logo title={"CryptoDucks"} />
        <p className="login__welcome">
          Esta aplicación contiene información altamente sensible. Por favor,
          inicia sesión o regístrate para acceder a CryptoDucks.
        </p>
        <p className="login__error">{this.state.message}</p>
        <form className="login__form">
          <label htmlFor="username">Iniciar sesión:</label>
          <input
            id="username"
            required
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            required
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div className="login__button-container">
            <button type="submit" className="login__link">
              Iniciar sesión
            </button>
          </div>
        </form>

        <div className="login__signup">
          <p>¿Aún no eres miembro?</p>
          <Link to="/register" className="signup__link">
            Regístrate aquí
          </Link>
        </div>
      </div>
    );
  }
}

const Login = ({ handleLogin }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = data;

    if (!username || !password) {
      return;
    }

    duckAuth
      .authorize(username, password)
      .then((data) => {
        if (!data) {
          setMessage("Algo salió mal!");
        }

        if (data.jwt) {
          setToken(data.jwt);
          setData({ username: "", password: "" });
          setMessage("");
          handleLogin(data.user);
          history.push("/ducks");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div onSubmit={handleSubmit} className="login">
      <Logo title={"CryptoDucks"} />
      <p className="login__welcome">
        Esta aplicación contiene información altamente sensible. Por favor,
        inicia sesión o regístrate para acceder a CryptoDucks.
      </p>
      <p className="login__error">{message}</p>
      <form className="login__form">
        <label htmlFor="username">Iniciar sesión:</label>
        <input
          id="username"
          required
          name="username"
          type="text"
          value={data.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          required
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <div className="login__button-container">
          <button type="submit" className="login__link">
            Iniciar sesión
          </button>
        </div>
      </form>

      <div className="login__signup">
        <p>¿Aún no eres miembro?</p>
        <Link to="/register" className="signup__link">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default Login;
