import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenseState } = this.props;

    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de Pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio Utilizado</th>
          <th>Valor Comvertido</th>
          <th>Moeda de Conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        { expenseState.map(expense => {
          <tr>
            <th>{expense.description}</th>
            <th>Tag</th>
            <th>Método de Pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio Utilizado</th>
            <th>Valor Comvertido</th>
            <th>Moeda de Conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        }) }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenseState: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
