import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginInput } from '../actions';

class LoginForm extends React.Component {
  render() {

    const { email, userLogin } = this.props;

    return(
      <form>
        <fieldset>
          <legend>Login</legend>
          <label htmlFor="email-input">
            Email:
            <input
              onChange={ ({ target }) => userLogin(target.name, target.value) }
              name="email"
              type="text"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              name="user-password"
              type="password"
              data-testid="password-input"
              minLength="6"
            />
          </label>
          <Link to="/carteira">
            <button type="submit">Entrar</button>
          </Link>
        </fieldset>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (name, input) => dispatch(loginInput(name, input)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
