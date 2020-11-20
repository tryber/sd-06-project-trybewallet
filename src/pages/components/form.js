import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { expensesThunk } from '../../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.addExpensesToRedux = this.addExpensesToRedux.bind(this);
  }

  addExpensesToRedux(e) {
    e.preventDefault();
    const { getExpenses } = this.props;
    getExpenses(this.state);
  }

  render() {
    const { allCurrencies } = this.props;
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
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
            {categories.map((category) => (
              <option
                value={ category }
                key={ category }
              >
                { category }
              </option>))}
            {/* <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option> */}
          </select>
        </label>
        <input
          type="button"
          onClick={ this.addExpensesToRedux }
          value="Adicionar despesa"
        />
      </div>
    );
  }
}

const mapStateToProps = (states) => ({
  expenses: states.wallet.expenses,
  allCurrencies: states.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getExpenses: () => dispatch(expensesThunk()),
});

Form.propTypes = {
  allCurrencies: PropTypes.shape(PropTypes.any.isRequired).isRequired,
  getExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
