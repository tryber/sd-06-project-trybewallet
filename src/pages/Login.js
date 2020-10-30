import React from 'react';
import { connect } from 'react-redux';
import propType from 'prop-types';
import { Link } from 'react-router-dom';
import login from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: '',
      // password: '',
      isEmail: true,
      isPassword: true,
    };
  }

  handleChangeEmail({ target }) {
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,64}/;
    const email = target.value;
    const boolean = email.match(reg);

    if (boolean !== null) {
      this.setState({ isEmail: false, email });
    } else {
      this.setState({ isEmail: true, email });
    }
  }

  handleChangePassword({ target }) {
    const password = target.value;
    const passwordLength = 6;

    if (password.length >= passwordLength) {
      this.setState({ isPassword: false });
    } else {
      this.setState({ isPassword: true });
    }
  }

  handleClick() {
    const { addEmail } = this.props;
    const { email } = this.state;
    addEmail(email);
  }

  render() {
    const { isEmail, isPassword } = this.state;
    const validate = isEmail + isPassword;

    return (
      <div>
        <h1>Digite email e senha:</h1>
        <input
          type="email"
          data-testid="email-input"
          onChange={ this.handleChangeEmail }
        />
        <input
          type="password"
          data-testid="password-input"
          onChange={ this.handleChangePassword }
        />
        <Link
          to="/carteira"
        >
          <button
            type="button"
            disabled={ validate }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(login(email)),
});

Login.propTypes = {
  addEmail: propType.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
