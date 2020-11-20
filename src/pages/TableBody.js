import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, totalField, editExpenses } from '../actions';

class TableBody extends Component {
  editando(e) {
    this.props.edita()
    const { editExpense } = this.props
     console.log('teste', editExpense )
     console.log('teste111', e.id)
  }

  render() {
    const { expenses, deleta, update, edita } = this.props;
    return (
      <tbody>
        {
          expenses ? expenses.map((item) => (
          <>
            <tr key={ item.currency }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{item.value}</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
              <td>
                {
                  (item.exchangeRates[item.currency].ask * item.value).toFixed(2)
                }
              </td>
              <td> Real </td>
              <td> --- </td>
              <button
                data-testid="delete-btn"
                onClick={ () => {
                  deleta(item);
                  update();
                } }
                type="button"
              >
                excluir
              </button>
            </tr>
              <button data-testid="edit-btn" type="button" onClick={ (e) => this.editando(e) }>
                Editar despesa
              </button>
             </> 
          ))
            : ''
        }
      </tbody>
    );
  }
}

TableBody.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleta: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expense: state,
  editExpense: state.wallet.expenses,
})

const mapDispatchToProps = (dispatch) => ({
  deleta: (id) => dispatch(deleteExpense(id)),
  update: () => dispatch(totalField()),
  edita: () => dispatch(editExpenses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
