import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import action from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      password: '',
      email: undefined,
    };
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { password, email } = this.state;
    const re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com+$/;
    const { change } = this.props;
    const MIN = 6;
    const TRUE = true;
    const FALSE = false;
    return (
      <div>
        <div>
          Login
        </div>
        <label htmlFor="email">
          Email
          <input
            data-testid="email-input"
            id="email"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <label htmlFor="password">
          Senha
          <input
            data-testid="password-input"
            id="password"
            type="password"
            name="password"
            onChange={ this.handleChange }
          />
        </label>
        <div>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ (password.length >= MIN && re.test(email)) ? FALSE : TRUE }
              onClick={ () => change(email) }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  change: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  change: (value) => dispatch(action(value)),
});

export default connect(null, mapDispatchToProps)(Login);
