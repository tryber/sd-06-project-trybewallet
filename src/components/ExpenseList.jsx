import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import { connect } from 'react-redux';
import '../css/expenseList.css';

class ExpenseList extends Component {
  render() {
    const { pegarDespesas } = this.props;
    return (
      <table className="tabela">
        <thead className="titulo">
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
        <tbody className="corpo">
          { pegarDespesas.map((item) => (
            <tr key={ item.id }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{item.value}</td>
              <td>moeda</td>
              <td>valorConvertido</td>
              <td>moedaDeConversao</td>
              <td>moedaCorrente</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  name={ item.id }
                  // onClick={ () => apagarDespesas(id) }
                >
                  <FaRegTrashAlt />
                </button>
                <button
                  type="button"
                  data-testid="edit-btn"
                  name={ item.id }
                  // onClick={ () => editarDespesas(id) }
                >
                  <FaEdit />
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
  pegarDespesas: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpenseList);

ExpenseList.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  tag: PropTypes.string,
  method: PropTypes.string,
  value: PropTypes.string,
  currency: PropTypes.string,
  ask: PropTypes.number,
  rate: PropTypes.number,
  name: PropTypes.string,
  moedaCorrente: PropTypes.string,
}.isRequired;
