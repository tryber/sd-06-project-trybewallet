import React from 'react';
import Wallet from './Wallet'
import { storeUserEmail } from '../action/index'

class Login extends React.Component {
  constructor() {
    super();
    // binds
    this.handleEmailValidate = this.handleEmailValidate.bind(this);
    this.handleEmailValidate = this.handlePasswordValidate.bind(this);

    // state
    this.state = {
        email: '',
        isValidEmail: false,
        isValidPassword: false,
    }
  }

  handleEmailValidate = (password) => {
    let isValidEmail = false;

    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(email.toLowerCase())) {
      isValidEmail = true;
    } else {
      this.setState({
        isValidEmail: false,
      })
    }

    this.setState({
      email,
      isValidEmail,
    });
  }

  handlePasswordValidate = (password) => {
    let isValidPassword = false;

    if(password.length >= 6) {
      isValidPassword = true;
    } else {
      this.setState({
        isValidPassword: false,
      })
    }
    this.setState({
      isValidPassword,
    });
  }

  render() {
    const { sendEmailToStore } = this.props;

    return (
      <div>
        <Wallet />
        <form>
          <p>Email</p>
          <input
          data-testid="email-input"
            type='text'
            name='email'
            onChange={e => this.handleEmailValidate(e.target.value)}
          />
          <p>Password</p>
          <input
            data-testid="password-input"
            type='password'
            name='password'
            onChange={e => this.handlePasswordValidate(e.target.value)}
          />
          <button
            type="button"
            name="loginbtn"
            onClick={() => sendEmailToStore(this.state.email)}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  sendEmailToStore: (email) => dispatch(storeUserEmail(email));
}

export default connect(null, mapDispatchToProps)(Login);
