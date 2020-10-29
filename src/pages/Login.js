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
    return (
      <div>
        <div>
          Login
        </div>
        <label>Email</label>
        <input data-testid="email-input" name="email" onChange={ this.handleChange } />
        <br />
        <label>Senha</label>
        <input
          data-testid="password-input"
          type="password"
          name="password"
          onChange={ this.handleChange }
        />
        <div>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ (password.length >= MIN && re.test(email)) ? false : true }
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
