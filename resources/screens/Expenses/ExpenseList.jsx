import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, List, Text } from 'react-native-paper';

import ExpenseItem from '../../components/List/ExpenseItem';
import DUMMY_DATA from '../../data';
import styles from './styles';

export default function ExpenseList() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Text variant="titleLarge">Your Expenses At</Text>
        <Button>Select Date</Button>
      </View>
      <List.Section style={styles.list}>
        {DUMMY_DATA.map((data, index) => (
          <ExpenseItem
            key={index}
            title={data.month}
            summary={data.expenseSummary}
          />
        ))}
      </List.Section>
    </ScrollView>
  );
}
