import React from 'react';
import { connect } from 'react-redux';

const Table = ({ task }) => {
  return (
    <table>
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
      {task.map(element => {
        const highValue = element.exchangeRates[element.currency].ask;
        const converted = parseFloat(element.value * highValue);
        const decimal = parseFloat(highValue);
        return (
          <tr>
            <td>{element.description}</td>
            <td>{element.tag}</td>
            <td>{element.method}</td>
            <td>
              {element.value}
            </td>
            <td>{element.exchangeRates[element.currency].name}</td>
            <td>{decimal.toFixed(2)}</td>
            <td>{converted.toFixed(2)}</td>
            <td>Real</td>
            <td>editar ou apagar</td>
          </tr>
        )
      }
        )}
    </table>
  )

}

const mapStateToProps = (state) => {
  return { task: state.wallet.expenses }
}

export default connect(mapStateToProps)(Table);
