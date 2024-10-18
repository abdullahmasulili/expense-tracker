import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ExpenseList from './ExpenseList';
import Statistics from './Statistics';

const Tab = createMaterialBottomTabNavigator();

function TabIcon(iconName, color) {
  return <MaterialCommunityIcons name={iconName} color={color} size={26} />;
}

export default function ExpensesHome() {
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
    </Tab.Navigator>
  );
}
