import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchAPI from '../services/API';
import { addExpenseThunk } from '../actions';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: [],
      expense: {
        id: 0,
        value: 0,
        description: '',
        currency: 'USD',
        method: '',
        tag: '',
      },
    };

    this.pickUpCoins = this.pickUpCoins.bind(this);
    this.savingFormEntries = this.savingFormEntries.bind(this);
  }

  componentDidMount() {
    this.pickUpCoins();
  }

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    const { expense } = this.state;
    const updateID = () => {
      this.setState({
        expense: { ...expense, id: expenses.length },
      });
    };
    if (prevProps.expenses.length !== expenses.length) {
      updateID();
    }
  }

  async pickUpCoins() {
    const res = await fetchAPI();
    const coins = await Object.keys(res).filter((coin) => coin !== 'USDT');
    this.setState({
      coins,
    });
  }

  savingFormEntries({ target }) {
    const { name, value } = target;
    const { expense } = this.state;

    this.setState({
      expense: { ...expense, [name]: value },
    });
  }

  render() {
    const { addExpense, expenses } = this.props;
    const { coins, expense } = this.state;
    console.log(expenses);

    return (
      <div>
        <form>
          <label htmlFor="input-value">
            Valor:
            <input
              name="value"
              onChange={ this.savingFormEntries }
              id="input-value"
              type="number"
              data-testid="value-input"
              placeholder="0.00"
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              name="description"
              onChange={ this.savingFormEntries }
              id="description-input"
              type="text"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currency"
              onChange={ this.savingFormEntries }
              id="currency-input"
              type="text"
              data-testid="currency-input"
            >
              { coins.map((coin) => (
                <option
                  data-testid={ coin }
                  key={ coin }
                >
                  { coin }
                </option>))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              name="method"
              onChange={ this.savingFormEntries }
              id="method-input"
              type="text"
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag:
            <select
              name="tag"
              onChange={ this.savingFormEntries }
              id="tag-input"
              type="text"
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            onClick={ () => addExpense(expense) }
            type="button"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  addExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseThunk(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
