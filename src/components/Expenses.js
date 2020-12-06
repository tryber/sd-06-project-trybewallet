import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormExpenseCurrencyInput from './FormExpenseCurrencyInput';
import FormExpenseDescriptionInput from './FormExpenseDescriptionInput';
import FormExpenseMethodInput from './FormExpenseMethodInput';
import FormExpenseTagInput from './FormExpenseTagInput';
import FormExpenseValueInput from './FormExpenseValueInput';
import TableExpense from './TableExpense';
import BtnEditState from './BtnEditState';
import { fetchCurrenciesAction } from '../actions';

class Expenses extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
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

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchCurrenciesAction()),
});

export default connect(null, mapDispatchToProps)(Expenses);
