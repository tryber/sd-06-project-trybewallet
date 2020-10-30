import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currencies } from '../actions';


class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      expenses: [{
        id: '',
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      }],
      totalValue: '',
    };
  }

  render() {
    const { totalValue } = this.state;
    const { email } = this.props;
    const moedas = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    const pagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <header>
          <p data-testid="email-field">Email: {email}</p>
          <p data-testid="total-field">Despesas totais: {totalValue}</p>
          <p data-testid="header-currency-field">Câmbio: BRL</p>
        </header>
        <form>
          <label>
            Valor:
            <input type="number" data-testid="value-input" />
          </label>
          <label>
            Descrição:
            <input type="text" data-testid="description-input" />
          </label>
          <label>
            Moeda:{' '}
            {/* buscar atraves da api, Remova das informações trazidas pela API a opção 'USDT' (Dólar Turismo).  */}
            <select data-testid="currency-input">
              {moedas.map((moeda) => (
                <option value={moeda} data-testid={moeda}>
                  {moeda}
                </option>
              ))}
            </select>
          </label>
          <label>
            Método de Pagamento:
            <select data-testid="method-input">
              {pagamento.map((pagamento) => (
                <option value={pagamento}>{pagamento}</option>
              ))}
            </select>
          </label>
          <label>
            Tag:{' '}
            {/* Ao ser clicado, o botão deve fazer uma requisição à API para trazer o câmbio mais atualizado possível. */}
            <select data-testid="tag-input">
              {tag.map((tag) => (
                <option value={tag}>{tag}</option>
              ))}
            </select>
          </label>
          <button type="submit">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email
});

const mapDispatchToProps = (dispatch) => ({
  myNewExpenses: (payload) => dispatch(expenses(payload)),
  myNewCurrencies: (payload) => dispatch(currencies(payload)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
