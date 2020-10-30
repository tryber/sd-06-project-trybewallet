import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import trybewallet from './trybewallet.png';
import { changeEmail } from '../actions/index';
import '../css/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.verifyFields = this.verifyFields.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  changeHandler(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  verifyFields() {
    const { password, email } = this.state;
    const isValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);
    const six = 6;
    let answer = true;
    if (isValid && password.length >= six) {
      answer = false;
    }
    return answer;
  }

  render() {
    const { fieldChange } = this.props;
    const { email, password } = this.state;
    return (
      <div className="container">
        <div className="login">
          <img alt="trybe-logo" src={ trybewallet } width="200px" />
          <form>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                data-testid="email-input"
                value={ email }
                onChange={ this.changeHandler }
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                data-testid="password-input"
                value={ password }
                onChange={ this.changeHandler }
                className="form-control"
              />
            </div>
            <Link
              to="/carteira"
              onClick={ () => {
                fieldChange(email);
              } }
            >
              <button
                type="button"
                disabled={ this.verifyFields() }
                className="btn btn-success btn-block"
              >
                Entrar
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fieldChange: (email) => dispatch(changeEmail(email)),
});

Login.propTypes = {
  fieldChange: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
