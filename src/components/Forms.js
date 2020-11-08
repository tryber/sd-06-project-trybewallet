import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';
import PropTypes from 'prop-types';
import { login } from '../actions';
import { logo } from '../img/trybe-logo.png';

export class Forms extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      password: '',
      disabledBTN: true,
    };
    this.handlelogin = this.handlelogin.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.formCheck = this.formCheck.bind(this);
  }

  formCheck() {
    const { user, password } = this.state;
    const magigNum = 5;
    const regexNum = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    if (regexNum.test(String(user).toLowerCase()) && password.length >= magigNum) {
      this.setState({
        disabledBTN: false,
      });
    } else {
      this.setState({
        disabledBTN: true,
      });
    }
  }

  handlelogin(value) {
    this.setState({
      user: value,
    });
    this.formCheck();
  }

  handlePassword(value) {
    this.setState({
      password: value,
    });
    this.formCheck();
  }

  actionBTN(user) {
    const { loginEmail } = this.props;
    loginEmail(user);
  }

  render() {
    const { user, disabledBTN } = this.state;
    return (
      <div>
        <img src={ logo } alt="logo-trybe" />
        <div>
          <form>
            <input
              type="email"
              id="email"
              data-testid="email-input"
              placeholder="E-mail"
              onChange={ (email) => this.handlelogin(email.target.value) }
            />
            <br />
            <input
              type="password"
              data-testid="password-input"
              placeholder="Senha"
              onChange={ (email) => this.handlePassword(email.target.value) }
            />
          </form>

          <Link to="/carteira">
            <button
              onClick={ () => this.actionBTN(user) }
              type="button"
              disabled={ disabledBTN }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailRedux: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  emailLogin: (email) => dispatch(login(email)),
});

Forms.propTypes = {
  emailLogin: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
