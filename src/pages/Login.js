import React from 'react';
import { Form, Button } from 'react-bootstrap';
import trybeWallet from './trybeWallet.png';

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <img alt="trybe-logo" src={ trybeWallet } width="200px" />
        <Form>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Enter email"
              data-testid="email-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
            type="email"
            placeholder="Password"
            data-testid="password-input"
            />
          </Form.Group>
          <Button variant="success" block type="submit">Entrar</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
