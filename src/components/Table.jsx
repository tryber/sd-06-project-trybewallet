import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTableRow } from '../actions';

class Table extends Component {
  render() {
    const { expenses, deleteExpenseDataFromStore } = this.props;
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
            {expenses && expenses.map((expense) => {
              const roundFunc = (value) => Math.round(value * 100) / 100;
              const exchangeRate = expense.exchangeRates[expense.currency].ask;
              const ourCurrency = 'Real';
              return (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{expense.value}</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>{roundFunc(exchangeRate)}</td>
                  <td>{roundFunc(exchangeRate * expense.value)}</td>
                  <td>{ourCurrency}</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => deleteExpenseDataFromStore(expense) }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.objectOf.isRequired,
  deleteExpenseDataFromStore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseDataFromStore: (expense) => dispatch(deleteTableRow(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
