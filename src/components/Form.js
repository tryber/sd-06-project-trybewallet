import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };

    this.filterForm = this.filterForm.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  filterForm() {
    const { email, password } = this.state;
    const reg = /^[\w.+]+@\w+.\w{2,}(?:.\w{2})?$/;
    const passwdSize = 6;
    const { doLogin } = this.props;

    if (password.length >= passwdSize && reg.test(email)) {
      return (<input
        type="submit"
        value="Entrar"
        onClick={ () => doLogin(email) }
      />);
    }
    return <input type="submit" value="Entrar" disabled />;
  }

  handleRedirect() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/carteira" />;
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={ () => this.setState({ redirect: true }) }>
          <label htmlFor="email">
            E-mail
            <input
              onChange={ (e) => this.setState({ email: e.target.value }) }
              type="email"
              id="email"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              onChange={ (e) => this.setState({ password: e.target.value }) }
              type="password"
              id="password"
              data-testid="password-input"
            />
          </label>
          {this.handleRedirect()}
          {this.filterForm()}

        </form>
      </div>);
  }
}

Form.propTypes = {
  doLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  doLogin: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Form);
