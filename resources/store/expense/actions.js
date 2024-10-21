import { expenseActions } from '.';
import { storeCategory } from './helpers';

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
