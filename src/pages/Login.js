import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.verifyEmailAndPassword = this.verifyEmailAndPassword.bind(this);
  }

  handleSignUp(event) {
    event.preventDefault();
    const { sendEmail } = this.props;
    const { email } = this.state;
    sendEmail(email);
    const { history } = this.props;
    history.push('/carteira');
  }

  verifyEmailAndPassword() {
    const { email, password } = this.state;
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    const passwordMinLength = 6;

    this.setState({ isDisabled: !(password.length >= passwordMinLength && emailFormat) });
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      this.verifyEmailAndPassword();
    });
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        LOGIN
        <form onSubmit={ this.handleSignUp }>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button
            className="signUpBtn"
            type="submit"
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (emailUser) => dispatch(login(emailUser)),
});

Login.propTypes = {
  history: propTypes.shape({ push: propTypes.func }).isRequired,
  sendEmail: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
