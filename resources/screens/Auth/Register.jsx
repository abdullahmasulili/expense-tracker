import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useState } from 'react';

import styles from './styles';
import GlobalStyles from '../../utils/GlobalStyles';
import PasswordInput from '../../components/Inputs/Password';

export default function Register({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function onLoginPress() {
    navigation.navigate('Login');
  }

  function handleOnSubmit() {
    const data = {
      firstName,
      lastName,
      email,
      password,
      role: 'user',
    };

    console.log(data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Your Account</Text>
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <View style={GlobalStyles.twoColum}>
        <TextInput
          label="First Name"
          style={GlobalStyles.twoColumItem}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          label="Last Name"
          style={GlobalStyles.twoColumItem}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={GlobalStyles.twoColum}>
        <PasswordInput
          style={GlobalStyles.twoColumItem}
          value={password}
          onChangeText={setPassword}
        />
        <PasswordInput
          label="Confirm Password"
          style={GlobalStyles.twoColumItem}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <Button mode="contained" onPress={handleOnSubmit}>
        Submit
      </Button>
      <Text style={styles.label}>Already Have an Account?</Text>
      <Button onPress={onLoginPress}>Login</Button>
    </View>
  );
}
