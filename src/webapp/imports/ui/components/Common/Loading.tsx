/**
 * 제작 : emirue
 * 날짜 : 2020/02/16
 * 내용 :
 */
import * as React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faSpinner);

function Loading () {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="text-center">
          <FontAwesomeIcon icon={faSpinner} pulse size="4x" />
        </Col>
      </Row>
    </Container>
  );
}

export default Loading;
