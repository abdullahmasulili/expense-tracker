import { View } from 'react-native';
import { Avatar, Divider, Text } from 'react-native-paper';

import styles from './styles';
import MenuButton from '../../components/Button/Menu';
import GlobalStyles from '../../utils/GlobalStyles';

export default function UserSettings({ navigation }) {
  function handleNavigateMenu(screenName) {
    navigation.navigate(screenName);
  }

  return (
    <View style={styles.container}>
      <Avatar.Text style={styles.avatar} size={50} label="AM" />
      <Text variant="titleLarge" style={GlobalStyles.textCenter}>
        Abdullah Masulili
      </Text>
      <Text variant="bodyMedium" style={GlobalStyles.textCenter}>
        abdullah.masulili@gmail.com
      </Text>
      <View style={styles.menu}>
        <MenuButton
          label="Manage Expense Category"
          onPress={handleNavigateMenu}
          icon="tune-variant"
          to="ManageExpenseCategory"
        />
        <Divider />
        <MenuButton
          label="Change Password"
          onPress={handleNavigateMenu}
          icon="key"
        />
        <Divider />
        <MenuButton label="Logout" onPress={handleNavigateMenu} icon="logout" />
      </View>
    </View>
  );
}
