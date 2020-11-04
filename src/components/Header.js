import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();

    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses() {
    const { expenses } = this.props;

    if (expenses.length > 0) {
      const expenseValue = expenses.map((coin) => parseFloat(coin.value));
      const expenseAsk = expenses
        .map((value) => parseFloat(value.exchangeRates[value.currency].ask));
      const sumValue = expenseValue.reduce((acc, curr, index) => {
        return (acc + (curr * expenseAsk[index]))
      }, 0);
      return sumValue.toFixed(2);
    } else {
      return 0;
    }
  }

  render() {
    const { userEmail } = this.props;
    console.log(this.sumExpenses())
    return (
      <div>
        <div data-testid="email-field">
          <label htmlFor="email">
            Email:
            { userEmail }
          </label>
        </div>
        <div data-testid="total-field">
          <label htmlFor="despesa">
            Despesa Total: R$
            { this.sumExpenses() }
          </label>
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToPros = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToPros)(Header);
