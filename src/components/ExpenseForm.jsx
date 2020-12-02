import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { apiCurrencies } from '../actions';
import '../css/expenseForm.css';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // id: 0,
      // value: '',
      // description: '',
      currency: 'USD',
      // method: 'Dinheiro',
      // tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { salvarCurrencies } = this.props;
    salvarCurrencies();
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currenciesState } = this.props;
    const { currency } = this.state;
    return (
      <form action="" className="entry">
        <div className="system-information">
          <p className="id-input">Número de Id.</p>
          <p className="entry-date">Entrada</p>
          <span />
        </div>
        <div className="user-entry">
          <div className="org-left">
            <label htmlFor="value">
              Valor:
              <input
                id="value"
                type="number"
                className="valueInput"
                data-testid="value-input"
                placeholder="Valor da Despesa."
              />
            </label>
            <label htmlFor="currency-input">
              Moeda:
              <select
                data-testid="currency-input"
                id="currency"
                type="text"
                name="currency"
                // onChange={ this.handleChange }
                value={ currency }
              >
                {currenciesState.map((item) => (
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
              <select data-testid="method-input">
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="tag-input">
              Tag:
              <select data-testid="tag-input">
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
              type="text"
              className="descriptionInput"
              data-testid="description-input"
              placeholder="Descrição da Despesa."
            />
          </div>
          <button type="button">Adicionar Despesa</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  salvarCurrencies: () => dispatch(apiCurrencies()),
});

ExpenseForm.propTypes = {
  currenciesState: PropType.arrayOf(PropType.string).isRequired,
  salvarCurrencies: PropType.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
