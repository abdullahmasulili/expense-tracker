import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import styles from './styles';

export default function Register({ navigation }) {
  function onLoginPress() {
    navigation.navigate('Login');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Your Account</Text>
      <TextInput label="First Name" />
      <TextInput label="Last Name" />
      <TextInput label="Email" />
      <TextInput
        label="Password"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
      />
      <TextInput
        label="Confirm Password"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
      />
      <Button mode="contained">Submit</Button>
      <Text style={styles.label}>Already Have an Account?</Text>
      <Button onPress={onLoginPress}>Login</Button>
    </View>
  );
}
