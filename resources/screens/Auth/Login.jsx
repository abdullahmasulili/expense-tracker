import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function Login() {
  return (
    <View>
      <Text>Please Login</Text>
      <TextInput label="Email" />
    </View>
  );
}
