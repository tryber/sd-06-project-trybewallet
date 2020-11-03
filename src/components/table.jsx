import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.delExpense = this.delExpense.bind(this);
  }

  delExpense(expense) {
    console.log(expense);
    const { deleteExpense } = this.props;
    deleteExpense(expense.id);
  }

  render() {
    const { expensesValue } = this.props;
    console.log(expensesValue);
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
          {expensesValue.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ expense.value }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>
                { (Math
                    .round(parseFloat(expense.exchangeRates[expense.currency].ask) * 100) / 100) }
              </td>
              <td>
                { ((Math.round((expense.exchangeRates[expense.currency].ask * expense.value) * 100) / 100)) }
              </td>
              <td>Real</td>
              <td>
                <button type="button" data-testid="delete-btn" onClick={ () => this.delExpense(expense) }>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesValue: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(deleteExpense(expense)),
})

Table.propTypes = {
  expensesValue: PropTypes.arrayOf(Object).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
