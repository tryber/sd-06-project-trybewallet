import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import fetchApi from '../services/fetchApi';
import { storeExpense, saveEdited } from '../actions';

import { response as mockResponse } from '../tests/mockData';

import '../css/AddExpense.css';

window.fetch = async () => ({ json: () => Promise.resolve(mockResponse) });

class AddExpense extends React.Component {
  constructor(props) {
    super(props);

    const { editMode, editExpenseId, expenses } = this.props;

    if (editMode === 'on') {
      const currExpense = expenses.filter((expense) => (
        expense.id === editExpenseId
      ))[0];

      this.state = {
        prevExpense: currExpense,
        currency: currExpense.currency,
        method: currExpense.method,
        tag: currExpense.tag,
        value: currExpense.value,
        description: currExpense.description,
      };
    } else {
      this.state = {
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        value: 0,
        description: '',
        prevExpense: {},
      };
    }

    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditExpense = this.handleEditExpense.bind(this);
  }

  async handleAddExpense(event) {
    event.preventDefault();

    const { expenses, dispatchExpense } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const validForm = (value > 0 && description !== '');

    if (validForm) {
      const currentCurrencies = await fetchApi();
      const currencies = Object.keys(currentCurrencies);
      const exchangeRates = currencies.reduce((obj, current) => {
        const currentObj = { ...obj,
          [current]: { ...currentCurrencies[current] },
        };
        return currentObj;
      }, {});

      const newExpense = {
        id: expenses.length,
        currency,
        value,
        method,
        tag,
        description,
        exchangeRates,
      };

      dispatchExpense(newExpense);

      document.getElementById('expense-form').reset();
      this.setState({
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        value: 0,
        description: '',
      });
    } else {
      console.log('form não preenchido.');
    }
  }

  async handleEditExpense(event) {
    event.preventDefault();
    const { dispatchSaveEdited } = this.props;
    const { value, description, tag, method, currency, prevExpense } = this.state;
    const validForm = (value > 0 && description !== '');
    if (validForm) {
      const currentCurrencies = await fetchApi();
      const currencies = Object.keys(currentCurrencies);
      const exchangeRates = currencies.reduce((obj, current) => {
        const currentObj = { ...obj,
          [current]: { ...currentCurrencies[current] },
        };

        return currentObj;
      }, {});

      const newExpense = {
        id: prevExpense.id,
        currency,
        value,
        method,
        tag,
        description,
        exchangeRates,
      };

      await dispatchSaveEdited(newExpense);
    } else {
      console.log('form não preenchido.');
    }
  }

  handleChange({ target }) {
    this.setState({ [target.id]: target.value });
  }

  render() {
    const { currencies, editMode, expenseFormClassName } = this.props;
    const { prevExpense } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

    return (
      <form className={ expenseFormClassName } id="expense-form">
        <label htmlFor="value">
          $
          <input
            type="number"
            min="0.00"
            step="0.01"
            placeholder="0.00"
            id="value"
            defaultValue={ prevExpense.value }
            data-testid="value-input"
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="description">
          Gasto
          <input
            type="text"
            placeholder="Descreva seu gasto."
            id="description"
            data-testid="description-input"
            onChange={ this.handleChange }
            defaultValue={ prevExpense.description }
          />
        </label>

        <select
          id="currency"
          onChange={ this.handleChange }
          defaultValue={ prevExpense.currency }
          data-testid="currency-input"
          disabled={ (editMode === 'on') && true }
        >
          {
            currencies.map((curr) => (
              <option
                value={ curr }
                key={ curr }
                data-testid={ curr }
                onChange={ this.handleChange }
              >
                { curr }
              </option>
            ))
          }
        </select>

        <select
          id="method"
          defaultValue={ prevExpense.method }
          onChange={ this.handleChange }
          data-testid="method-input"
        >
          { methods.map((curr) => (
            (prevExpense.method === curr)
              ? (
                <option value={ prevExpense.method } key={ prevExpense.method }>
                  { prevExpense.method }
                </option>)
              : <option value={ curr } key={ curr }>{ curr }</option>
          )) }
        </select>

        <select
          id="tag"
          defaultValue={ prevExpense.tag }
          onChange={ this.handleChange }
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        {
          (editMode !== 'on')
            ? (
              <button type="submit" onClick={ this.handleAddExpense }>
                Adicionar despesa
              </button>
            )
            : (
              <button type="submit" onClick={ this.handleEditExpense }>
                Editar despesa
              </button>
            )
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editMode: state.wallet.editMode,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expense) => dispatch(storeExpense(expense)),
  dispatchSaveEdited: (expense = {}) => dispatch(saveEdited(expense)),
});

AddExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.any),
  dispatchExpense: PropTypes.func.isRequired,
  editMode: PropTypes.string,
  editExpenseId: PropTypes.number,
  dispatchSaveEdited: PropTypes.func.isRequired,
  expenseFormClassName: PropTypes.string.isRequired,
};

AddExpense.defaultProps = {
  currencies: [],
  expenses: [],
  editMode: 'off',
  editExpenseId: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
