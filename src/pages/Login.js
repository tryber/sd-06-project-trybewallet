import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      disabledButton: true,
      inputEmailUser: '',
      inputPassword: '',
    };
    this.verifyEmail = this.verifyEmail.bind(this);
    this.handleOnclick = this.handleOnclick.bind(this);
  }

  verifyEmail({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
      disabledButton: true,
    });
    const { inputPassword, inputEmailUser, disabledButton } = this.state;
    const verify = /\S+@\S+\.\S+/;
    const validEmail = verify.test(inputEmailUser);
    const minimumPasswordCharacter = 4;
    if (validEmail && inputPassword.length > minimumPasswordCharacter) {
      return this.setState({ disabledButton: false });
    }
    return disabledButton;
  }

  handleOnclick() {
    const { inputEmailUser } = this.state;
    const { login, history } = this.props;
    console.log(history);
    history.push('/carteira');
    return login(inputEmailUser);
  }

  render() {
    const { disabledButton, inputEmailUser, inputPassword } = this.state;
    return (
      <div>
        <label htmlFor="userEmail">
          E-mail:
          <input
            data-testid="email-input"
            type="email"
            name="inputEmailUser"
            id="userEmail"
            value={ inputEmailUser }
            onChange={ this.verifyEmail }
          />
        </label>
        <label htmlFor="userName">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            name="inputPassword"
            id="userPass"
            value={ inputPassword }
            onChange={ this.verifyEmail }
          />
        </label>
        <button
          onClick={ this.handleOnclick }
          type="button"
          disabled={ disabledButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(addUser(email)),
});

Login.propTypes = {
  login: PropTypes.objectOf(PropTypes.func).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
