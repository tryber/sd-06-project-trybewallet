import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expenseHandle, expensesDelete } from '../actions';

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
    this.apiRequired = this.apiRequired.bind(this);
    this.expensesBTN = this.expensesBTN.bind(this);
    this.expensesSum = this.expensesSum.bind(this);
  }

  componentDidMount() {
    this.apiRequired()
      .then((r) => this.setState({
        currencies: Object.keys(r)
          .filter((c) => c !== 'USDT'),
      }));
  }

  apiRequired() {
    return (
      fetch('https://economia.awesomeapi.com.br/json/all')
        .then((response) => response.json())
    );
  }

  expensesBTN() {
    const { getExpense } = this.props;
    this.apiRequired()
      .then((r) => this.setState((currentState) => ({
        ...currentState,
        expense: { ...currentState.expense, exchangeRates: r },
      }), () => {
        const { expense } = this.state;
        getExpense(expense);
      }));
  }

  handleState({ target }) {
    const { expenses } = this.props;
    const { name, value } = target;
    this.setState((currentState) => ({
      ...currentState,
      expense: {
        ...currentState.expense,
        [name]: value,
        id: (expenses.length === 0) ? 0 : expenses
          .reduce((greater, exp) => {
            const valueToReturn = (greater > exp.id) ? greater : exp.id;
            return valueToReturn;
          }, 0) + 1,
      },
    }));
  }

  expensesSum() {
    const { expenses } = this.props;
    return expenses.reduce((sum, expense) => {
      const { value, currency, exchangeRates } = expense;
      const tenThousand = 10000;
      const valueGetRound = Math.round(parseFloat(value)
        * tenThousand) / tenThousand;
      const rateGetRound = Math.round(parseFloat(exchangeRates[currency].ask)
        * tenThousand) / tenThousand;
      sum += valueGetRound * rateGetRound;
      return sum;
    }, 0);
  }

  render() {
    const { email, expenses, currencyToExchange, expenseDelete } = this.props;
    const { currencies, expense: expenseInState } = this.state;
    const { value, currency, tag, method, description } = expenseInState;
    return (
      <div>
        <div id="header">
          <h4>Trybe Wallet</h4>
          E-mail:
          <label
            htmlFor="user-email"
            data-testid="email-field"
            id="user-email"
          >
            { email }
          </label>
          <br />
          Despesa Total:
          <label
            htmlFor="total-expenses"
            data-testid="total-field"
            id="total-expenses"
          >
            { this.expensesSum() }
          </label>
          <br />
          Moeda de Câmbio:
          <label
            htmlFor="currency"
            data-testid="header-currency-field"
            id="currency"
          >
            { currencyToExchange }
          </label>
          <br />
        </div>
        <div id="form">
          <div>
            <label htmlFor="input-expenses">
              Valor:
              <input
                type="text"
                name="value"
                id="expenseInput"
                placeholder="Insira o Valor"
                data-testid="value-input"
                onChange={ this.handleState }
                value={ value }
              />
            </label>
            <label htmlFor="currency">
              Moeda:
              <select
                name="currency"
                data-testid="currency-input"
                id="currencyInput"
                onChange={ this.handleState }
                value={ currency }
              >
                <option>Cambio</option>
                {currencies.map((currencyStr) => (
                  <option
                    key={ currencyStr }
                    data-testid={ currencyStr }
                    value={ currencyStr }
                  >
                    { currencyStr }
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="paymentMethodInput">
              Metodo de Pagamento:
              <select
                data-testid="method-input"
                name="method"
                id="paymentMethodInput"
                value={ method }
                onChange={ this.handleState }
              >
                <option>Tipo</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="expenseCategoryInput">
              Tag:
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
            </label>
            <label htmlFor="description">
              Descrição:
              <input
                type="text"
                name="description"
                id="descriptionInput"
                data-testid="description-input"
                onChange={ this.handleState }
                value={ description }
                placeholder="Descrição"
              />
            </label>
            <button type="button" onClick={ this.expensesBTN }>
              Adicionar despesa
            </button>
          </div>
        </div>
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
            {expenses.map((expensesMap) => {
              const {
                description: descriptionMap,
                tag: tagMAp,
                method: methodMap,
                value: valueMap, currency: currencyMap,
                exchangeRates: exchangeRatesMAp,
                id: idMap,
              } = expensesMap;
              const tenThousand = 10000;
              const valueGetRound = Math
                .round(parseFloat(valueMap) * tenThousand)
                / tenThousand;
              const rateGetRound = Math
                .round(parseFloat(exchangeRatesMAp[currencyMap].ask)
                * tenThousand) / tenThousand;
              const roundRateToTable = Math.round(parseFloat(exchangeRatesMAp[currencyMap]
                .ask) * 100) / 100;
              return (
                <tr key={ idMap }>
                  <td>{ descriptionMap }</td>
                  <td>{ tagMAp }</td>
                  <td>{ methodMap }</td>
                  <td>{ valueGetRound }</td>
                  <td>{ exchangeRatesMAp[currencyMap].name }</td>
                  <td>{ roundRateToTable }</td>
                  <td>{ valueGetRound * rateGetRound }</td>
                  <td>
                    { exchangeRatesMAp[currencyMap]
                      .codein === 'BRL' ? 'Real' : '' }
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => expenseDelete(expensesMap) }
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getExpense: (e) => dispatch(expenseHandle(e)),
  expenseDelete: (e) => dispatch(expensesDelete(e)),
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
  getExpense: '',
  expenseDelete: '',
};

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
  currencyToExchange: PropTypes.string,
  getExpense: PropTypes.string,
  expenseDelete: PropTypes.string,
};
