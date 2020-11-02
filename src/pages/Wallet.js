import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreators } from '../store/index';
import '../css/Wallet.css';
import logo from '../images/logo.png';

class Wallet extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     expenses: {
  //       value: '',
  //       description: '',
  //       currency: '',
  //       method: '',
  //       tag: '',
  //     },
  //   };
  // }

  // componentDidMount() {
  //   const { requestAPI } = this.props;
  //   requestAPI();
  // }

  render() {
    const { email } = this.props;
    // const { expenses } = this.state;
    // const { value, description, method, currency, tag } = expenses;
    return (
      <div>
        <header className="header-wallet">
          <img
            src={ logo }
            alt="Logo"
            className="img-logo-wallet"
          />
          <span
            data-testid="email-field"
          >
            {email}
          </span>
          <span
            data-testid="total-field"
          >
            0
          </span>
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </header>
        <form className="form">
          <input
            onChange={ (e) => actionCreators.addExpense(e.target.value) }
            placeholder="Valor"
            data-testid="value-input"
          />
          <input
            onChange={ (e) => actionCreators.addExpense(e.target.value) }
            placeholder="Descrição"
            data-testid="description-input"
          />
          <select
            onChange={ (e) => actionCreators.addExpense(e.target.value) }
            data-testid="currency-input"
          >
            <option value="BRL">BRL</option>
          </select>
          <select
            onChange={ (e) => actionCreators.addExpense(e.target.value) }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de Crédito">Cartão de crédito</option>
            <option value="Cartão de Débito">Cartão de débito</option>
          </select>
          <select
            onChange={ (e) => actionCreators.addExpense(e.target.value) }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            className="wallet-button"
            type="button"
          >
            Adicionar despesa
          </button>
        </form>
        <table className="header-expenses">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </table>
        <table>
          <tbody>
            <tr>
              {/* fazer um map das expenses e exibir aqui! */}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

// mapStateToProps é equivalente a um getState()
// mapDispatchToProps é equivalente a um setState()

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};
