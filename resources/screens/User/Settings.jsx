import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import styles from './styles';
import MenuButton from '../../components/Button/Menu';

export default function UserSettings({ navigation }) {
  function handleNavigateMenu(screenName) {
    navigation.navigate(screenName);
  }

  return (
    <View style={styles.container}>
      <Avatar.Text style={styles.avatar} size={50} label="AM" />
      <Text variant="titleLarge" style={styles.fullName}>
        Abdullah Masulili
      </Text>
      <View style={styles.menu}>
        <MenuButton
          label="Manage Expense Category"
          onPress={handleNavigateMenu}
          icon="tune-variant"
          to="ManageExpenseCategory"
        />
        <MenuButton
          label="Change Password"
          onPress={handleNavigateMenu}
          icon="key"
        />
        <MenuButton label="Logout" onPress={handleNavigateMenu} icon="logout" />
      </View>
    </View>
  );
}
