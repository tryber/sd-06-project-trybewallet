import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Form extends React.Component {
  render() {
    const { allCurrencies } = this.props;
    return (
      <div>
        <input data-testid="value-input" />
        <input data-testid="description-input" />
        <label htmlFor="currency">
          <select id="currency" data-testid="currency-input">
            {Object.keys(allCurrencies)
              .filter((currency) => currency !== 'USDT')
              .map((currency) => (
                <option
                  key={ `${currency}` }
                  data-testid={ `${currency}` }
                  value={ `${currency}` }
                >
                  {currency}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="pay">
          <select id="pay" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="card">Cartão de crédito</option>
            <option value="cardDeb">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select id="tag" data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <input type="button" onClick={ () => allCurrencies() } value="Adicionar despesa" />
      </div>
    );
  }
}

const mapStateToProps = (states) => ({
  allCurrencies: states.wallet.currencies,
});

Form.propTypes = {
  allCurrencies: PropTypes.shape(PropTypes.any.isRequired).isRequired,
};

export default connect(mapStateToProps)(Form);
