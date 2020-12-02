import React from 'react';

class Table extends React.Component {
  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>job.description</td>
              <td>job.tag</td>
              <td>job.method</td>
              <td>job.value</td>
              <td>job.currency</td>
              <td>job.cambio</td>
              <td>job.convertValue</td>
              <td>job.currentCurrency</td>
              <td>job.editDelet</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
