import { FlatList } from 'react-native-gesture-handler';
import { Card, Text } from 'react-native-paper';
import GlobalStyles from '../../utils/GlobalStyles';

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
        />
      </Card.Content>
    </Card>
  );
}
