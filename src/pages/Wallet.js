import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './components/form';
import { currencyThunk, expensesThunk } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  render() {
    const { email, expense } = this.props;
    return (
      <div>
        <Form addExpensesToRedux={ this.addExpensesToRedux } />
        TrybeWallet
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field" value="0">{expense}</div>
        <div data-testid="header-currency-field">Total em BRL </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  currency: store.wallet.currencies,
  expense: store.wallet.expenses,

});
const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(currencyThunk()),
  getExpenses: () => dispatch(expensesThunk()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getCurrency: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
  // currency: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expense: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wallet);
