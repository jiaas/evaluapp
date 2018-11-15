import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

//Importo los componentes 
import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';
import Login from '../imports/ui/Login';


//Dos arreglos con las páginas públicas y las privadas (control de acceso).
const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/links']

//Función anónima que que re-direcciona validando si el usuario está logeado o no.
//Si está logeado se le envía al Home.
const onEnterPublicPages = () => {
  if(Meteor.userId()) {
    browserHistory.replace('/links');
  }
}

//Si no, se le envía a la raíz (la raíz se especifica en routes)
const onEnterPrivatePages = () => {
  if(!Meteor.userId()) {
    browserHistory.replace('/');
  }
}

// Router es un componente de react que permite declarar todas las rutas.
//Se asigna un path, que vendría siendo la url que se ve.
//Se especifica un componente a renderear y el onEnter sirve para ejecutar acciones al entrar a una página.
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPages}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPages}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePages}/>
    <Route path="/login" component={Login}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

//Funcion anónima que corre en tiempo real.
Tracker.autorun( () => {
  //Para saber si está autenticado, solo basta con saber si hay un Id en el Storage del navegador.
  const isAuthenticated = !!Meteor.userId();
  //Con esto recuperamos la página actual en la que se encuentra el usuario.
  const pathname = browserHistory.getCurrentLocation().pathname;
  //En estas constantes almacenamos un booleano que nos dice si el pathname (página acutal) corresponde
  //a una página que requiere autenticación
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  //Valido si es una página que requiere autenticación y si el usuario está autenticado.
  if(isUnauthenticatedPage && isAuthenticated){
    browserHistory.replace('/links');
   }else if (isAuthenticatedPage && !isAuthenticated){
    browserHistory.replace('/');
   }


  console.log('isAuthenticated', isAuthenticated);
});


Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
