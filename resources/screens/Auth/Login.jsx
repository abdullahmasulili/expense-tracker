import { View } from 'react-native';
import {
  Button,
  MD3LightTheme,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';

import styles from './styles';
import PasswordInput from '../../components/Inputs/Password';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../store/user/actions';

const USER_ROLE = {
  ADMIN: 'admin',
  USER: 'user',
};

export default function Login({ navigation }) {
  const { currentAccount, isSubmitting, error } = useSelector(
    state => state.user,
  );
  const [showToast, setShowToast] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  function handleSubmit() {
    const creds = {
      email,
      password,
    };

    dispatch(signInUser(creds))
      .then(() => {
        if (currentAccount.role === USER_ROLE.USER) {
          navigation.navigate('UserHome');
        }
      })
      .catch(errorData => {
        console.error(errorData);
        setShowToast(true);
      });
  }

  function onCreateAccountPress() {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign into your account</Text>
      <TextInput
        label="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <PasswordInput value={password} onChangeText={setPassword} />
      <Button
        loading={isSubmitting}
        disabled={isSubmitting}
        mode="contained"
        onPress={handleSubmit}>
        Sign In
      </Button>
      <Text style={styles.label}>Don&apos;t Have Account?</Text>
      <Button onPress={onCreateAccountPress}>Create Account</Button>
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
