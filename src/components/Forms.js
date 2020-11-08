import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';
import { login } from '../actions';

export class Forms extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      isDisabled: true,
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.formVerificated = this.formVerificated.bind(this);
  }

  formVerificated() {
    const { username, password } = this.state;
    const five = 5;
    const re = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    if (re.test(String(username).toLowerCase()) && password.length >= five) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleChangeUsername(value) {
    this.setState({
      username: value,
    });
    this.formVerificated();
  }

  handleChangePassword(value) {
    this.setState({
      password: value,
    });
    this.formVerificated();
  }

  buttonAction(username) {
    const { loginEmail } = this.props;
    loginEmail(username);
  }

  render() {
    const { username, isDisabled } = this.state;
    return (
      <div>
        <form>
          <input
            type="email"
            id="email"
            data-testid="email-input"
            onChange={ (e) => this.handleChangeUsername(e.target.value) }
          />
          <input
            type="password"
            data-testid="password-input"
            title="Must contain letter, and at least 6 or more characters"
            required
            onChange={ (e) => this.handleChangePassword(e.target.value) }
          />
        </form>

        <Link to="/carteira">
          <button
            onClick={ () => this.buttonAction(username) }
            type="button"
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailRedux: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  loginEmail: (email) => dispatch(login(email)),
});

Forms.propTypes = {
  loginEmail: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
