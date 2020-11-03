import React from 'react';
import PropTypes from 'prop-types';
import { fetchApi, expense } from '../actions';
import { connect } from 'react-redux';
import store from '../store';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleState = this.handleState.bind(this);
    this.currOptions = this.currOptions.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      total: 0,
      expenses: {
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: [],
      }
    }
  }

  componentDidMount() {
    this.props.api()
  }

  handleState({ target }) {
    this.setState((prev) => ({
      ...prev,
      expenses : {
        ...prev.expenses,
        [target.id]: target.value,
      }
    }));
  }

  handleClick() {
    const { currencies, newExpense, api } = this.props;
    const { expenses, total } = this.state;
    const expensesSum = total + parseFloat(expenses.value * currencies[expenses.currency].ask)

    api();
    this.setState((prev) => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        exchangeRates: { ...currencies }
      },
      total: expensesSum,
    }), () => newExpense(this.state));
  }

  currOptions() {
    const { currencies } = this.props;
    return (
      Object.keys(currencies).filter((key) => key !== 'USDT')
        .map((curr) => (
          <option key={curr} value={curr} data-testid={curr}>{curr}</option>)
      )
    )
  }

  render() {
    const { email, currencies } = this.props;
    const { total, expenses } = this.state;
    const curExchange = 'BRL';
    return (
      <div>
        TrybeWallet
        <div>
          <p data-testid="email-field">{ `Seu email é: ${ email }` }</p>
          <p data-testid="total-field">{ `Despesa total: ${ total }` }</p>
          <p data-testid="header-currency-field">{ curExchange }</p>
        </div>
        <form>
          <label htmlFor="value">Valor: </label>
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-input"
            value={ expenses.value }
            onChange={this.handleState}
          />
          <label htmlFor="description">Descrição</label>
          <input
            name="description"
            id="description"
            data-testid="description-input"
            value={ expenses.description }
            onChange={this.handleState}
          />
          <label htmlFor="currency">Moeda: </label>
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ expenses.currency }
            onChange={this.handleState}
          >
            {(currencies) ? this.currOptions() : <option></option>}
          </select>
          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ expenses.method }
              onChange={this.handleState}
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
              id="tag"
              data-testid="tag-input"
              value={ expenses.tag }
              onChange={ this.handleState }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
        {console.log(store.getState().wallet.expenses)}
        {console.log(this.state.expenses)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  api: () => dispatch(fetchApi()),
  newExpense: (state) => dispatch(expense(state))
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  api: PropTypes.func.isRequired,
  newExpense: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
