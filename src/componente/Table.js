import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../actions';

class Table extends React.Component {
  constructor() {
    super();
    this.deleteExpenseBtn = this.deleteExpenseBtn.bind(this);
    this.editExpenseBtn = this.editExpenseBtn.bind(this);
  }

  deleteExpenseBtn(id) {
    const { deleteBtnDispatch } = this.props;
    deleteBtnDispatch(id);
  }

  editExpenseBtn(id) {
    const { editBtnDispatch } = this.props;
    editBtnDispatch(id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Descriçao</th>
              <th scope="col">Tag</th>
              <th scope="col">Metodo de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((dispesa, index) => {
              const valor = Number(dispesa.exchangeRates[dispesa.currency].ask);
              const exchangeValue = dispesa.exchangeRates[dispesa.currency].name;
              const totalValue = (valor * dispesa.value).toFixed(2);
              return (
                <tr key={ index }>
                  <td>{dispesa.description}</td>
                  <td>{dispesa.tag}</td>
                  <td>{dispesa.method}</td>
                  <td>{dispesa.value}</td>
                  <td>{valor.toFixed(2)}</td>
                  <td>{exchangeValue}</td>
                  <td>{totalValue}</td>
                  <td>Real</td>
                  <td>
                    <input
                      data-testid="edit-btn"
                      type="submit"
                      value="Editar"
                      onClick={ () => this.editExpenseBtn(dispesa.id) }
                    />
                    <input
                      data-testid="delete-btn"
                      type="submit"
                      value="Excluir"
                      onClick={ () => this.deleteExpenseBtn(dispesa.id) }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteBtnDispatch: (id) => dispatch(deleteExpense(id)),
  editBtnDispatch: (id) => dispatch(editExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
