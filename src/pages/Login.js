import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValidation: false,
      passwordValidation: false,
      anableBTN: false,
    };
    this.handleState = this.handleState.bind(this);
    this.handleBTN = this.handleBTN.bind(this);
  }

  handleState({ target }) {
    const { name, value } = target;
    const regex = {
      email: /^[_a-z0-9.-]+@[a-z0-9]+\.com/,
      password: /[a-z0-9]{6,}/,
    };
    const handleInput = value.match(regex[name]) !== null;
    this.setState({
      [name]: value,
      [`${name}Validation`]: handleInput,
    },
    this.handleBTN);
  }

  handleBTN() {
    const { emailValidation, passwordValidation } = this.state;
    const anableBTN = (emailValidation && passwordValidation);
    this.setState({ anableBTN });
  }

  render() {
    const { loginPath } = this.props;
    const { email, password, anableBTN } = this.state;
    const walletPage = anableBTN ? '/carteira' : '#';
    return (
      <div>
        <form className="login-input">
          <input
            type="text"
            name="email"
            className="input-box"
            data-testid="email-input"
            placeholder="E-mail"
            value={ email }
            onChange={ this.handleState }
          />
          <br />
          <input
            type="text"
            name="password"
            className="input-box"
            data-testid="password-input"
            placeholder=""
            value={ password }
            onChange={ this.handleState }
          />
          <br />
          <Link to={ walletPage } className="link-button">
            <button
              type="button"
              className="button-box"
              disabled={ !anableBTN }
              onClick={ () => loginPath(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ loginPath: (e) => dispatch(signLogin(e)) });
export default connect(null, mapDispatchToProps)(Login);

Login.defaultProps = {
  loginPath: {},
};

Login.propTypes = {
  loginPath: PropTypes.objectOf(PropTypes.string),
};
