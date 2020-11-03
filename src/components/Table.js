import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { deleteExpenseToRecord } from '../actions';

class Table extends React.Component {
  componentDidUpdate() {
    this.createRow();
  }

  createRow() {
    const { expenses } = this.props;
    const rowNumber = expenses.length;
    if (rowNumber !== 0) {
      const item = expenses[rowNumber - 1];
      const tr = document.createElement('tr');
      const tdDescription = document.createElement('td');
      tdDescription.innerHTML = item.description;
      tr.appendChild(tdDescription);
      const tdTag = document.createElement('td');
      tdTag.innerHTML = item.tag;
      tr.appendChild(tdTag);
      const tdMethod = document.createElement('td');
      tdMethod.innerHTML = item.method;
      tr.appendChild(tdMethod);
      const tdValue = document.createElement('td');
      tdValue.innerHTML = item.value;
      tr.appendChild(tdValue);
      const tdCurrency = document.createElement('td');
      tdCurrency.innerHTML = item.exchangeRates[item.currency].name;
      tr.appendChild(tdCurrency);
      const tdUsedExchange = document.createElement('td');
      tdUsedExchange.innerHTML = parseFloat(item.exchangeRates[item.currency].ask)
        .toFixed(2);
      tr.appendChild(tdUsedExchange);
      const tdCovertedValue = document.createElement('td');
      const correctValue = (parseFloat(tdValue.innerHTML)
        * parseFloat(tdUsedExchange.innerHTML)).toFixed(2);
      tdCovertedValue.innerHTML = correctValue;
      tr.appendChild(tdCovertedValue);
      const tdCurrencyToConvert = document.createElement('td');
      tdCurrencyToConvert.innerHTML = 'Real';
      tr.appendChild(tdCurrencyToConvert);

      const tdDeleteButton = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'delete';
      deleteButton.setAttribute('type', 'button');
      // deleteButton.setAttribute('onCLick');
      deleteButton.setAttribute('data-testid', 'delete-btn');
      tdDeleteButton.appendChild(deleteButton);
      tr.appendChild(tdDeleteButton);

      const table = document.querySelector('table');
      table.insertBefore(tr, table.lastChild.nextSibling);
    }
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Descrição</td>
              <td>Tag</td>
              <td>Método de pagamento</td>
              <td>Valor</td>
              <td>Moeda</td>
              <td>Câmbio utilizado</td>
              <td>Valor convertido</td>
              <td>Moeda de conversão</td>
              <td>Editar/Excluir</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     deleteRecord: (expense) => dispatch(deleteExpenseToRecord(expense)),
//   };
// }

export default connect(mapStateToProps)(Table);
