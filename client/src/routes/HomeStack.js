import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  Home,
  AllExpenseCat,
  TransactionList,
  MyFinance,
  AddExpense,
} from '../screens';
import {hidden_bottom} from './config';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {DeviceEventEmitter} from 'react-native';
const Stack = createStackNavigator();

export default function HomeStack({navigation, route}) {
  return (
    <Stack.Navigator
      initialRouteName="Launch"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: {backgroundColor: 'transparent'},
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="AddExpense"
        component={AddExpense}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="AllExpenseCat"
        component={AllExpenseCat}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="TransactionList"
        component={TransactionList}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="MyFinance"
        component={MyFinance}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}
