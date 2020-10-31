import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './header.css';
import logo from '../images/logo.png';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header className="form-header">
        <img src={ logo } alt="logo-trybe" />
        <span>E-mail:</span>
        <span data-testid="email-field">{ email }</span>
        <span>Despesa Total:</span>
        <span data-testid="total-field">0</span>
        <span>Câmbio utilizado:</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(Header);
