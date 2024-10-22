import { View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import styles from './styles';
import GlobalStyles from '../../utils/GlobalStyles';
import PasswordInput from '../../components/Inputs/Password';
import { registerUser } from '../../store/user/actions';

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

const registerSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email Required'),
  firstName: Yup.string().min(3, 'Too Short!').required('First Name Required'),
  lastName: Yup.string().min(3, 'Too Short!').required('Last Name Required'),
  password: Yup.string().min(6, 'Too Short!').required('Password Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password Should Match')
    .required('Confirm Password Required'),
});

export default function Register({ navigation }) {
  const { isSubmitting } = useSelector(state => state.user);
  const dispatch = useDispatch();

  function onLoginPress() {
    navigation.navigate('Login');
  }

  function handleOnSubmit(values) {
    const data = {
      ...values,
      role: 'user',
    };

    delete data.confirmPassword;

    dispatch(registerUser(data)).then(() => {
      navigation.navigate('Login');
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Your Account</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
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
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {errors.email && touched.email && (
              <HelperText type="error">{errors.email}</HelperText>
            )}
            <View style={GlobalStyles.twoColum}>
              <View style={GlobalStyles.twoColumItem}>
                <TextInput
                  label="First Name"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                />
                {errors.firstName && touched.firstName && (
                  <HelperText type="error">{errors.firstName}</HelperText>
                )}
              </View>
              <View style={GlobalStyles.twoColumItem}>
                <TextInput
                  label="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                />
                {errors.lastName && touched.lastName && (
                  <HelperText type="error">{errors.lastName}</HelperText>
                )}
              </View>
            </View>
            <View style={GlobalStyles.twoColum}>
              <View style={GlobalStyles.twoColumItem}>
                <PasswordInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                {errors.password && touched.password && (
                  <HelperText type="error">{errors.password}</HelperText>
                )}
              </View>
              <View style={GlobalStyles.twoColumItem}>
                <PasswordInput
                  label="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <HelperText type="error">{errors.confirmPassword}</HelperText>
                )}
              </View>
            </View>
            <Button
              loading={isSubmitting}
              disabled={isSubmitting}
              mode="contained"
              onPress={handleSubmit}>
              Submit
            </Button>
          </>
        )}
      </Formik>
      <Text style={styles.label}>Already Have an Account?</Text>
      <Button onPress={onLoginPress} disabled={isSubmitting}>
        Login
      </Button>
    </View>
  );
}
