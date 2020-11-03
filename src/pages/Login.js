import React from 'react';
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isValid: false,
    };

    render() {
      const { email, password, isValid } = this.state;
      return
      <div>
        <label htmlFor="email-input">
          Email:
          <input
            data-testid="email-input"
            type="email"
            name="email-input"
            id="email-input"
            required
          // onChange={ this.handleChangeEmail }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            name="password-input"
            id="password-input"
            // minLength="6"
            required
          // onChange={ this.handleChangePass }
          />
        </label>
        <button
          type="button"
          id="button-login"
        disabled={ isDisable }
        // onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </div>;
    }
}

  export default Login;
