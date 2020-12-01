import React, { Component } from 'react';
import '../css/expenseForm.css';

class ExpenseForm extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     entry: {
  //       id: 0,
  //       value: '',
  //       description: '',
  //       currency: 'USD',
  //     }
  //   }
  // }

  render() {
    return (
      <form action="" className="entry">
        <div className="system-information">
          <p className="id-input">Número de Id.</p>
          <p className="entry-date">Entrada</p>
          <span />
        </div>
        <div className="user-entry">
          <div className="org-left">
            <input
              type="number"
              className="valueInput"
              data-testid="value-input"
              placeholder="Valor da Despesa."
            />
            <label htmlFor="currency-input">
              Moeda:
              <select data-testid="currency-input">
                <option value="teste1">teste1</option>
                <option value="teste2">teste2</option>
                <option value="teste3">teste3</option>
              </select>
            </label>
            <label htmlFor="method-input">
              Método de Pagamento:
              <select data-testid="method-input">
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="tag-input">
              Tag:
              <select data-testid="tag-input">
                <option value="Lazer ">Lazer</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>
          </div>
          <div className="org-right">
            <input
              type="text"
              className="descriptionInput"
              data-testid="description-input"
              placeholder="Descrição da Despesa."
            />
          </div>
          <button type="button">Adicionar Despesa</button>
        </div>
      </form>
    );
  }
}

export default ExpenseForm;
