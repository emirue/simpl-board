/**
 * 제작 : emirue
 * 날짜 : 2020/02/16
 * 내용 :
 */
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import AdminHome from "./Home";
import AdminBoard from "./Board";

export default function () {
  return (
    <Switch>
      <Route exact={true} path="/admin" component={AdminHome} />
      <Route path="/admin/board" component={AdminBoard} />
    </Switch>
  );
}
