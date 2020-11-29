import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenseAction, editBtnAction } from '../actions';

class Table extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleClick(event) {
    const { expensesState: { expenses } } = this.props;
    const { deleteExpense } = this.props;
    expenses.forEach((element) => {
      if ((+event.target.name) === element.id) {
        deleteExpense(element.id);
      }
    });
  }

  handleEdit(objectElement) {
    // const { expensesState: { expenses } } = this.props;
    const { editBtn } = this.props;
    const toogle = true;
    editBtn(toogle, objectElement);
  }

  render() {
    const { expensesState: { expenses } } = this.props;
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
          {expenses.map((element) => (
            <tr key={ element.description }>
              <td>{element.description}</td>
              <td>{element.tag}</td>
              <td>{element.method}</td>
              <td>{element.value}</td>
              <td>
                {
                  Object.values(element.exchangeRates)
                    .find((titleCurrency) => titleCurrency.code === element.currency)
                    .name
                }
              </td>
              <td>
                {
                  parseFloat(Object.values(element.exchangeRates)
                    .find((titleCurrency) => titleCurrency.code === element.currency)
                    .ask).toFixed(2)
                }
              </td>
              <td>
                {
                  parseFloat((element.value) * (Object.values(element.exchangeRates))
                    .find((titleCurrency) => titleCurrency.code === element.currency)
                    .ask).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  name={ element.id }
                  onClick={ () => this.handleEdit(element) }
                  data-testid="edit-btn"
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  name={ element.id }
                  onClick={ this.handleClick }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesState: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
  editBtn: (toogle, objectElement) => dispatch(editBtnAction(toogle, objectElement)),
});

Table.propTypes = {
  expensesState: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
  }).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editBtn: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table);
