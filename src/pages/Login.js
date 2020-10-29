import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveUser from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      email: '',
    };
  }

  handleClick(event) {
    console.log('clicou', event);
    event.preventDefault();
    const { history, saveNewUser } = this.props;
    const { email } = this.state;
    saveNewUser(email);
    history.push('/carteira');
  }

  handleChange() {
    const inputEmail = document.getElementById('email-login').value;
    const regex = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    const inputPassword = document.getElementById('password-login').value.length;
    const buttonLogin = document.getElementById('button-login');
    const six = 6;
    if (regex.test(inputEmail) === true && inputPassword >= six) {
      buttonLogin.removeAttribute('disabled');
    } else {
      buttonLogin.setAttribute('disabled', true);
    }
  }

  render() {
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            type="text"
            name="email"
            id="email-login"
            required
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            name="password"
            id="password-login"
            minLength="6"
            required
            onChange={ this.handleChange }
          />
        </label>
        {/* <Link to="/carteira"> */}
        <button
          type="button"
          id="button-login"
          disabled
          onClick={ this.handleClick }
        >
          Entrar
        </button>
        {/* </Link> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveNewUser: (userEmail) => dispatch(saveUser(userEmail))
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveNewUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
