import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin } from '../actions';

class Login extends React.Component {
  componentDidMount() {
    const btnEnviar = document.getElementsByTagName('button')[0];

    btnEnviar.disabled = true;
  }

  render() {
    const { userEmail } = this.props;

    function validateInputs() {
      const email = document.getElementsByTagName('input')[0].value;
      const password = document.getElementsByTagName('input')[1].value;
      const btnEnviar = document.getElementsByTagName('button')[0];
      const outOfString = -1;
      const pwdSize = 6;

      if (!email || email.indexOf('@') === outOfString
        || email.indexOf('.com') === outOfString
        || password.length < pwdSize) {
        btnEnviar.disabled = true;
      } else {
        btnEnviar.disabled = false;
      }
    }

    function handleButton() {
      const email = document.getElementsByTagName('input')[0].value;

      userEmail(email);
    }

    return (
      <div>
        <form>
          <input
            type="email"
            data-testid="email-input"
            onChange={ validateInputs }
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ validateInputs }
          />
        </form>
        <Link to="/carteira">
          <button type="button" onClick={ handleButton }>Entrar</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (e) => dispatch(userLogin(e)),
});

Login.propTypes = {
  userEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
