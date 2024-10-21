import database from '@react-native-firebase/database';

export const storeCategory = categoryData => {
  try {
    const reference = database().ref('/categories').push();

    reference.set(categoryData).then(() => console.info('Category Stored'));
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
