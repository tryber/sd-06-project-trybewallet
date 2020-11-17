import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { eraseExpense } from '../actions/wallet';

class Table extends Component {
  showExpense(expense) {
    const { id, description, tag, method, value, currency, exchangeRates } = expense;
    const { eraseExpenseDispatch } = this.props;
    return (
      <tr id={ id }>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{exchangeRates[currency].name}</td>
        <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
        <td>{parseFloat(exchangeRates[currency].ask * value).toFixed(2)}</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
          >
            Editar
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => eraseExpenseDispatch(expense) }
          >
            Deletar
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="centered">
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
          { expenses.map((exp) => this.showExpense(exp))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  eraseExpenseDispatch: (expense) => dispatch(eraseExpense(expense)),
});

Table.propTypes = {
  expenses: PropTypes.objectOf().isRequired,
  eraseExpenseDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
