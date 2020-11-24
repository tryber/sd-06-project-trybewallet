import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(expense) {
    const { deleteExpense } = this.props;
    // const newTotal = (storeTotal - target.name).toFixed(2);
    // actionRefactoreTotal({ total: newTotal });
    deleteExpense(expense);
    // target.parentNode.parentNode.remove();
  }

  handleEdit(target) {
    console.log(target.parentNode.parentNode.key);
  }

  render() {
    const { storeExpenses } = this.props;
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
          { storeExpenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ expense.value }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>
                {
                  parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)
                }
              </td>
              <td>
                {
                  (parseFloat(expense.exchangeRates[expense.currency].ask)
                  * expense.value).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ (event) => this.handleEdit(event.target) }
                >
                  Editar despesa
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  name={
                    (parseFloat(expense.exchangeRates[expense.currency].ask)
                    * expense.value).toFixed(2)
                  }
                  onClick={ () => this.handleDelete(expense) }
                >
                  Deleta despesa
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  storeExpenses: state.wallet.expenses,
  storeTotal: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(deleteExpense(expense)),
});

Table.propTypes = {
  storeExpenses: PropTypes.arrayOf(PropTypes.any),
  deleteExpense: PropTypes.objectOf().isRequired,
};

Table.defaultProps = {
  storeExpenses: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
