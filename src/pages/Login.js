import React from 'react';
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isValid: false,
    };

    emailOK() {
      const MIN_LENGTH = 6;
      const { email, password } = this.state;
      this.setState({
        isValid: /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)
          && password.length >= MIN_LENGTH,
      });
    }

    handleChange({ target }) {
      this.setState({ [target.name]: target.value }, () => {
        this.emailOK();
      });
    }
  }
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
          onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            name="password-input"
            id="password-input"
            minLength="6"
            required
          // onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          id="button-login"
        // disabled={ isDisable }
        // onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>;
    }
}

  export default Login;
