import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencyValues, fetchExchangeRates } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { fetchExchangeRates } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const fetchedExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    fetchExchangeRates(fetchedExpense);
    this.setState((previousState) => ({
      id: previousState.id + 1,
      value: 0,
      description: '',
    }));
  }

  componentDidMount() {
    const { fetchCurrencyValue } = this.props;
    fetchCurrencyValue();
  }

  render() {
    const { handleChange, onSubmit } = this;
    const {
      user: { email },
      wallet: { currencies, expenses },
    } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const totalExpense = expenses.length
      ? Math.round(expenses
        .reduce((acc, curr) => {
          const currentCurrency = curr.exchangeRates[curr.currency].ask;
          return acc + (curr.value * currentCurrency);
        }, 0) * 100) / 100 : 0;
    return (
      <div>
        <header className="wallet-header">
          <h3 data-testid="email-field">
            { email }
          </h3>
          <h3>
            Despesa total:
            <span data-testid="total-field">
              { totalExpense }
            </span>
            <span data-testid="header-currency-field">
              BRL
            </span>
          </h3>
        </header>
        <form className="add-expenses" onSubmit={ onSubmit }>
          <label htmlFor="value-input-id">
            Valor:
            <input
              data-testid="value-input"
              name="value"
              value={ value }
              id="value-input-id"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="currency-input-id">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              id="currency-input-id"
              onChange={ handleChange }
            >
              <option>-</option>
              {
                currencies.map((currency) => (
                  <option
                    data-testid={ currency }
                    key={ currency }
                  >
                    { currency }
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method-input-id">
            Método de Pagamento:
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              id="method-input-id"
              onChange={ handleChange }
            >
              <option>-</option>
              {
                methodOptions
                  .map((method) => (
                    <option
                      data-testid={ method }
                      key={ method }
                    >
                      { method }
                    </option>
                  ))
              }
            </select>
          </label>
          <label htmlFor="tag-input-id">
            Tag:
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              id="tag-input-id"
              onChange={ handleChange }
            >
              <option>-</option>
              {
                tagOptions
                  .map((tag) => (
                    <option
                      data-testid={ tag }
                      key={ tag }
                    >
                      { tag }
                    </option>
                  ))
              }
            </select>
          </label>
          <label htmlFor="description-input-id">
            Descrição:
            <input
              data-testid="description-input"
              name="description"
              value={ description }
              id="description-input-id"
              onChange={ handleChange }
            />
          </label>
          <button
            type="submit"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  user,
  wallet,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencyValue: (currencyData) => dispatch(fetchCurrencyValues(currencyData)),
  fetchExchangeRates: (newExpense) => dispatch(fetchExchangeRates(newExpense)),
});

Wallet.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  fetchCurrencyValue: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
