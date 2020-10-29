import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.disabledButton = this.disabledButton.bind(this);
  }

  handleChange({ target }) {
    this.setState({ target: target.value }), () => {
      const { password, email } = this.state;
      const passLength = 6;
      const emailValidation = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(email);
      if (password >= passLength && emailValidation) {
        return this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    };
  }

  goingToWallet(event) {
    const { history } = this.props;
    event.preventDefault();
    history.push('/carteira');
  }

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <form onSubmit={ this.goingToWallet }>
          <label>
            E-mail:
          <input 
            type="email"
            value=""
            data-testid="email-input"
            onChange={ this.handleChange }
            required
          />
          </label>
          <label>
            Password
          <input type="password"
            value=""
            data-testid="password-input"
            minlength="6"
            onChange={ this.handleChange } required
          />
          </label>
        </form>
        <button
          type="button"
          disabled={ disabled }
          onClick={ (e) => this.goingToWallet(e) }
        >Entrar
        </button>
      </div>
    );
  };
};

export default Login;
