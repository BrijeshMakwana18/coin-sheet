/* eslint-disable no-shadow */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Statistics, Goal, Account} from '../screens';
import {TabIcon, Add} from '../components';
import {colors, strings, images, perfectSize} from '../theme';
import HomeStack from './HomeStack';
import AddTransactionStack from './AddTransactionStack';

const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        lazyLoad: true,
        style: {
          backgroundColor: colors.tabBarBackgroundColor,
          height: '8%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          borderTopWidth: 0,
          borderTopRightRadius: perfectSize(15),
          borderTopLeftRadius: perfectSize(15),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: props => (
            <TabIcon
              source={images.homeTab}
              name={strings.tabBarLabels.home}
              {...props}
            />
          ),
        }}
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

      <Tab.Screen
        name="Add"
        component={AddTransactionStack}
        options={props => ({
          tabBarIcon: props => <Add {...props} />,
          tabBarVisible: false,
        })}
      />

      <Tab.Screen
        name="Goal"
        component={Goal}
        options={{
          tabBarIcon: props => (
            <TabIcon
              source={images.goalTab}
              name={strings.tabBarLabels.goal}
              {...props}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: props => (
            <TabIcon
              source={images.accountTab}
              name={strings.tabBarLabels.account}
              {...props}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
