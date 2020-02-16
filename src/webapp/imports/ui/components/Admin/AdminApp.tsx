/**
 * 제작 : emirue
 * 날짜 : 2020/02/16
 * 내용 :
 */
import * as React from "react";
import { Switch,  Route } from "react-router-dom";
import AdminHome from "./Home";
import AdminBoard from "./Board";

export default function (props) {
  console.log(props.path);
  return (
    <Switch>
      <Route path="/board" component={AdminBoard} />
      <Route exact={true} path={props.path} component={AdminHome} />
    </Switch>
  )
}

