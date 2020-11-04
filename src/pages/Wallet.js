import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
        id: 0,
        value: '0',
        currency: '',
        method: '',
        tag: '',
        description: '',
        exchangeRates: [],
      },
      currencies: [],
    };
    this.handleState = this.handleState.bind(this);
    this.requestAPI = this.requestAPI.bind(this);
    this.addExpenseButton = this.addExpenseButton.bind(this);
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  requestAPI() {
    return (
      fetch('https://economia.awesomeapi.com.br/json/all')
      .then(response => response.json())
    );
  }

  addExpenseButton() {
    const { addExpense } = this.props;
    this.requestAPI()
      .then(r => this.setState((currentState) => ({
          ...currentState,
          expense: { ...currentState.expense, exchangeRates: r }
        }),
        () => addExpense(this.state.expense)
        ));
  }

  handleState({ target }) {
    const { expenses } = this.props;
    const { name, value } = target;
    this.setState((currentState) => {
      return ({
        ...currentState,
        expense: { ...currentState.expense, [name]: value, id: expenses.length }
      })
    });
  }

  sumExpenses() {
    const { expenses } = this.props;
    return expenses.reduce((sum, expense) => {
      const { value, currency, exchangeRates } = expense;
      const roundValue = Math.round(parseFloat(value)*10000)/10000;
      const roundRate = Math.round(parseFloat(exchangeRates[currency].ask)*10000)/10000;
      sum += roundValue * roundRate;
      return sum;
    }, 0);
  }

  componentDidMount() {
    this.requestAPI()
      .then(r => this.setState({ currencies: Object.keys(r).filter(c => c !== "USDT") }));
  }

  render() {
    const { email, expenses, currencyToExchange } = this.props;
    const { currencies } = this.state;
    const { value, currency, tag, method, description } = this.state.expense;
    return (
      <div>
        <div id="header">
          <h1>TrybeWallet</h1>
          <label htmlFor="user-email">Email</label>
          <p data-testid="email-field" id="user-email">{ email }</p>
          <label htmlFor="total-expenses">Despesa Total</label>
          <p data-testid="total-field" id="total-expenses">
            {/* { expenses.reduce((sum, expense) => sum += Math.round(parseFloat(expense.value)*10000)/10000 * Math.round(parseFloat(expense.exchangeRates[expense.currency].ask)*10000)/10000, 0) } */}
            { this.sumExpenses() }
          </p>
          <label htmlFor="currency-to-exchange">Moeda de Câmbio</label>
          <p data-testid="header-currency-field" id="currency-to-exchange">
            { currencyToExchange }
          </p>
        </div>
        <div id="form">
          <div>
            <label htmlFor="expenseInput">Despesa: </label>
            <input
              type="text"
              name="value"
              id="expenseInput"
              data-testid="value-input"
              onChange={ this.handleState }
              value={ value }
              placeholder="Digite o valor da despesa aqui"
            />
          </div>
          <div>
            <label htmlFor="descriptionInput">Descrição: </label>
            <input
              type="text"
              name="description"
              id="descriptionInput"
              data-testid="description-input"
              onChange={ this.handleState }
              value={ description }
              placeholder="Digite a descrição da despesa aqui"
            />
          </div>
          <div>
            <label htmlFor="currencyInput">Moeda de Registro: </label>
            <select
              name="currency"
              data-testid="currency-input"
              id="currencyInput"
              onChange={ this.handleState }
              value={ currency }
            >
              { currencies.map((currencyStr) => {
                return(
                  <option
                    key={ currencyStr }
                    data-testid={ currencyStr }
                    value={ currencyStr }
                  />
                );
              }) }
            </select>
          </div>
          <div>
            <label htmlFor="paymentMethodInput">Método de Pagamento: </label>
            <select
              data-testid="method-input"
              name="method"
              id="paymentMethodInput"
              value={ method }
              onChange={ this.handleState }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </div>
          <div>
            <label htmlFor="expenseCategoryInput">Categoria da Despesa: </label>
            <select
              data-testid="tag-input"
              name="tag"
              id="expenseCategoryInput"
              value={ tag }
              onChange={ this.handleState }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </div>
          <div>
            <button onClick={ this.addExpenseButton }>Adicionar despesa</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ addExpense: (e) => dispatch(addExpense(e)) });

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencyToExchange: state.wallet.currencyToExchange,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.defaultProps = {
  email: '',
  expenses: [],
  currencyToExchange: '',
};

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
  currencyToExchange: PropTypes.string,
};
