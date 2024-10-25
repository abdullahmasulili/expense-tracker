import { createStackNavigator } from '@react-navigation/stack';

import screens from '../screens';
import { useSelector } from 'react-redux';
import { USER_ROLE } from '../utils/CONSTANTS';

const Stack = createStackNavigator();

export default function MainStack() {
  const { accessToken, currentAccount } = useSelector(state => state.user);
  const authScreens = screens.filter(screen => !screen.isProtected);
  const adminScreens = screens.filter(
    screen => screen.name !== 'UserHome' && screen.isProtected,
  );
  const userScreens = screens.filter(
    screen => screen.name !== 'AdminHome' && screen.isProtected,
  );

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName="Login">
      {accessToken && currentAccount.role === USER_ROLE.ADMIN
        ? adminScreens.map(screen => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
            />
          ))
        : accessToken && currentAccount.role === USER_ROLE.USER
        ? userScreens.map(screen => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
            />
          ))
        : authScreens.map(screen => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
            />
          ))}
    </Stack.Navigator>
  );
}
