import { Avatar, Card, Text } from 'react-native-paper';
import styles from './styles';

export default function UserListItem({ firstName, lastName }) {
  return (
    <Card mode="contained" style={styles.itemContainer}>
      <Card.Content style={styles.userItem}>
        <Avatar.Icon icon="account" size={36} />
        <Text variant="bodyLarge">{`${firstName} ${lastName}`}</Text>
      </Card.Content>
    </Card>
  );
}
