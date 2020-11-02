import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = { currencies: [] };
  }

  async componentDidMount() {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(endpoint);
    const data = await response.json();
    const currencyKeys = Object.keys(data);
    const list = currencyKeys.filter((item) => item !== 'USDT');
    this.setState({ currencies: list });
  }

  render() {
    const { email } = this.props;
    const { currencies } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <header>
          <h3 data-testid='email-field'>{email}</h3>
          <p data-testid='total-field'>0</p>
          <p data-testid='header-currency-field'>BRL</p>
        </header>
        <form>
          <label htmlFor='value'>
            Despesa:
            <input type='number' id='value' data-testid='value-input' />
          </label>
          <label htmlFor='description'>
            Descricão:
            <input type='number' id='description' data-testid='description-input' />
          </label>
          <select data-testid='currency-input'>
            {currencies.map((item) => {
              return <option key={item} data-testid={item}>{item}</option>
            })}
          </select>
          <select data-testid='method-input'>
            {methods.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select data-testid='tag-input'>
            {tags.map((item) => <option key={item}>{item}</option>)}
          </select>
          <button>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
