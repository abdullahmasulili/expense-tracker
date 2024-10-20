import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';

import MenuButton from '../../components/Button/Menu';
import styles from './styles';
import ExpenseCategoryInput from '../../components/Dialog/ExpenseCategoryInput';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import DialogContainer from '../../components/Dialog/Container';

function CategoryItem({ category, onPress }) {
  return <MenuButton label={category.label} onPress={onPress} />;
}

export default function ManageCategory({ navigation }) {
  const expenseCategories = useSelector(state => state.expense.categories);
  const inputDialogRef = useRef();
  const [dialogTitle, setDialogTitle] = useState('');
  const [categoryData, setCategoryData] = useState({});

  function handleBackAction() {
    navigation.navigate('UserSettings');
  }

  function handleItemPress(category) {
    setCategoryData(category);
    setDialogTitle('Edit Category');
    inputDialogRef.current.open();
  }

  function handleAddItemPress() {
    setDialogTitle('Add Category');
    inputDialogRef.current.open();
  }

  function handleCloseDialog() {
    setCategoryData({});
    inputDialogRef.current.close();
  }

  return (
    <>
      <DialogContainer ref={inputDialogRef} title={dialogTitle}>
        <ExpenseCategoryInput
          category={categoryData}
          onClose={handleCloseDialog}
        />
      </DialogContainer>
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={handleBackAction} />
          <Appbar.Content title="Manage Category" />
          <Appbar.Action icon="plus" onPress={handleAddItemPress} />
        </Appbar.Header>
        <View style={styles.container}>
          <FlatList
            data={expenseCategories}
            renderItem={({ item }) => (
              <CategoryItem
                category={item}
                onPress={() => handleItemPress(item)}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </>
  );
}
