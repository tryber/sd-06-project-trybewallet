import React from 'react';
// import { PropTypes } from "prop-types";
import { connect } from 'react-redux';
import { saveLogin } from '../actions';

const validEmail = /^\w*@\w*\.\w{2,5}$|^\w*@\w*\.\w{2,5}\.\w{2,3}$/;
// const validPassword = /[^\s ]{6,25}/;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      valEmail: '',
      validPassword: '',
      btnDesabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendInfoLogin = this.sendInfoLogin.bind(this);
  }

  handleChange() {
    const { validPassword, valEmail } = this.state;
    if (valEmail !== '' && validPassword !== '') {
      this.setState({
        btnDesabled: false,
      });
    } else {
      this.setState({
        btnDesabled: true,
      });
    }
  }

  sendInfoLogin(e) {
    const { history, sendLogin } = this.props;
    const { email } = this.state;
    e.preventDefault();
    sendLogin(email);
    history.push('carteira');
  }

  render() {
    const { btnDesabled } = this.state;
    return (
      <div>
        <form onSubmit={ this.sendInfoLogin }>
          <div>Email</div>
          <input
            type="text"
            id="email"
            name="email"
            onChange={ (e) => {
              const valid = validEmail.test(e.target.value);
              this.handleChange(e);
              if (valid === true) {
                this.setState({
                  email: e.target.value,
                  validEmail: 'OK',
                });
              } else {
                this.setState({
                  email: e.target.value,
                  validEmail: '',
                });
              }
            } }
            data-testid="email-input"
          />
          <div>Senha</div>
          <input
            type="password"
            name="password"
            onChange={ (e) => {
              const valid = e.target.value;
              const count = 5;
              if (valid.length >= count) {
                this.setState({
                  validPassword: 'OK',
                })
              } else {
                this.setState({
                  validPassword: '',
                }),
              }
              this.handleChange(e);
            } }
            data-testid="password-input"
          />
          <button
            type="submit"
            className="btn-login"
            disabled={ btnDesabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  sendLogin: (email) => dispatch(saveLogin(email)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
