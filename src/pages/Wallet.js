import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import apiMoney from '../actions';



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

componentDidMount() {
  const { myMoney } = this.props;
  myMoney()
}

  render() {
    const { totalValue } = this.state;
    const { email, currencies } = this.props;
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
              {currencies.map((moeda) => (
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
            Tag:    
            <select data-testid="tag-input">
              {tag.map((tag) => (
                <option value={tag}>{tag}</option>
              ))}
            </select>
          </label>
          {/* Ao ser clicado, o botão deve fazer uma requisição à API para trazer o câmbio mais atualizado possível. */}
          <button type="submit">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  myMoney: (cotacaoMoeda) => dispatch(apiMoney(cotacaoMoeda)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
