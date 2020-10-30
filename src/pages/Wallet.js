import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import deletar from '../img/deletar.png';

class Wallet extends React.Component {
  render() {
    const { _Email } = this.props;
    console.log(this.props);
    return (
      <div>
        <div data-testid="email-field">{ _Email }</div>
        <div data-testid="total-field">
          0
        </div>
        <div>
          <select data-testid="header-currency-field">
            <option value="BRL">BRL</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <form>
          <label htmlFor="valor-despesa">
            Valor da Despesa:
            <input type="text" data-testid="value-input" />
          </label>
          <div className="separator" />
          <label htmlFor="despesa">
            Descrição da Despesa:
            <input type="text" data-testid="description-input" />
          </label>
          <div className="separator" />
          <label htmlFor="registro">
            Registro da Moeda:
            <select data-testid="currency-input">
              <option value="USD" data-testid="USD">USD</option>
              <option value="CAD" data-testid="CAD">CAD</option>
              <option value="EUR" data-testid="EUR">EUR</option>
              <option value="GBP" data-testid="GBP">GBP</option>
              <option value="ARS" data-testid="ARS">ARS</option>
              <option value="BTC" data-testid="BTC">BTC</option>
              <option value="LTC" data-testid="LTC">LTC</option>
              <option value="JPY" data-testid="JPY">JPY</option>
              <option value="CHF" data-testid="CHF">CHF</option>
              <option value="AUD" data-testid="AUD">AUD</option>
              <option value="CNY" data-testid="CNY">CNY</option>
              <option value="ILS" data-testid="ILS">ILS</option>
              <option value="ETH" data-testid="ETH">ETH</option>
              <option value="XRP" data-testid="XRP">XRP</option>
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de pagamento:
            <select data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tipo-despesa">
            Categoria de Despesa:
            <select data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button">Adicionar Despesa</button>
        </form>
        <table className="centered">
          <thead>
            <tr>
              <th data-field="id">Descrição</th>
              <th data-field="name">Tag</th>
              <th data-field="price">Método de Pagamento</th>
              <th data-field="price">Valor</th>
              <th data-field="price">Moeda</th>
              <th data-field="price">Câmbio utilizado</th>
              <th data-field="price">Valor convertido</th>
              <th data-field="price">Moeda de conversão</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alvin</td>
              <td>Eclair</td>
              <td>.87</td>
            </tr>
            <tr>
              <td>Alan</td>
              <td>Jellybean</td>
              <td>.76</td>
            </tr>
            <tr>
              <td>Jonathan</td>
              <td>Lollipop</td>
              <td>.00</td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type="button" data-testid="delete-btn">
            <img
              src={ deletar }
              alt="excluir"
              style={ { width: 40, borderRadius: 50 } }
            />
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            style={ { height: 40, borderRadius: 10 } }
          >
            Editar despesa
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  _Email: state.user.email,
});

Wallet.propTypes = {
  _Email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
