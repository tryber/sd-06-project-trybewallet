import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currenciesThunk } from '../actions';
class Wallet extends React.Component {
  componentDidMount() {
    const { currencyFetch } = this.props;
    // currencyFetch()
  }

  render() {
    const { email, currencies } = this.props;

    return (
      <>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <hr/>
        <form>
          <label>
            Valor
            <input type="number" data-testid="value-input" />
          </label>
          <label>
            Descrição
            <input type="text" data-testid="description-input" />
          </label>
          <label>
            Moeda
            <select data-testid="currency-input">
              {
                currencies.map(currency => <option
                  key={currency}
                  value={currency}
                  data-testid={currency}>
                    {currency}
                  </option>)
              }
            </select>
          </label>
          <label>
            Método de pagamento
            <select data-testid="method-input">
              <option value="bill">Dinheiro</option>  
              <option value="credit">Cartão de crédito</option>  
              <option value="debt">Cartão de débito</option>  
            </select>
          </label>
          <label>
            Tag
            <select data-testid="tag-input">
              <option value="food">Alimentação</option>  
              <option value="leisure">Lazer</option>  
              <option value="work">Trabalho</option>  
              <option value="transportation">Transporte</option>  
              <option value="health">Saúde</option>  
            </select>
          </label>
          <button>Adicionar despesa</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencyFetch: () => dispatch(currenciesThunk()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
