import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';
import {onAuthChange, routes} from "../imports/routes/routes";


//Tracker is running an anonymous function
Tracker.autorun( () => {
  const isAuthenticated = !!Meteor.userId(); //Meteor.userID native way to return the user.id
  onAuthChange(isAuthenticated); //Record if session state changes.
});


Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
