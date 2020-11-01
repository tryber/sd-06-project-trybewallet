import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApiThunk } from '../actions';

class FormExpense extends Component {
  componentDidMount() {
    const { getResponse } = this.props;
    getResponse();
  }
  render() {
    const { currenciesValues } = this.props;
    console.log(currenciesValues)
    return (
      <form>
        <label htmlFor="expenseNumber">
          Valor
          <input
            type="number"
            data-testid="value-input"
            name="expenseValue"
            id="expenseNumber"
          />
        </label>
        <label htmlFor="userDescription">
          Descrição
          <textarea
            data-testid="description-input"
            name="description"
            id="userDescription"
          />
        </label>
        <label htmlFor="selectedCoin">
          Moeda
          <select
            data-testid="currency-input"
            name="description"
            id="selectedCoin"
          >
            {
              currenciesValues.map(eachCoin => 
                <option data-testid={eachCoin.code}>{eachCoin.code}</option>)
            }
          </select>
        </label>
        <label htmlFor="payment">
        Método de pagamento
          <select
            data-testid="method-input"
            name="paymentMethod"
            id="payment"
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
            name="tagName"
            id="category"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button>Adicionar despesa</button>
      </form>     
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getResponse: () => dispatch(getApiThunk())
});

const mapStateToProps = (state) => ({
  currenciesValues: state.wallet.currencies,
})

export default connect(mapStateToProps, mapDispatchToProps)(FormExpense);
