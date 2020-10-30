import React from 'react';
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
    console.log(expenses);
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
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td>{expenses.currency}</td> */}
              { expenses.length ? (expenses.map((item) => (<td>{item.currency}</td>))) : (<p>Vazio</p>) }
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

export default connect(mapStateToProps)(Table);
