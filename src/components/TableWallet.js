import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/Wallet.css';

// Esse é o arquivo de renderização dos resultados filtrados no formulário,
// fazendo um map e exibindo todos os resultados presentes no estado global (wallet).

class TableWallet extends React.Component {
  render() {
    const { expenses } = this.props;

    return (
      <div>
        <table className="expenses">
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
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={ exp.currency }>
                <td>{exp.description}</td>
                <td>{exp.tag}</td>
                <td>{exp.method}</td>
                <td>{exp.value}</td>
                <td>{exp.exchangeRates[exp.currency].name}</td>
                <td>{parseFloat(exp.exchangeRates[exp.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    (exp.exchangeRates[exp.currency].ask * exp.value).toFixed(2)
                  }
                </td>
                <td> Real </td>
                <td className="edit">
                  <button
                    type="button"
                  >
                    Editar
                  </button>
                </td>
                <td className="remove">
                  <button
                    type="button"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableWallet);

TableWallet.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
};
