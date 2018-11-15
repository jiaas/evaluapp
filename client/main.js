import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Route, Router} from 'react-router';
//Import the components
import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';
import Login from '../imports/ui/Login';


//Two arrays with pages that are public.
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

//Anonymous function that checks if user is logged in or not.
//If user is logged in, he is redirected to home
const onEnterPublicPages = () => {
  if(Meteor.userId()) {
    browserHistory.replace('/links');
  }
};

//If user isn't logged in, he is redirected to the root web-component.
const onEnterPrivatePages = () => {
  if(!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

// Router is a react component
// The path is the url you see in the browser
// In component you specify the React Component you want to render.
// The onEnter attribute specify the
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPages}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPages}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePages}/>
    <Route path="/login" component={Login}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

//Tracker is running an anonymous function
Tracker.autorun( () => {
  const isAuthenticated = !!Meteor.userId(); //Meteor.userID native way to return the user.id
  const pathname = browserHistory.getCurrentLocation().pathname; //bH.getCurrentLocation returns the current url.

  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  //Access Control
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
