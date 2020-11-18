import React from 'react';
import Header from '../components/Header';
import TableHeader from '../components/TableHeader';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <form>
            <input data-testid="value-input" name="" />
            <input data-testid="description-input" name="" />
            <select data-testid="currency-input">
              <option value="" data-testid="USD">1</option>
              <option value="">1</option>
              <option value="">1</option>
              <option value="">1</option>
              <option value="">1</option>
              <option value="">1</option>
            </select>
            <select data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
            <select data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
            <button type="button">Adicionar despesa</button>
          </form>
        </div>
        <TableHeader />
      </div>
    );
  }
}

export default Wallet;
