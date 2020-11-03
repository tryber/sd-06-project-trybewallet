import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { deleteExpense } from '../actions';

const titles = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
  'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(idExpense) {
    const { dltExpense } = this.props;
    dltExpense(idExpense);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table id="tbl" border="1">
        <thead>
          <tr>
            {titles.map((title) => <td key={ title }>{ title }</td>)}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            const exchangeValue = Number(expense.exchangeRates[expense.currency].ask);
            const currencyName = expense.exchangeRates[expense.currency].name;
            const convertedValue = exchangeValue * expense.value;
            return (
              <tr key={ index }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ expense.value }</td>
                <td>{ exchangeValue.toFixed(2) }</td>
                <td>{ currencyName }</td>
                <td>{ convertedValue.toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button type="button" data-testid="edit-btn">Editar</button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClick(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              TOTAL
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dltExpense: (expenseId) => dispatch(deleteExpense(expenseId)),
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  dltExpense: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
