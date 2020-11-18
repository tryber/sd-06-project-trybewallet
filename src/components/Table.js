import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delExpense } from '../actions';

class Table extends Component {
  constructor() {
    super();
    this.renderTable = this.renderTable.bind(this);
  }

  renderTable(expense) {
    const { delExpense } = this.props;
    const {
      id,
      description,
      method,
      tag,
      value,
      currency,
      exchangeRates,
    } = expense;
    const currentCurrency = Object.values(exchangeRates).find(
      (item) => item.code === currency,
    );

    const { name, ask } = currentCurrency;
    const convValue = (ask * value).toFixed(2);

    return (
      <tr id={ id }>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{name}</td>
        <td>{parseFloat(ask).toFixed(2)}</td>
        <td>{convValue}</td>
        <td>Real</td>
        <td>
          <button type="button" data-testid="edit-btn">
            Editar
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => delExpense(expense, convValue) }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    const tableHeaders = [
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
      <table>
        <thead>
          <tr>
            {
              tableHeaders.map((header) => <th key={ header }>{ header }</th>)
            }
          </tr>
        </thead>
        <tbody>
          {expenses.length !== 0
          && expenses.map((expense) => this.renderTable(expense))}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (expense, convValue) => dispatch(delExpense(expense, convValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.objectOf().isRequired,
  delExpense: PropTypes.func.isRequired,
};
