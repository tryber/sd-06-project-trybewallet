import React from 'react';
import './AddExpenses.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';

class AddExpenses extends React.Component {
  render() {
    return (
      <form className="add-expense">
        <label htmlFor="value">
          Valor:
          <input id="value" type="text" className="inputs size1" />
        </label>
        <label htmlFor="currencie">
          Moeda:
          <select id="currencie" type="text" className="inputs size1">
            <option value="aaa">aaa</option>
          </select>
        </label>
        <label htmlFor="payment">
          Método de pagamento:
          <select id="payment" type="text" className="inputs size3">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select id="tag" type="text" className="inputs size2">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input id="description" type="text" className="inputs size4" />
        </label>
        <button type="button">
          <AiOutlinePlusCircle className="bt-icon-plus" size="35" />
          <span>
            Adicionar
            <br />
            Despesa
          </span>
        </button>
      </form>
    );
  }
}

export default AddExpenses;
