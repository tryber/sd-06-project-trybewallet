import React from 'react';
import trybeWallet from '../imgs/trybeWallet.png';

class Login extends React.Component {
  render() {
    return (
      <div>
        <img src={ trybeWallet } alt="Trybe logo" />
        <form>
          <fieldset>
            <legend>Login</legend>
            <label htmlFor="email">
              E-mail
              <input type="text" name="email" />
            </label>
            <label htmlFor="password">
              Password
              <input type="password" name="password" />
            </label>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Login;
