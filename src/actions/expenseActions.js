export const addExpenses = (expense) => ({ type: 'ADD_EXPENSE', payload: expense });
export const removeExpense = (expense) => ({ type: 'REMOVE_EXPENSE', payload: expense });
export const editExpense = (expense) => ({ type: 'EDIT_EXPENSE', payload: expense });
export const idExpense = (id) => ({ type: 'ADD_ID', payload: id });
