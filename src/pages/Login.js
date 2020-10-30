import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../actions';
import '../App.css';
import trybeWallet from '../img/trybeWallet.png';

class Login extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.state = {
      email: '',
      validEmail: false,
      validPassword: false,
    };
  }

  handleClick() {
    const { addEmail } = this.props;
    const { email } = this.state;
    addEmail(email);
  }

  async handleChange({ target }) {
    const email = target.value;
    const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = validator.test(String(email).toLowerCase());
    if (isValid) {
      this.setState({ validEmail: true });
    } else {
      this.setState({ validEmail: false });
    }
    await this.setState({
      email: target.value,
    });
  }

  async handlePassword({ target }) {
    const passLength = target.value.length;
    const minLength = 6;
    if (passLength >= minLength) {
      this.setState({ validPassword: true });
    } else {
      this.setState({ validPassword: false });
    }
  }

  render() {
    const { validEmail, validPassword } = this.state;
    return (
      <div className="login-container">
        <div className="login-div">
          <div>
            <img src={ trybeWallet } alt="trybe-logo" />
          </div>
          <input data-testid="email-input" onChange={ this.handleChange } />
          <input data-testid="password-input" onChange={ this.handlePassword } />
          <Link to="/carteira">
            <button
              type="button"
              disabled={ !(validEmail && validPassword) }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(login(email)),
});

Login.propTypes = { addEmail: PropTypes.func.isRequired };
export default connect(null, mapDispatchToProps)(Login);
