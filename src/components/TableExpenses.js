import React, { Component } from 'react';

class TableExpenses extends Component {
  render() {
    const headerTable = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir'];

    return (
      <div>
        {headerTable.map((item, index) => (
          <span key={ index }>
            {item}
          </span>))}
      </div>
    );
  }
}

export default TableExpenses;
