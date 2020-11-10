import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import emailToState from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailOk: false,
      passwordOk: false,
      btnDisabled: true,
      newValues: false,
    };
    this.updateState = this.updateState.bind(this);
    this.loginRules = this.loginRules.bind(this);
    this.newValuesUpdated = this.newValuesUpdated.bind(this);
    this.btnLog = this.btnLog.bind(this);
  }

  componentDidUpdate() { // https://pt-br.reactjs.org/docs/react-component.html
    const { email, password, newValues } = this.state;
    if (newValues) {
      this.loginRules(email, password);
      this.newValuesUpdated();
    }
  }

  updateState(name, value) {
    this.setState({ [name]: value, newValues: true });
  }

  newValuesUpdated() {
    this.setState({ newValues: false });
  }
  // https://medium.com/swlh/how-to-validate-an-email-address-in-javascript-78d33f87f5c6
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match

  loginRules(email, password) {
    const emailIsValid = (/\S+@\S+\.\S+/);
    const passwordMinLenght = 6;
    if (password.length < passwordMinLenght) {
      this.setState({ passwordOk: false });
    }

    if (email.match(emailIsValid) && email !== '') {
      if (password.length >= passwordMinLenght) {
        this.setState({ btnDisabled: false, passwordOk: false }); // email e password ok!(msg ñ) => libera btn
      } else {
        this.setState({ btnDisabled: true, passwordOk: true });
      }
      this.setState({ emailOk: false });
    } else {
      this.setState({ btnDisabled: true, emailOk: true });
    }
  }

  btnLog() {
    const { emailToStateDispatch } = this.props;
    const { email } = this.state;
    console.log(email);
    emailToStateDispatch(email, true);
  }

  render() {
    const { email, password, emailOk, passwordOk, btnDisabled } = this.state;
    const { logState } = this.props;
    const emailFail = 'E-mail inválido ( Ex: abracadabra@gmail.com )';
    const passwordFail = 'A senha precisa ter no mínimo 6 caracteres';
    return (
      <div>
        { (logState) ? <Redirect push to="/carteira" /> : null }
        <form>
          <input
            type="text"
            name="email"
            data-testid="email-input"
            placeholder="Login"
            value={ email }
            onChange={ ({ target }) => this.updateState(target.name, target.value) }
            required="required"
          />
          {(emailOk) ? <span>{emailFail}</span> : null}
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Password"
            value={ password }
            onChange={ ({ target }) => this.updateState(target.name, target.value) }
            required="required"
          />
          {(passwordOk) ? <span>{passwordFail}</span> : null}
          <button
            type="button"
            disabled={ btnDisabled }
            onClick={ () => this.btnLog() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  logState: state.user.log,
});

const mapDispatchToProps = (dispatch) => ({
  emailToStateDispatch: (email, log) => dispatch(emailToState(email, log)),
});

Login.propTypes = {
  logState: PropTypes.bool.isRequired,
  emailToStateDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
