import React from 'react';
import { connect } from 'react-redux';

import { expensesThunk } from '../../actions';

import './style.css';

import ValueInputForm from '../Forms/ValueInputForm';
import CurrencyNameForm from '../Forms/CurrencyNameForm';
import PaymentMethodForm from '../Forms/PaymentMethodForm';
import TagInputForm from '../Forms/TagInputForm';
import DescriptionInputForm from '../Forms/DescriptionInputForm';

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
      isValid: false,
    };

    this.genericHandleChange = this.genericHandleChange.bind(this);
    this.addDataToExpenses = this.addDataToExpenses.bind(this);
  }

  genericHandleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    if (value !== '') this.setState({ isValid: true });
  }

  async addDataToExpenses(event) {
    event.preventDefault();
    const { getExpenses } = this.props;
    getExpenses(this.state);
  }

  render() {
    const { isValid } = this.state;
    return (
      <form>
        <ValueInputForm genericHandleChange={ this.genericHandleChange } />
        <CurrencyNameForm genericHandleChange={ this.genericHandleChange } />
        <PaymentMethodForm genericHandleChange={ this.genericHandleChange } />
        <TagInputForm genericHandleChange={ this.genericHandleChange } />
        <DescriptionInputForm genericHandleChange={ this.genericHandleChange } />
        <button
          type="submit"
          disabled={ !isValid }
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
