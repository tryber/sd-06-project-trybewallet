import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { currenciesFetcherThunk, newCurrencySelected,
  newPaymentMethod, newSelectedTag, newExpenseThunk, newValueSpent, newDescription,
  totalMoneySpent, expenseEditor } from '../actions/currencyOptions';
import SelectButton from './SelectButton';

const Expenses = (props) => {
  const { currencies, newSelectedCurrency, currentCurrency, currentPaymentMethod,
    newPaymentMethodProp, expenses, sumUpExpenses, newTagSelected, currentTag, isLoading,
    createNewExpense, newSpending, currentMoneySpent, editing, currentDescription,
    betterDescription, editExpense } = props;

  const paymentOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
  const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
  let currencyArray;
  let currencyNames;

  if (currencies.length > 0) {
    currencyArray = Object.entries(currencies[0]);
    currencyArray = currencyArray.filter((item) => item[0] !== 'USDT');
    currencyArray = currencyArray.map((item) => (item[1]));
    currencyNames = currencyArray.map(({ code }) => (code));
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currenciesFetcherThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(sumUpExpenses(expenses));
  }, [expenses, dispatch, sumUpExpenses]);

  if (isLoading) return <div>carregando</div>;

  const correctFunction = editing ? editExpense : createNewExpense;

  return (
    <div>
      <form>
        <label htmlFor="value-input">
          <input
            id="value-input"
            type="text"
            data-testid="value-input"
            value={ currentMoneySpent }
            onChange={ ({ target: { value } }) => newSpending(value) }
          />
        </label>
        <label htmlFor="description-input">
          <textarea
            value={ currentDescription }
            onChange={ ({ target: { value } }) => betterDescription(value) }
            data-testid="description-input"
            id="description-input"
          />
        </label>
        <SelectButton
          options={ currencyNames }
          optionSelected={ currentCurrency }
          datatestid="currency-input"
          onChange={ ({ target: { value } }) => newSelectedCurrency(value) }
        />
        <SelectButton
          options={ paymentOptions }
          optionSelected={ currentPaymentMethod }
          datatestid="method-input"
          onChange={ ({ target: { value } }) => newPaymentMethodProp(value) }
        />
        <SelectButton
          options={ tags }
          datatestid="tag-input"
          optionSelected={ currentTag }
          onChange={ ({ target: { value } }) => newTagSelected(value) }
        />
      </form>
      <button
        type="button"
        value={ editing ? 'Editar despesa' : 'Adicionar despesa' }
        onClick={ () => correctFunction() }
      >
        { editing ? 'Editar despesa' : 'Adicionar despesa' }
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  currentCurrency: state.wallet.currentCurrency,
  currentPaymentMethod: state.wallet.paymentMethod,
  currentTag: state.wallet.currentTag,
  isLoading: state.wallet.loading,
  currentMoneySpent: state.wallet.moneySpent,
  currentDescription: state.wallet.description,
  expenses: state.wallet.expenses,
  editing: state.wallet.editing,
});

const mapDispatchToProps = (dispatch) => ({
  sumUpExpenses: (value) => dispatch(totalMoneySpent(value)),
  newSelectedCurrency: (value) => dispatch(newCurrencySelected(value)),
  newPaymentMethodProp: (value) => dispatch(newPaymentMethod(value)),
  newTagSelected: (value) => dispatch(newSelectedTag(value)),
  createNewExpense: (value) => dispatch(newExpenseThunk(value)),
  newSpending: (value) => dispatch(newValueSpent(value)),
  betterDescription: (value) => dispatch(newDescription(value)),
  editExpense: () => dispatch(expenseEditor()),
});

Expenses.propTypes = {
  currencies: PropTypes.instanceOf(Object),
  currentCurrency: PropTypes.string,
  currentPaymentMethod: PropTypes.string,
  currentTag: PropTypes.string,
  isLoading: PropTypes.bool,
  currentMoneySpent: PropTypes.number,
  currentDescription: PropTypes.string,
  expenses: PropTypes.instanceOf(Object),
  editing: PropTypes.bool,
  sumUpExpenses: PropTypes.func,
  newSelectedCurrency: PropTypes.func,
  newPaymentMethod: PropTypes.func,
  newTagSelected: PropTypes.func,
  createNewExpense: PropTypes.func,
  newSpending: PropTypes.func,
  betterDescription: PropTypes.func,
  editExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
