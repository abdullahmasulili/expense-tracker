import database from '@react-native-firebase/database';

export const storeData = async userData => {
  const reference = database().ref('/users').push();

  reference.set(userData).then(() => console.info('Account Stored'));
};

export const getUsers = async () => {
  const data = await database()
    .ref('/users')
    .once('value')
    .then(snapshot => snapshot.val());

  return data;
};
