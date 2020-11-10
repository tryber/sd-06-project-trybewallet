import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenseToRecord } from '../actions';

class Table extends React.Component {
  render() {
    const { expenses, deleteRecord } = this.props;
    return (
      <div>
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
            {expenses.length === 0 ? (<tr><td /></tr>) : (
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{expense.value}</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>
                    {Number(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)}
                  </td>
                  <td>
                    {(Number(expense.exchangeRates[expense.currency].ask)
                      * Number(expense.value)).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => deleteRecord(expense) }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteRecord: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteRecord: (expense) => dispatch(deleteExpenseToRecord(expense)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
