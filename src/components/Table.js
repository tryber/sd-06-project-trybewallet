import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <div>
        { expenses.length > 0
          ? (
            <table border="1">
              <tr>
                <td>Descrição</td>
                <td>Tag</td>
                <td>Método de pagamento</td>
                <td>Valor</td>
                <td>Moeda</td>
                <td>Câmbio utilizado</td>
                <td>Valor convertido</td>
                <td>Moeda de conversão</td>

              </tr>
              {expenses.map((exp, index) => (

                <tr key={ index }>
                  <td>{exp.description}</td>
                  <td>{exp.tag}</td>
                  <td>{exp.method}</td>
                  <td>{exp.value}</td>
                  <td>{exp.exchangeRates[exp.currency].name}</td>
                  <td>{Math.round(exp.exchangeRates[exp.currency].ask * 100) / 100}</td>
                  <td>{(exp.exchangeRates[exp.currency].ask * exp.value).toFixed(2)}</td>
                  <td>Real</td>
                </tr>

              ))}
            </table>

          ) : <p>Vazio</p>}
        <button
          type="button"
          disabled={ expenses.length === 0 }
        >
          Editar/Excluir
        </button>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
