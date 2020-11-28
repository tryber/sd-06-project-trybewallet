import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, addExpense, totalHeader } from '../actions';

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      expenses: {
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
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
    const { currencies, addExpenses, actionTotalHeader, fetchCurrencies } = this.props;
    const { id, expenses } = this.state;

    fetchCurrencies();
    addExpenses({ ...expenses, id, exchangeRates: { ...currencies } });
    actionTotalHeader({ ...expenses, id, exchangeRates: { ...currencies } });
    this.setState({ id: id + 1 });
  }

  render() {
    const { expenses } = this.state;
    const { value, description, currency, method, tag } = expenses;
    return (
      <div>
        <form>
          <span>
            Valor da Despesa:
          </span>
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            type="number"
            onChange={ (event) => this.setState({ expenses: {
              ...expenses,
              value: event.target.value } }) }
          />
          <br />
          <span>
            Descrição da Despesa:
          </span>
          <input
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ (event) => this.setState({ expenses: {
              ...expenses,
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
              ...expenses,
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
            name="method"
            value={ method }
            onChange={ (event) => this.setState({ expenses: {
              ...expenses,
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
            name="tag"
            value={ tag }
            onChange={ (event) => this.setState({ expenses: {
              ...expenses,
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
  addExpenses: (state) => dispatch(addExpense(state)),
  actionTotalHeader: (state) => dispatch(totalHeader(state)),
});

Forms.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  currenciesKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  actionTotalHeader: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
