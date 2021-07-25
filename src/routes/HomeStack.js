import React from 'react'
import { 
  CardStyleInterpolators, 
  createStackNavigator 
} from '@react-navigation/stack'
import { Home, AddTransaction } from '../screens'
import {hidden_bottom} from './config'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { DeviceEventEmitter } from 'react-native'
const Stack = createStackNavigator();

export default function HomeStack({
  navigation,
  route
}) {
  const routeName = getFocusedRouteNameFromRoute(route)
  if (hidden_bottom.includes(routeName)) {
    navigation.setOptions({
      tabBarVisible: false
    })
    DeviceEventEmitter.emit('HideTabBar',true)
  }
  else{
    navigation.setOptions({
      tabBarVisible: true
    })
    DeviceEventEmitter.emit('HideTabBar',false)
  }
  return (
    <Stack.Navigator 
      initialRouteName='Launch'
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: { backgroundColor: 'transparent' }
      }}
    >
      <Stack.Screen 
        name='Home' 
        component={Home} 
        options={{ header: () => null }} 
      />
      <Stack.Screen 
        name='Add' 
        component={AddTransaction} 
        options={{ header: () => null }} 
      />
    </Stack.Navigator>
  );
}