import { View } from 'react-native';
import {
  Button,
  HelperText,
  MD3LightTheme,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import styles from './styles';
import { USER_ROLE } from '../../utils/CONSTANTS';

import PasswordInput from '../../components/Inputs/Password';
import { getExchangeRates, signInUser } from '../../store/user/actions';

const initialValues = {
  email: '',
  password: '',
};

const signInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email Required'),
  password: Yup.string()
    .required('Password Required')
    .min(6, 'Password Too Short!'),
});

export default function Login({ navigation }) {
  const { currentAccount, isSubmitting, error } = useSelector(
    state => state.user,
  );
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  function handleOnSubmit(creds) {
    dispatch(signInUser(creds)).catch(errorData => {
      console.error(errorData);
      setShowToast(true);
    });
  }

  useEffect(() => {
    if (currentAccount) {
      if (currentAccount.role === USER_ROLE.USER) {
        navigation.navigate('UserHome');
      } else if (currentAccount.role === USER_ROLE.ADMIN) {
        navigation.navigate('AdminHome');
      }
    }
  }, [currentAccount, navigation]);

  useEffect(() => {
    dispatch(getExchangeRates());
  }, [dispatch]);

  function onCreateAccountPress() {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign into your account</Text>
      <Formik
        validationSchema={signInSchema}
        initialValues={initialValues}
        onSubmit={handleOnSubmit}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              label="Email"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {errors.email && touched.email && (
              <HelperText type="error">{errors.email}</HelperText>
            )}

            <PasswordInput
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            {errors.password && touched.password && (
              <HelperText type="error">{errors.password}</HelperText>
            )}
            <Button
              loading={isSubmitting}
              disabled={isSubmitting}
              mode="contained"
              onPress={handleSubmit}>
              Sign In
            </Button>
            <Text style={styles.label}>Don&apos;t Have Account?</Text>
            <Button onPress={onCreateAccountPress}>Create Account</Button>
          </>
        )}
      </Formik>

      <Portal>
        <Snackbar
          style={{ backgroundColor: MD3LightTheme.colors.error }}
          visible={showToast}
          onDismiss={() => setShowToast(false)}
          duration={2000}>
          {error?.message}
        </Snackbar>
      </Portal>
    </View>
  );
}
