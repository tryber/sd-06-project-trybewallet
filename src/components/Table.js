import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { idToEdit, removeExpense } from '../actions';

class Table extends Component {
  constructor() {
    super();

    this.excludeCost = this.excludeCost.bind(this);
    this.getIdExpense = this.getIdExpense.bind(this);
  }

  getIdExpense({ target }) {
    const { sendIdToEdit } = this.props;
    const targetID = +target.id;

    sendIdToEdit(targetID);
  }

  excludeCost({ target }) {
    const { expenses, deleteExpense } = this.props;
    const selectedID = +target.id;

    const filteredExpenses = expenses.filter((expense) => expense.id !== selectedID);

    const
      selectedExpenseValue = document.querySelector('.converted-value').innerHTML;

    const newTableExpenses = {
      expenses: filteredExpenses,
    };

    deleteExpense(newTableExpenses, selectedExpenseValue);
  }

  render() {
    const { expenses } = this.props;

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
          {expenses && expenses.map((expense) => {
            const {
              id,
              value,
              description,
              currency,
              method,
              tag,
              exchangeRates,
            } = expense;
            const { name, ask } = exchangeRates[currency];
            const convertedValue = parseFloat(value * ask).toFixed(2);
            const exchangeRate = (+ask).toFixed(2);

            return (
              <tr key={ id } id={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ name }</td>
                <td>{ exchangeRate }</td>
                <td className="converted-value">{ convertedValue }</td>
                <td>Real</td>
                <td>
                  <button
                    id={ id }
                    type="button"
                    data-testid="edit-btn"
                    onClick={ this.getIdExpense }
                  >
                    Editar
                  </button>
                  <button
                    id={ id }
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.excludeCost }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  teste: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense, total) => dispatch(removeExpense(expense, total)),
  sendIdToEdit: (id) => dispatch(idToEdit(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf().isRequired,
  deleteExpense: PropTypes.func.isRequired,
  sendIdToEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
