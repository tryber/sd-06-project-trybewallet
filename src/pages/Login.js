import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.imputChanged = this.imputChanged.bind(this);

    this.state = {
      email: '',
      password: '',
      buttonValidation: false,
    };
  }

  imputChanged({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });

    this.imputValidated();
  }

  imputValidated() {
    const { email, password } = this.state;

    const emailValidated = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(email);
    const passLength = 5;

    this.setState({
      buttonValidation: password.length >= passLength && emailValidated,
    });
  }

  render() {
    const { email, password, buttonValidation } = this.state;
    const { addEmail } = this.props;

    return (
      <form>
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              value={ email }
              onChange={ this.imputChanged }
              placeholder="Email"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              name="password"
              value={ password }
              onChange={ this.imputChanged }
              placeholder="Password"
              data-testid="password-input"
            />
          </label>
        </div>
        <Link to="/carteira">
          <input
            type="submit"
            disabled={ !buttonValidation }
            value="Entrar"
            onClick={ () => addEmail(email) }
          />
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  addEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
