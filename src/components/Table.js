import React from 'react';
import { connect } from 'react-redux';
import table from './table.css'

class Table extends React.Component {

  handleTotal() {
    let total = 0;
    const { expenses } = this.props;

    expenses.forEach((expense) => {
      let conversion = expense.exchangeRates[expense.currency].ask;
      total += (Math.round(Number(expense.value * conversion) * 100)) / 100;
      });

      return (<p>{ total }</p>);
  }

  conversionMethod(line) {
    let total = 0;
    // const { expenses } = this.props
    let conversion = line.exchangeRates[line.currency].ask;
    return total += (Math.round(Number(line.value * conversion) * 100)) / 100;
  }

  render() {
    const headTable = ['Valor', 'Descrição', 'Método', 'Tag', 'Moeda', "Valor convertido", "Editar/Excluir"];
    const { expenses } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr>
              {headTable.map(title => {
                return (
                  <td className="celula-table">{ title }</td>
                );
              })}
            </tr>
          </thead>
          <tbody>
          {expenses.map((exp, id) => {
            return (
              <tr key={ id }>
                <td className="celula-table">{exp.value}</td>
                <td className="celula-table">{exp.description}</td>
                <td className="celula-table">{exp.method}</td>
                <td className="celula-table">{exp.tag}</td>
                <td className="celula-table">{exp.currency}</td>
                <td className="celula-table">{ this.conversionMethod(exp) }</td>
                <td className="celula-table">
                  <button>Editar</button>
                  <button>Excluir</button>
                  </td>
              </tr>
            )
            })}
          </tbody>
          <tfoot className="celula-table">
            Total:
              { this.handleTotal() }
          </tfoot>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
})

export default connect(mapStateToProps)(Table);
