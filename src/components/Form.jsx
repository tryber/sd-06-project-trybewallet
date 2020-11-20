import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* ACTIONS */
import fetchCurrency from '../actions/walletActions';
import { addExpenses, editExpense } from '../actions/expenseActions';

class Form extends React.Component {
  constructor() {
    super();

    this.handleForm = this.handleForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.renderCoins = this.renderCoins.bind(this);

    this.state = {
      total: 0,
      expenses: {
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
  }

  componentDidMount() {
    const { fetchWallet } = this.props;
    fetchWallet();
  }

  handleInput({ target: { name, value } }) {
    this.setState((previous) => ({
      ...previous,
      expenses: { ...previous.expenses, [name]: value },
    }));
  }

  handleForm() {
    const { fetchWallet, id, addNewExpense, editOldExpense, expenses, coins,
    } = this.props;
    const { expenses: currentState, total } = this.state;
    const coinRate = coins[currentState.currency].ask;
    const sum = total + parseFloat(currentState.value * coinRate);

    fetchWallet();
    if (id === undefined) {
      this.setState((previous) => ({
        ...previous,
        expenses: {
          ...previous.expenses,
          exchangeRates: coins,
        },
        total: sum,
      }), () => addNewExpense(this.state));
    } else {
      expenses[id] = { id, exchangeRates: coins, ...currentState };
      editOldExpense(expenses);
    }
  }

  renderCoins() {
    const { coins } = this.props;
    const filterCoins = Object.keys(coins).filter((key) => key !== 'USDT');

    return (
      filterCoins.map((item) => (
        <option key={ item } value={ item } data-testid={ item }>{item}</option>
      ))
    );
  }

  render() {
    const { expenses: { value, description, currency, method, tag } } = this.state;
    const { id } = this.props;
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form>
        <div>
          <label htmlFor="value">
            Valor da despesa:
            <input
              name="value"
              id="value"
              data-testid="value-input"
              type="number"
              value={ value }
              onChange={ this.handleInput }
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Descrição da despesa:
            <input
              name="description"
              id="description"
              data-testid="description-input"
              type="text"
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
              { this.renderCoins() }
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
              type="text"
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
            Tipo
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              type="text"
              value={ tag }
              onChange={ this.handleInput }
            >
              {tags.map((item) => (
                <option key={ item } value={ item }>
                  { item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <button
            type="button"
            onClick={ this.handleForm }
          >
            {id === undefined ? 'Adicionar despesa' : 'Editar despesa'}
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.exchange.coins,
  id: state.wallet.id,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWallet: () => dispatch(fetchCurrency()),
  addNewExpense: (state) => dispatch(addExpenses(state)),
  editOldExpense: (expense) => dispatch(editExpense(expense)),
});

Form.propTypes = {
  fetchWallet: PropTypes.func.isRequired,
  addNewExpense: PropTypes.func.isRequired,
  editOldExpense: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  coins: PropTypes.objectOf().isRequired,
  expenses: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
