import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionRemoveExpense, actionEditExpense } from '../actions';

class Table extends Component {
  constructor() {
    super();

    this.deleteExpence = this.deleteExpence.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  deleteExpence(id) {
    const { actionRemove } = this.props;
    actionRemove(id);
  }

  editExpense() {
    const { actionEdit } = this.props;
    const { value, description, currency, method, tag, id, isEditing } = this.state;
    actionEdit({ value, description, currency, method, tag, id, isEditing });
  }

  handleEditExpense(id) {
    this.setState({ editedId: id, isEditing: true });
  }

  render() {
    const { expenses } = this.props;
    const titles = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    // console.log(expenses);
    return (
      <table className="table-container">
        <thead>
          <tr>
            {titles.map((title) => <td key={ title }>{ title }</td>)}
          </tr>
        </thead>
        <tbody className="table-body">
          {expenses.map((expense, index) => {
            const askedValue = Number(expense.exchangeRates[expense.currency].ask);
            const askedName = expense.exchangeRates[expense.currency].name;
            const newValue = askedValue * expense.value;
            return (
              <tr id={ index } key={ index }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ expense.value }</td>
                <td>{ askedValue.toFixed(2) }</td>
                <td>{ askedName }</td>
                <td>{ newValue.toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEditExpense(index) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteExpence(index) }
                  >
                    Deletar
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

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.shape()).isRequired,
  actionRemove: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  actionRemove: (id) => dispatch(actionRemoveExpense(id)),
  actionEdit: (expense) => dispatch(actionEditExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

/*
{expenses.map((expen, index) => {
  const exchangeValue = Number(expen.exchangeRates[expen.currency].ask);
  const currencyName = expen.exchangeRates[expen.currency].name;
  const convertedValue = exchangeValue * expen.value;
  return (
    <tr key={ index }>
      <td>{ expen.description }</td>
      <td>{ expen.tag }</td>
      <td>{ expen.method }</td>
      <td>{ expen.value }</td>
      <td>{ exchangeValue.toFixed(2) }</td>
      <td>{ currencyName }</td>
      <td>{ convertedValue.toFixed(2) }</td>
      <td>Real</td>
      <td>
        <button type="button" data-testid="edit-btn">Editar</button>
        <button type="button" data-testid="delete-btn">Deletar</button>
      </td>
    </tr>
  );
})}
*/
