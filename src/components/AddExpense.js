import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import fetchApi from '../services/fetchApi';
import { storeExpense } from '../actions';

import { response as mockResponse } from '../tests/mockData';

import '../css/AddExpense.css';

window.fetch = async () => ({ json: () => Promise.resolve(mockResponse) });

class AddExpense extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: 'USD',
      method: 'cash',
      tag: 'food',
      value: 0,
      description: '',
    };

    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleChange({ target }) {
    this.setState({ [target.id]: target.value });
  }

  render() {
    const { currencies } = this.props;

    return (
      <form className="expense-form" id="expense-form">
        <label htmlFor="value">
          $
          <input
            type="number"
            min="0.00"
            step="0.01"
            placeholder="0.00"
            id="value"
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
            required
          />
        </label>

        <select id="currency" data-testid="currency-input" onChange={ this.handleChange }>
          {
            currencies.map((currency) => (
              <option
                value={ currency }
                key={ currency }
                data-testid={ currency }
                onChange={ this.handleChange }
              >
                { currency }
              </option>
            ))
          }
        </select>

        <select id="method" data-testid="method-input" onChange={ this.handleChange }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select id="tag" data-testid="tag-input" onChange={ this.handleChange }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="submit" onClick={ this.handleAddExpense }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expense) => dispatch(storeExpense(expense)),
});

AddExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.any),
  dispatchExpense: PropTypes.func.isRequired,
};

AddExpense.defaultProps = {
  currencies: [],
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
