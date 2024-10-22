import { expenseActions } from '.';
import { deleteExpense, storeExpense } from './helpers';

export const newExpense = expenseData => async dispatch => {
  dispatch(expenseActions.setIsSubmitting(true));

  try {
    await storeExpense(expenseData);
    await dispatch(expenseActions.addItem(expenseData));
    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.resolve({
      type: 'ADD_EXPENSE_SUCCESS',
      message: 'Expense Added',
    });
  } catch (err) {
    await dispatch(expenseActions.setError(err));
    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.reject({
      type: 'ADD_EXPENSE_FAILURE',
      message: 'Add Expense Failed',
    });
  }
};

export const patchExpense = expenseData => async dispatch => {
  dispatch(expenseActions.setIsSubmitting(true));

  try {
    await storeExpense(expenseData);
    await dispatch(expenseActions.updateItem(expenseData));
    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.resolve({
      type: 'UPDATE_EXPENSE_SUCCESS',
      message: 'Expense Updated',
    });
  } catch (err) {
    await dispatch(expenseActions.setError(err));
    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.reject({
      type: 'UPDATE_EXPENSE_FAILURE',
      message: 'Update Expense Failed',
    });
  }
};

export const removeExpense = expenseId => async dispatch => {
  dispatch(expenseActions.setIsSubmitting(true));

  try {
    await deleteExpense(expenseId);
    await dispatch(expenseActions.deleteItem(expenseId));
    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.resolve({
      type: 'REMOVE_EXPENSE_SUCCESS',
      message: 'Expense Removed',
    });
  } catch (err) {
    await dispatch(expenseActions.setError(err));
    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.reject({
      type: 'REMOVE_EXPENSE_FAILURE',
      message: 'Remove Expense Failed',
    });
  }
};
