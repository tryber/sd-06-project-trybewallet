import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginSucess } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      email: '',
    };

    this.validateFields = this.validateFields.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  validateFields() {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const emailInput = document.querySelector('#email-input').value;
    const passwordInput = document.querySelector('#password-input').value;
    const minPassword = 6;

    if (regex.test(emailInput) === true && passwordInput.length >= minPassword) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
    this.setState({ email: emailInput });
  }

  handleClick() {
    const { userLogin } = this.props;
    const { email } = this.state;
    userLogin(email);
  }

  render() {
    const { isDisabled } = this.state;

    return (
      <div>
        <h2>Login</h2>
        <input
          name="email"
          type="text"
          id="email-input"
          data-testid="email-input"
          placeholder="Digite seu Email"
          pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/"
          onChange={ this.validateFields }
        />
        <input
          name="password"
          type="text"
          id="password-input"
          data-testid="password-input"
          placeholder="Digite a Senha"
          minLength="6"
          onChange={ this.validateFields }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(loginSucess(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
