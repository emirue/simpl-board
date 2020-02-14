import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import Root from '../imports/ui/Root';

Meteor.startup(() => {
  ReactDOM.render(
    <Root />,
    document.getElementById('root')
  );
});
