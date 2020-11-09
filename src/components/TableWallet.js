import React, { Component } from 'react';
import { connect } from 'react-redux';

class TableWallet extends Component {
  render() {
    const { expenses } = this.props;
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
          {expenses.map((expense, index) => {
            const rates = Number(expense.exchangeRates[expense.currency].ask);
            const exchange = expense.exchangeRates[expense.currency].name;
            const totalValue = (rates * expense.value).toFixed(2);
            return (
              <tr key={ index }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{rates.toFixed(2)}</td>
                <td>{exchange}</td>
                <td>{totalValue}</td>
                <td>Real</td>
                <td>
                  <input type="submit" value="Excluir" />
                  <input type="submit" value="Editar" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableWallet);
