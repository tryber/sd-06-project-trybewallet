import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleInput = this.handleInput.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, () => {
      const { email, password } = this.state;
      const emailVerify = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
      const passwordSize = 6;
      if (emailVerify && password.length >= passwordSize) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  submitLogin(e) {
    e.preventDefault();
    const { history, loginDispatch } = this.props;
    const { email } = this.state;
    loginDispatch(email);
    history.push('carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <form onSubmit={ this.submitLogin }>
          <fieldset>
            <input
              type="email"
              data-testid="email-input"
              placeholder="Email"
              name="email"
              value={ email }
              onChange={ this.handleInput }
            />
            <input
              type="password"
              data-testid="password-input"
              placeholder="Password"
              name="password"
              value={ password }
              onChange={ this.handleInput }
            />
          </fieldset>
          <button type="submit" disabled={ isDisabled }>
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (payload) => dispatch(loginAction(payload)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loginDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
