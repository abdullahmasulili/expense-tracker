import { expenseActions } from '.';
import { deleteCategory, storeCategory } from './helpers';

export const newCategory = categoryData => dispatch => {
  dispatch(expenseActions.setIsSubmitting(true));

  try {
    storeCategory(categoryData);
    dispatch(expenseActions.addCategory(categoryData));

    console.info('Category Added');

    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.resolve({
      type: 'ADD_CATEGORY_SUCCESS',
      message: 'Category Added',
    });
  } catch (error) {
    dispatch(expenseActions.setError(error));

    console.error('Failed to store category');

    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.reject({
      type: 'ADD_CATEGORY_FAILURE',
      message: 'Add Category Failed',
    });
  }
};

export const patchCategory = categoryData => dispatch => {
  dispatch(expenseActions.setIsSubmitting(true));

  try {
    storeCategory(categoryData);
    dispatch(expenseActions.updateCategory(categoryData));

    console.info('Category Updated');

    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.resolve({
      type: 'UPDATE_CATEGORY_SUCCESS',
      message: 'Category Updated',
    });
  } catch (error) {
    dispatch(expenseActions.setError(error));

    console.error('Failed to store category');

    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.reject({
      type: 'UPDATE_CATEGORY_FAILURE',
      message: 'Update Category Failed',
    });
  }
};

export const removeCategory = categoryId => dispatch => {
  dispatch(expenseActions.setIsSubmitting(true));

  try {
    deleteCategory(categoryId);
    dispatch(expenseActions.deleteCategory(categoryId));

    console.info('Category Updated');

    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.resolve({
      type: 'DELETE_CATEGORY_SUCCESS',
      message: 'Category Removed',
    });
  } catch (err) {
    dispatch(expenseActions.setError(err));

    console.error('Failed to remove category');

    dispatch(expenseActions.setIsSubmitting(false));

    return Promise.reject({
      type: 'REMOVE_CATEGORY_FAILURE',
      message: 'Remove Category Failed',
    });
  }
};
