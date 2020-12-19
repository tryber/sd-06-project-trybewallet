import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, editExpense } from '../actions/WalletForms';

function Table({
  expenses, dispatchRemoveExpense, dispatchEditingExpense }) {
  const handleEdit = (description, tag, value, exchangeRates, currency, method, id) => {
    dispatchEditingExpense({
      description,
      tag,
      value,
      exchangeRates,
      currency,
      method,
      id });
  };

  const ten = 10;
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
        {expenses.length !== null && expenses
          .map(({ description, tag, value, exchangeRates, currency, method, id }, i) => (
            <tr key={ `expense ${i}` }>
              <td role="cell">{description}</td>
              <td role="cell">{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{parseFloat((exchangeRates[currency].ask), ten).toFixed(2)}</td>
              <td>{parseFloat((value * exchangeRates[currency].ask), ten).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => dispatchRemoveExpense(id) }
                >
                  {' '}
                  delete
                </button>
              </td>

              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => handleEdit(description,
                    tag, method, value, currency, exchangeRates, id) }
                >
                  {' '}
                  Editar
                </button>
              </td>
            </tr>))}
      </tbody>

    </table>
  );
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRemoveExpense: (id) => dispatch(removeExpense(id)),
  dispatchEditingExpense: (expense) => dispatch((editExpense(expense))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any),
  dispatchRemoveExpense: PropTypes.func,
  dispatchEditingExpense: PropTypes.func,

};

Table.defaultProps = {
  expenses: [],
  dispatchRemoveExpense: () => {},
  dispatchEditingExpense: () => {},
};
