import database from '@react-native-firebase/database';

export const storeCategory = categoryData => {
  const reference = database().ref('/categories').push();

  reference.set(categoryData).then(() => console.info('Category Stored'));
};
