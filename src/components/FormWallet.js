import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import PropTypes from 'prop-types';
import { fetchCurrency, addExpend, addSumValue } from '../actions';

export class FormWallet extends Component {
  constructor() {
    super();

    this.currencyes = this.currencyes.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.handleSubmith = this.handleSubmith.bind(this);
    this.handleValue = this.handleValue.bind(this);

    this.state = {
      total: 0,
      expenses: {
        id: -1,
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: [],
      },
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  inputChange(target) {
    const { name } = target;
    const { value } = target;
    this.setState((p) => ({
      ...p,
      expenses: { ...p.expenses, [name]: value },
    }));
  }

  handleSubmith() {
    const { expends, currencies, fetchCurrencies } = this.props;
    const { expenses } = this.state;
    fetchCurrencies();

    this.setState(
      (p) => ({
        ...p,
        expenses: {
          ...p.expenses,
          exchangeRates: { ...currencies },
          id: p.expenses.id + 1,
        },
      }),
      () => {
        expends(expenses);
        this.handleValue(this.state);
      },
    );
  }

  handleValue(tudo) {
    const { expenses } = tudo;
    const { currency, value, exchangeRates } = expenses;
    const { sumRedux, getValueItem } = this.props;

    const objRates = Object.values(exchangeRates);
    const currencyAsk = objRates.filter((coin) => coin.code === currency);

    const valueRate = currencyAsk[0].ask * Number(value) + sumRedux;
    console.log(valueRate);
    getValueItem(valueRate);
  }

  currencyes() {
    const { currencies } = this.props;
    const currenciesObj = Object.keys(currencies);
    const currenciesFilter = currenciesObj.filter(
      (currency) => currency !== 'USDT',
    );
    return currenciesFilter.map((currency) => (
      <option value={ currency } key={ currency } data-testid={ currency }>
        {currency}
      </option>
    ));
  }

  render() {
    const { expenses } = this.state;
    const { value, description, currency, method, tag } = expenses;
    return (
      <div>
        <label htmlFor="value">
          Valor da despesa:
          <input
            id="value"
            type="number"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ (e) => this.inputChange(e.target) }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            type="text"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ (e) => this.inputChange(e.target) }
          />
        </label>
        <label htmlFor="text">
          Moeda:
          <select
            id="currency"
            type="text"
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ (e) => this.inputChange(e.target) }
          >
            {this.currencyes()}
          </select>
        </label>

        <label htmlFor="method">
          Metodo:
          <select
            id="method"
            type="text"
            name="method"
            value={ method }
            onChange={ (e) => this.inputChange(e.target) }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          tag:
          <select
            id="tag"
            type="text"
            name="tag"
            value={ tag }
            onChange={ (e) => this.inputChange(e.target) }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button type="button" onClick={ () => this.handleSubmith() }>
          {' '}
          Adicionar despesa
          {' '}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  sumRedux: state.wallet.sum,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrency()),
  expends: (expends) => dispatch(addExpend(expends)),
  getValueItem: (sum) => dispatch(addSumValue(sum)),
});

FormWallet.propTypes = {
  fetchCurrencies: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
