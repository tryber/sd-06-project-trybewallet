import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectEditar } from '../actions';

class Table extends Component {
  constructor() {
    super();
    this.state = ({
      test: '',
    });
  }

  componentDidUpdate() {
    this.updateProps();
  }

  getDespesa(despesaId) {
    const { expenses, editarSelect, setState } = this.props;
    const despesa = expenses.find((exp) => exp.id === parseInt(despesaId, 10));
    editarSelect(despesa);
    setState(despesa);
  }

  handleUpdate(exp) {
    const { expenses } = this.props;
    expenses.splice(exp, 1);
    this.setState({
      test: 'ok',
    });
  }

  updateProps() {
    const { expenses } = this.props;
    return expenses;
  }

  render() {
    const { expenses } = this.props;
    const { test } = this.state;
    return (
      <div>
        { expenses.length > 0
          ? (
            <table border="1">
              <thead>
                <tr>
                  <td>Descrição</td>
                  <td>Tag</td>
                  <td>Método de pagamento</td>
                  <td>Valor</td>
                  <td>Moeda</td>
                  <td>Câmbio utilizado</td>
                  <td>Valor convertido</td>
                  <td>Moeda de conversão</td>
                  <td>Editar/Excluir</td>

                </tr>
              </thead>
              {expenses.map((exp, index) => (
                <tbody key={ index }>
                  <tr>
                    <td>{exp.description}</td>
                    <td>{exp.tag}</td>
                    <td>{exp.method}</td>
                    <td>{exp.value}</td>
                    <td>{exp.exchangeRates[exp.currency].name}</td>
                    <td>
                      {(Math.round(exp.exchangeRates[exp.currency].ask * 100) / 100)
                        .toFixed(2)}
                    </td>
                    <td>
                      {(exp.exchangeRates[exp.currency].ask * exp.value).toFixed(2)}
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="delete-btn"
                        type="button"
                        onClick={ () => this.handleUpdate(exp.id) }
                      >
                        Excluir
                      </button>
                      <button
                        data-testid="edit-btn"
                        type="button"
                        onClick={ () => this.getDespesa(exp.id) }
                      >
                        Editar
                      </button>

                    </td>
                  </tr>
                </tbody>

              ))}
            </table>

          )
          : (
            <p>
              Vazio
              {test}
            </p>)}

      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  setState: PropTypes.func.isRequired,
  editarSelect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  editarSelect: (despesa) => dispatch(selectEditar(despesa)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
