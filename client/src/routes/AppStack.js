/* eslint-disable no-shadow */
import React from 'react';
import {DeviceEventEmitter} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Statistics, Account} from '../screens';
import {TabIcon, Add} from '../components';
import {colors, strings, images, perfectSize} from '../theme';
import {hidden_bottom} from './config';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import HomeStack from './HomeStack';
import AddTransactionStack from './AddTransactionStack';

const Tab = createBottomTabNavigator();

export default function AppStack() {
  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (hidden_bottom.includes(routeName)) {
      // DeviceEventEmitter.emit('HideTabBar', true);
      return false;
    } else {
      // DeviceEventEmitter.emit('HideTabBar', false);
      return true;
    }
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        lazyLoad: true,
        safeAreaInsets: {
          bottom: perfectSize(0),
        },
        style: {
          backgroundColor: colors.tabBarBackgroundColor,
          height: perfectSize(80),
          // alignItems: 'center',
          // justifyContent: 'center',
          // position: 'absolute',
          borderTopWidth: perfectSize(0.5),
          borderTopColor: 'rgba(255,255,255,0.1)',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({route}) => ({
          tabBarIcon: props => (
            <TabIcon
              source={images.homeTab}
              name={strings.tabBarLabels.home}
              {...props}
            />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="Add"
        component={AddTransactionStack}
        options={props => ({
          tabBarIcon: props => <Add {...props} />,
          tabBarVisible: false,
        })}
      />
      <Tab.Screen
        name="Stat"
        component={Statistics}
        options={{
          tabBarIcon: props => (
            <TabIcon
              source={images.statTab}
              name={strings.tabBarLabels.stat}
              {...props}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
