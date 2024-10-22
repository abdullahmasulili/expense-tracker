import database from '@react-native-firebase/database';

export const storeCategory = categoryData => {
  try {
    database().ref(`/categories/${categoryData.id}`).set(categoryData);
  } catch (err) {
    return err;
  }
};

export const getCategories = async () => {
  const data = await database()
    .ref('/categories')
    .once('value')
    .then(snapshot => snapshot.val());

  return data;
};

export const deleteCategory = async categoryId => {
  try {
    await database().ref(`/categories/${categoryId}`).remove();
  } catch (err) {
    return err;
  }
};

export const storeExpense = expenseData => {
  try {
    database().ref(`/expenses/${expenseData.id}`).set(expenseData);
  } catch (err) {
    return err;
  }
};

export const getExpenses = async () => {
  try {
    const data = await database()
      .ref('/expenses')
      .once('value')
      .then(snapshot => snapshot.val());

    return data;
  } catch (err) {
    return err;
  }
};

export const deleteExpense = async expenseId => {
  try {
    await database().ref(`/expenses/${expenseId}`).remove();
  } catch (err) {
    return err;
  }
};
