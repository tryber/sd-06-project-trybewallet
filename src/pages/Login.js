import React from 'react';
import { conect } from 'react-redux';
import { saveData } from '../actions';


class Login extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(click);
    this.handleChange = this.handleChange.bind(click);
    this.checkButtonValidity = this.checkButtonValidity.bind(click);

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: 'true',
    };
  }

  handleClick() {
    const { save, history } = this.props;
    const { email } = this.state;
    save(email);
    history.push('./carteira');
  }

  checkButtonValidity() {
    const { email, password } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const testEmail = emailRegex.test(email);
    const passwordMinLength = 5;
    const testPassword = (password.length >= passwordMinLength);
    return (testEmail && testPassword);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    const buttonValidity = this.checkButtonValidity();
    if (buttonValidity) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }


  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
          <input
              type="text"
              name="email"
              required
              id="email"
              data-testid="email-input"
              onClick={this.handleChange}
            />
          </label>
          <label>
            Senha:
          <input
              type="text"
              name="password"
              id="password"
              data-testid="password-input"
              onClick={this.handleChange}
            />
          </label>
          <button
            type="button"
            disabled={isButtonDisabled}
            onClick={() => this.handleClick()}
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  save: (email) => dispatch(saveData(email)),
});

export default conect(null, mapDispatchToProps)(Login);
