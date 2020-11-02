import React from 'react';
import { connect } from 'react-redux';
import { deleteListItem } from '../actions';

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.handleListItems = this.handleListItems.bind(this);

  }

  handleListItems() {
    const { description, tag, method, value, currency, askRate, expensesArr, deleteItem } = this.props;
    if (expensesArr.length > 0) {
      return (
        <tbody>
        <tr>
          {description.map((value) => <td key={value}>{value}</td>)}
        </tr>
        <tr>
          {tag.map((value) => <td key={value}>{value}</td>)}
        </tr>
        <tr>
          {method.map((value) => <td key={value}>{value}</td>)}
        </tr>
        <tr>
          {value.map((value) => <td key={value}>{value}</td>)}
        </tr>
        <tr>
          {currency.map((value) => <td key={value}>{value}</td>)}
        </tr>
        <tr>
          {askRate.map((value) => <td key={value}>{value.toFixed(2)}</td>)}
        </tr>
        <tr>
          {value.map((each, index) => <td key={each}>{(each * askRate[index]).toFixed(2)}</td>)}
        </tr>
        <tr>
          {expensesArr.map((value) => <td key={value}>{'Real'}</td>)}
        </tr>
        <tr>
          {expensesArr.map((value, index) => <td><button key={`edit${index}`}>{'EDIT'}</button><button onClick={ ({ target }) => deleteItem(target.id) } id={index} key={`del${index}`}>{'DEL'}</button></td>)}
        </tr>
      </tbody>
      )
    } else {
      return (
        <tbody>

        </tbody>
      )
    } 
  }

  render() {
    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    return(
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        { this.handleListItems() }
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(deleteListItem(id)),
});

const mapStateToProps = (state) => ({
  expensesArr: state.wallet.expenses, 
  description: state.wallet.expenses.map((value) => value.description),
  tag: state.wallet.expenses.map((value) => value.tag),
  method: state.wallet.expenses.map((value) => value.method),
  value: state.wallet.expenses.map((coin) => coin.value),
  currency: state.wallet.expenses.map((value) => value.exchangeRates[value.currency].name),
  askRate: state.wallet.expenses.map((value) => parseFloat(value.exchangeRates[value.currency].ask)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

