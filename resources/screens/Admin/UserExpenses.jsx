import TotalExpense from '../../components/Cards/TotalExpense';
import { View } from 'react-native';
import styles from './styles';
import { Appbar, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CategoryBreakdown from '../../components/Cards/CategoryBreakdown';
import { FlatList } from 'react-native-gesture-handler';

function TotalExpenseActions({ onPress }) {
  return (
    <Button mode="contained" onPress={onPress}>
      Details
    </Button>
  );
}

export default function UserExpenses({ navigation, route }) {
  const params = route.params;
  const userEmail = params.userEmail;
  const { users } = useSelector(state => state.user);
  const { items: expenses, categories } = useSelector(state => state.expense);
  const { firstName, lastName, email } = users.find(
    item => item.email === userEmail,
  );
  const fullName = [firstName, lastName].join(' ');
  const userExpenses = expenses.filter(expense => expense.belongsTo === email);
  const userCategories = categories.filter(
    category => category.belongsTo === email,
  );
  const totalExpenses = userExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  function handleDetailPress() {
    navigation.navigate('UserExpensesDetail', {
      userEmail,
      userName: fullName,
    });
  }

  const statisticCards = [
    {
      name: 'Total Expenses',
      Component: TotalExpense,
      props: {
        amount: totalExpenses,
        actions: <TotalExpenseActions onPress={handleDetailPress} />,
      },
    },
    {
      name: 'Category Breakdown',
      Component: CategoryBreakdown,
      props: {
        categories: userCategories,
        expenses: userExpenses,
      },
    },
  ];

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('AdminHome')} />
        <Appbar.Content title={fullName} />
      </Appbar.Header>
      <FlatList
        data={statisticCards}
        keyExtractor={item => item.name}
        renderItem={({ item }) => {
          const { Component, props } = item;

          return (
            <View style={styles.listContainer}>
              <Component {...props} />
            </View>
          );
        }}
      />
    </>
  );
}
