/**
 * 제작 : emirue
 * 날짜 : 2020/02/15
 * 내용 : 로그인
 */

import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { Container, Row, Col, CardGroup, Card, InputGroup, Alert, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

interface Props {
  history?: any;
}

interface State {
  email: string;
  hasError: boolean;
  isEmailRequired: boolean;
  isInvalid: boolean;
  isSent: boolean;
  password: string;
}

class Login extends React.Component<Props, State> {

  state: State = {
    email: '',
    hasError: false,
    isEmailRequired: false,
    isInvalid: false,
    isSent: false,
    password: '',
  };

  private onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (e) {
      e.preventDefault();
    }

    if (!this.state.email || !this.state.password) {
      this.setState({ isInvalid: true, isEmailRequired: false, hasError: false, isSent: false });
      return;
    }

    this.setState({ isInvalid: false, isEmailRequired: false, hasError: false, isSent: false });

    Meteor.loginWithPassword(this.state.email, this.state.password, (err) => {
      if (err) {
        this.setState({ isInvalid: false, isEmailRequired: false, hasError: true, isSent: false });
      } else {
        this.props.history.push('/admin');
      }
    });
  }

  private forgotPassword(e: React.FormEvent<HTMLFormElement>) {
    if (e) {
      e.preventDefault();
    }

    if (!this.state.email) {
      this.setState({ isInvalid: false, isEmailRequired: true, hasError: false, isSent: false });
      return;
    }

    Accounts.forgotPassword({ email: this.state.email }, (err) => {
      if (err) {
        this.setState({ isInvalid: false, isEmailRequired: false, hasError: true, isSent: false });
      }

      this.setState({ isInvalid: false, isEmailRequired: false, hasError: false, isSent: true });
    });
  }

  private handleChange<T extends keyof State, K extends State[T]>(name: T, event: React.FormEvent<HTMLInputElement>): void {
    const { value } = event.currentTarget;
    if (!value) {
      return;
    }
    // @ts-ignore
    this.setState({ [name]: value });
  }

  public render() {
    const { email, password } = this.state;
    return (
      <Container>
        {this.state.isSent ? <Alert variant="info">Please check your email</Alert> : ''}
        {this.state.isInvalid ? <Alert variant="danger">Please enter email and password</Alert> : ''}
        {this.state.isEmailRequired ? <Alert variant="danger">Please enter your email address first.</Alert> : ''}
        {this.state.hasError ? <Alert variant="danger">Login unsuccessful. Please try again.</Alert> : ''}
        <Row className="justify-content-center">
          <Col md={8}>
            <CardGroup>
              <Card className="p-4">
                <Form onSubmit={this.onSubmit.bind(this)}>
                  <Card.Body>
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      required
                      className="form-control"
                      autoFocus
                      placeholder="Username"
                      value={email}
                      onChange={this.handleChange.bind(this, 'email')}
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroup.Prepend>
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="password"
                      required
                      placeholder="Password"
                      value={password}
                      onChange={this.handleChange.bind(this, 'password')}
                    />
                  </InputGroup>
                  <Row>
                    <Col xs={6}>
                      <Button variant="primary" className="px-4">Login</Button>
                    </Col>
                    <Col xs={6} className="text-right">
                      <Button variant="link" className="px-0" onClick={this.forgotPassword.bind(this)}>Forgot password?</Button>
                    </Col>
                  </Row>
                </Card.Body>
                </Form>
              </Card>
              <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <Card.Body className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Button variant="primary" className="active mt-3">Register Now!</Button>
                  </div>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
