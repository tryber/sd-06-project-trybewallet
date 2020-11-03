import React from 'react';

class ExpenseForm extends React.Component {
  render() {
    return (
      <form>
        <label>
          {'Valor: '}
          <input data-testid="value-input" type="number" />
        </label>
        <label>
          {' Descrição: '}
          <input data-testid="description-input" type="text" />
        </label>
        <label>
          {' Método de pagamento: '}
          <select data-testid="method-input">
            <option value="" disabled selected>Escolha uma opção</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label>
          {'Tag: '}
          <select data-testid="tag-input">
            <option value="" disabled selected>Escolha uma opção</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

export default ExpenseForm;
