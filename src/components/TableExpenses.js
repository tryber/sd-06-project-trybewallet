import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteExpenses } from '../actions';

const headerTable = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir'];

class TableExpenses extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(expenseId) {
    const { delExpense } = this.props;
    delExpense(expenseId);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {headerTable.map((item, index) => (
              <th key={ index }>
                {item}
              </th>))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            const {
              value,
              currency,
              method,
              tag,
              description,
              exchangeRates,
              id } = expense;

            const actualExchange = Number(exchangeRates[currency].ask);
            const { name } = exchangeRates[currency];
            const convertValue = actualExchange * value;

            return (
              <tr key={ index }>
                <td>
                  { description }
                </td>
                <td>
                  { tag }
                </td>
                <td>
                  { method }
                </td>
                <td>
                  { value }
                </td>
                <td>
                  { name }
                </td>
                <td>
                  { actualExchange.toFixed(2) }
                </td>
                <td>
                  { convertValue.toFixed(2) }
                </td>
                <td>
                  Real
                </td>
                <td>
                  <FaTrashAlt
                    data-testid="delete-btn"
                    onClick={ () => this.handleClick(id) }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  delExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (expenseId) => dispatch(deleteExpenses(expenseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
