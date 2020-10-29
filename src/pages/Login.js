import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import setEmail from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
    };
  }

  render() {
    const { email } = this.state;
    const { setEmail } = this.props;
    return (
      <div>
        <form>
          <input
            type="email"
            value={ email }
            data-testid="email-input"
            placeholder="Nome"
            onChange={ (event) => this.setState({ email: event.target.value }) }
            required
          />
          <input
            type="text"
            value=""
            data-testid="password-input"
            placeholder="Email"
            onChange={ () => console.log('Nome') }
            maxLength="6"
          />
          <button
            type="submit"
            onClick={ () => setEmail(this.state) }
          >
            <Link to="/carteira">Entrar</Link>
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(setEmail(email)),
});

Login.propTypes = {
  setEmail: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
