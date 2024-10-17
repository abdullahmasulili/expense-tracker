import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import styles from './styles';
import GlobalStyles from '../../utils/GlobalStyles';
import PasswordInput from '../../components/Inputs/Password';

export default function Register({ navigation }) {
  function onLoginPress() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Your Account</Text>
      <TextInput label="Email" />
      <View style={GlobalStyles.twoColum}>
        <TextInput label="First Name" style={GlobalStyles.twoColumItem} />
        <TextInput label="Last Name" style={GlobalStyles.twoColumItem} />
      </View>
      <View style={GlobalStyles.twoColum}>
        <PasswordInput style={GlobalStyles.twoColumItem} />
        <PasswordInput
          label="Confirm Password"
          style={GlobalStyles.twoColumItem}
        />
      </View>
      <Button mode="contained">Submit</Button>
      <Text style={styles.label}>Already Have an Account?</Text>
      <Button onPress={onLoginPress}>Login</Button>
    </View>
  );
}
