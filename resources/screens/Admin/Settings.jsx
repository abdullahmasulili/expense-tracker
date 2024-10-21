import { View } from 'react-native';
import { Avatar, Divider, Text } from 'react-native-paper';
import styles from './styles';
import GlobalStyles from '../../utils/GlobalStyles';
import { useDispatch, useSelector } from 'react-redux';
import MenuButton from '../../components/Button/Menu';
import Loading from '../../components/Dialog/Loading';
import { signOutUser } from '../../store/user/actions';

export default function AdminSettings({ navigation }) {
  const { currentAccount, isSubmitting } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const fullName = [currentAccount?.firstName, currentAccount?.lastName].join(
    ' ',
  );
  const initialName = currentAccount?.firstName
    .charAt(0)
    .concat(currentAccount?.lastName.charAt(0));

  function handleNavigateMenu(screenName) {
    navigation.navigate(screenName);
  }

  function handleUserLogout() {
    dispatch(signOutUser())
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <Avatar.Text style={styles.avatar} size={50} label={initialName} />
      <Text variant="titleLarge" style={GlobalStyles.textCenter}>
        {fullName}
      </Text>
      <Text variant="bodyMedium" style={GlobalStyles.textCenter}>
        {currentAccount?.email}
      </Text>
      <View style={styles.menu}>
        <MenuButton
          label="Manage Users"
          onPress={handleNavigateMenu}
          icon="account-supervisor-circle"
        />
        <Divider />
        <MenuButton
          label="Change Password"
          onPress={handleNavigateMenu}
          icon="key"
        />
        <Divider />
        <MenuButton label="Logout" onPress={handleUserLogout} icon="logout" />
      </View>
      <Loading title="Signing Out..." visible={isSubmitting} />
    </View>
  );
}
