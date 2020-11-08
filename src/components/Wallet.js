import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import PropTypes from 'prop-types';
import { fetchCurrency, addExpend, addSumValue } from '../actions';

export class Wallet extends Component {
  constructor() {
    super();

    this.takeSubmits = this.takeSubmits.bind(this);
    this.takeValue = this.takeValue.bind(this);
    this.takeCurrencies = this.takeCurrencies.bind(this);
    this.takeChange = this.takeChange.bind(this);

    this.state = {
      total: 0,
      expenses: {
        id: -1,
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        rateExchange: [],
      },
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  takeSubmits() {
    const { expends, currencies, fetchCurrencies } = this.props;
    fetchCurrencies();

    this.setState(
      (prices) => ({
        ...prices,
        expenses: {
          ...prices.expenses,
          rateExchange: { ...currencies },
          id: prices.expenses.id + 1,
        },
      }),
      () => {
        const { expenses } = this.state;
        expends(expenses);
        this.takeValue(this.state);
      },
    );
  }

  takeValue(tudo) {
    const { expenses } = tudo;
    const { currency, value, rateExchange } = expenses;
    const { sumRedux, getValueItem } = this.props;

    const objRates = Object.values(rateExchange);
    const currencyAsk = objRates.filter((coin) => coin.code === currency);

    const valueRate = currencyAsk[0].ask * Number(value) + sumRedux;
    console.log(valueRate);
    getValueItem(valueRate);
  }

  takeCurrencies() {
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

  takeChange(target) {
    const { name } = target;
    const { value } = target;
    this.setState((prices) => ({
      ...prices,
      expenses: { ...prices.expenses, [name]: value },
    }));
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
            value={ value }
            onChange={ (e) => this.takeChange(e.target) }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            type="text"
            name="description"
            value={ description }
            onChange={ (e) => this.takeChange(e.target) }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            type="text"
            name="currency"
            value={ currency }
            onChange={ (e) => this.takeChange(e.target) }
            data-testid="currency-input"
          >
            {this.takeCurrencies()}
          </select>
        </label>

        <label htmlFor="method">
          Metodo:
          <select
            id="method"
            type="text"
            name="method"
            value={ method }
            onChange={ (e) => this.takeChange(e.target) }
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
            name="tag"
            value={ tag }
            onChange={ (e) => this.takeChange(e.target) }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button type="button" onClick={ () => this.takeSubmits() }>
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

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
