import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = ({
      currencys: [],
    });
  }

  componentDidMount() {
    this.requestCurrencys();
  }

  async requestCurrencys() {
    const currencys = await fetch('https://economia.awesomeapi.com.br/json/all ');
    const jsonCurrencys = await currencys.json();
    delete jsonCurrencys.USDT;
    const listCurrencys = Object.values(jsonCurrencys);
    this.setState({
      currencys: listCurrencys,
    });
  }

  render() {
    const { email } = this.props;
    const { currencys } = this.state;
    return (
      <div>
        <header>
          <span
            data-testid="email-field"
            id="email-user"
          >
            {`Email: ${email}  | ` }
          </span>

          <span
            data-testid="total-field"
            id="total-gastos"
          >
            {'0 | '}
          </span>

          <span
            data-testid="header-currency-field"
            id="moeda"
          >
            BRL |
          </span>
        </header>

        <form onSubmit="">
          <label
            htmlFor="valor-despesas"
          >
            valor despesas
            <input
              placeholder="valor"
              data-testid="value-input"
              id="valor-despesas"
              type="number"
              // value="email"
            />
          </label>
          <div>
            <label htmlFor="descrição">
              Descrição despesas
              <input
                placeholder="descrição"
                data-testid="description-input"
                id="descrição"
                type="text"
                // value="senha"
              // onChange={ (event) => this.handleUpdateState('senha', event) }
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="moeda-despesa"
            >
              Gênero

              <select
                data-testid="currency-input"
                id="moeda-despesa"
                value="genr"
                // onChange={ () => '' }
              >
                {currencys.map((currency, index) => <option key={ index } data-testid={ currency.code } value="action">{currency.code}</option>)}

              </select>
            </label>
          </div>
          <button
            type="button"
          >
            ok
          </button>
        </form>

      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
