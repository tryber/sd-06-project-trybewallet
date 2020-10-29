import React from 'react';
import { Form, Button } from 'react-bootstrap';

class Login extends React.Component {
  render() {
    const image = require('./trybeWallet.png');
    return (
      <div className="login">
        <img alt="trybe-logo" src={ image } width="200px" />
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
