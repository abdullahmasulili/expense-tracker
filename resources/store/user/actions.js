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

export const signInUser = creds => async dispatch => {
  dispatch(userActions.setIsSubmitting(true));

  try {
    const response = await auth().signInWithEmailAndPassword(
      creds.email,
      creds.password,
    );

    dispatch(userActions.setCurrentAccount(creds.email));
    dispatch(userActions.setIsSubmitting(false));

    console.info('User signed in', response.user);

    return Promise.resolve({
      type: 'SIGNIN_SUCCESS',
      user: response.user,
      message: 'Signed In',
    });
  } catch (error) {
    dispatch(userActions.setIsSubmitting(false));
    dispatch(
      userActions.setError({
        errorCode: error.code,
        message: 'Invalid Credential',
      }),
    );

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

    dispatch(userActions.setIsSubmitting(false));
    dispatch(userActions.setCurrentAccount({}));
    dispatch(userActions.setAccessToken(null));

    console.info('User Signed Out');

    return Promise.resolve({
      type: 'SIGNOUT_SUCCESS',
      message: 'User Signed Out',
    });
  } catch (error) {
    console.error(error);

    dispatch(userActions.setIsSubmitting(false));
    dispatch(userActions.setError(error));

    return Promise.reject({
      type: 'SIGNOUT_FAILURE',
      message: 'Something Went Wrong',
    });
  }
};
