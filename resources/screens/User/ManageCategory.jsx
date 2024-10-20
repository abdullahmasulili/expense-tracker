import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';

import MenuButton from '../../components/Button/Menu';
import styles from './styles';
import ExpenseCategoryInput from '../../components/Dialog/ExpenseCategoryInput';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogContainer from '../../components/Dialog/Container';
import { expenseActions } from '../../store/expense';

function CategoryItem({ category, onPress }) {
  return <MenuButton label={category.label} onPress={onPress} />;
}

const ACTION_TYPE = {
  ADD: 'add',
  EDIT: 'edit',
};

export default function ManageCategory({ navigation }) {
  const expenseCategories = useSelector(state => state.expense.categories);
  const inputDialogRef = useRef();
  const [actionType, setActionType] = useState(ACTION_TYPE.ADD);
  const [categoryData, setCategoryData] = useState();
  const dispatch = useDispatch();

  function handleBackAction() {
    navigation.navigate('UserSettings');
  }

  function handleItemPress(category) {
    setCategoryData(category);
    setActionType(ACTION_TYPE.EDIT);
    inputDialogRef.current.open();
  }

  function handleAddItemPress() {
    setActionType(ACTION_TYPE.ADD);
    inputDialogRef.current.open();
  }

  function handleCloseDialog() {
    setCategoryData();
    inputDialogRef.current.close();
  }

  function handleSaveCategory(data) {
    switch (actionType) {
      case ACTION_TYPE.ADD:
        dispatch(expenseActions.addCategory(data));
        break;
      case ACTION_TYPE.EDIT:
        dispatch(expenseActions.updateCategory(data));
        break;
    }
  }

  function handleDeleteCategory() {
    dispatch(expenseActions.deleteCategory(categoryData.id));
    inputDialogRef.current.close();
  }

  let dialogTitle = 'Add Category';

  if (actionType === ACTION_TYPE.EDIT) {
    dialogTitle = 'Edit Category';
  }

  return (
    <>
      <DialogContainer ref={inputDialogRef} title={dialogTitle}>
        <ExpenseCategoryInput
          category={categoryData}
          onClose={handleCloseDialog}
          onSave={handleSaveCategory}
          onDelete={handleDeleteCategory}
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
