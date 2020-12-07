import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionLogin } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      loginButtonDisabled: false,
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(_previousState, newState) {
    const { email, password } = this.state;
    if (newState.email !== email || newState.password !== password) {
      this.handleChange();
    }
  }

  handleChange() {
    const { email, password } = this.state;
    const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const five = 5;
    this.setState({ loginButtonDisabled: reg.test(email) && password.length > five });
  }

  render() {
    const { email, loginButtonDisabled, password } = this.state;
    const { actionLoginProp, history } = this.props;

    return (
      <div className="login-form">
        <Form>
          <Form.Group>
            <Form.Control
              data-testid="email-input"
              onChange={ (e) => this.setState({ email: e.target.value }) }
              placeholder="Email"
              value={ email }
            />
            <Form.Control
              data-testid="password-input"
              onChange={ (e) => this.setState({ password: e.target.value }) }
              placeholder="Password"
              type="password"
              value={ password }
            />
          </Form.Group>
          <Form.Group>
            <Button
              block
              disabled={ !loginButtonDisabled }
              onClick={ () => {
                actionLoginProp(email);
                history.push('/carteira');
              } }
              variant="outline-success"
            >
              Entrar
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  actionLoginProp: actionLogin,
};

Login.propTypes = {
  actionLoginProp: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
