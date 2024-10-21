import { expenseActions } from '.';
import { deleteExpense, storeExpense } from './helpers';

export const newExpense = expenseData => dispatch => {
  dispatch(expenseActions.setIsSubmitting(true));

  try {
    storeExpense(expenseData);
    dispatch(expenseActions.addItem(expenseData));
    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.resolve({
      type: 'ADD_EXPENSE_SUCCESS',
      message: 'Expense Added',
    });
  } catch (err) {
    dispatch(expenseActions.setError(err));
    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.reject({
      type: 'ADD_EXPENSE_FAILURE',
      message: 'Add Expense Failed',
    });
  }
};

export const patchExpense = expenseData => dispatch => {
  dispatch(expenseActions.setIsSubmitting(true));

  try {
    storeExpense(expenseData);
    dispatch(expenseActions.updateItem(expenseData));
    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.resolve({
      type: 'UPDATE_EXPENSE_SUCCESS',
      message: 'Expense Updated',
    });
  } catch (err) {
    dispatch(expenseActions.setError(err));
    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.reject({
      type: 'UPDATE_EXPENSE_FAILURE',
      message: 'Update Expense Failed',
    });
  }
};

export const removeExpense = expenseId => dispatch => {
  dispatch(expenseActions.setIsSubmitting(true));

  try {
    deleteExpense(expenseId);
    dispatch(expenseActions.deleteItem(expenseId));
    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.resolve({
      type: 'REMOVE_EXPENSE_SUCCESS',
      message: 'Expense Removed',
    });
  } catch (err) {
    dispatch(expenseActions.setError(err));
    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.reject({
      type: 'REMOVE_EXPENSE_FAILURE',
      message: 'Remove Expense Failed',
    });
  }
};
