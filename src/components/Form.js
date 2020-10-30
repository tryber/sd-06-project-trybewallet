import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <form>
        <label htmlFor="input-value">
          Valor:
          <input
            id="input-value"
            type="text"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            id="description-input"
            type="text"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            id="currency-input"
            type="text"
            data-testid="currency-input"
          >
            <option>USD</option>
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            id="method-input"
            type="text"
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          <select
            id="tag-input"
            type="text"
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button type="button">Adicionar despesa</button>
        </label>
      </form>
    );
  }
}

export default Form;
