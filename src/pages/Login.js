import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { actionLogin } from '../actions';
import Input from '../components/Input';

class Login extends React.Component {
  constructor() {
    super();

    this.strictArea = this.strictArea.bind(this);

    this.state = {
      email: '',
      pass: '',
      disabled: false,
    };
  }

  componentDidUpdate(_previouState, newState) {
    const { email, pass } = this.state;
    if (newState.email !== email || newState.pass !== pass) {
      this.strictArea();
    }
  }

  strictArea() {
    const { login } = this.props;
    const { email, pass } = this.state;
    const six = /.{6,}/;
    const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    login(email);
    this.setState({ disabled: reg.test(email) && six.test(pass) });
    // return disabled;
  }

  render() {
    const { history } = this.props;
    const { disabled } = this.state;
    return (
      <section className="login-container">
        <h3>WALLET</h3>
        <fieldset className="field-container">
          <div className="image-login" />
          <div className="field-inputs">
            <Input
              id="email"
              testId="email-input"
              name="email"
              className="email-login"
              type="email"
              place="E-mail"
              onChange={ (e) => this.setState({ email: e.target.value }) }
            />
            <Input
              testId="password-input"
              name="password"
              className="pass-login"
              type="password"
              max="20"
              min="6"
              place="Password"
              onChange={ (e) => this.setState({ pass: e.target.value }) }
            />
          </div>
          <button
            className="btn-login"
            onClick={ () => history.push('/carteira') }
            disabled={ !disabled }
            type="button"
          >
            Entrar
          </button>
        </fieldset>
      </section>
    );
  }
}

Login.propTypes = {
  login: propTypes.func.isRequired,
  history: propTypes.shape().isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(actionLogin(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
