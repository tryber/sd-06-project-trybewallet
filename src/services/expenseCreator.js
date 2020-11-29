const expenseCreator = (state, currentCotation) => {
  if (state.expenses.length === 0) {
    return ([
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
};

export default expenseCreator;
