import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './components/form';
import { currencyThunk } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <Form addExpensesToRedux={ this.addExpensesToRedux } />
        TrybeWallet
        <span data-testid="email-field">{email}</span>
        <span data-testid="header-currency-field">Total em BRL </span>
        <span data-testid="total-field">
          {/* como visto no PR da colega Rebeca <3
          { expenses.reduce((previewValue, expense) => {
            console.log(expense);
            const { currency, exchangeRates, value } = expense;

            const exchange = exchangeRates[currency].ask; // <3 <3
            const finalBRLValue = exchange * value;

            return previewValue + parseFloat(finalBRLValue);
          }, 0).toFixed(2)} */}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  currency: store.wallet.currencies,
  expenses: store.wallet.expenses,

});
const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(currencyThunk()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getCurrency: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wallet);
