import { FlatList } from 'react-native-gesture-handler';
import { Divider, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import UserListItem from '../../components/List/UserListItem';
import styles from './styles';
import { USER_ROLE } from '../../utils/CONSTANTS';

export default function UserList({ navigation }) {
  const { users } = useSelector(state => state.user);

  function handleUserListItemPress(userEmail) {
    navigation.navigate('UserExpenses', { userEmail });
  }

  return (
    <FlatList
      style={styles.listContainer}
      ListHeaderComponent={
        <Text variant="titleLarge" style={styles.listHeader}>
          User List
        </Text>
      }
      data={users.filter(user => user.role !== USER_ROLE.ADMIN)}
      renderItem={({ item }) => (
        <UserListItem
          firstName={item.firstName}
          lastName={item.lastName}
          onPress={() => handleUserListItemPress(item.email)}
        />
      )}
      ItemSeparatorComponent={<Divider />}
    />
  );
}
