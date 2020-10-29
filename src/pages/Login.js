import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { user } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.ChangeEmail = this.ChangeEmail.bind(this);
    this.ChangePassword = this.ChangePassword.bind(this);

    this.state = {
      email: '',
      password: '',
      emailValid: false,
      passwordValid: false,
    };
  }

  ChangeEmail(e) {
    const email = e.target.value;
    let emailValid = false;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.toLowerCase())) {
      emailValid = true;
    }
    this.setState({ email, emailValid })
  }

  ChangePassword(e) {
    const password = e.target.value;
    let passwordValid = false;
    if (password.length >= 6) {
      passwordValid = true;
    }
    this.setState({ password, passwordValid })
  }

  render() {
    const { email, emailValid, passwordValid } = this.state;
    const { loginUser } = this.props;
    return (
      <div>
        <form onSubmit={this.submitName}>
          <h1>Trybe</h1>
            <input 
              type='text' placeholder="Enter e-mail" data-testid="email-input"
              onChange={ this.ChangeEmail }
            />
            <input 
              type='password' placeholder="Enter password" data-testid="password-input"
              onChange={ this.ChangePassword }
            />
            <Link to="/carteira">
              <button 
                type="button" disabled={ !(emailValid && passwordValid) }
                onClick={() => loginUser(email)}
              >
                Entrar
              </button>
            </Link>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => (
  { loginUser: (email) => dispatch(user(email)) }
);

export default connect(null, mapDispatchToProps)(Login);
