import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { deleteSelected, idSelected } from '../actions';
import './ExpenseTable.css';

class ExpenseTable extends Component {
  render() {
    const { expenses, deleteExpense, editExpense } = this.props;
    const headings = ['Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio Utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    return (
      <div className="table-container">
        <table className="expense-table">
          <thead>
            <tr className="table-row-heading">
              {headings.map((heading, index) => (
                <th key={ index }>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const exchangeCurrency = Number(
                expense.exchangeRates[expense.currency].ask,
              );
              const convertValue = exchangeCurrency * expense.value;
              return (
                <tr className="table-row-body" key={ expense.id }>
                  <td className="td-data">{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Math.round(expense.value * 100) / 100}</td>
                  <td>
                    {
                      expense.exchangeRates[expense.currency].name
                    }
                  </td>
                  <td>
                    {
                      (Number(Object.values(expense.exchangeRates)
                        .find((findCurrency) => findCurrency.code === expense.currency)
                        .ask)).toFixed(2)
                    }
                  </td>
                  <td>{ convertValue.toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => editExpense(expense.id) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => deleteExpense(expense.id) }
                    >
                      Excluir
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

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteSelected(id)),
  editExpense: (id) => dispatch(idSelected(id)),
});

ExpenseTable.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  deleteExpense: propTypes.func.isRequired,
  editExpense: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
