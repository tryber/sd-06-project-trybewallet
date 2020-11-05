import React from 'react';
import { connect } from 'react-redux';
import { buttonDell } from '../actions';

class Table extends React.Component {
  constructor() {
    super();
    this.buttonDel = this.buttonDel.bind(this);
  }

  buttonDel(event) {
    const { dellet } = this.props;
    dellet(parseInt(event.target.name));
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <th>  Descrição </th>
            <th> Tag </th>
            <th> Método de pagamento </th>
            <th> Valor </th>
            <th> Moeda </th>
            <th> Câmbio utilizado </th>
            <th> Valor convertido </th>
            <th> Moeda de conversão </th>
            <th> Editar/Excluir </th>
          </tr>
          {this.props.expenses.expenses.map((expense) => {
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {parseFloat(
                    expense.exchangeRates[expense.currency].ask
                    ).toFixed(2)};
                </td>
                <td>
                  {parseFloat(
                  expense.exchangeRates[expense.currency].ask * expense.value
                  ).toFixed(2)};
                </td>
                <td>Real</td>
                <td>
                  <button type="button">editar</button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    name={ expense.id }
                    onClick={ this.buttonDel }>
                      excluir
                  </button>
                </td>
              </tr>
            );
          }
          )}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet
});

const mapDispatchToProps = (dispatch) => ({
  dellet: ((line) => dispatch(buttonDell(line))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
