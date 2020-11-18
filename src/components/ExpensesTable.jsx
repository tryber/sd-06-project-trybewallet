import React from 'react';
import { connect } from 'react-redux';
import { deleteListItem, editiListItem } from '../actions';

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.handleListItems = this.handleListItems.bind(this);

  }

  handleListItems() {
    const { expensesArr, deleteItem, editItem } = this.props;
    if (expensesArr.length > 0) {
      const askRate = expensesArr.map((value) => parseFloat(value.exchangeRates[value.currency].ask));
      const currency = expensesArr.map((value) => value.exchangeRates[value.currency].name);
      const value = expensesArr.map((coin) => coin.value);
      const method = expensesArr.map((value) => value.method);
      const tag = expensesArr.map((value) => value.tag);
      const description = expensesArr.map((value) => value.description);

      return (
        <tbody>
        <tr>
          {description.map((value, index) => <td key={`desc${index}`}>{value}</td>)}
        </tr>
        <tr>
          {tag.map((value, index) => <td key={`tag${index}`}>{value}</td>)}
        </tr>
        <tr>
          {method.map((value, index) => <td key={`meth${index}`}>{value}</td>)}
        </tr>
        <tr>
          {value.map((value, index) => <td key={`vaç${index}`}>{value}</td>)}
        </tr>
        <tr>
          {currency.map((value, index) => <td key={`curr${index}`}>{value}</td>)}
        </tr>
        <tr>
          {askRate.map((value, index) => <td key={`ask${index}`}>{value.toFixed(2)}</td>)}
        </tr>
        <tr>
          {value.map((each, index) => <td key={`conv${index}`}>{(each * askRate[index]).toFixed(2)}</td>)}
        </tr>
        <tr>
          {expensesArr.map((value, index) => <td key={`brl${index}`}>{'Real'}</td>)}
        </tr>
        <tr>
          {expensesArr.map((value, index) => (
            <td key={`td${index}`}>
              <button 
                key={`edit${index}`}
                onClick={ ({ target }) => editItem(parseInt(target.id)) }
                id={index}
              >
                {'EDIT'}
              </button>
              <button 
                data-testid="delete-btn" 
                onClick={ ({ target }) => deleteItem(parseInt(target.id)) }
                id={index}
                key={`del${index}`}
              >
                {'DEL'}
              </button>
            </td>))}
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
  editItem: (id) => dispatch(editiListItem(id)),
});

const mapStateToProps = (state) => ({
  expensesArr: state.wallet.expenses,
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

