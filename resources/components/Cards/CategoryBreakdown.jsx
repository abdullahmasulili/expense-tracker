import { FlatList } from 'react-native-gesture-handler';
import { Card, Text } from 'react-native-paper';
import { PieChart } from 'react-native-gifted-charts';
import { View } from 'react-native';

import GlobalStyles from '../../utils/GlobalStyles';
import styles from './styles';

function BreakdownItem({ data }) {
  return (
    <Text variant="titleLarge" style={GlobalStyles.verticalSpacing}>
      {data.category} : {data.percentage.toFixed(2)}%
    </Text>
  );
}

export default function CategoryBreakdown({ expenses, categories }) {
  const totalExpense = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );
  const categoriesBreakdown = categories.map(category => {
    const expensesByCategory = expenses.filter(
      expense => expense.category.toLowerCase() === category.value,
    );
    const totalExpenseByCategory = expensesByCategory.reduce(
      (total, expense) => total + Number(expense.amount),
      0,
    );

    return {
      category: category.label,
      percentage: (totalExpenseByCategory / totalExpense) * 100,
    };
  });
  const pieCartData = categoriesBreakdown.map(category => ({
    value: category.percentage,
    text: category.category,
  }));

  return (
    <Card>
      <Card.Title
        title={<Text variant="titleMedium">Expense Category Breakdown</Text>}
      />
      <Card.Content>
        <FlatList
          data={categoriesBreakdown}
          keyExtractor={item => item.category}
          renderItem={({ item }) => <BreakdownItem data={item} />}
          ListHeaderComponent={
            <View style={styles.breakDownChart}>
              <PieChart data={pieCartData} showText textColor="#FFF" />
            </View>
          }
        />
      </Card.Content>
    </Card>
  );
}
