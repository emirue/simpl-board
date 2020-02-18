/**
 * 제작 : emirue
 * 날짜 : 2020/02/15
 * 내용 : home
 */

import * as React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Header from "../common/Header";
import '../../stylesheets/home.scss';

library.add(
  fab,
);

function Home() {
  return (
    <>
      <Header />
      <section id="frameworks">
        <Container className="home-container text-center">
          <h2 className="section-header mb-0">Simpl Board Application</h2>
          <div className="section-desc">What's inside</div>
          <Row>
            <Col className="col-6" sm={true}>
              <div className="mb-2">
                <FontAwesomeIcon icon={['fab', 'node-js']} size="4x" />
              </div>
              <p>Meteor 1.9</p>
            </Col>
            <Col className="col-6" sm={true}>
              <div className="mb-2">
                <FontAwesomeIcon icon={['fab', 'react']} size="4x" />
              </div>
              <p>React 16</p>
            </Col>
            <Col className="col-6" sm={true}>
              <div className="mb-2">
                <FontAwesomeIcon icon={['fab', 'tumblr']} size="4x" />
              </div>
              <p>Typescript 3.7</p>
            </Col>
            <Col className="col-6" sm={true}>
              <div className="mb-2">
                <FontAwesomeIcon icon={['fab', 'bootstrap']} size="4x" />
              </div>
              <p>Bootstrap 4</p>
            </Col>
          </Row>
        </Container>
      </section>
      <section id="board">
        <Container className="home-container text-center">
          <h2 className="section-header pb-3">Board</h2>
          <Table striped={true} bordered={true} hover={true}>
            <thead>
            <tr>
              <th>title</th>
              <th>contents</th>
              <th>date time</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>title</td>
              <td>contents</td>
              <td>date time</td>
            </tr>
            <tr>
              <td>title</td>
              <td>contents</td>
              <td>date time</td>
            </tr>
            <tr>
              <td>title</td>
              <td>contents</td>
              <td>date time</td>
            </tr>
            <tr>
              <td>title</td>
              <td>contents</td>
              <td>date time</td>
            </tr>
            <tr>
              <td>title</td>
              <td>contents</td>
              <td>date time</td>
            </tr>
            <tr>
              <td>title</td>
              <td>contents</td>
              <td>date time</td>
            </tr>
            <tr>
              <td>title</td>
              <td>contents</td>
              <td>date time</td>
            </tr>
            <tr>
              <td>title</td>
              <td>contents</td>
              <td>date time</td>
            </tr>
            <tr>
              <td>title</td>
              <td>contents</td>
              <td>date time</td>
            </tr>
            <tr>
              <td>title</td>
              <td>contents</td>
              <td>date time</td>
            </tr>
            <tr>
              <td>title</td>
              <td>contents</td>
              <td>date time</td>
            </tr>
            <tr>
              <td>title</td>
              <td>contents</td>
              <td>date time</td>
            </tr>
            </tbody>
          </Table>
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" aria-label="Previous" tabIndex={-1}>
                  <FontAwesomeIcon icon={faAngleDoubleLeft} />
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              <li className="page-item active">
                <span className="page-link">1
                  <span className="sr-only">(current)</span>
                </span>
              </li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <FontAwesomeIcon icon={faAngleDoubleRight} />
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </Container>
      </section>
    </>
  );
}
export default Home;
