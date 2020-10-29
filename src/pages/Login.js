import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import trybewallet from './trybewallet.png';
import { changeEmail } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.state = {
      email: '',
    };
  }

  changeHandler(event) {
    this.setState({
      email: event.target.value,
    });
  }

  render() {
    const { fieldChange } = this.props;
    const { email } = this.state;
    return (
      <div className="login">
        <img alt="trybe-logo" src={ trybewallet } width="200px" />
        <Form>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Enter email"
              data-testid="email-input"
              value={ email }
              onChange={ this.changeHandler }
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              data-testid="password-input"
            />
          </Form.Group>
          <Link to="/carteira" onClick={ () => fieldChange(email) }>
            <Button variant="success" block>Entrar</Button>
          </Link>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fieldChange: (email) => dispatch(changeEmail(email)),
});

Login.propTypes = {
  fieldChange: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
