import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, rmvExpense } from '../actions';

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
        expense: {
          ...currentState.expense,
          [name]: value,
          id: (expenses.length === 0) ? 0 : expenses.reduce((greater, exp) => (greater > exp.id)
            ? greater : exp.id , 0) + 1 }
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
    const { email, expenses, currencyToExchange, rmvExpense } = this.props;
    const { currencies } = this.state;
    const { value, currency, tag, method, description } = this.state.expense;
    return (
      <div>
         {/* HEADER */}
        <div id="header">
          <h1>TrybeWallet</h1>
          <label htmlFor="user-email">Email</label>
          <p data-testid="email-field" id="user-email">{ email }</p>
          <label htmlFor="total-expenses">Despesa Total</label>
          <p data-testid="total-field" id="total-expenses">{ this.sumExpenses() }</p>
          <label>Moeda de Câmbio</label>
          <p data-testid="header-currency-field">{ currencyToExchange }</p>
        </div>
        {/* FORM */}
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
              value = { currency }
            >
              <option>Selecine a moeda</option>
              { currencies.map((currencyStr) => {
                return(
                  <option
                    key={ currencyStr }
                    data-testid={ currencyStr }
                    value={ currencyStr }
                  >
                    { currencyStr }
                  </option>
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
              <option>Selecine o método de pagamento</option>
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
              <option>Selecine a categoria</option>
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
        {/* TABLE */}
        <div id="table">
          <table>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            { expenses.map((expenseX) => {
              const { description, tag, method, value, currency, exchangeRates } = expenseX;
              const roundValue = Math.round(parseFloat(value)*10000)/10000;
              const roundRate = Math.round(parseFloat(exchangeRates[currency].ask)*10000)/10000;
              const roundRateToTable = Math.round(parseFloat(exchangeRates[currency].ask)*100)/100;
              return (
                <tr>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ roundValue }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>{ roundRateToTable }</td>
                  <td>{ roundValue * roundRate }</td>
                  <td>{ exchangeRates[currency].codein === 'BRL' ? 'Real' : 'Outra moeda' }</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      onClick={ () => rmvExpense(expenseX) }
                    >
                      Deletar despesa
                    </button>
                  </td>

                </tr>
              );
              }) 
            }
          </table>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (e) => dispatch(addExpense(e)),
  rmvExpense: (e) => dispatch(rmvExpense(e)),
});

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
