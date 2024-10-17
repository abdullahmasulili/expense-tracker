import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import styles from './styles';

export default function Login({ navigation }) {
  const [isSecured, setIsSecured] = useState(true);

  function handleShowPassword() {
    setIsSecured(isShow => !isShow);
  }

  function handleSubmit() {
    console.log('pressed');
  }

  function onCreateAccountPress() {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign into your account</Text>
      <TextInput label="Email" keyboardType="email-address" />
      <TextInput
        label="Password"
        secureTextEntry={isSecured}
        right={<TextInput.Icon icon="eye" onPress={handleShowPassword} />}
      />
      <Button mode="contained" onPress={handleSubmit}>
        Submit
      </Button>
      <Text style={styles.label}>Don&apos;t Have Account?</Text>
      <Button onPress={onCreateAccountPress}>Create Account</Button>
    </View>
  );
}
