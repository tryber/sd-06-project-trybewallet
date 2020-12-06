import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Wallet from './Wallet';
import { getUserEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    // binds
    this.handleEmailValidate = this.handleEmailValidate.bind(this);
    this.handlePasswordValidate = this.handlePasswordValidate.bind(this);

    // state
    this.state = {
      email: '',
      isValidEmail: false,
      isValidPassword: false,
    };
  }

  handleEmailValidate(email) {
    const regex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

    if (regex.test(email.toLowerCase())) {
      this.setState({ isValidEmail: true, email });
    } else {
      this.setState({ isValidEmail: false });
    }
  }

  handlePasswordValidate(password) {
    const passwordMinimunLength = 6;

    if (password.length >= passwordMinimunLength) {
      this.setState({ isValidPassword: true });
    } else {
      this.setState({ isValidPassword: false });
    }
  }

  render() {
    const { isValidEmail, isValidPassword, email } = this.state;
    const { sendEmailToStoreAsProps } = this.props;
    // const { email } = this.state;

    return (
      <div>
        {/* <Wallet /> */}
        {/* <form> */}
        <p>Email</p>
        <input
          data-testid="email-input"
          type="text"
          name="email"
          onChange={ (e) => this.handleEmailValidate(e.target.value) }
        />
        <p>Password</p>
        <input
          data-testid="password-input"
          type="password"
          name="password"
          onChange={ (e) => this.handlePasswordValidate(e.target.value) }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !(isValidEmail && isValidPassword) }
            onClick={ () => sendEmailToStoreAsProps(email) }
          >
            Entrar
          </button>
        </Link>
        {/* </form> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmailToStoreAsProps: (email) => dispatch(getUserEmail(email)),
});

Login.propTypes = {
  sendEmailToStoreAsProps: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
