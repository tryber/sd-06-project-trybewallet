import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchAPI, saveExpense } from '../actions';
import { response } from '../tests/mockData'; //  Provisório

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      totalValue: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };

    this.addExpense = this.addExpense.bind(this);
  }

  componentDidMount() {
    const { search } = this.props;
    search();
  }

  handleInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  addExpense() {
    const { saveState, coinsOptions, search, expenses } = this.props;
    search();
    const {
      totalValue,
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    const newExpenses = {
      id: expenses.length,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: { ...coinsOptions },
    };

    saveState(newExpenses);

    const total = totalValue + (Number(value) * Number(coinsOptions[currency].ask));

    this.setState({
      totalValue: total,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  render() {
    const { email, isFetching } = this.props;
    const { value, currency, method, tag, description, totalValue } = this.state;
    const optionsCoins = Object.keys(response).filter((coins) => coins !== 'USDT');

    return (
      <div>
        <header>
          <nav>
            <img src="https://app.betrybe.com/assets/images/trybe-logo.png" width="150px" alt="Trybe" />
            <div className="nav-right">
              <p>
                Email:
                <span data-testid="email-field">
                  { email }
                </span>
              </p>
              <p>
                Despesa Total:
                <span data-testid="total-field">
                  { totalValue }
                  <span data-testid="header-currency-field">BRL</span>
                </span>
              </p>
            </div>
          </nav>
        </header>
        <form className="form-expense">
          <label htmlFor="value">
            Valor:
            <input
              name="value"
              value={ value }
              onChange={ (event) => this.handleInput(event) }
              data-testid="value-input"
              type="number"
              id="value"
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              value={ currency }
              onChange={ (event) => this.handleInput(event) }
              data-testid="currency-input"
              id="currency"
            >
              { optionsCoins.map((expense) => (
                <option
                  key={ expense }
                  data-testid={ expense }
                  value={ expense }
                >
                  { expense }
                </option>
              )) }
            </select>
          </label>

          <label htmlFor="pay-metod">
            Método de pagamento:
            <select
              name="method"
              value={ method }
              onChange={ (event) => this.handleInput(event) }
              data-testid="method-input"
              id="pay-metod"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tag:
            <select
              name="tag"
              value={ tag }
              onChange={ (event) => this.handleInput(event) }
              data-testid="tag-input"
              id="tag"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              name="description"
              value={ description }
              onChange={ (event) => this.handleInput(event) }
              data-testid="description-input"
              type="text"
              id="description"
            />
          </label>
          <button onClick={ this.addExpense } type="button">Adicionar despesa</button>
        </form>

        <p>{ isFetching ? 'Loading' : '' }</p>

        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  isFetching: state.wallet.isFetching,
  expenses: state.wallet.expenses,
  coinsOptions: state.wallet.coinsOptions,
});

const mapDispatchToProps = (dispatch) => ({
  search: () => dispatch(fetchAPI),
  saveState: (expenses) => dispatch(saveExpense(expenses)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  coinsOptions: PropTypes.objectOf(String).isRequired,
  search: PropTypes.func.isRequired,
  saveState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
