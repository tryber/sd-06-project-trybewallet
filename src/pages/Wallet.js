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
      paymentChoice: 'Dinheiro',
      selectedCurrency: 'USD',
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
    const { selectedCurrency, paymentChoice, tag, value, description } = this.state;
    console.log(value);
    const expense = {
      description,
      paymentChoice,
      selectedCurrency,
      tag,
      value,
    };
    addExpenseLongProp(expense);
  }

  editExpense() {
    const { expensesProp, editExpenseProp } = this.props;
    const { selectedCurrency, paymentChoice, tag, value, description } = this.state;
    const { id } = this.state;
    expensesProp[id].description = description;
    expensesProp[id].paymentChoice = paymentChoice;
    expensesProp[id].selectedCurrency = selectedCurrency;
    expensesProp[id].tag = tag;
    expensesProp[id].value = value;
    editExpenseProp(expensesProp);
  }

  render() {
    const { totalSpent, userEmail, dropdownList, expensesProp,
      removeExpenseProp } = this.props;
    const { selectedCurrency, paymentChoice, tag, value, description,
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
          <p data-testid="total-field">{totalSpent}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <div>
          <form>
            <input
              data-testid="value-input"
              onChange={ (e) => this.setState({ value: parseInt(e.target.value, 10) }) }
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
              value={ selectedCurrency }
              onChange={ (e) => this.setState({ selectedCurrency: e.target.value }) }
            >
              {Object.keys(dropdownList).map((item, index) => {
                if (item !== 'USDT') {
                  return (
                    <option
                      data-testid={ item }
                      key={ index }
                      onClick={ () => this.setState({ selectedCurrency: item }) }
                    >
                      {item}
                    </option>
                  );
                }
                return null;
              })}
            </select>
            <select
              value={ paymentChoice }
              data-testid="method-input"
              onChange={ (e) => this.setState({ paymentChoice: e.target.value }) }
            >
              <option
                onClick={ () => {
                  this.setState({ paymentChoice: 'Dinheiro' });
                } }
              >
                Dinheiro
              </option>
              <option
                onClick={ () => {
                  this.setState({ paymentChoice: 'Cartão de crédito' });
                } }
              >
                Cartão de crédito
              </option>
              <option
                onClick={ () => {
                  this.setState({ paymentChoice: 'Cartão de débito' });
                } }
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
                onClick={ () => {
                  this.setState({ tag: 'Alimentação' });
                } }
              >
                Alimentação
              </option>
              <option
                onClick={ () => {
                  this.setState({ tag: 'Lazer' });
                } }
              >
                Lazer
              </option>
              <option
                onClick={ () => {
                  this.setState({ tag: 'Trabalho' });
                } }
              >
                Trabalho
              </option>
              <option
                onClick={ () => {
                  this.setState({ tag: 'Transporte' });
                } }
              >
                Transporte
              </option>
              <option
                onClick={ () => {
                  this.setState({ tag: 'Saúde' });
                } }
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
          <thead>
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
          </thead>
          <tbody>
            {expensesProp.map((expense, index) => {
              if (expense !== undefined) {
                let td5;
                let td6;
                let td7;
                if (expense.exchangeRates[expense.selectedCurrency] !== undefined) {
                  td5 = expense.exchangeRates[expense.selectedCurrency].name;
                }
                if (expense.exchangeRates[expense.selectedCurrency] !== undefined) {
                  td6 = Number(expense.exchangeRates[expense.selectedCurrency]
                    .ask).toFixed(2);
                  td7 = (expense.exchangeRates[expense.selectedCurrency]
                    .ask * expense.value).toFixed(2);
                }
                return (
                  <tr key={ index }>
                    <td>{expense.description}</td>
                    <td>{expense.tag}</td>
                    <td>{expense.paymentChoice}</td>
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
          </tbody>
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
