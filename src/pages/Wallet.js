import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form';

class Wallet extends React.Component {
  updateTotalValue() {
    const { expenses } = this.props;
    console.log(expenses);
    let totalValue = 0;
    expenses.forEach((expense) => {
      const exchangeRatesKey = Object.keys(expense.exchangeRates)
        .find((key) => key === expense.currency);
      const floatValue = parseFloat(expense.value);
      const floatExchangeRate = parseFloat(expense.exchangeRates[exchangeRatesKey].ask);
      totalValue += floatValue * floatExchangeRate;
    });
    return totalValue.toFixed(2);
  }

  render() {
    const { email } = this.props;
    const totalValue = this.updateTotalValue();

    return (
      <div>
        <header>
          <p data-testid="email-field">{`Email:  ${email}`}</p>
          <span data-testid="total-field">{`Despesa Total: ${totalValue} `}</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <div>
          <Form />
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
