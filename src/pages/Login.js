import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from '../actions/actionsCreator';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.canBeSubmited = this.canBeSubmited.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toWallet = this.toWallet.bind(this);
  };
  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  }; 

  canBeSubmited() {
    const { email, password } = this.state;
    const checkEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    return checkEmail && password.length >= 6;
    }

  toWallet(evt) {
   if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
   } else {
     const { email } = this.state;
    const { history, submitButton } = this.props;
    submitButton(email);
    history.push('carteira');
    }
  } 

  render() {
    const isEnabled = this.canBeSubmited();
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input
            type='email'
            value={ this.state.email }
            onChange={ this.handleEmailChange }
            placeholder="email"
            data-testid="email-input"
            required
          />
          <input
            type='password'
            placeholder="password"
            value={ this.state.password }
            data-testid="password-input"
            onChange={ this.handlePasswordChange }
            minLength="6"
            required
          />
          <button
            disabled={ !isEnabled}
            onClick={ this.toWallet }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (dispatch) => ({
  loginAction: (e) => dispatch(loginAction(e)),
})
export default connect(null, mapStateToProps)(Login);
