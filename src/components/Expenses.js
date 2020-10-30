import React, { Component } from 'react';

class Expenses extends Component {
  render() {
    return (
      <div className="expenses-container">
        <form>
          <label htmlFor="expense-value">
            Valor:
            <input
              id="expense-value"
              value=""
              data-testid="value-input"
            />
          </label>
          <label htmlFor="expense-description">
            Descrição
            <input
              id="expense-description"
              value=""
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              namme="currency"
              id="currency"
              data-testid="currency-input"
            >
              <option value="">Requisicao</option>
            </select>
          </label>
          <label htmlFor="payment">
            Pagamento:
            <select
              name="payment"
              id="payment"
              data-testid="method-input"
            >
              <option value="cash">Dinheiro</option>
              <option value="debit">Cartão de débito</option>
              <option value="credit">Cartão de crédito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
            >
              <option value="meal">Alimentação</option>
              <option value="leisure">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transport">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => console.log('click') }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

export default Expenses;
