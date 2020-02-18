/**
 * 제작 : emirue
 * 날짜 : 2020/02/19
 * 내용 :
 */

import * as React from "react";
import { Route, Switch } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Logout from '../components/Auth/Logout';

function AuthRoutes(): JSX.Element {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
    </Switch>
  )
}

export default AuthRoutes;
