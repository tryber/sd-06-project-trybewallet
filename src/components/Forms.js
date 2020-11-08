import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';
import store from '../store';

export class Forms extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
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
      document.querySelector('button').disabled = false;
      store.dispatch({ type: 'ACTION_LOGIN_SUCCESS', email: username });
    } else document.querySelector('button').disabled = true;
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

  render() {
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
          <button type="button" disabled="true">Entrar</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailRedux: state.user,
});

export default connect(mapStateToProps, null)(Forms);
