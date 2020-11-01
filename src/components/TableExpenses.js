import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './TableExpenses.css';
import { deleteWallet, isEditingWallet } from '../actions';
import deleteBtn from '../imgs/delete.png';
import editBtn from '../imgs/edit.png';

class TableExpenses extends React.Component {
  render() {
    const { wallet, deleteItem, editItem } = this.props;
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
              const currencyConvert = item.exchangeRates[item.currency].name;
              const currencyAsk = item.exchangeRates[item.currency].ask;
              const valueConvert = item.value * item.exchangeRates[item.currency].ask;
              const currencyOrigin = 'Real';

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
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => editItem(item.id) }
                    >
                      <img src={ editBtn } alt="edit button" width="20px" />
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => deleteItem(item.id) }
                    >
                      <img src={ deleteBtn } alt="delete button" width="20px" />
                    </button>
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

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(deleteWallet(id)),
  editItem: (id) => dispatch(isEditingWallet(id)),
});

TableExpenses.propTypes = {
  wallet: PropTypes.shape.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
