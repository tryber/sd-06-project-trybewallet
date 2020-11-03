import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import '../style/Table.css';

class Table extends Component {
  render() {
    // const { saveExpenses } = this.props;
    return (
      <table className="table">
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
          {/* {Object.value(saveExpenses)
            .map((expense, index) => (
              <tr key={ index }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ expense.value }</td>
                <td>{ expense.currency }</td>
                <td>{ expense.? }</td>
                <td>{ expense.? }</td>
                <td>{ expense.? }</td>
                <td>
                  <button><img src="../images/edit_icon.svg" alt="Edit" /></button>
                  <button><img src="../images/delete_icon.svg" alt="Delete" /></button>
                </td>
              </tr>
            ))
          } */}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  saveExpenses: state.wallet.expenses,
});

// Table.propTypes = {
// };

export default connect(mapStateToProps, null)(Table);
