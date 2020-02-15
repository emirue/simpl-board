import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import App from '../imports/ui/App';
import '../imports/startup/client/index';
// import 'bootstrap/dist/css/bootstrap.min.css';

Meteor.startup(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});
