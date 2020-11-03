export const addExpenses = (expense) => ({ type: 'ADD_EXPENSE', payload: expense });
export const removeExpense = (expense) => ({ type: 'REMOVE_EXPENSE', payload: expense });
export const idToEdit = (id) => ({ type: 'ADD_ID', payload: id });
export const editExpense = (expense) => ({ type: 'EDIT_EXPENSE', payload: expense });
