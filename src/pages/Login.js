import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validate: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
  }

  validateInputs() {
    const { email, password } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    const numMax = 6;
    this.setState({
      validate: emailRegex && password.length >= numMax,
    });
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    }, () => this.validateInputs());
  }

  handleSubmit() {
    const { actionLogin } = this.props;
    const { email } = this.state;
    actionLogin(email);
  }

  render() {
    const { email, validate } = this.state;
    return (
      <div style={ { margin: 'auto', width: '30%' } }>
        <h1 style={ { textAlign: 'center' } }>LOGIN</h1>
        <fieldset style={ { textAlign: 'center' } }>
          <form>
            <label htmlFor="email-inpu">
              Email:
              <br />
              <input
                name="email"
                type="email"
                data-testid="email-input"
                value={ email }
                onChange={ (event) => this.handleChange(event) }
              />
            </label>
            <br />
            <label htmlFor="password-input">
              Senha:
              <br />
              <input
                name="password"
                type="password"
                data-testid="password-input"
                onChange={ (event) => this.handleChange(event) }
              />
            </label>
            <br />
            <Link to="/carteira">
              <button
                id="botaoEnviar"
                style={ { marginTop: '10px' } }
                type="submit"
                onClick={ () => this.handleSubmit() }
                disabled={ !validate }
              >
                Entrar
              </button>
            </Link>
          </form>
        </fieldset>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionLogin: (email) => dispatch(login(email)),
});

Login.propTypes = { actionLogin: PropTypes.func.isRequired };

export default connect(null, mapDispatchToProps)(Login);
