import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

Meteor.startup(() => {
  Tracker.autorun(() => {
    
    let jsx = (
      <div>
      <h1>Hola Mundo!</h1>
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
    
  });
});
