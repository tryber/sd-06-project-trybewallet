import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Table.css';
import Edit from '../images/edit_icon.svg';
import Delete from '../images/delete_icon.svg';

class Table extends Component {
  render() {
    const { saveExpenses } = this.props;
    return (
      <table className="table">
        <thead className="table-head">
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
        <tbody className="table-body">
          {saveExpenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ expense.value }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>
                {
                  (Math
                    .round(parseFloat(expense.exchangeRates[expense.currency]
                      .ask) * 100) / 100)
                }
              </td>
              <td>
                {
                  ((Math
                    .round((expense.exchangeRates[expense.currency]
                      .ask * expense.value) * 100) / 100))
                }
                {/* Math.round() retorna o valor de um número arredondado para o inteiro mais proximo.
                parseFloat() analisa um argumento string e retorna um número de ponto flutuante.
                */}
              </td>
              <td>Real</td>
              <td>
                <button
                  className="button_edit"
                  data-testid="edit-btn"
                  type="button"
                  // onClick{}
                >
                  <img
                    className="image"
                    src={ Edit }
                    alt="Edit"
                  />
                </button>
                <button
                  className="button_delete"
                  data-testid="delete-btn"
                  type="button"
                  // onClick{}
                >
                  <img
                    className="image"
                    src={ Delete }
                    alt="Delete"
                  />
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
  saveExpenses: state.wallet.expenses,
});

Table.propTypes = {
  saveExpenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, null)(Table);
