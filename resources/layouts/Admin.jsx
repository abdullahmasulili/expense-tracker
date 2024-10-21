import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import UserList from '../screens/Admin/UserList';
import AdminSettings from '../screens/Admin/Settings';

const Tab = createMaterialBottomTabNavigator();

function TabIcon(iconName, color) {
  return <MaterialCommunityIcons name={iconName} color={color} size={26} />;
}

export default function AdminLayout() {
  return (
    <Tab.Navigator initialRouteName="UserList">
      <Tab.Screen
        name="UserList"
        component={UserList}
        options={{
          tabBarLabel: 'User List',
          tabBarIcon: ({ color }) => TabIcon('view-list', color),
        }}
      />
      <Tab.Screen
        name="AdminSettings"
        component={AdminSettings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => TabIcon('cog', color),
        }}
      />
    </Tab.Navigator>
  );
}
