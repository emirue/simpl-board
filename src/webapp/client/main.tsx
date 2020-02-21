/**
 * 제작 : emirue
 * 날짜 : 2020/02/21
 * 내용 :
 */
import * as React from 'react';
import { Meteor } from 'meteor/meteor';
import * as ReactDOM from 'react-dom';
import App from '../imports/ui/App';
import '../imports/startup/client/index';
import '../imports/startup/both/index';
// import 'bootstrap/dist/css/bootstrap.min.css';

Meteor.startup(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});
