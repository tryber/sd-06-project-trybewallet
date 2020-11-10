import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = ({
      currencys: [],
      total: 0,
      form: {
        id: 0,
        value: 0,
        description: '',
        currency: '',
        tag: '',
        method: '',
        currencyName: '',
      },
    });
  }

  //  "id": 0,
  //       "value": "3",
  //       "description": "Hot Dog",
  //       "currency": "USD",
  //       "method": "Dinheiro",
  //       "tag": "Alimentação",
  //       "exchangeRates":

  componentDidMount() {
    this.requestCurrencys();
  }

  handleChange(event, input) {
    const { form, currencys } = this.state;

    this.setState({
      form: { ...form, [input]: event.target.value },
    });
    if (input === 'currency') {
      const curName = currencys.filter((curren) => curren.code === event.target.value)
        .flatMap((curName) => curName.name);
      console.log(curName);
      this.setState({ form: { ...form, currencyName: curName[0], [input]: event.target.value } });
    }
  }

  async requestCurrencys() {
    const currencys = await fetch('https://economia.awesomeapi.com.br/json/all');
    const jsonCurrencys = await currencys.json();
    delete jsonCurrencys.USDT;
    const listCurrencys = Object.values(jsonCurrencys);
    this.setState({
      currencys: listCurrencys,
    });
  }

  handleSubmit(event) {
    const { form, currencys } = this.state;
    const { value, currency } = form;
    const { fetchCurrency } = this.props;
    const totalAsk = currencys.filter((curren) => curren.code === currency)
      .map((cur) => cur.ask);
    event.preventDefault();
    fetchCurrency(form);
    this.setState((prevState) => ({
      total: prevState.total + (Number(value) * totalAsk),
      form: {
        id: prevState.form.id + 1,
        value: 0,
        description: '',
        currency: '',
        tag: '',
        method: '',
      },
    }));
  }

  render() {
    const { email, fetchCurrency, expenses, currencies } = this.props;
    const { total, currencys, form: { value } } = this.state;

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
            {total}
          </span>

          <span
            data-testid="header-currency-field"
            id="moeda"
          >
            | BRL |
          </span>
        </header>

        <form onSubmit={ this.handleSubmit }>
          <label
            htmlFor="valor-despesas"
          >
            valor despesas
            <input
              placeholder="valor"
              data-testid="value-input"
              id="valor-despesas"
              type="number"
              value={ value }
              onChange={ (event) => this.handleChange(event, 'value') }

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
                // value="senha"even
                onChange={ (event) => this.handleChange(event, 'description') }
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="moeda-despesa"
            >
              selecione a moeda

              <select
                data-testid="currency-input"
                id="moeda-despesa"
                onChange={ (event) => this.handleChange(event, 'currency') }
              >
                <option
                  data-testid="currency"
                  value=""
                >
                  Currency
                </option>
                {currencys.map((currency, index) => (
                  <option
                    key={ index }
                    data-testid={ currency.code }
                    value={ currency.code }
                  >
                    {currency.code}
                  </option>))}

              </select>
            </label>
            <label
              htmlFor="forma-pagamento"
            >
              forma de pagamento

              <select
                data-testid="method-input"
                id="forma-pagamento"
                onChange={ (event) => this.handleChange(event, 'method') }
              >
                <option
                  data-testid="pagamento"
                  value=""
                >
                  Forma de Pagamento
                </option>
                <option
                  data-testid="din"
                  value="Dinheiro"
                >
                  Dinheiro
                </option>
                <option
                  data-testid="cad-cred"
                  value="Cartão de crédito"
                >
                  Cartão de crédito
                </option>
                <option
                  data-testid="cad-deb"
                  value="Cartão de débito"
                >
                  Cartão de débito
                </option>
              </select>
            </label>

            <label
              htmlFor="categoria"
            >
              Tag gasto

              <select
                data-testid="tag-input"
                id="categoria"
                onChange={ (event) => this.handleChange(event, 'tag') }
              >
                <option
                  value="tag"
                >
                  Categoria
                </option>
                <option
                  value="Alimentação"
                >
                  Alimentação
                </option>
                <option
                  value="Lazer"
                >
                  Lazer
                </option>
                <option
                  value="Trabalho"
                >
                  Trabalho
                </option>
                <option
                  value="Transporte"
                >
                  Transporte
                </option>
                <option
                  value="Saúde"
                >
                  Saúde
                </option>
              </select>
            </label>
          </div>
          <button
            type="submit"

          >
            Adicionar despesa
          </button>
        </form>
        <Table expenses={ expenses } currencysName={ currencies } />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: (form) => dispatch(fetchCurrency(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
