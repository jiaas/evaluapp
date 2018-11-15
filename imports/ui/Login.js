import React from 'react';
import {Link} from 'react-router';


export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(event){
    event.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Accounts.createUser({email, password}, (e) => {
      if (e) {
        this.setState({error: 'Hubo un problema creando el usuario, revise los datos ingresados.'})
      } else {
        this.setState({error: ''})
      }
    })
  }


  
  render() {
    return (
      <div>
      <h1>Inicia Sesión</h1>

      {this.state.error ? <p>{this.state.error}</p> : undefined}

     <form onSubmit={this.onSubmit.bind(this)}>
        <input type="email" ref="email" name="email" placeholder="Correo"/>
        <input type="password" ref="password" name="password" placeholder="Contraseña"/>
        <button>INGRESAR</button>
     </form>

      <Link to="/signup">O si no tienes cuenta, puedes registrarte AQUÍ.</Link>
    </div>
    );
  }
}

