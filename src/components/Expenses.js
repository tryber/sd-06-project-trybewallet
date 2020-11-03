import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Expenses.css';
import PropTypes from 'prop-types';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { removeExpense } from '../actions';

class Expenses extends Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    const header = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    return (
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="tr_items">
              {header.map((item, index) => (
                <th key={ index } className="th_items">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses && expenses.map((expense, index) => (
              <tr key={ index } className="tr_items">
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {Math.ceil(expense.exchangeRates[expense.currency].ask * 100) / 100}
                </td>
                <td>
                  {Math.ceil(
                    expense.value * expense.exchangeRates[expense.currency].ask * 100,
                  ) / 100}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className="edit-button"
                  >
                    <FaEdit size="20" />
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="del-button"
                    onClick={ () => deleteExpense(index) }
                  >
                    <FaTrash size="20" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Expenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (index) => dispatch(removeExpense(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
