import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TableOfExpenses extends Component {

  render() {
    const { expenses } = this.props;
    console.log(expenses);
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
          {expenses.map((element, index) => {
            const roundValue = (value) => Math.round(value * 100) / 100;
            return (
              <tr key={ index }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{element.value}</td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>{roundValue(element.exchangeRates[element.currency].ask)}</td>
                <td>
                  {
                    roundValue(
                      element.value * element.exchangeRates[element.currency].ask,
                    )
                  }
                </td>
                <td>Real</td>
              </tr>);
          })}
        </tbody>
      </table>
    );
  }
}

TableOfExpenses.propTypes = {
  expenses: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableOfExpenses);
