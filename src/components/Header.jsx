import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses() {
    const { expensesState } = this.props;
    if (expensesState.length > 0) {
      const total = expensesState.reduce((acc, element) => {
        // const ask = element.exchangeRates[element.currency].ask;
        const { ask } = element.exchangeRates[element.currency];
        return acc + (ask * element.value);
      }, 0);
      return total.toFixed(2);
    }
    return 0;
  }

  render() {
    const { email } = this.props;
    const total = this.totalExpenses();
    return (
      <header>
        <div>
          <h1 data-testid="email-field">
            Email :
            { email }
          </h1>
          <h1 data-testid="total-field">
            Despesas totais:
            { total }
          </h1>
          <h1 data-testid="header-currency-field">
            BRL
          </h1>
        </div>
      </header>);
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expensesState: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expensesState: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
