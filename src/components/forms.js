import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, addExpense, addTotal } from '../actions';

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
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
    const { fetchCurrencies, currencies, addExpenses, actionAddTotal } = this.props;
    const { id, total } = this.state;
    const {
      expenses: { value, currency },
    } = this.state;
    fetchCurrencies();
    const arrayCurrencies = [{ ...currencies }];
    console.log(arrayCurrencies);
    const findRates = arrayCurrencies.currency;
    console.log(findRates);
    console.log(currency);
    const cambio = parseFloat(value);
    const newTotal = total + cambio;
    this.setState({ total: newTotal }, () => actionAddTotal(this.state));
    this.setState((prevState) => ({
      ...prevState,
      expenses: { ...prevState.expenses,
        id,
        exchangeRates: { ...currencies } },
    }),
    () => addExpenses(this.state));
    this.setState({ id: id + 1 });
    console.log(newTotal);
  }

  render() {
    const {
      expenses: { value, description, currency, method, tag },
    } = this.state;
    const destructuring = { ...this.state.expenses };
    return (
      <div>
        <form>
          <span>
            Valor da Despesa:
          </span>
          <input
            data-testid="value-input"
            value={ value }
            type="number"
            onChange={ (event) => this.setState({ expenses: {
              ...destructuring,
              value: event.target.value } }) }
          />
          <br />
          <span>
            Descrição da Despesa:
          </span>
          <input
            data-testid="description-input"
            value={ description }
            onChange={ (event) => this.setState({ expenses: {
              ...destructuring,
              description: event.target.value } }) }
          />
          <br />
          <span>
            Moeda de Despesa:
          </span>
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ (event) => this.setState({ expenses: {
              ...destructuring,
              currency: event.target.value } }) }
          >
            {this.handleCurrencies()}
          </select>
          <br />
          <span>
            Método de Pagamento:
          </span>
          <select
            data-testid="method-input"
            value={ method }
            onChange={ (event) => this.setState({ expenses: {
              ...destructuring,
              method: event.target.value } }) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <br />
          <span>
            TAG:
          </span>
          <select
            data-testid="tag-input"
            value={ tag }
            onChange={ (event) => this.setState({ expenses: {
              ...destructuring,
              tag: event.target.value } }) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
        <button
          type="button"
          onClick={ this.handleSubmit }
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
  addExpenses: (state) => dispatch(addExpense([state.expenses])),
  actionAddTotal: (state) => dispatch(addTotal(state.total)),
});

Forms.propTypes = {
  addExpenses: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  actionAddTotal: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf().isRequired,
  currenciesKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
