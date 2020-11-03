import React from 'react';

class Table extends React.Component {

  render() {
    const headerTable = [ 'Descrição', 'Tag', 'Método de pagamento', 'Valor',
      'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir' ]
    return (
      <table>
        <thead>
          <tr>
            { headerTable.map((hTable) => <th key={hTable}>{ hTable }</th>) }
          </tr>
        </thead>
      </table>
    );
  }
}

export default Table;
