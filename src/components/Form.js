import React from 'react';
import { connect } from 'react-redux';
import { thunkCurrency, thunkAddExpenses } from '../actions';
import fetchCurrencyApi from '../services/fetchApi';
import './form.css';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.tratarApi = this.tratarApi.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  async add() {
    // http://devfuria.com.br/javascript/manipulando-combobox-select-com-javascript/
    const comboCurrencies = document.getElementById('currencies');
    const comboMetodoPgto = document.getElementById('metodoPgto');
    const comboCatDespesa = document.getElementById('categoriaDespesa');
    const { wallet, addExpenses } = this.props;
    const arrayExpense = wallet.expenses;
    const expense = {
      id: arrayExpense.length,
      value: document.getElementById('valorDespesa').value,
      description: document.getElementById('descricaoDespesa').value,
      currency: comboCurrencies.options[comboCurrencies.selectedIndex].value,
      method: comboMetodoPgto.options[comboMetodoPgto.selectedIndex].value,
      tag: comboCatDespesa.options[comboCatDespesa.selectedIndex].value,
      exchangeRates: await this.tratarApi(comboCurrencies
        .options[comboCurrencies.selectedIndex].value),
    };
    arrayExpense.push(expense);
    addExpenses(arrayExpense);
  }

  async tratarApi(currency) {
    let value = {};
    await fetchCurrencyApi().then((data) => {
      value = data[currency];
    });
    return value;
  }

  render() {
    const { wallet } = this.props;
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
          />
        </label>
        <label
          htmlFor="currencies"
        >
          <select
            data-testid="currency-input"
            name="currencies"
            id="currencies"
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
            name="metodoPgto"
            id="metodoPgto"
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
            name="categoriaDespesa"
            id="categoriaDespesa"
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
          onClick={ () => this.add(wallet.expenses) }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
