import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Table = ({ task }) => (
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
    {task.map((element, index) => {
      const highValue = element.exchangeRates[element.currency].ask;
      const converted = parseFloat(element.value * highValue);
      const decimal = parseFloat(highValue);
      return (
        <tr key={ index }>
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
      );
    })}
  </table>
);

const mapStateToProps = (state) => ({ task: state.wallet.expenses });

Table.propTypes = {
  task: PropTypes.string,
};

Table.defaultProps = {
  task: '',
};

export default connect(mapStateToProps)(Table);
