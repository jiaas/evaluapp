import React from 'react';
import { Link } from 'react-router';

export default class Login extends React.Component {
  render() {
    return (
      <div>
      <h1> Ingresar a Evaluapp </h1>

      iniciar sesión.
      <Link to="/signup">O si no tienes cuenta, puedes registrarte AQUÍ.</Link>
      </div>
    );
  }
}

