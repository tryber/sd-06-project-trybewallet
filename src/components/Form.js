import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkCurrency, thunkAddExpenses } from '../actions';
import fetchCurrencyApi from '../services/fetchApi';
import './form.css';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.insertExpenses = this.insertExpenses.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  async getCurrencies() {
    let value = {};
    value = await fetchCurrencyApi();
    return value;
  }

  async insertExpenses() {
    const { value, description, currency, method, tag } = this.state;
    const { addExpenses, wallet } = this.props;
    const arrayExpense = wallet.expenses;
    const expense = {
      id: arrayExpense.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: await this.getCurrencies(),
    };
    const newExpense = [...arrayExpense, expense];
    addExpenses(newExpense);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { wallet } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="form-container">
        <label
          htmlFor="valorDespesa"
        >
          Valor da Despesa
          <input
            data-testid="value-input"
            type="text"
            id="valorDespesa"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="descricaoDespesa"
        >
          Descrição da despesa
          <input
            data-testid="description-input"
            type="text"
            id="descricaoDespesa"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="currencies"
        >
          <select
            data-testid="currency-input"
            id="currencies"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { wallet.currencies.map((curr) => (
              <option
                key={ curr }
                data-testid={ curr }
                value={ curr }
              >
                { curr }
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="metodoPgto"
        >
          <select
            data-testid="method-input"
            id="metodoPgto"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label
          htmlFor="categoriaDespesa"
        >
          <select
            data-testid="tag-input"
            id="categoriaDespesa"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
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
          onClick={ () => this.insertExpenses() }
        >
          Adicionar despesa
        </button>
        <br />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(thunkCurrency()),
  addExpenses: (data) => dispatch(thunkAddExpenses(data)),
});

Form.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf.isRequired,
    expenses: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
