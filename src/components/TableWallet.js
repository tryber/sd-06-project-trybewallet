import React, { Component } from 'react';

class TableWallet extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>description</td>
            <td>tag</td>
            <td>method</td>
            <td>value</td>
            <td>rates</td>
            <td>exchange</td>
            <td>totalValue</td>
            <td>Real</td>
            <td>
              <input type="submit" value="Excluir" />
              <input type="submit" value="Editar" />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default TableWallet;
