import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, uptExpenses } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setStateEdit = this.setStateEdit.bind(this);
    this.updateDespesas = this.updateDespesas.bind(this);
    this.renderChildButton = this.renderChildButton.bind(this);

    this.state = ({
      control: '',
      currencys: [],
      total: 0,
      contador: 0,
      form: {
        id: props.idCurrent,
        value: 0,
        description: '',
        currency: '',
        tag: '',
        method: '',
      },
      currencyName: '',
    });
  }

  componentDidMount() {
    this.requestCurrencys();
  }

  setStateEdit(despesa) {
    const { id, value, description, currency, tag, method } = despesa;
    this.setState((prev) => ({
      currencyName: '',
      control: 'edit',
      contador: prev.contador,
      form: {
        id,
        value,
        description,
        currency,
        tag,
        method,
      },
    }));
  }

  updateDespesas(upDespesa) {
    console.log('fudeu');
    const { expenses, expUpdate } = this.props;

    const expensess = expenses.map((exp) => {
      if (exp.id === parseInt(upDespesa.id, 10)) {
        return { ...exp, ...upDespesa };
      }
      return exp;
    });

    expUpdate(expensess);
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
    const { form, currencys, control, currencyName } = this.state;
    const { value, currency } = form;
    const { fetchCurrency: fetchCambio, idCurrent } = this.props;

    if (control !== 'edit') {
      const totalAsk = currencys.filter((curren) => curren.code === currency)
        .map((cur) => cur.ask);
      event.preventDefault();
      fetchCambio(form, currencyName);
      this.setState((prevState) => ({
        total: prevState.total + (Number(value) * totalAsk),
        contador: prevState.contador + 1,
        form: {
          id: prevState.contador + 1,
          value: 0,
          description: '',
          currency: '',
          tag: '',
          method: '',

        },
      }));
      console.log(idCurrent);
    } else {
      event.preventDefault();
      this.updateDespesas(form);
      this.setState(({
        total: 0,
        control: '',
        form: {
          id: 3,
          value: 0,
          description: '',
          currency: '',
          tag: '',
          method: '',
        },
      }));
    }
  }

  handleChange(event, input) {
    const { form, currencys } = this.state;

    this.setState({
      form: { ...form, [input]: event.target.value },
    });
    if (input === 'currency') {
      const curName = currencys.filter((curren) => curren.code === event.target.value)
        .flatMap((currName) => currName.name);
      this.setState({
        currencyName: curName[0],
        form:
        { ...form, [input]: event.target.value },
      });
    }
  }

  renderChildButton() {
    const { control } = this.state;
    if (control === 'edit') {
      return 'Editar despesa';
    }
    return 'Adicionar despesa';
  }

  render() {
    const { email, expenses, currencies } = this.props;
    const { total, currencys,
      form: { value, description, currency, method, tag } } = this.state;

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
                value={ description }
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
                value={ currency }
              >
                <option
                  data-testid="currency"
                  value=""
                >
                  Currency
                </option>
                {currencys.map((curr, index) => (
                  <option
                    key={ index }
                    data-testid={ curr.code }
                    value={ curr.code }
                  >
                    {curr.code}
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
                value={ method }
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
                value={ tag }
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
            {this.renderChildButton()}
          </button>
        </form>
        <Table
          expenses={ expenses }
          currencysName={ currencies }
          setState={ this.setStateEdit }
          updateExp={ this.updateDespesas }
        />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  idCurrent: PropTypes.number.isRequired,
  expUpdate: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  idCurrent: state.wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: (form, cur) => dispatch(fetchCurrency(form, cur)),
  expUpdate: (exp, cur) => dispatch(uptExpenses(exp, cur)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
