import React from 'react';
import md5 from 'crypto-js/md5';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.validateEmail = this.validateEmail.bind(this);

    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validName: false,
    };
  }

  validateEmail({ target }) {
    const email = target.value;
    const hash = md5(email);
    const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = validator.test(String(email).toLowerCase());
    if (isValid) {
      this.setState({
        validEmail: true,
        hash: hash.words,
      });
      this.handleHash();
    } else {
      this.setState({
        validEmail: false,
        hash: '',
      });
    }
  }

  render() {
    const { email, password } = this.props;
    return (
      <div>
        <div>
          <label>
            Email:
            <input
              type="email"
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder="Email"
              required
              data-testid="email-input"
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              required
              minlength="6"
              data-testid="password-input"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </label>
        </div>
        <button type="submit">Entrar</button>
      </div>
    );
  }
}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Login;
