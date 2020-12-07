import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';
import { removeExpense, saveId, editExpense, btnEdit } from '../actions';

class TableExpense extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(e) {
    const { expenses } = this.props;
    const { deleteExpense } = this.props;
    expenses.forEach((element) => {
      if (Number(e.target.name) === element.id) {
        deleteExpense(element.id);
      }
    });
  }

  handleEdit(e) {
    const { editBtn } = this.props;
    editBtn(e);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
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
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {parseFloat((expense.exchangeRates)[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td>
                  {parseFloat(
                    (expense.exchangeRates)[expense.currency].ask
                  * expense.value,
                  ).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    name={ expense }
                    onClick={ () => this.handleEdit(expense) }
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    name={ expense.id }
                    onClick={ this.handleDelete }
                    data-testid="delete-btn"
                  >
                    Excluir
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

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(removeExpense(id)),
  addId: (id) => dispatch(saveId(id)),
  edit: (expense) => dispatch(editExpense(expense)),
  editBtn: (expense) => dispatch(btnEdit(expense)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpense);

TableExpense.propTypes = {
  deleteExpense: func.isRequired,
  expenses: string.isRequired,
  editBtn: func.isRequired,
};
