import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses() {
    const { expenses } = this.props;
    const sumExpenses = expenses
      .reduce((acc, { currency, value, exchangeRates }) => {
        const exchangeRate = exchangeRates[currency].ask;
        return acc + Number(value * exchangeRate);
      }, 0).toFixed(2);
    return sumExpenses;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          Email:
          {email}
        </span>
        <span data-testid="total-field">
          Despesa total: R$
          {' '}
          {this.sumExpenses()}
        </span>
        <span data-testid="header-currency-field">
          {' '}
          BRL
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
