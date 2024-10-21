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
    .then(snapshot => snapshot);

  return data;
};

export const deleteCategory = async categoryId => {
  try {
    await database().ref(`/categories/${categoryId}`).remove();
  } catch (err) {
    return err;
  }
};
