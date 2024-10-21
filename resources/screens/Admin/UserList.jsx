import { FlatList } from 'react-native-gesture-handler';
import { Divider, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import UserListItem from '../../components/List/UserListItem';
import styles from './styles';

export default function UserList() {
  const { users } = useSelector(state => state.user);

  return (
    <FlatList
      style={styles.listContainer}
      ListHeaderComponent={
        <Text variant="titleLarge" style={styles.listHeader}>
          User List
        </Text>
      }
      data={users}
      renderItem={({ item }) => (
        <UserListItem firstName={item.firstName} lastName={item.lastName} />
      )}
      ItemSeparatorComponent={<Divider />}
    />
  );
}
