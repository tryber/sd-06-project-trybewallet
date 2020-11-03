import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApiThunk, addExpenseThunk } from '../actions';

class FormExpense extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    }

    this.handleOnchange = this.handleOnchange.bind(this);
    // this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    const { expenseValue, getResponse } = this.props;
    getResponse();
    this.setState({ id: expenseValue.length });
  }

  handleOnchange({ target }) {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  // handleOnClick(event) {
  //   event.PreventDefault();
  //   const { getUserExpenses } = this.props;
  //   getUserExpenses(this.state);
    
  // }
  
  render() {
    const { currenciesValues, getUserExpenses } = this.props;
    return (
      <form>
        <label htmlFor="expenseNumber">
          Valor
          <input
            type="number"
            data-testid="value-input"
            name="value"
            value={ this.state.value }
            id="expenseNumber"
            onChange={this.handleOnchange}
          />
        </label>
        <label htmlFor="userDescription">
          Descrição
          <textarea
            data-testid="description-input"
            name="description"
            value={ this.state.description }
            id="userDescription"
            onChange={this.handleOnchange}
          />
        </label>
        <label htmlFor="selectedCoin">
          Moeda
          <select
            data-testid="currency-input"
            value={ this.state.currency }
            name="currency"
            id="selectedCoin"
            onChange={this.handleOnchange}
          >
            {currenciesValues.map(eachCoin =>
            <option key={ eachCoin.name } data-testid={ eachCoin.code }>{ eachCoin.code }</option>)}
          </select>
        </label>
        <label htmlFor="payment">
        Método de pagamento
          <select
            data-testid="method-input"
            name="method"
            value={ this.state.method }
            id="payment"
            onChange={this.handleOnchange}
          >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
        </label>
        <label htmlFor="category">
          Tag
          <select
            data-testid="tag-input"
            name="tag"
            value={ this.state.tag }
            id="category"
            onChange={this.handleOnchange}
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button onClick={(event) =>{ event.preventDefault();
          getUserExpenses(this.state) }}>Adicionar despesa</button>
      </form>     
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getResponse: () => dispatch(getApiThunk()),
  getUserExpenses: (payload) => dispatch(addExpenseThunk(payload))
});

const mapStateToProps = (state) => ({
  currenciesValues: state.wallet.currencies,
  responseObj: state.wallet.response,
  expenseValue: state.wallet.expenses,
})

export default connect(mapStateToProps, mapDispatchToProps)(FormExpense);
