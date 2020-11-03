import React from 'react';
import { connect } from 'react-redux';

class Table extends React.Component {

  render() {
    const headerTable = [ 'Descrição', 'Tag', 'Método de pagamento', 'Valor',
      'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir' ];
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            { headerTable.map((hTable) => <th key={hTable}>{ hTable }</th>) }
          </tr>
        </thead>
        <thead>
          <tr>
            { expenses.map((expense) => {
              return (
                <td key={ expense.description }>{ expense.description }</td>
              )
            })}
          </tr>
        </thead>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
})

export default connect(
  mapStateToProps,
)(Table);
