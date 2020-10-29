import React from 'react';

class ExpensesTable extends React.Component {
  render() {
    return(
      <section className="table">
        <th>Descrição<tr>MapState</tr></th>
        <th className="tag-table">Tag<tr>MapState</tr></th>
        <th>Método de pagamento<tr>MapState</tr></th>
        <th>Valor<tr>MapState</tr></th>
        <th>Moeda<tr>MapState</tr></th>
        <th>Câmbio utilizado<tr>MapState</tr></th>
        <th>Valor convertido<tr>MapState</tr></th>
        <th>Moeda de conversão<tr>MapState</tr></th>
      </section>
    );
  }
}

export default ExpensesTable;
