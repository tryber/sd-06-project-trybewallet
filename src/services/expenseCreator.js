const expenseCreator = (state, currentCotation, currentID) => {
  if (state.expenses.length === 0) {
    return ([
      {
        id: currentID || state.expenses.length,
        value: state.moneySpent,
        description: state.description,
        currency: state.currentCurrency,
        method: state.paymentMethod,
        tag: state.currentTag,
        exchangeRates: currentCotation,
      },
    ]);
  }
  if (typeof currentID !== 'number') {
    return ([
      ...state.expenses,
      {
        id: state.expenses.length,
        value: state.moneySpent,
        description: state.description,
        currency: state.currentCurrency,
        method: state.paymentMethod,
        tag: state.currentTag,
        exchangeRates: currentCotation,
      },
    ]);
  }
  return ([
    {
      id: currentID,
      value: state.moneySpent,
      description: state.description,
      currency: state.currentCurrency,
      method: state.paymentMethod,
      tag: state.currentTag,
      exchangeRates: currentCotation,
    },
    ...state.expenses,
  ]);
};

export default expenseCreator;
