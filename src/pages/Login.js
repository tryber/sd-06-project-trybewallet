import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const { email, password } = this.state;
    const { login } = this.props;
    const magic = 6;
    const activeButton = email.length > 0 && password.length > magic;

    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={ email }
            onChange={ (event) => this.setState({ email: event.target.value }) }
            required
            placeholder="alguem@alguem.com"
            data-testid="email-input"
          />
        </label>
        <br />
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={ password }
            onChange={ (event) => this.setState({ password: event.target.value }) }
            required
            placeholder="123456...¯\_(ツ)_/¯"
            minLength="6"
            data-testid="password-input"
          />
        </label>
        <br />
        <Link to="/carteira ">
          <button
            disabled={ !activeButton }
            type="button"
            onClick={ () => login(email) }
          >
            Entrar
          </button>
        </Link>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);
