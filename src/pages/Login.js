import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { saveMail } from '../actions';

class Home extends React.Component {
  constructor() {
    super();

    this.verifyEmail = this.verifyEmail.bind(this);

    this.state = {
      email: '',
      emailOk: true,
      senhaOk: true,
    };
  }

  verifyEmail(value) {
    const validate = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    if (validate.test(value) === true) {
      this.setState({ email: value, emailOk: false });
    } else {
      this.setState({ email: value, emailOk: true });
    }
  }

  verifyPassword(value) {
    const CINCO = 5;
    if (value.length > CINCO) {
      this.setState({ senhaOk: false });
    } else {
      this.setState({ senhaOk: true });
    }
  }

  render() {
    const { saveEmail } = this.props;
    const { email, emailOk, senhaOk } = this.state;
    return (
      <div className="form-login">
        <label htmlFor="email-input">
          Login:
          <input
            id="email-input"
            required
            value={ email }
            onChange={ ({ target: { value } }) => this.verifyEmail(value) }
            data-testid="email-input"
            type="email"
          />
        </label>

        <label htmlFor="password-input">
          Senha:
          <input
            id="password-input"
            required
            onChange={ ({ target: { value } }) => this.verifyPassword(value) }
            data-testid="password-input"
            type="password"
          />
        </label>

        <Link to="/carteira">
          <button
            className="btn-login"
            disabled={ senhaOk || emailOk }
            type="button"
            onClick={ () => saveEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveMail(email)),
});

Home.propTypes = { saveEmail: PropTypes.func.isRequired };

export default connect(null, mapDispatchToProps)(Home);
