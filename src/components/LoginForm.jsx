import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginInput } from '../actions';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      button: true,
    }

    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handlePassword({ target }) {
    const { name, value } = target;
    if (value.length >= 6) {
      this.setState({
        [name]: value,
      });
    } else {
      this.setState({
        [name]: '',
      });
    }
  }
  
  handleEmail({ target }) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { name, value } = target;
    if (emailRegex.test(value)) {
      this.setState({
        [name]: value,
      });
    } else {
      this.setState({
        [name]: '',
      });
    }
  }

  render() {

    const { userData } = this.props;
    const { email, password } = this.state;

    return(
      <form>
        <fieldset>
          <legend>Login</legend>
          <label htmlFor="email-input">
            Email:
            <input
              onChange={ this.handleEmail }
              name="email"
              type="text"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              onChange={ this.handlePassword }
              name="password"
              type="password"
              data-testid="password-input"
            />
          </label>
          <Link to="/carteira">
            <button
              disabled={ email !== '' && password !== '' ? false : true }
              onClick={ () => userData(email, password) }
              type="submit">
                Entrar
            </button>
          </Link>
        </fieldset>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userData: (email, password) => dispatch(loginInput(email, password)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
