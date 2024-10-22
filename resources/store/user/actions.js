import auth from '@react-native-firebase/auth';

import { userActions } from '.';
import { getUsers, storeData } from './helpers';
import { fetchExchangeRates } from '../../api/exchange';
import { getCategories, getExpenses } from '../expense/helpers';
import { expenseActions } from '../expense';
import { USER_ROLE } from '../../utils/CONSTANTS';

export const registerUser = function (userData) {
  return async function (dispatch) {
    dispatch(userActions.setIsSubmitting(true));

    try {
      const credential = await auth().createUserWithEmailAndPassword(
        userData.email,
        userData.password,
      );

      storeData(userData);

      const users = await getUsers();

      dispatch(userActions.setUsers(Object.values(users)));
      dispatch(userActions.setIsSubmitting(false));
      console.info('account created');

      return Promise.resolve({
        user: credential.user,
        message: 'Account Created',
      });
    } catch (error) {
      console.error(error);
      dispatch(userActions.setIsSubmitting(false));

      switch (error.code) {
        case 'auth/email-already-in-use':
          dispatch(
            userActions.setError({
              type: 'SIGNUP_FAILURE',
              message: 'Email already exist',
            }),
          );

          return Promise.reject({
            error,
            message: 'Email already exist',
          });
        case 'auth/invalid-email':
          dispatch(
            userActions.setError({
              type: 'SIGNUP_FAILURE',
              message: 'Email invalid',
            }),
          );

          return Promise.reject({
            error,
            message: 'Email invalid',
          });
      }
    }
  };
};

export const signInUser = creds => async dispatch => {
  dispatch(userActions.setIsSubmitting(true));

  try {
    const response = await auth().signInWithEmailAndPassword(
      creds.email,
      creds.password,
    );

    const users = await getUsers();
    const user = Object.values(users).find(item => item.email === creds.email);
    const categories = await getCategories();
    const expenses = await getExpenses();

    if (user.role === USER_ROLE.USER) {
      const userExpenses = expenses
        ? Object.values(expenses).filter(
            expense => expense.belongsTo === creds.email,
          )
        : [];
      const userExpenseCategories = categories
        ? Object.values(categories).filter(
            category => category.belongsTo === creds.email,
          )
        : [];

      await dispatch(expenseActions.setCategories(userExpenseCategories));
      await dispatch(expenseActions.setExpenseItems(userExpenses));
    } else if (USER_ROLE.ADMIN) {
      await dispatch(userActions.setUsers(Object.values(users)));
      await dispatch(
        expenseActions.setExpenseItems(expenses ? Object.values(expenses) : []),
      );
      await dispatch(
        expenseActions.setCategories(
          categories ? Object.values(categories) : [],
        ),
      );
    }

    await dispatch(userActions.setCurrentAccount(user));
    dispatch(userActions.setIsSubmitting(false));

    console.info('User signed in', response.user);

    return Promise.resolve({
      type: 'SIGNIN_SUCCESS',
      user: response.user,
      message: 'Signed In',
    });
  } catch (error) {
    await dispatch(
      userActions.setError({
        errorCode: error.code,
        message: 'Invalid Credential',
      }),
    );
    dispatch(userActions.setIsSubmitting(false));

    console.error(error);

    return Promise.reject({
      type: 'SIGNIN_FAILURE',
      errorCode: error.code,
      message: error.message,
    });
  }
};

export const signOutUser = () => async dispatch => {
  dispatch(userActions.setIsSubmitting(true));

  try {
    await auth().signOut();

    await dispatch(userActions.setCurrentAccount({}));
    await dispatch(userActions.setAccessToken(null));
    dispatch(userActions.setIsSubmitting(false));

    console.info('User Signed Out');

    return Promise.resolve({
      type: 'SIGNOUT_SUCCESS',
      message: 'User Signed Out',
    });
  } catch (error) {
    console.error(error);

    await dispatch(userActions.setError(error));
    dispatch(userActions.setIsSubmitting(false));

    return Promise.reject({
      type: 'SIGNOUT_FAILURE',
      message: 'Something Went Wrong',
    });
  }
};

export const getExchangeRates = () => async dispatch => {
  try {
    const exchangeRates = await fetchExchangeRates();

    dispatch(userActions.setExchangeRates(exchangeRates));

    return Promise.resolve({
      type: 'FETCH_EXCHANGE_RATE_SUCCESS',
      message: 'Exchanged rates fetched',
    });
  } catch (err) {
    console.error(err);

    return Promise.reject({
      type: 'FETCH_EXCHANGE_RATE_FAIL',
      message: 'Could not fetch exchange rates',
    });
  }
};
