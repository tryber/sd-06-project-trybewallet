import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state= {
      email: '',
      password: '',
    }
  }

  onClick() {
    const { history } = this.props;
    const link = history.location.pathname;
    link.push('carteira');
  }

  onChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
          <label htmlFor="email">
            Email:
            <input data-testid="email-input" type="text" name="email" pattern="/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g" required
            onChange={this.onChange}
          ></input>
          </label>
          <label htmlFor="password">
            Senha:
            <input data-testid="password-input" type="password" name="password" minLength="6" required
            onChange={this.onChange}
            ></input>
          </label>
          <button type="submit" id="button-login" disabled onClick={this.onClick}>
          </button>
      </div>
    );
  }
}

export default Login;
