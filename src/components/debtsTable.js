import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleDeleteExpense } from '../actions';

class DebtsTable extends Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    console.log(deleteExpense);
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
          <tboby>
            { expenses.map((el) => (
              <tr key={ el.id }>
                <td>{el.description}</td>
                <td>{el.tag}</td>
                <td>{el.method}</td>
                <td>{el.value}</td>
                <td>{el.exchangeRates[el.currency].name}</td>
                <td>
                  {
                    (Math.round((el.exchangeRates[el.currency].ask) * 100) / 100)
                      .toFixed(2)
                  }
                </td>
                <td>
                  {
                    (Math.round((el.value * el.exchangeRates[el.currency].ask)
                    * 100) / 100
                    ).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteExpense(el.id) }
                  >
                    Click
                  </button>
                </td>
              </tr>
            )) }
          </tboby>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (payload) => dispatch(handleDeleteExpense(payload)),
});

DebtsTable.propTypes = {
  expenses: propTypes.objectOf(propTypes.string).isRequired,
  deleteExpense: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DebtsTable);
