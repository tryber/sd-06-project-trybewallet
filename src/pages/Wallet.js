import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkCurrencies, thunkExpenses } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  componentDidMount() {
    const { thunkCurrency } = this.props;
    thunkCurrency();
  }

  // getExchangeRates() {
  //   fetch()
  // }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  addExpense(event) {
    event.preventDefault();
    const { thunkExpense } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const newExpense = {
      value,
      currency,
      method,
      tag,
      description,
    };
    thunkExpense(newExpense);
  }

  render() {
    const { userEmail, currenciesAPI } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <div>
        <header>
          <div className="header-info">
            <p data-testid="email-field">
              Email:
              {userEmail.email}
            </p>
            <p data-testid="total-field">0</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </header>
        <form>
          <fieldset>
            <label htmlFor="input-value">
              Valor da despesa:
              <input
                type="number"
                data-testid="value-input"
                id="input-value"
                min="0"
                name="value"
                value={ value }
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="input-description">
              Descrição:
              <input
                type="text"
                data-testid="description-input"
                id="input-description"
                name="description"
                value={ description }
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="input-currency">
              Moeda:
              <select
                data-testid="currency-input"
                id="input-currency"
                name="currency"
                value={ currency }
                onChange={ this.handleInput }
              >
                { currenciesAPI.map((cur) => (
                  <option
                    key={ cur }
                    data-testid={ cur }
                    value={ cur }
                  >
                    { cur }
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="input-method">
              Método:
              <select
                data-testid="method-input"
                id="input-method"
                name="method"
                value={ method }
                onChange={ this.handleInput }
              >
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="input-tag">
              Categoria:
              <select
                data-testid="tag-input"
                id="input-tag"
                name="tag"
                value={ tag }
                onChange={ this.handleInput }
              >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
            </label>
            <button type="submit" onClick={ this.addExpense }>Adicionar despesa</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user,
  currenciesAPI: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  thunkCurrency: () => dispatch(thunkCurrencies()),
  thunkExpense: (expenses) => dispatch(thunkExpenses(expenses)),
});

Wallet.propTypes = {
  userEmail: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  currenciesAPI: PropTypes.arrayOf(Object).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  thunkCurrency: PropTypes.func.isRequired,
  thunkExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
