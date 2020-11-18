import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, addExpense } from '../actions';

class Forms extends React.Component {
  constructor(props) {
    super(props);
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

    this.handleCurrencies = this.handleCurrencies.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
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
      <div>
        <form>
          <label htmlFor="InputValue">
            Valor da Despesa:
            <input
              data-testid="value-input"
              value={ value }
              type="number"
              min="0"
              onChange={ (event) => this.setState({ expenses: event.target.value }) }
            />
          </label>
          <br />
          <label htmlFor="InputDescription">
            Descrição da Despesa:
            <input
              data-testid="description-input"
              type="text"
              value={ description }
              onChange={ (event) => this.setState({ description: event.target.value }) }
            />
          </label>
          <br />
          <label htmlFor="InputCurrencyDescription">
            Moeda de Despesa:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ (event) => this.setState({ currency: event.target.value }) }
            >
              {this.handleCurrencies()}
            </select>
          </label>
          <br />
          <label htmlFor="InputPayment">
            Método de Pagamento:
            <select
              data-testid="method-input"
              value={ method }
              onChange={ (event) => this.method({ method: event.target.value }) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <br />
          <label htmlFor="Tag">
            TAG:
            <select
              data-testid="tag-input"
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
        <button
          type="button"
          onClick={ () => this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesKeys: Object.keys(state.wallet.currencies),
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (state) => dispatch(fetchCurrency(state)),
  addExpenses: (state) => dispatch(addExpense(state)),
});

Forms.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  currenciesKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  currencies: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
