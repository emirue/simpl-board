/**
 * 제작 : emirue
 * 날짜 : 2020/02/15
 * 내용 : 로그인
 */

import * as React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Container, Row, Col, CardGroup, Card, InputGroup, Alert, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import '../../stylesheets/login.scss';

interface ILoginProps {
  history?: any;
}

interface ILoginState {
  email: string;
  hasError: boolean;
  isEmailRequired: boolean;
  isInvalid: boolean;
  isSent: boolean;
  password: string;
}

class Login extends React.Component<ILoginProps, ILoginState> {
  state: ILoginState = {
    email: '',
    hasError: false,
    isEmailRequired: false,
    isInvalid: false,
    isSent: false,
    password: '',
  };

  componentDidMount(): void {
    Tracker.autorun(() => {
      const currentUserId = Meteor.userId();
      if (currentUserId) {
        this.props.history.push('/');
      }
    });
  }

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
        this.props.history.push('/');
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

  private handleChange<T extends keyof ILoginState, K extends ILoginState[T]>(name: T, event: React.FormEvent<HTMLInputElement>): void {
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
                  <InputGroup className="mb-3">
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
                  <div className="mb-3">
                    <Button type="submit" variant="primary" className="btn-login">Login</Button>
                  </div>
                  <div className="join-wrap">
                    <Button id="go-find-password" variant="link" onClick={this.forgotPassword.bind(this)}>Forgot password?</Button>
                    <a href="/join">Join us</a>
                  </div>
                </Card.Body>
                </Form>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
