import React, { Component } from 'react';

class ExpenseForm extends Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input data-testid="value-input" type="number" />
          </label>
          <label htmlFor="coin">
            Moeda:
            <select data-testid="currency-input">
              <option>BRL</option>
            </select>
          </label>
          <label htmlFor="payment-method">
            Método de pagamento:
            <select data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input data-testid="description-input" type="text" />
          </label>
        </form>
        <button type="button">Adicionar despesa</button>
      </div>
    );
  }
}

export default ExpenseForm;
