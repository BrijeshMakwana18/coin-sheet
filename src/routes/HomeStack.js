import React from 'react'
import { 
  CardStyleInterpolators, 
  createStackNavigator 
} from '@react-navigation/stack'
import { Home } from '../screens'

const Stack = createStackNavigator();

export default function HomeStack() {
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

    </Stack.Navigator>
  );
}