import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinhaTabela from './LinhaTabela';

const Tabela = (props) => {
  const { expenses } = props;
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
      <tbody>
        {expenses.map((expense, index) => (
          <LinhaTabela expense={ expense } key={ `${index}has` } />
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Tabela.propTypes = {
  expenses: PropTypes.instanceOf(Array),
}.isRequired;

export default connect(mapStateToProps)(Tabela);
