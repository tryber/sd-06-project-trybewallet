import React from 'react';
import PropTypes from 'prop-types';
import LinhaTabela from './LinhaTabela';
import { connect } from 'react-redux';

const Tabela = (props) => {
  const { expenses } = props;
  console.log(expenses)
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
        {expenses.map((expense) => (<LinhaTabela expense={expense} key={expense.name} />))}
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