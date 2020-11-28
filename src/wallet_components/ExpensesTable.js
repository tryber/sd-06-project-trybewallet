import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import bin from '../images/bin.svg';
import edit from '../images/edit.svg';
import '../App.css';
import { removeExpense } from '../actions';

class ExpensesTable extends React.Component {
  constructor() {
    super();
    this.createHeaders = this.createHeaders.bind(this);
    this.createEntries = this.createEntries.bind(this);
    this.createEditExcludeButtons = this.createEditExcludeButtons.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(toRemove) {
    const { deleteExpense } = this.props;
    deleteExpense(toRemove);
  }

  createHeaders() {
    const dataHeaders = [
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
      <tr className="table-header">
        { dataHeaders.map((header, index) => (
          <th key={ `header-${index}` }>
            { header }
          </th>
        )) }
      </tr>
    );
  }

  createEditExcludeButtons(removedit) {
    return (
      <div className="edit-exclude-container">
        <button
          type="button"
        >
          <img
            className="table-btn"
            alt="edit icon"
            src={ edit }
          />
        </button>
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => this.onClick(removedit) }
        >
          <img
            className="table-btn"
            alt="delete icon"
            src={ bin }
          />
        </button>
      </div>
    );
  }

  createEntries() {
    const { expenses } = this.props;

    return (
      expenses.map((expense, index) => {
        const {
          id,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates,
        } = expense;
        const currencyName = exchangeRates[`${currency}`].name;
        const usedRate = parseFloat(exchangeRates[`${currency}`].ask);
        const expenseValue = parseFloat(value);
        return (
          <tr key={ `expense-${id}` }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ value }</td>
            <td>{ currencyName }</td>
            <td>{ usedRate.toFixed(2) }</td>
            <td>{ parseFloat(usedRate * expenseValue).toFixed(2) }</td>
            <td>Real</td>
            <td>{ this.createEditExcludeButtons(index) }</td>
          </tr>
        );
      })
    );
  }

  render() {
    return (
      <table>
        <tbody>
          { this.createHeaders() }
          { this.createEntries() }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (index) => dispatch(removeExpense(index)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
