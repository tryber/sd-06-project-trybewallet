import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { expensesThunk } from '../actions/index';

import ValueInputForm from './Forms/ValueInputForm';
import CurrencyTypeForm from './Forms/CurrencyTypeForm';
import PaymentMethodForm from './Forms/PaymentMethodForm';
import TagInputForm from './Forms/TagInputForm';
import DescriptionInputForm from './Forms/DescriptionInputForm';

class WalletTable extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.genericHandleChange = this.genericHandleChange.bind(this);
    this.addDataToExpenses = this.addDataToExpenses.bind(this);
  }

  genericHandleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  addDataToExpenses(event) {
    event.preventDefault();
    const { getExpenses } = this.props;
    getExpenses(this.state);
  }

  render() {
    return (
      <form>
        <ValueInputForm genericHandleChange={ this.genericHandleChange } />
        <CurrencyTypeForm genericHandleChange={ this.genericHandleChange } />
        <PaymentMethodForm genericHandleChange={ this.genericHandleChange } />
        <TagInputForm genericHandleChange={ this.genericHandleChange } />
        <DescriptionInputForm genericHandleChange={ this.genericHandleChange } />
        <button
          type="submit"
          onClick={ this.addDataToExpenses }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getExpenses: (expenses) => dispatch(expensesThunk(expenses)),
});

WalletTable.propTypes = {
  getExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
