import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { userApi, adicionarDespesas } from '../actions';
import '../css/expenseForm.css';

class ExpenseForm extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.btnClick = this.btnClick.bind(this);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      cotacaoDaMoeda: {},
    };
  }

  componentDidMount() {
    const { pegarDados } = this.props;
    pegarDados();
  }

  handleChange(event) {
    const { value, id } = event.target;
    this.setState({
      [id]: value,
    });
  }

  async btnClick(e) {
    e.preventDefault();
    const { currencyState, salvarDespesas } = this.props;
    const { id } = this.state;
    const dados = await currencyState;
    console.log(dados);
    this.setState({ cotacaoDaMoeda: dados });
    salvarDespesas(this.state);

    const proximoId = id + 1;
    this.setState({
      id: proximoId,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      cotacaoDaMoeda: {},
    });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { currencyState } = this.props;
    const { value, description, currency, tag, method } = this.state;
    return (
      <form onSubmit={ this.btnClick } className="entry">
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
                {Object.keys(currencyState).map((item) => (
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
                onChange={ this.handleChange }
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
                onChange={ this.handleChange }
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
              onChange={ this.handleChange }
              type="text"
              className="descriptionInput"
              data-testid="description-input"
              placeholder="Descrição da Despesa."
            />
          </div>
          <button
            type="submit"
            disabled={
              !value || !currency || !method || !tag || !description ? 'disabled' : false
            }
          >
            Adicionar despesa
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyState: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  pegarDados: () => dispatch(userApi()),
  salvarDespesas: (e) => dispatch(adicionarDespesas(e)),
});

ExpenseForm.propTypes = {
//  currencyState: PropType.arrayOf(PropType.objectOf).isRequired,
  pegarDados: PropType.func.isRequired,
  salvarDespesas: PropType.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
