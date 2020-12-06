import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>Descriçao</td>
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
                    <input type="submit" value="Editar" />
                    <input type="submit" value="Excluir" />
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

Table.propTypes = {
  expenses: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Table);
