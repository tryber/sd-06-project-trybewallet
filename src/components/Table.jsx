import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../actions/expensesAction';
import './styles/table.css';

class Table extends Component {
  constructor() {
    super();

    this.renderTableBody = this.renderTableBody.bind(this);
    this.deletedExpense = this.deletedExpense.bind(this);
  }

  deletedExpense({ target }) {
    const { expenses, sendExpense } = this.props;
    const targetID = Number(target.parentNode.parentNode.id);
    const newExpenses = expenses.filter((item) => item.id !== targetID);
    const minusValue = -Number(document.querySelector('.converted').innerHTML);

    const expenseObj = {
      total: minusValue,
      expenses: newExpenses,
    };

    sendExpense(expenseObj);
  }

  renderTableBody(expense) {
    const { id, description, tag, method, currency, value, exchangeRates } = expense;
    const currencyName = Object.keys(exchangeRates).reduce((acc, key) => {
      if (key === currency) {
        Object.assign(acc, { ...exchangeRates[key] });
      }
      return acc;
    }, {});

    const { name, ask } = currencyName;
    const convertedValue = (value * ask).toFixed(2);

    return (
      <tr id={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ name }</td>
        <td>{ (ask * 1).toFixed(2) }</td>
        <td className="converted">{ convertedValue }</td>
        <td>Real</td>
        <td>
          <button data-testid="edit-btn" type="button">Editar despesa</button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ this.deletedExpense }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
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
          { expenses.length === 0 ? null
            : expenses.map((item) => this.renderTableBody(item)) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  sendExpense: (expenses) => dispatch(removeExpense(expenses)),
});

Table.propTypes = {
  expenses: PropTypes.objectOf().isRequired,
  sendExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
