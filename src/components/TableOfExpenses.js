import React, { Component } from 'react';
import { connect } from 'react-redux';

class TableOfExpenses extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Pagamento</th>
            <th>Tag</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((element, index) => (
            <tr key={ index }>
              <td>{element.value}</td>
              <td>{element.currency}</td>
              <td>{element.method}</td>
              <td>{element.tag}</td>
              <td>{element.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableOfExpenses);
