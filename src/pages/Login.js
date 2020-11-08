import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionsEmailLogin, savePassword } from '../actions';
// import userReducers from '../reducers/user';

class Login extends React.Component {
  constructor() {
    super();
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

    const { password } = this.state;
    const { dispatchSavePassword } = this.props;
    dispatchSavePassword(password);

    const { email } = this.state;
    const { dispatchSaveEmail } = this.props;
    dispatchSaveEmail(email);
  }

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={ this.handleSignUp }>
          <input
            type="text"
            value={ email }
            placeholder="email"
            data-testid="email-input"
            name="email"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            value={ password }
            data-testid="password-input"
            placeholder="password"
            name="password"
            maxLength="6"
            onChange={ this.handleChange }
          />
          <Link to="/carteira">
            <button
              type="submit"
              onClick={ this.validateRegister }
              disabled={ isDisabled }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   email: state.email,
//   password: state.password,
// });

Login.propTypes = {
  history: PropTypes.func.isRequired,
  sendEmail: PropTypes.string.isRequired,
  dispatchSaveEmail: PropTypes.func.isRequired,
  dispatchSavePassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveEmail: (email) => dispatch(actionsEmailLogin(email)),
  dispatchSavePassword: (password) => dispatch(savePassword(password)),
});

// // // export default connect(mapStateToProps, mapDispatchToProps)(Login);

export default connect(null, mapDispatchToProps)(Login);
