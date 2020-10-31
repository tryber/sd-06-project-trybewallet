import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../actions';
import '../css/bulma.css';

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
        className="button is-dark is-block is-large is-fullwidth is-dark"
      />);
    }
    return (<input
      type="submit"
      value="Entrar"
      className="button is-dark is-block is-large is-fullwidth "
      disabled
    />);
  }

  handleRedirect() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/carteira" />;
    }
  }

  render() {
    return (
      <section className="hero is-fullheight">
        <form className="hero-body" onSubmit={ () => this.setState({ redirect: true }) }>
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4 box">
              <div className="box">
                <label className="control" htmlFor="field">
                  E-mail
                  <div className="control">
                    <input
                      onChange={ (e) => this.setState({ email: e.target.value }) }
                      type="email"
                      id="email"
                      data-testid="email-input"
                      className="input is-large"
                    />
                  </div>
                </label>
                <label htmlFor="password" className="field">
                  Senha
                  <input
                    onChange={ (e) => this.setState({ password: e.target.value }) }
                    type="password"
                    id="password"
                    data-testid="password-input"
                    className="input is-large"
                  />
                </label>
              </div>
              {this.handleRedirect()}
              {this.filterForm()}
            </div>
          </div>
        </form>
      </section>);
  }
}

Form.propTypes = {
  doLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  doLogin: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Form);
