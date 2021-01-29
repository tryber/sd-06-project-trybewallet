import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../redux/actions/index';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChanges = this.handleChanges.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      isValid: false,
    };
  }

  validateInputs() {
    const { email, password } = this.state;
    const EMAIL_REGEX = RegExp(/^[\w-.]+@(([\w-]+.)+[\w-]{2,4})$/g).test(email);
    const PASS_VALIDATION = 6;
    this.setState({
      isValid: EMAIL_REGEX && password.length >= PASS_VALIDATION,
    });
  }

  handleChanges({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      this.validateInputs();
    });
  }

  handleSubmit() {
    const { email } = this.state;
    const { handleLogin, history } = this.props;
    handleLogin(email);
    history.push('/carteira');
  }

  render() {
    const { isValid } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email-input">
            Login:
            <input
              name="email"
              type="email"
              data-testid="email-input"
              id="email-input"
              className="Email"
              placeholder="your@email.com"
              onChange={ (e) => this.handleChanges(e) }
            />
          </label>
          <label htmlFor="password-input">

            Senha:
            <input
              name="password"
              type="password"
              data-testid="password-input"
              id="password-input"
              className="Senha"
              placeholder="password"
              onChange={ (e) => this.handleChanges(e) }
            />
          </label>
          <br></br>
          <button
            type="button"
            disabled={ !isValid }
            onClick={ this.handleSubmit }
            className="Entrar"
          >
            CheckIn
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (data) => dispatch(login(data)),
});

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
