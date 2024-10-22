import TotalExpense from '../../components/Cards/TotalExpense';
import { View } from 'react-native';
import styles from './styles';
import { Appbar, Button, Card } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function UserExpenses({ navigation, route }) {
  const params = route.params;
  const userEmail = params.userEmail;
  const { users } = useSelector(state => state.user);
  const { items: expenses } = useSelector(state => state.expense);
  const { firstName, lastName, email } = users.find(
    item => item.email === userEmail,
  );
  const fullName = [firstName, lastName].join(' ');
  const userExpenses = expenses.filter(expense => expense.belongsTo === email);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('AdminHome')} />
        <Appbar.Content title={fullName} />
      </Appbar.Header>
      <View style={styles.container}>
        <TotalExpense amount={100} title="Total Expense">
          <Card.Actions>
            <Button>Details</Button>
          </Card.Actions>
        </TotalExpense>
      </View>
    </>
  );
}
