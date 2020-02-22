/**
 * 제작 : emirue
 * 날짜 : 2020-02-15
 * 내용 : routes
 */

import { Meteor } from 'meteor/meteor';
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import AdminApp from './components/Admin/AdminApp';
import NotFound from './components/NotFound';
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import Join from "./components/Auth/Join";
import ExtendApp from "./ExtendApp";

/** Redirect to Login page when user is not logged in */
function forceLogin(location: any, replaceWith: (route: string) => void) {
  if (Meteor.user() === null) {
    replaceWith('/login');
  }
}

class App extends React.Component<any, any>{
  componentDidMount(): void {
    const body: HTMLElement = document.body;
    body.classList.add('app');
    body.classList.add('flex-row');
    body.classList.add('align-items-center');
  }

  public render(): JSX.Element {
    console.log('app');
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/join" component={Join} />
            <Route path="/admin" component={AdminApp} />
            {/*<PrivateRoute path="/admin" render={(props) => (*/}
            {/*  <AdminApp {...props} />*/}
            {/*)} />*/}
            {/*<Route path="/admin" component={Admin} onEnter={forceLogin}>*/}
            {/*  <Route path="tasks" component={TasksContainer} />*/}
            {/*</Route>*/}
            <Route component={NotFound} />
          </Switch>
        </Router>
        <ExtendApp/>
      </>
    );
  }
}

export default App;
