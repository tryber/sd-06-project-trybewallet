import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class Table extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // e.target.parentNode.parentNode.remove()
    const { deleteGlobalExpense } = this.props;
    console.log(e.target);
    deleteGlobalExpense(e.target.id);
    // console.log(expenses[e.target.id]);
  }

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <div>
        <table>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
          </tr>
          {expenses.map((expense, index) => {
            console.log(index);
            return (
              // <p key={ expense.id }>{expense.value}</p>
              <tbody key={ expense.id }>
                <tr>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{expense.value}</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>
                    {Number(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)}
                  </td>
                  <td>
                    {Number(expense.value * expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      id={ index }
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.handleClick }
                    >
                      deletar
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteGlobalExpense: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteGlobalExpense: PropTypes.func.isRequired,
};
