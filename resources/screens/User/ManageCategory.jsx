import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';

import MenuButton from '../../components/Button/Menu';
import { EXPENSE_CATEGORIES } from '../Expenses/ExpenseForm';

function CategoryItem({ category }) {
  return <MenuButton label={category.label} />;
}

export default function ManageCategory({ navigation }) {
  function handleBackAction() {
    navigation.navigate('UserSettings');
  }

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBackAction} />
        <Appbar.Content title="Manage Category" />
        <Appbar.Action icon="plus" />
      </Appbar.Header>
      <FlatList
        data={EXPENSE_CATEGORIES}
        renderItem={item => <CategoryItem category={item} />}
        keyExtractor={item => item.value}
      />
    </View>
  );
}
