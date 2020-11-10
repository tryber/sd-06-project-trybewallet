import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExchangeRateAPI, thunkAddNewExpense } from '../actions';

class AddExpensesForm extends Component {
  constructor() {
    super();

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.getCurrenciesRate = this.getCurrenciesRate.bind(this);

    this.state = {
      expenses: {
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
      total: 0,
    };
  }

  componentDidMount() {
    const { fetchCurrrenciesAPI } = this.props;
    fetchCurrrenciesAPI();
  }

  async getCurrenciesRate() {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const fetchCurrencyAPI = () => fetch(URL)
      .then((response) => response.json());

    let exactlyExchangeRates = {};
    exactlyExchangeRates = await fetchCurrencyAPI();
    return exactlyExchangeRates;
  }

  handleOnChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  async handleOnClick() {
    // console.log(this.state);
    const { value, description, currency, method, tag, total } = this.state;
    // console.log(this.state);
    const { addNewExpense, expenses } = this.props;
    const arrayOfExpenses = expenses;
    console.log(arrayOfExpenses);
    const expense = {
      id: arrayOfExpenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: await this.getCurrenciesRate(),
    };
    console.log(expense);

    const totalExpenses = Math.round(
      (total + expense.value * expense.exchangeRates[currency].ask) * 100
    ) / 100;

    this.setState(() => ({
      expenses: expense,
      total: totalExpenses,
    }), () => addNewExpense(this.state));
    console.log(this.state);
  }

  render() {
    const { currencies } = this.props;
    // console.log(currencies);
    const currenciesList = currencies.map((currency, index) => (
      <option
        data-testid={ currency }
        key={ index }
        value={ currency }
      >
        { currency }
      </option>
    ));

    const { value, description, currency, method, tag } = this.state;
    // console.log(this.state);
    return (
      <form className="expenses-form-container">
        <label htmlFor="value-input">
          Expense value:
          <input
            id="value-input"
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleOnChange }
          />
        </label>
        <label htmlFor="description-input">
          Expense description:
          <input
            id="description-input"
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleOnChange }
          />
        </label>
        <label htmlFor="currency-input">
          Expense currency:
          <select
            data-testid="currency-input"
            id="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleOnChange }
          >
            { currenciesList }
          </select>
        </label>
        <label htmlFor="method-input">
          Payment Method:
          <select
            data-testid="method-input"
            id="method-input"
            name="method"
            value={ method }
            onChange={ this.handleOnChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          TAG:
          <select
            data-testid="tag-input"
            id="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleOnChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleOnClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrrenciesAPI: () => dispatch(fetchExchangeRateAPI()),
  addNewExpense: (data) => dispatch(thunkAddNewExpense(data)),
});

AddExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrrenciesAPI: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
  addNewExpense: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps, mapDispatchToProps,
)(AddExpensesForm);
