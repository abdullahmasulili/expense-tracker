import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ExpenseList from '../screens/Expenses/ExpenseList';
import Statistics from '../screens/Expenses/Statistics';
import UserSettings from '../screens/User/Settings';

const Tab = createMaterialBottomTabNavigator();

function TabIcon(iconName, color) {
  return <MaterialCommunityIcons name={iconName} color={color} size={26} />;
}

export default function UserLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ExpenseList"
        component={ExpenseList}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color }) => TabIcon('view-list', color),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarLabel: 'Statistics',
          tabBarIcon: ({ color }) => TabIcon('chart-box', color),
        }}
      />
      <Tab.Screen
        name="UserSettings"
        component={UserSettings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => TabIcon('cog', color),
        }}
      />
    </Tab.Navigator>
  );
}
