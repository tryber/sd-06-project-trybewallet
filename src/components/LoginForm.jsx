import React from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  render() {
    return(
      <form>
        <fieldset>
          <legend>Login</legend>
          <label htmlFor="email-input">
            Email:
            <input
              name="user-email"
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

export default LoginForm;
