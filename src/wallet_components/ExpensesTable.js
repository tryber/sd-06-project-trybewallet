import React from 'react';
import { connect } from 'react-redux';

class ExpensesTable extends React.Component {
  render() {
    const dataHeaders = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];

    return (
      <table>
        <tbody>
          <tr className="table-header">
            { dataHeaders.map((header, index) => (
              <th key={ `header-${index}` }>
                { header }
              </th>
            )) }
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect(null, null)(ExpensesTable);
