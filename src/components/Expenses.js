import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormExpenseCurrencyInput from './FormExpenseCurrencyInput';
import FormExpenseDescriptionInput from './FormExpenseDescriptionInput';
import FormExpenseMethodInput from './FormExpenseMethodInput';
import FormExpenseTagInput from './FormExpenseTagInput';
import FormExpenseValueInput from './FormExpenseValueInput';
import TableExpense from './TableExpense';
import { fetchCurrenciesAction } from '../actions';
import BtnEditState from './BtnEditState';

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    return (
      <div>
        <form>
          <FormExpenseValueInput />
          <FormExpenseDescriptionInput />
          <FormExpenseCurrencyInput />
          <FormExpenseMethodInput />
          <FormExpenseTagInput />
          <BtnEditState />
        </form>
        <TableExpense />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);

Expenses.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};
