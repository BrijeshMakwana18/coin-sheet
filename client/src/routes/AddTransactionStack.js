import React, {Component} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  AddTransaction,
  AddExpense,
  AddIncome,
  TransactionSuccess,
} from '../screens';
import {removeListeners} from '../util/globalMethods';
const Stack = createStackNavigator();

export default class AddTransactionStack extends Component {
  constructor(props) {
    super(props);
    this.listenerArray = [];
  }
  componentDidMount() {
    let didFocusListener = this.props.navigation.addListener('focus', () => {
      this.props.navigation.setOptions({
        tabBarVisible: false,
      });
      DeviceEventEmitter.emit('HideTabBar', true);
    });

    this.listenerArray.push({
      type: 'navigation',
      ref: didFocusListener,
    });
  }

  componentWillUnmount() {
    removeListeners(this.listnersArray);
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
          name="AddIncome"
          component={AddIncome}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpense}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="TransactionSuccess"
          component={TransactionSuccess}
          options={{header: () => null}}
        />
      </Stack.Navigator>
    );
  }
}
