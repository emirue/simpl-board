/**
 * 제작 : emirue
 * 날짜 : 2020-02-15
 * 내용 : routes
 */

import { Meteor } from 'meteor/meteor';
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';
import Login from './components/Login';
import Home from './components/Home';
// import Admin from './components/Admin';
// import TasksContainer from './containers/TasksContainer';

/** Redirect to Login page when user is not logged in */
function forceLogin(location: any, replaceWith: (route: string) => void) {
  if (Meteor.user() === null) {
    replaceWith('/login');
  }
}

class Root extends React.Component<any, any> {
  render() {
    const { store } = this.props;

    return (
      <Router>
        <Switch>
          <App>
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
            {/*<Route path="/admin" component={Admin} onEnter={forceLogin}>*/}
            {/*  <Route path="tasks" component={TasksContainer} />*/}
            {/*</Route>*/}
          </App>
        </Switch>
      </Router>
    );
  }
}

export default Root;
