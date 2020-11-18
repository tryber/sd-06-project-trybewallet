import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editingExpense as editExpense } from '../actions';
import './table.css';

const titles = [
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

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { editingExpense } = this.props;
    if (editingExpense !== '' && editingExpense !== prevProps.editingExpense) {
      return true;
    }
  }

  handleEditing(idExpense) {
    const { edtExpense } = this.props;
    edtExpense(idExpense);
  }

  handleClick(idExpense) {
    const { dltExpense } = this.props;
    dltExpense(idExpense);
  }

  render() {
    const { expenses, editingExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {titles.map((title) => (
              <td key={ title }>{title}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            const exchangeValue = Number(
              expense.exchangeRates[expense.currency].ask,
            );
            const currencyName = expense.exchangeRates[expense.currency].name;
            const convertedValue = exchangeValue * expense.value;
            return (
              <tr key={ index }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{exchangeValue.toFixed(2)}</td>
                <td>{currencyName}</td>
                <td>{convertedValue.toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEditing(expense.id) }
                    disabled={ editingExpense }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClick(expense.id) }
                    disabled={ editingExpense }
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
  editingExpense: state.wallet.expenseEditingId,
});

const mapDispatchToProps = (dispatch) => ({
  dltExpense: (expenseId) => dispatch(deleteExpense(expenseId)),
  edtExpense: (expenseEditingId) => dispatch(editExpense(expenseEditingId)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dltExpense: PropTypes.func.isRequired,
  edtExpense: PropTypes.func.isRequired,
  editingExpense: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
