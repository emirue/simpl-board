/**
 * 제작 : emirue
 * 날짜 : 2020/02/20
 * 내용 :
 */
import {Nav} from "react-bootstrap";
import * as React from "react";

function AdminNav(): JSX.Element {
  return (
    <Nav id="admin-nav-wrap">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/admin">Admin</a>
        </li>
        <li className="breadcrumb-item active">
          <a href="/admin">Home</a>
        </li>
      </ol>
    </Nav>
  );
}

export default AdminNav;
