import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);

    this.state = {
      email: '',
      password: '',
      canEnter: false,
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.checkInputs());
  }

  checkInputs() {
    const { email, password } = this.state;
    const VALID_EMAIL = RegExp(/^[\w-.]+@(([\w-]+.)+[\w-]{2,4})$/g).test(email);
    const PASS_LENGTH = 5;
    this.setState({
      canEnter: password.length > PASS_LENGTH && VALID_EMAIL,
    });
  }

  render() {
    const { email, password, canEnter } = this.state;
    const { registerUser } = this.props;
    return (
      <form>
        <label htmlFor="user-email">
          Email
          <input
            data-testid="email-input"
            id="user-email"
            name="email"
            pattern="/^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/"
            type="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <label htmlFor="password">
          Password
          <input
            data-testid="password-input"
            id="password"
            name="password"
            type="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !canEnter }
            onClick={ () => registerUser(email, password) }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  registerUser: (email) => dispatch(register(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  registerUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
