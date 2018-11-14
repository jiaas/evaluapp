import React from 'react';
import {Link} from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
  
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

    Accounts.createUser({email, password}, (err) => {
      console.log('Signup callbak', err);
    })
  

    // this.setState(
    //   {
    //     error: 'Tenemos problemas amiguito'
    //   }
    // )
  }


  render() {
    return(
      <div>
        <h1>Registrate en Evaluapp</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

       <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" ref="email" name="email" placeholder="Correo"/>
          <input type="password" ref="password" name="password" placeholder="Contraseña"/>
          <button> Crear Cuenta</button>
       </form>
        
        <Link to="/login"> O inicie sesión con su cuenta.</Link>

      </div>
    )
  }
}
