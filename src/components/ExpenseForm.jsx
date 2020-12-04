import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { userApi, adicionarDespesas } from '../actions';
import '../css/expenseForm.css';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.btnClick = this.btnClick.bind(this);
  }

  componentDidMount() {
    const { salvarCurrencies } = this.props;
    salvarCurrencies();
  }

  handleChange(event) {
    const { value, id } = event.target;
    this.setState({
      [id]: value,
    });
  }

  btnClick() {
    const { salvarCurrencies } = this.props;
    console.log(this.state);
    console.log(salvarCurrencies());
  }

  render() {
    const { currenciesState } = this.props;
    const { value, description, currency, tag, method } = this.state;
    return (
      <form action="" className="entry">
        <div className="system-information">
          <p className="id-input"> Número de Id.</p>
          <p className="entry-date">Entrada</p>
          <span />
        </div>
        <div className="user-entry">
          <div className="org-left">

            <label htmlFor="value">
              Valor:
              <input
                id="value"
                value={ value }
                type="number"
                onChange={ this.handleChange }
                data-testid="value-input"
                placeholder="Valor da Despesa."
              />
            </label>
            <label htmlFor="currency-input">
              Moeda:
              <select
                data-testid="currency-input"
                id="currency"
                value={ currency }
                type="text"
                onChange={ this.handleChange }
              >
                {Object.keys(currenciesState).map((item) => (
                  <option
                    key={ item }
                    value={ item }
                    data-testid={ item }
                  >
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="method-input">
              Método de Pagamento:
              <select
                id="method"
                value={ method }
                data-testid="method-input"
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="tag-input">
              Tag:
              <select
                id="tag"
                value={ tag }
                data-testid="tag-input"
              >
                <option value="Lazer ">Lazer</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>
          </div>
          <div className="org-right">
            <input
              id="description"
              value={ description }
              type="text"
              className="descriptionInput"
              data-testid="description-input"
              placeholder="Descrição da Despesa."
            />
          </div>
          <button
            type="button"
            onClick={ this.btnClick }
          >
            Adicionar despesa
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
  idAtual: state.idAtual,
});

const mapDispatchToProps = (dispatch) => ({
  salvarCurrencies: () => dispatch(userApi()),
  salvarDespesas: () => dispatch(adicionarDespesas()),
});

ExpenseForm.propTypes = {
  currenciesState: PropType.arrayOf.isRequired,
  salvarCurrencies: PropType.func.isRequired,
  value: PropType.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
