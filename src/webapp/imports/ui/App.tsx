/**
 * 제작 : emirue
 * 날짜 : 2020-02-15
 * 내용 : routes
 */

import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { useTracker } from 'meteor/npdev:collections';
// @ts-ignore
import { Loadable } from 'meteor/npdev:react-loadable';
import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loading from './components/common/Loading';

import Login from './components/Login';
import Home from './components/Home';
import NotFound from './components/NotFound';

const AdminLayout = Loadable({
  loader: () => import('./containers/layouts/AdminLayout'),
  loading: Loading,
});

const AdminApp = Loadable({
  loader: () => import('./components/Admin/AdminApp'),
  loading: Loading,
});

const PrivateRoute = ({ render, ...props }) => {
  const { userId } = useTracker(() => ({
    userId: Meteor.isClient && Meteor.userId(),
  }));
  return <Route render={
    (routeProps) => (userId
      ? render(Object.assign({ userId }, props, routeProps))
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />)
  } />
};

/** Redirect to Login page when user is not logged in */
function forceLogin(location: any, replaceWith: (route: string) => void) {
  if (Meteor.user() === null) {
    replaceWith('/login');
  }
}

class App extends React.Component<any, any>{
  componentDidMount(): void {
    const body = document.body;
    body.classList.add('app');
    body.classList.add('flex-row');
    body.classList.add('align-items-center');
  }

  public render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" component={Login} />
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
      </>
    );
  }
}

export default App;
