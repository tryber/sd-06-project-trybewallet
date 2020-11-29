import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { currenciesFetcherThunk, newCurrencySelected,
  newPaymentMethod, newSelectedTag, newExpenseThunk, newValueSpent, newDescription, totalMoneySpent } from '../actions/currencyOptions';
import SelectButton from './SelectButton';

const Expenses = (props) => {
  const { currencies, newSelectedCurrency, currentCurrency, currentPaymentMethod, newPaymentMethod, expenses, sumUpExpenses,
    newTagSelected, currentTag, isLoading, createNewExpense, newSpending, currentMoneySpent, currentDescription, betterDescription } = props;

  const paymentOptions = [ 'Dinheiro', 'Cartão de crédito', 'Cartão de débito' ];
  const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
  let currencyArray;
  let currencyNames;

  if(currencies.length > 0) {
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

  if (isLoading) return <div>carregando</div>

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
          onChange={ ({ target: { value } }) => newPaymentMethod(value) }
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
        onClick={ () => createNewExpense() }
      >
        Adicionar despesa
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  currentCurrency: state.wallet.currentCurrency,
  currentPaymentMethod: state.wallet.paymentMethod,
  currentTag: state.wallet.currentTag,
  isLoading: state.wallet.loading,
  currentMoneySpent: state.wallet.moneySpent,
  currentDescription: state.wallet.description,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  sumUpExpenses: (value) => dispatch(totalMoneySpent(value)),
  newSelectedCurrency: (value) => dispatch(newCurrencySelected(value)),
  newPaymentMethod: (value) => dispatch(newPaymentMethod(value)),
  newTagSelected: (value) => dispatch(newSelectedTag(value)),
  createNewExpense: () => dispatch(newExpenseThunk()),
  newSpending: (value) => dispatch(newValueSpent(value)),
  betterDescription: (value) => dispatch(newDescription(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
