import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fillEmail } from '../actions';
import './Login.css';

class Login extends Component {
  constructor() {
    super();

    this.testEmail = this.testEmail.bind(this);
    this.testPassword = this.testPassword.bind(this);

    this.state = {
      email: '',
      password: '',
      doneEmail: false,
      donePassword: false,
    };
  }

  testEmail(value) {
    const isValid = value.match(/^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/);
    const { _Email } = this.props;
    if (isValid) {
      _Email(value);
      return this.setState({ email: value, doneEmail: true });
    }
    return this.setState({ email: value, doneEmail: false });
  }

  testPassword(value) {
    // const { donePassword } = this.state;
    const six = 6;
    if (value.length >= six) {
      return this.setState({ password: value, donePassword: true });
    }
    return this.setState({ password: value, donePassword: false });
  }

  render() {
    const { email, password, doneEmail, donePassword } = this.state;
    return (
      <div className="main-content">
        <h1 className="header">Trybe - WALLET</h1>
        <label htmlFor="email" className="email">
          Email:
          <input
            type="email"
            required
            value={ email }
            onChange={ ({ target: { value } }) => this.testEmail(value) }
            data-testid="email-input"
            className="input-email"
          />
        </label>
        <br />
        <div className="separator" />
        <label htmlFor="password" className="password">
          Senha:
          <input
            type="password"
            value={ password }
            required
            onChange={ ({ target: { value } }) => this.testPassword(value) }
            data-testid="password-input"
            className="input-password"
          />
        </label>
        <br />
        <Link to="/carteira">
          <button
            id="entryButton"
            type="button"
            data-testid="button-login"
            className="button-login"
            disabled={ !donePassword || !doneEmail }
            onClick={ () => fillEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  _Email: (email) => dispatch(fillEmail(email)),
});

Login.propTypes = {
  _Email: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
