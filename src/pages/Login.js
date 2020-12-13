import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import trybe from '../image/trybeIMG.png';
import { user } from '../actions';
import '../index.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, name) {
    e.preventDefault();
    this.setState({
      [name]: e.target.value,

    }, () => {
      const { email, password } = this.state;
      const passwordValidation = 6;
      const checkEmail = /^\w+@[a-zA-Z_]+?.[a-zA-z]{2,3}$/.test(email);// true se estiver coenrente a regexpress
      this.setState({
        isDisabled: checkEmail && password.length >= passwordValidation,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { login } = this.props;
    const { email } = this.state;
    login(email);
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const { isDisabled } = this.state;
    return (
      <div>
        <div className="main">
          <img className="logo" src={ trybe } alt="trybe-logo" />
          <form className="formLogin" onSubmit={ this.handleSubmit }>
            <input
              type="email"
              className="email"
              pattern=".+@.+.com"
              placeholder="Ex.admin@admin.com"
              size="25"
              onChange={ (e) => this.handleChange(e, 'email') }
              data-testid="email-input"
              value={ email }
            />
            <input
              type="password"
              className="password"
              id="pass"
              name="password"
              onChange={ (e) => this.handleChange(e, 'password') }
              data-testid="password-input"
              placeholder="Ex.123456"
              value={ password }
            />
            <button
              type="submit"
              className="btn_login"
              disabled={ !isDisabled }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(user(payload)),
});

Login.propTypes = {
  login: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
