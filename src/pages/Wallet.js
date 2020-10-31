import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/Wallet.css';
import logo from './logo.png';
import { saveExpenses, fetchObj } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.buttonAdd = this.buttonAdd.bind(this);
    this.changeState = this.changeState.bind(this);
    this.state = {
      expense: {
        id: -1,
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
        exchangeRates: '',
      },
      sum: 0,
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  async buttonAdd() {
    const { fieldSave } = this.props;
    await this.changeState();
    const { expense } = this.state;
    fieldSave(expense);
  }

  async changeState() {
    const { getCurrencies } = this.props;
    await getCurrencies();
    const { expense, sum } = this.state;
    const { id, value, currency } = expense;
    const { currencies } = this.props;
    this.setState({
      expense: {
        ...expense,
        id: id + 1,
        exchangeRates: currencies,
      },
      sum: sum + parseInt(value, 10) * currencies[currency].ask,
    });
  }

  changeHandler(event) {
    const { name, value } = event.target;
    const { expense } = this.state;
    this.setState({
      expense: {
        ...expense,
        [name]: value,
      },
    });
  }

  render() {
    const { email, currencies } = this.props;
    const { expense, sum } = this.state;
    const { value, currency, method, tag, description } = expense;
    return (
      <div>
        <header className="header">
          <img src={ logo } height="25px" alt="logomarca" />
          <p>
            Usuário:
            <span className="bold" data-testid="email-field">{ email }</span>
          </p>
          <p>
            Despesa Total: R$
            <span data-testid="total-field">{ sum }</span>
            ,00
            <span className="bold" data-testid="header-currency-field">BRL</span>
          </p>
        </header>
        <div className="form">
          Valor:
          <input
            type="number"
            name="value"
            data-testid="value-input"
            className="form-control form-control-sm"
            value={ value }
            onChange={ this.changeHandler }
          />
          Moeda:
          <select
            data-testid="currency-input"
            className="form-control form-control-sm"
            name="currency"
            value={ currency }
            onChange={ this.changeHandler }
          >
            { Object.keys(currencies).filter((c) => c !== 'USDT').map((e) => (
              <option data-testid={ e } key={ e }>{ e }</option>
            )) }
          </select>
          Pagamento:
          <select
            name="method"
            data-testid="method-input"
            className="form-control form-control-sm"
            value={ method }
            onChange={ this.changeHandler }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          Tag:
          <select
            data-testid="tag-input"
            name="tag"
            className="form-control form-control-sm"
            value={ tag }
            onChange={ this.changeHandler }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          Descrição:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            className="form-control form-control-sm"
            value={ description }
            onChange={ this.changeHandler }
          />
          <button
            type="button"
            className="btn btn-primary text-nowrap"
            onClick={ this.buttonAdd }
          >
            Adicionar despesa
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fieldSave: (expense) => dispatch(saveExpenses(expense)),
  getCurrencies: () => dispatch(fetchObj()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fieldSave: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
