import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propType from 'prop-types';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      invalidEmail: true,
      invalidPass: true,
      errorMessageEmail: '',
      errorMessagePass: '',
      redirect: false,
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEmail(e) {
    const email = e.target.value;
    const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,64}/;
    const emailValid = email.match(emailValidator);
    if (emailValid !== null) {
      this.setState({
        invalidEmail: false,
        email,
      });
    } else {
      this.setState({
        invalidEmail: true,
        email,
      });
    }
  }

  handlePass(e) {
    const password = e.target.value;
    const passwordValidator = 6;
    if (password.length >= passwordValidator) {
      this.setState({
        invalidPass: false,
        password,
      });
    } else {
      this.setState({
        invalidPass: true,
        password,
      });
    }
  }

  verifyEmailAndPassWord(e) {
    const { invalidEmail, invalidPass } = this.state;
    if (e === 'email') {
      const invalidEmailMessage = 'Type a valid email';
      if (invalidEmail) {
        this.setState({
          errorMessageEmail: invalidEmailMessage,
        });
      } else {
        this.setState({
          errorMessageEmail: '',
        });
      }
    } else {
      const invalidPassMessage = 'Password must contain 6+ digits';
      if (invalidPass) {
        this.setState({
          errorMessagePass: invalidPassMessage,
        });
      } else {
        this.setState({
          errorMessagePass: '',
        });
      }
    }
  }

  handleClick() {
    // e.preventDefault();
    const { loginDispatch } = this.props;
    const { email } = this.state;
    loginDispatch(email);
    // const { email, password } = this.state;

    this.setState({
      redirect: true,
    });
  }

  render() {
    const { email, password, invalidEmail,
      invalidPass, errorMessageEmail, errorMessagePass, redirect } = this.state;
    return (
      <div className="container">
        <div>
          Login
          <form className="emailAndPassWord">
            Email:
            <input
              type="text"
              onChange={ this.handleEmail }
              onBlur={ () => this.verifyEmailAndPassWord('email') }
              value={ email }
              data-testid="email-input"
              required
              placeholder="Type your email"
            />
            { errorMessageEmail ? <span>{errorMessageEmail}</span> : null }
            Password:
            <input
              type="password"
              onChange={ this.handlePass }
              value={ password }
              data-testid="password-input"
              required="required"
              placeholder="Type your password"
              minLength="6"
            />
            { errorMessagePass ? <span>{errorMessagePass}</span> : null }
            <div className="classSubmitUser">
              <button
                className="btnSubmitUser"
                type="button"
                id="btnSubmit"
                disabled={ invalidEmail + invalidPass }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
              { redirect ? <Redirect to="/carteira" /> : null }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  loginDispatch: propType.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
