import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionsEmailLogin } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      buttonLogin: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkInput = this.checkInput.bind(this);
    // this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => this.checkInput());
  }

  checkInput() {
    const { email, senha } = this.state;
    const check = email.split('@');
    // console.log(check);
    const num = 6;
    if (check.length === 2 && check[1].endsWith('.com')) {
      if (senha.split('').length >= num) {
        return this.setState({
          buttonLogin: false,
        });
      }
    }
    return this.setState({
      buttonLogin: true,
    });
  }

  render() {
    // const { email, password } = this.state;
    const { email, buttonLogin } = this.state;
    const { handleLogin } = this.props;

    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            // type="email"
            // value={ email }
            // placeholder="email"
            // onChange={ (e) => this.setState({ email: e.target.value }) }
            data-testid="email-input"
            name="email"
            onChange={ this.handleChange }
            // required
          />
          <input
            // type="password"
            // value={ senha }
            data-testid="password-input"
            // placeholder="senha"
            name="senha"
            // maxLength="6"
            // onChange={ (e) => this.setState({ password: e.target.value }) }
            onChange={ this.handleChange }
          />
          <Link to="/carteira">
            <button
              type="button"
              // onClick={ () => actionsEmailLogin({ email, password }) }
              onClick={ () => handleLogin(email) }
              disabled={ buttonLogin }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
// const mapStateToProps = (state) => ({ email: state.email });

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email) => dispatch(actionsEmailLogin(email)),
});

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
