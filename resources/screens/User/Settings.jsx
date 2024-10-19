import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import styles from './styles';
import MenuButton from '../../components/Button/Menu';

export default function UserSettings() {
  function handleOnPress() {
    console.log('pressed');
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
          onPress={handleOnPress}
          icon="tune-variant"
        />
        <MenuButton
          label="Change Password"
          onPress={handleOnPress}
          icon="key"
        />
        <MenuButton label="Logout" onPress={handleOnPress} icon="logout" />
      </View>
    </View>
  );
}
