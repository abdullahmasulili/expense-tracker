import { View } from 'react-native';
import { Appbar, Divider, Text } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';

import MenuButton from '../../components/Button/Menu';
import styles from './styles';
import ExpenseCategoryInput from '../../components/Dialog/ExpenseCategoryInput';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogContainer from '../../components/Dialog/Container';
import GlobalStyles from '../../utils/GlobalStyles';
import {
  newCategory,
  patchCategory,
  removeCategory,
} from '../../store/expense/categories-actions';

function CategoryItem({ category, onPress }) {
  return <MenuButton label={category.label} onPress={onPress} />;
}

function EmptyList() {
  return (
    <Text variant="titleMedium" style={GlobalStyles.textCenter}>
      No categories yet
    </Text>
  );
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
        dispatch(newCategory(data)).then(() => handleCloseDialog());
        break;
      case ACTION_TYPE.EDIT:
        dispatch(patchCategory(data)).then(() => handleCloseDialog());
        break;
    }
  }

  function handleDeleteCategory() {
    dispatch(removeCategory(categoryData.id)).then(() => handleCloseDialog());
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
            ListEmptyComponent={EmptyList}
            ItemSeparatorComponent={<Divider />}
          />
        </View>
      </View>
    </>
  );
}
