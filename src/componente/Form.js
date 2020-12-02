import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyThunk } from '../actions';

class Form extends React.Component {
  componentDidMount() {
    const { currencysFetch } = this.props;
    currencysFetch();
  }

  render() {
    const { currency } = this.props;
    const maxLengthCur = 3;
    return (
      <form>
        <label htmlFor="dispense">
          Dispresa
          <input data-testid="value-input" type="number" />
        </label>
        <label htmlFor="description">
          Descrição
          <input type="text" data-testid="description-input" />
        </label>
        <label htmlFor="all-currency">
          Cambio
          <select data-testid="currency-input" name="all-currency">
            {currency
              .filter((cur) => cur.length === maxLengthCur)
              .map((cur) => (
                <option key={ cur } data-testid={ cur }>
                  { cur }
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select name="method" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria para Dispesa
          <select data-testid="tag-input" name="category">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <button type="button">Adicionar Dispesa</button>
        Total: 0
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currency,
});

const mapDispatchToProps = (dispatch) => ({
  currencysFetch: () => dispatch(fetchCurrencyThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  currencysFetch: PropTypes.fuc,
  currencys: PropTypes.object,
}.isRequired;
