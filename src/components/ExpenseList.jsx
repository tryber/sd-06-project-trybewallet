import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import { connect } from 'react-redux';
import { apagarDespesas, salvarIdEditar } from '../actions';
import '../css/expenseList.css';

class ExpenseList extends Component {
  render() {
    const { pegarDespesas, apagarDados, salvarId } = this.props;
    const formatValue = (value) => (Math.round(value * 100) / 100).toString();
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
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
              <td>{formatValue(item.exchangeRates[item.currency].ask * item.value)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  name={ item.id }
                  onClick={ () => apagarDados(item.id) }
                >
                  <FaRegTrashAlt />
                </button>
                <button
                  type="button"
                  data-testid="edit-btn"
                  name={ item.id }
                  onClick={ () => salvarId(item.id) }
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

const mapDispatchToProps = (dispatch) => ({
  apagarDados: (id) => dispatch(apagarDespesas(id)),
  salvarId: (id) => dispatch(salvarIdEditar(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);

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
