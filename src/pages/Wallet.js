import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTransaction } from '../actions';
import fetchAPI from '../services/currencyAPI';

class Wallet extends React.Component {
  constructor() {
    super();

    this.renderOptions = this.renderOptions.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.handleTransaction = this.handleTransaction.bind(this);

    this.state = {
      currencies: [],
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    this.renderOptions();
  }

  handleChanges({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleTransaction() {
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const expenses = { id, value, description, currency, method, tag, exchangeRates };
    const { transaction } = this.props;

    this.renderOptions();

    transaction(expenses);

    this.setState((previousState) => ({ id: previousState.id + 1 }));

    document.getElementById('transaction-form').reset();
  }

  async renderOptions() {
    const data = await fetchAPI();
    const currencyArray = Object.keys(data).filter((currency) => currency !== 'USDT');

    this.setState({
      currencies: currencyArray,
      exchangeRates: data,
    });
  }

  render() {
    const { userEmail } = this.props;
    const { currencies } = this.state;

    return (
      <header>
        <span data-testid="email-field">{ userEmail }</span>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
        <form id="transaction-form">
          <input
            data-testid="value-input"
            type="number"
            name="value"
            placeholder="0"
            onChange={ this.handleChanges }
          />
          <input
            data-testid="description-input"
            type="text"
            name="description"
            onChange={ this.handleChanges }
          />
          <select
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChanges }
          >
            {currencies
              .map((option) => (
                <option data-testid={ option } key={ option } value={ option }>
                  { option }
                </option>
              ))}
          </select>
          <select
            name="method"
            onChange={ this.handleChanges }
            data-testid="method-input"
          >
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débido">Cartão de débito</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
          <select
            name="tag"
            onChange={ this.handleChanges }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
        <Link to="/carteira">
          <button
            type="button"
            onClick={ this.handleTransaction }
          >
            Adicionar despesa
          </button>
        </Link>
      </header>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string,
  transaction: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  userEmail: '',
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  transaction: (expenses) => (
    dispatch(addTransaction(expenses))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
