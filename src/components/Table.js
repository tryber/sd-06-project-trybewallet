import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Table.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table className="table-container">
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
          {expenses && expenses.map((expense) => {
            const exchanteRate = expense.exchangeRates[expense.currency];
            const roundValue = (value) => Math.round(value * 100) / 100;
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{exchanteRate.name}</td>
                <td>{roundValue(exchanteRate.ask)}</td>
                <td>{roundValue(expense.value * exchanteRate.ask)}</td>
                <td>Real</td>
                <td>
                  <button type="button">Edit</button>
                  <button type="button">Delete</button>
                </td>
              </tr>
            );
          })}

        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = { expenses: PropTypes.arrayOf(PropTypes.object).isRequired };
