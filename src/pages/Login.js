import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMail = this.handleChangeMail.bind(this);
    this.validadeLogin = this.validadeLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: '',
      disabled: true,
    };
  }

  handleChange(e) {
    this.handleChangeMail(e);
    this.validadeLogin();
  }

  handleChangeMail(e) {
    const { value } = e.target;
    this.setState({
      email: value,
    });
  }

  validadeLogin() {
    const emailInput = document.getElementById('email');
    const password = document.getElementById('password');
    const regex = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    const six = 6;
    if (regex.test(emailInput.value) === true && password.value.length >= six) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleClick(e) {
    e.preventDefault();
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    history.push('/carteira');
  }

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <img
          src="https://app.betrybe.com/assets/images/trybe-logo.png"
          alt="Trybe-Logo"
        />
        <input
          id="email"
          type="email"
          data-testid="email-input"
          placeholder="email"
          onChange={ (e) => this.handleChange(e) }
        />
        <input
          id="password"
          type="password"
          data-testid="password-input"
          placeholder="password"
          onChange={ () => this.validadeLogin() }
        />
        <button
          id="button"
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(addUser(e)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
