import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LegacyListScreen from '../screens/LegacyListScreen';
import OrdersScreen from '../screens/OrdersScreen';

export type RootTabParamList = {
  News: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppNavigator = (): React.JSX.Element => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="News"
      component={LegacyListScreen}
      options={{
        title: 'Новости',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="newspaper-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Orders"
      component={OrdersScreen}
      options={{
        title: 'Заказы',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="receipt-outline" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
