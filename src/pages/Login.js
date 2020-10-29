import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import trybewallet from './trybewallet.png';
import { changeEmail } from '../actions/index'
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    const { changeEmail } = this.props;
    return (
      <div className="login">
        <img alt="trybe-logo" src={ trybewallet } width="200px" />
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
          <Link to="/carteira" onClick={ () => changeEmail('testando') }>
            <Button variant="success" block type="submit">Entrar</Button>
          </Link>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.user.email
});

const mapDispatchToProps = (dispatch) => ({
  changeEmail: (email) => dispatch(changeEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
