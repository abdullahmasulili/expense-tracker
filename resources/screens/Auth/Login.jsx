import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import styles from './styles';
import PasswordInput from '../../components/Inputs/Password';

export default function Login({ navigation }) {
  function handleSubmit() {
    navigation.navigate('UserHome');
  }

  function onCreateAccountPress() {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign into your account</Text>
      <TextInput label="Email" keyboardType="email-address" />
      <PasswordInput />
      <Button mode="contained" onPress={handleSubmit}>
        Sign In
      </Button>
      <Text style={styles.label}>Don&apos;t Have Account?</Text>
      <Button onPress={onCreateAccountPress}>Create Account</Button>
    </View>
  );
}
