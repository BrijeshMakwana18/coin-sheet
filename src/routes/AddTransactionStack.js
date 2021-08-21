import React, {Component} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {AddExpense, AddTransaction} from '../screens';

const Stack = createStackNavigator();

export default class AddTransactionStack extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      tabBarVisible: false,
    });
    DeviceEventEmitter.emit('HideTabBar', true);
  }
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          cardStyle: {backgroundColor: 'transparent'},
        }}>
        <Stack.Screen
          name="AddTransaction"
          component={AddTransaction}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpense}
          options={{header: () => null}}
        />
      </Stack.Navigator>
    );
  }
}
