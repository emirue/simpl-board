/**
 * 제작 : emirue
 * 날짜 : 2020/02/15
 * 내용 : 404 not found
 */

import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="clearfix">
            <h1 className="float-left display-3 mr-4">404</h1>
            <h4 className="pt-3">Oops! You're lost.</h4>
            <p className="text-muted">The page you are looking for was not found.</p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <a href="/">Go Home!!</a>
      </Row>
    </Container>
  );
};
export default NotFound;
