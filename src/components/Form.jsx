import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addExpense, fetchCurrency } from '../actions';

class Form extends Component {
  constructor() {
    super();

    this.handleInput = this.handleInput.bind(this);
    this.handleCurrencies = this.handleCurrencies.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      total: 0,
      expenses: {
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

  handleInput({ target: { name, value } }) {
    this.setState((prevState) => ({
      ...prevState,
      expenses: { ...prevState.expenses, [name]: value },
    }));
  }

  handleCurrencies() {
    const { currenciesKeys } = this.props;
    const filteredCurrencies = currenciesKeys.filter((currency) => currency !== 'USDT');

    return (
      filteredCurrencies.map((currency) => (
        <option key={ currency } value={ currency } data-testid={ currency }>
          {currency}
        </option>
      ))
    );
  }

  handleSubmit() {
    const { fetchCurrencies, currencies, addExpenses } = this.props;
    const { expenses: { value, currency }, total } = this.state;
    const sumOfExpenses = total + parseFloat(value * currencies[currency].ask);

    fetchCurrencies();
    this.setState((prevState) => ({
      ...prevState,
      expenses: { ...prevState.expenses, exchangeRates: { ...currencies } },
      total: sumOfExpenses,
    }), () => addExpenses(this.state));
  }

  render() {
    const {
      expenses: { value, description, currency, method, tag },
    } = this.state;
    return (
      <form>
        <div>
          <label htmlFor="value">
            Valor da despesa:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleInput }
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Descrição da despesa:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleInput }
            />
          </label>
        </div>
        <div>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleInput }
            >
              {this.handleCurrencies()}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleInput }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="tag">
            Categoria da despesa:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleInput }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <div>
          <button type="button" onClick={ this.handleSubmit }>Adicionar despesa</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesKeys: Object.keys(state.wallet.currencies),
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrency()),
  addExpenses: (state) => dispatch(addExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  fetchCurrencies: propTypes.func.isRequired,
  addExpenses: propTypes.func.isRequired,
  currenciesKeys: propTypes.arrayOf(propTypes.string).isRequired,
  currencies: propTypes.objectOf().isRequired,
};
