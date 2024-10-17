import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import styles from './styles';

function handlePress() {
  console.log('pressed');
}

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Please Login</Text>
      <TextInput label="Email" />
      <TextInput label="Password" />
      <Button mode="contained" onPress={handlePress}>
        Login
      </Button>
      <Text style={styles.label}>Don&apos;t Have Account?</Text>
      <Button onPress={handlePress}>Create Account</Button>
    </View>
  );
}
