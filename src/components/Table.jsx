import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, idExpense } from '../actions/expenseActions';

class Table extends Component {
  constructor() {
    super();

    this.renderTable = this.renderTable.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.getExpenseId = this.getExpenseId.bind(this);
  }

  getExpenseId({ target }) {
    const { dispatchId } = this.props;
    const targetID = Number(target.parentNode.parentNode.id);

    dispatchId(targetID);
  }

  deleteExpense({ target }) {
    const { wallet: { expenses }, dispatchExpense } = this.props;
    const targetID = Number(target.id);
    const newExpenses = expenses.filter((item) => item.id !== targetID);
    const minusValue = -Number(document.querySelector('.converted').innerHTML);

    const expenseObj = {
      total: minusValue,
      expenses: newExpenses,
    };

    dispatchExpense(expenseObj);
  }

  renderTable(expense) {
    const { id, description, tag, method, currency, value, exchangeRates } = expense;
    const { name, ask } = exchangeRates[currency];
    const convertedValue = parseFloat(value * ask).toFixed(2);
    const exchange = (ask * 1).toFixed(2);

    return (
      <tr key={ id } id={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ name }</td>
        <td>{ exchange }</td>
        <td className="converted">{ convertedValue }</td>
        <td>Real</td>
        <td>
          <button
            data-testid="edit-btn"
            type="button"
            onClick={ this.getExpenseId }
          >
            Editar
          </button>
          <button
            id={ id }
            type="button"
            data-testid="delete-btn"
            onClick={ this.deleteExpense }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { wallet: { expenses } } = this.props;
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
          {expenses.length !== 0 && expenses.map((item) => this.renderTable(item))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expenses) => dispatch(removeExpense(expenses)),
  dispatchId: (id) => dispatch(idExpense(id)),
});

Table.propTypes = {
  wallet: PropTypes.objectOf().isRequired,
  dispatchExpense: PropTypes.func.isRequired,
  dispatchId: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
