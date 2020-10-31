import React from 'react';
import propType from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   };
  // }

  render() {
    const { expenses } = this.props;
    // const {currency} = expenses;
    // console.log(expenses);
    return (
      <div>
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
              <th className="table-cell">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { (expenses.length > 0) ? expenses.map((item) => (
              // const nameOfCoin = item.currency;
              // const finalNameCoin = item.exchangeRates[nameOfCoin].name;
              // const finalValueCoin = item.exchangeRates[nameOfCoin].ask;
              // const convertedCoin = item.value * finalValueCoin;
              // return (
              <tr key={ item.id }>
                <td className="cell">{item.description}</td>
                <td className="cell">{item.tag}</td>
                <td className="cell">{item.method}</td>
                <td className="cell">{item.value}</td>
                <td className="cell">{item.exchangeRates[item.currency].name}</td>
                <td className="cell">
                  { Number(item.exchangeRates[item.currency].ask).toFixed(2) }
                </td>
                <td className="cell">
                  { (Number(item.exchangeRates[item.currency].ask)
                  * Number(item.value)).toFixed(2) }
                </td>
                <td className="cell">Real</td>
                <td>
                  {/* <div className="edit-expense-container">
                    <button
                      type="button"
                      data-testid="delete-btn"
                      // onClick={ () => dispatchDeleteExpense(expense.id) }
                    >
                      Delete
                    </button>
                  </div> */}
                </td>
              </tr>
              // );
            )) : (<p>Vazio</p>) }
            <tr>
              {/* { expenses.length ? (expenses.map((item)
                => (<td>{item.currency}</td>))) : (<p>Vazio</p>) } */}
            </tr>
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
  expenses: propType.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Table);
