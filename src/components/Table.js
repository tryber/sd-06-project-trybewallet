import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import table from './table.css';

class Table extends React.Component {
  handleTotal() {
    let total = 0;
    const { expenses } = this.props;

    expenses.forEach((expense) => {
      const conversion = expense.exchangeRates[expense.currency].ask;
      total += (Math.round(Number(expense.value * conversion) * 100)) / 100;
    });

    return (<p>{ total }</p>);
  }

  conversionMethod(line) {
    let total = 0;
    const conversion = line.exchangeRates[line.currency].ask;
    total += (Math.round(Number(line.value * conversion) * 100)) / 100;
    return total;
  }

  render() {
    const headTable = [
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

    const { expenses } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr>
              {headTable.map((title, id) => (
                <td key={ id } className="celula-table">{ title }</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, id) => (
              <tr key={ id }>
                <td className="celula-table">{ exp.description }</td>
                <td className="celula-table">{ exp.tag }</td>
                <td className="celula-table">{ exp.method }</td>
                <td className="celula-table">{ exp.value }</td>
                <td className="celula-table">{ exp.exchangeRates[exp.currency].name }</td>
                <td className="celula-table">
                  { (Math.round((exp.exchangeRates[exp.currency].ask) * 100)) / 100 }
                </td>
                <td className="celula-table">{ this.conversionMethod(exp) }</td>
                <td className="celula-table">Real</td>
                <td className="celula-table">
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </td>
              </tr>
            ))}
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
});

Table.propTypes = {
  expenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps)(Table);
