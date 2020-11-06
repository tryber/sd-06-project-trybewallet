import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { inputAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      pass: '',
      disable: false,
      isValidEmail: '',
      isValidPassword: '',
    };

    // this.handleChange = this.handleChange.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange({ target }) {
  //   const { name } = target;
  //   this.setState({
  //     [name]: target.value,
  //   },
  //   () => {
  //     const { email, pass } = this.state;
  //     const min = 5;
  //     const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

  //     this.setState({
  //       disable: pass.length > min && regex.test(email),
  //     });
  //   });
  // }

  onChangeEmail(e) {
    const { value } = e.target;
    this.setState({
      email: value,
      isValidEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    });
  }

  onChangePassword(e) {
    const { value } = e.target;
    const minNum = 6;
    this.setState({
      pass: value,
      isValidPassword: value.length >= minNum,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { login, history } = this.props;
    const { email, disable } = this.state;
    if (!disable) {
      history.push('/carteira');
      return login(email);
    }
  }

  render() {
    const { email, pass, isValidEmail, isValidPassword } = this.state;
    return (
      <div>
        <div className="text-center">
          <h1>Welcome</h1>
        </div>

        <div className="row justify-content-center">
          <form onSubmit={ this.handleSubmit }>
            <div className="form-group">
              <input
                type="email"
                value={ email }
                placeholder="email"
                data-testid="email-input"
                name="email"
                onChange={ (e) => this.onChangeEmail(e) }
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                value={ pass }
                placeholder="senha"
                data-testid="password-input"
                name="pass"
                onChange={ (e) => this.onChangePassword(e) }
                required
              />
            </div>

            <button
              disabled={ !isValidEmail || !isValidPassword }
              className="btn btn-primary"
              type="submit"
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
  login: (email) => dispatch(inputAction(email)),
});

Login.propTypes = {
  email: PropTypes.string,
  login: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
