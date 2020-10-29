import React from 'react';
import logo from './logotrybe.png';
import { Form, FormControl } from 'react-bootstrap';

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <img alt="trybe-logo" src={ logo } width="200px" />
        <br />
        <Form>
          <FormControl type="email" data-testid="email-input"/>
        </Form>
      </div>
    );
  }
}

export default Login;
