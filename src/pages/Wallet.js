import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses() {
    const { wallet } = this.props;
    const { expenses } = wallet;

    // método de cálculo baseado no projeto de Ana Capedeville
    return expenses.length !== 0
      ? (Math.round(expenses.reduce((sum, expense) => (
        Number(sum) + (Number(expense.value)
          * (Object.values(expense.exchangeRates)
            .find((currency) => currency.code === expense.currency)
            .ask))
      ), 0) * 100) / 100).toFixed(2) : 0.00;
  }

  render() {
    const { user } = this.props;
    const { email } = user;
    return (
      <div>
        <header>
          <img
            src="logo.png"
            alt="TrybeImage"
          />
          <p data-testid="email-field">
            { email }
          </p>
          <p data-testid="total-field">
            { 'Despesa total: '}
            { this.totalExpenses() }
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>
        <div>
          <Form />
          <Table />
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,

  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
  }).isRequired,

};
const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(
  mapStateToProps,
)(Wallet);
