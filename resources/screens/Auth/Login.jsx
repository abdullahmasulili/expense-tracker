import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import styles from './styles';

export default function Login({ navigation }) {
  function handleSubmit() {
    console.log('pressed');
  }

  function onCreateAccountPress() {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Please Login</Text>
      <TextInput label="Email" keyboardType="email-address" />
      <TextInput label="Password" />
      <Button mode="contained" onPress={handleSubmit}>
        Submit
      </Button>
      <Text style={styles.label}>Don&apos;t Have Account?</Text>
      <Button onPress={onCreateAccountPress}>Create Account</Button>
    </View>
  );
}
