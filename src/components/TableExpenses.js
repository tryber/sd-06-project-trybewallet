import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './TableExpenses.css';

class TableExpenses extends React.Component {
  render() {
    const { wallet } = this.props;
    const { expenses } = wallet;
    return (
      (expenses.length === 0) ? <p>Nenhuma Despesa</p> : (
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
            { expenses.map((item) => {
              const currencyAsk = item.exchangeRates[item.currency].ask;
              const currencyOrigin = 'Real';
              const currencyConvert = item.exchangeRates[item.currency].name;
              const valueConvert = item.value * item.exchangeRates[item.currency].ask;

              return (
                <tr key={ item.id }>
                  <td>{ item.description }</td>
                  <td>{ item.tag }</td>
                  <td>{ item.method }</td>
                  <td>{ item.value }</td>
                  <td>{ currencyConvert }</td>
                  <td>{ Math.round(currencyAsk * 100) / 100 }</td>
                  <td>{ Math.round(valueConvert * 100) / 100 }</td>
                  <td>{ currencyOrigin }</td>
                  <td>
                    <button type="button" data-testid="delete-btn">X</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

TableExpenses.propTypes = {
  wallet: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(TableExpenses);
