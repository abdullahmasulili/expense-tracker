import auth from '@react-native-firebase/auth';

import { userActions } from '.';

export const registerUser = function (userData) {
  return async function (dispatch) {
    dispatch(userActions.setIsSubmitting(true));

    try {
      const credential = await auth().createUserWithEmailAndPassword(
        userData.email,
        userData.password,
      );

      dispatch(userActions.addUser(userData));
      dispatch(userActions.setIsSubmitting(false));
      console.log('account created');

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
