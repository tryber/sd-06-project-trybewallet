import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import '../styles/Wallet/style.css';
import fetchApi from '../services/api';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: [''],
    };
  }

  componentDidMount() {
    this.Fetch();
  }

  async Fetch() {
    const api = await fetchApi();
    const array = await Object.keys(api).filter((el) => el !== 'USDT');
    this.setState({ currency: array });
  }

  render() {
    const { currency } = this.state;
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <Header />
        <section>
          <div className="value">
            Valor:
            <input type="number" defaultValue="0" data-testid="value-input" />
          </div>
          <div className="currency">
            Moeda:
            <select name="moeda" data-testid="currency-input">
              {currency.map((cur) => (
                <option
                  key={ cur }
                  data-testid={ cur }
                  value={ cur }
                >
                  { cur }
                </option>
              ))}
            </select>
          </div>
          <div className="payment">
            Moeda:
            <select name="method" data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </div>
          <div className="tag">
            Tag:
            <select name="tag" data-testid="tag-input">
              { tags.map((tag) => <option key={ tag } value={ tag }>{ tag }</option>) }
            </select>
          </div>
          <div className="description">
            Descrição:
            <input type="text" data-testid="description-input" />
          </div>
          <button type="button">Adicionar despesa</button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.user.email,
});

export default connect(mapStateToProps)(Wallet);
