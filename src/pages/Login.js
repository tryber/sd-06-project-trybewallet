import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginInput } from '../actions';
import EmailInput from './Login_components/EmailInput';
import LoginButton from './Login_components/LoginButton';
import PasswordInput from './Login_components/PasswordInput';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: { isValid: false },
      password: { isValid: false },
    };

    this.handleChange = this.handleChange.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange({ target }, fieldName, validationFn) {
    const fieldState = {
      value: target.value,
      isValid: validationFn(target.value),
    };

    this.setState({
      [fieldName]: fieldState,
    });
  }

  isFormValid() {
    const values = Object.values(this.state);
    const arr = values.map((e) => e.isValid);
    return arr.reduce((acc, curr) => acc && curr, true) && values.length > 0;
  }

  login() {
    const { userLogin, history } = this.props;
    const { email } = this.state;

    userLogin('email', email.value);
    history.push('/carteira');
  }

  render() {
    return (
      <div>
        <form>
          <fieldset>
            <EmailInput handleChange={ this.handleChange } />
            <PasswordInput handleChange={ this.handleChange } />
            <LoginButton
              onClick={ this.login }
              disabled={ !this.isFormValid() }
            />
          </fieldset>
        </form>
      </div>
    );
  }
}

Login.defaultProps = {
  userLogin: () => {},
  history: {},
};

Login.propTypes = {
  userLogin: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.string),
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (name, input) => dispatch(loginInput(name, input)),
});

export default connect(null, mapDispatchToProps)(Login);
