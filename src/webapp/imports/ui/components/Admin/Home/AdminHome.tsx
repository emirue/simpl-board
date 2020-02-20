/**
 * 제작 : emirue
 * 날짜 : 2020/02/15
 * 내용 :
 */

import * as React from 'react';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import AdminNav from "../../../containers/layouts/AdminNav";
import '../../../stylesheets/admin-home.scss';

function AdminHome() {
  console.log('home');
  return (
    <>
      <AdminNav/>
      <Row id="admin-home-user-wrap">
        <Col>
          <h1>AdminHome</h1>
        </Col>
      </Row>
    </>
  );
}
export default AdminHome;
