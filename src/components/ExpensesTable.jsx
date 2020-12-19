import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExpensesTable extends Component {
  constructor() {
    super();
    this.tableBody = this.tableBody.bind(this);
  }
  tableBody() {
    const { tableField } = this.props;
    if (tableField.length > 0) {
      const tableInfo = tableField.map(element =>
        <tbody key={element.id}>
          <tr>
            <td>{element.description}</td>
            <td>{element.tag}</td>
            <td>{element.method}</td>
            <td>{element.value}</td>
            <td>{element.exchangeRates[element.currency].name}</td>
            <td>{
              parseFloat(
                element.exchangeRates[element.currency].ask
                ).toFixed(2)
                }
            </td>
            <td>{
              (element.value * parseFloat(
                element.exchangeRates[element.currency].ask
                )).toFixed(2)
                }
            </td>
            <td>Real</td>
          </tr>
        </tbody>
      )    
      return (
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {tableInfo}
        </table> 
      );
    }
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
      </table>  
    );
  }
  render() {
    return (
      this.tableBody()
    );
  };
}

const mapStateToProps = (state) => ({
  tableField: state.wallet.expenses,
  teste: state.wallet.currencies,
})

export default connect(mapStateToProps)(ExpensesTable);
