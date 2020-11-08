import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import apiFetch,
{ addExpense, editAttribute, replaceExpense } from '../actions/WalletForms';

function WalletForms({ dispatchCurrencies, dispatchReplaceExpense,
  currencies, expenses, dispatchExpense, dispatchAttribute, editExpense, edit }) {
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

  const handleClick = () => {
    if (edit) {
      dispatchReplaceExpense(editExpense);
    } else {
      const copiedExpense = { ...editExpense, id: expenses.length };
      dispatchExpense(copiedExpense);
    }
  };

  return (
    <form>
      <input
        type="number"
        value={ editExpense.value }
        name="value"
        onChange={ (e) => dispatchAttribute(e.target) }
        data-testid="value-input"
      />

      <input
        type="text"
        value={ editExpense.description }
        name="description"
        onChange={ (e) => dispatchAttribute(e.target) }
        data-testid="description-input"
      />

      <select
        type="text"
        value={ editExpense.currency }
        name="currency"
        onChange={ (e) => dispatchAttribute(e.target) }
        data-testid="currency-input"
      >
        {currencies
          .map((curr, i) => <option key={ i } data-testid={ curr }>{curr}</option>) }
      </select>

      <select
        data-testid="method-input"
        name="method"
        value={ editExpense.method }
        onChange={ (e) => dispatchAttribute(e.target) }
      >
        <option>Dinheiro</option>
        <option>Cartão de débito</option>
        <option>Cartão de crédito</option>
      </select>

      <select
        data-testid="tag-input"
        name="tag"
        value={ editExpense.tag }
        onChange={ (e) => dispatchAttribute(e.target) }
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
        {edit ? 'Editar despesa' : 'Adicionar despesa'}
      </button>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: (currencies) => dispatch(apiFetch(currencies)),
  dispatchExpense: (expense) => dispatch(addExpense(expense)),
  dispatchAttribute: (target) => dispatch(editAttribute(target)),
  dispatchReplaceExpense: (id) => dispatch(replaceExpense(id)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editExpense: state.wallet.expense,
  edit: state.wallet.edit,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForms);

WalletForms.defaultProps = {
  expenses: [''],
  currencies: [''],
  dispatchCurrencies: () => {},
  dispatchExpense: () => {},
  dispatchAttribute: () => {},
  editExpense: {
    id: 0,
    value: 0,
    description: '',
    method: 'Dinheiro',
    currency: 'USD',
    tag: 'Alimentação',
  },
  edit: false,
};

WalletForms.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any),
  currencies: PropTypes.arrayOf(PropTypes.any),
  dispatchAttribute: PropTypes.func,
  dispatchCurrencies: PropTypes.func,
  dispatchReplaceExpense: PropTypes.func.isRequired,
  dispatchExpense: PropTypes.func,
  editExpense: PropTypes.shape({
    id: PropTypes.number,
  }),
  edit: PropTypes.bool,
};
