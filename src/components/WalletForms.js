import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import apiFetch, { addExpense } from '../actions/WalletForms';

function WalletForms({ dispatchCurrencies, currencies, expenses, dispatchExpense }) {
  const [valueExpense, setValueExpense] = useState(0);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [paymentMethod, setPaymentMethod] = useState('Dinheiro');
  const [tagExpense, setTagExpense] = useState('Alimentação');

  const mounted = useRef();
  useEffect(() => {
    async function fetchData() {
      const result = (await (await fetch('https://economia.awesomeapi.com.br/json/all')).json());
      return result;
    }
    async function setExchange() {
      /* componentDidMount */
      if (!mounted.current) {
        const result = await fetchData();
        dispatchCurrencies(result);
        mounted.current = true;
      }
    }
    setExchange();
  }, [dispatchCurrencies]);

  const handleChange = (target) => {
    setValueExpense(target.value);
  };

  const handleClick = () => {
    dispatchExpense({
      description: expenseDescription,
      tag: tagExpense,
      method: paymentMethod,
      value: valueExpense,
      currency,
      id: expenses.length,
    });
  };

  return (
    <form>
      <input
        type="number"
        value={ valueExpense }
        name="expense"
        onChange={ (e) => handleChange(e.target) }
        data-testid="value-input"
      />

      <input
        type="text"
        value={ expenseDescription }
        name="expense-description"
        onChange={ (e) => setExpenseDescription(e.target.value) }
        data-testid="description-input"
      />

      <select
        type="text"
        value={ currency }
        name="currency"
        onChange={ (e) => setCurrency(e.target.value) }
        data-testid="currency-input"
      >
        {currencies
          .map((curr, i) => <option key={ i } data-testid={ curr }>{curr}</option>) }
      </select>

      <select
        data-testid="method-input"
        value={ paymentMethod }
        onChange={ (e) => setPaymentMethod(e.target.value) }
      >
        <option>Dinheiro</option>
        <option>Cartão de débito</option>
        <option>Cartão de crédito</option>
      </select>

      <select
        data-testid="tag-input"
        value={ tagExpense }
        onChange={ (e) => setTagExpense(e.target.value) }
      >
        <option>Alimentação</option>
        <option>Lazer</option>
        <option>Trabalho</option>
        <option>Transporte</option>
        <option>Saúde</option>
      </select>

      <button
        type="button"
        onClick={ handleClick }

      >
        Adicionar despesa
      </button>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: (currencies) => dispatch(apiFetch(currencies)),
  dispatchExpense: (expense) => dispatch(addExpense(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForms);

WalletForms.defaultProps = {
  expenses: [''],
  currencies: [''],
  dispatchCurrencies: () => {},
  dispatchExpense: () => {},
};

WalletForms.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any),
  currencies: PropTypes.arrayOf(PropTypes.any),
  dispatchCurrencies: PropTypes.func,
  dispatchExpense: PropTypes.func,
};
