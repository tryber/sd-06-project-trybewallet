import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import trybeLogo from '../images/trybe_logo.png';
import '../style/Header.css';

class Header extends Component {
  render() {
    const { emailLogin, totalExpense } = this.props;
    return (
      <header className="header">
        <img className="image_header" src={ trybeLogo } alt="Logo Trybe" />
        <p>Email:</p>
        <span data-testid="email-field">{ emailLogin }</span>
        <div>
          <p className="span_header_right">Despesa Total: R$</p>
          <span className="span_header_right" data-testid="total-field">
            { totalExpense.reduce((acc, expense) => acc + expense, 0).toFixed(2) }
          </span>
          <span className="span_header_left" data-testid="header-currency-field">
            BRL
          </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailLogin: state.user.email,
  totalExpense: state.wallet.expenses,
});

Header.propTypes = {
  emailLogin: PropTypes.string.isRequired,
  totalExpense: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, null)(Header);
