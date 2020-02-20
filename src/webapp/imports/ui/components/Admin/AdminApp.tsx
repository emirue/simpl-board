/**
 * 제작 : emirue
 * 날짜 : 2020/02/16
 * 내용 :
 */

import * as React from 'react';
import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { useTracker } from 'meteor/react-meteor-data';
import { Route, Switch, Redirect } from 'react-router-dom';
import AdminHome from './Home/AdminHome';
import AdminBoard from './Board/AdminBoard';
import AdminLayout from '../../containers/layouts/AdminLayout';

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

function AdminApp(): JSX.Element {
  return (
    <Switch>
      <PrivateRoute exact={true} path="/admin" render={(props) => (
        <AdminLayout title="Admin Home" {...props}>
          <AdminHome {...props}/>
        </AdminLayout>
      )} />
      <PrivateRoute path="/admin/board" render={(props) => (
        <AdminLayout title="Admin Board" {...props}>
          <AdminBoard {...props}/>
        </AdminLayout>
      )} />
    </Switch>
  );
}

export default AdminApp;
