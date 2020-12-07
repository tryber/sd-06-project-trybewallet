import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseLong, editExpense, getCurrencies, removeExpense } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitButtonText: 'Adicionar despesa',
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: 'Alimentação',
      value: 0,
    };

    this.saveExpense = this.saveExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  componentDidMount() {
    const { getCurrenciesProp } = this.props;
    getCurrenciesProp();
  }

  saveExpense() {
    const { addExpenseLongProp } = this.props;
    const { currency, method, tag, value, description } = this.state;
    const expense = {
      description,
      method,
      currency,
      tag,
      value,
    };
    addExpenseLongProp(expense);
  }

  editExpense() {
    const { expensesProp, editExpenseProp } = this.props;
    const { currency, method, tag, value, description, id } = this.state;
    const index = expensesProp.findIndex((e) => e.id === id);
    expensesProp[index].value = value;
    expensesProp[index].description = description;
    expensesProp[index].method = method;
    expensesProp[index].currency = currency;
    expensesProp[index].tag = tag;
    editExpenseProp(expensesProp);
  }

  render() {
    const { userEmail, dropdownList, expensesProp,
      removeExpenseProp } = this.props;
    const { currency, method, tag, value, description,
      submitButtonText } = this.state;

    // if (Object.keys(dropdownList).length === 0) {
    //   return (
    //     <p>Carregando...</p>
    //   );
    // }

    return (
      <div>
        <div>
          <p>Trybe Wallet</p>
          <p data-testid="email-field">
            Email:
            {userEmail}
          </p>
          <p data-testid="total-field">
            {expensesProp.reduce((accumulator, current) => {
              const { exchangeRates } = current;
              const crr = current.currency;
              const vle = current.value;
              let totalValue = (exchangeRates[crr].ask) * vle;
              totalValue = accumulator + parseFloat(totalValue);
              return totalValue;
            }, 0).toFixed(2)}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <div>
          <form>
            <input
              data-testid="value-input"
              onChange={ (e) => this.setState({ value: e.target.value }) }
              type="number"
              value={ value }
            />
            <input
              data-testid="description-input"
              onChange={ (e) => this.setState({ description: e.target.value }) }
              type="text"
              value={ description }
            />
            <select
              data-testid="currency-input"
              value={ currency }
              onChange={ (e) => this.setState({ currency: e.target.value }) }
            >
              {Object.keys(dropdownList).map((item, index) => {
                if (item !== 'USDT') {
                  return (
                    <option
                      data-testid={ item }
                      key={ index }
                      value={ item }
                    >
                      {item}
                    </option>
                  );
                }
                return null;
              })}
            </select>
            <select
              value={ method }
              data-testid="method-input"
              onChange={ (e) => this.setState({ method: e.target.value }) }
            >
              <option
                value="Dinheiro"
              >
                Dinheiro
              </option>
              <option
                value="Cartão de crédito"
              >
                Cartão de crédito
              </option>
              <option
                value="Cartão de débito"
              >
                Cartão de débito
              </option>
            </select>
            <select
              data-testid="tag-input"
              value={ tag }
              onChange={ (e) => this.setState({ tag: e.target.value }) }
            >
              <option
                value="Alimentação"
              >
                Alimentação
              </option>
              <option
                value="Lazer"
              >
                Lazer
              </option>
              <option
                value="Trabalho"
              >
                Trabalho
              </option>
              <option
                value="Transporte"
              >
                Transporte
              </option>
              <option
                value="Saúde"
              >
                Saúde
              </option>
            </select>
            <button
              onClick={ (e) => {
                if (e.target.innerHTML !== 'Editar despesa') {
                  this.saveExpense();
                } else if (e.target.innerHTML === 'Editar despesa') {
                  this.editExpense();
                }
                this.setState({
                  submitButtonText: 'Adicionar despesa',
                });
              } }
              type="button"
            >
              {submitButtonText}
            </button>
          </form>
        </div>
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
          {expensesProp.map((expense, index) => {
            if (expense !== undefined) {
              let td5;
              let td6;
              let td7;
              if (expense.exchangeRates[expense.currency] !== undefined) {
                td5 = expense.exchangeRates[expense.currency].name;
              }
              if (expense.exchangeRates[expense.currency] !== undefined) {
                td6 = Number(expense.exchangeRates[expense.currency]
                  .ask).toFixed(2);
                td7 = (expense.exchangeRates[expense.currency]
                  .ask * expense.value).toFixed(2);
              }
              return (
                <tr key={ index }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{expense.value}</td>
                  <td>{td5}</td>
                  <td>
                    {td6}
                  </td>
                  <td>
                    {td7}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="edit-btn"
                      onClick={ () => {
                        const obj = expensesProp.find((e) => e.id === expense.id);
                        this.setState({
                          submitButtonText: 'Editar despesa',
                          ...obj,
                        });
                      } }
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      data-testid="delete-btn"
                      onClick={ () => {
                        removeExpenseProp(expense.id);
                        this.setState({
                          submitButtonText: 'Adicionar despesa',
                        });
                      } }
                      type="button"
                    >
                      D
                    </button>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.user.email,
    totalSpent: state.wallet.total,
    dropdownList: state.wallet.currencies,
    expensesProp: state.wallet.expenses,
  };
}

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesProp: () => dispatch(getCurrencies()),
  addExpenseLongProp: (expense) => dispatch(addExpenseLong(expense)),
  removeExpenseProp: (id) => dispatch(removeExpense(id)),
  editExpenseProp: (expenses) => dispatch(editExpense(expenses)),
});

Wallet.propTypes = {
  getCurrenciesProp: PropTypes.func,
  addExpenseLongProp: PropTypes.func,
  expensesProp: PropTypes.array,
  editExpenseProp: PropTypes.func,
  totalSpent: PropTypes.number,
  userEmail: PropTypes.string,
  dropdownList: PropTypes.object,
  removeExpenseProp: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
