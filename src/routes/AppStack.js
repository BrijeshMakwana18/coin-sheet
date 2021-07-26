import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Statistics, Goal, Account} from '../screens';
import {TabIcon, Add} from '../components';
import {colors, strings, images} from '../theme';

import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const AddItem = () => {
  return null;
};

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
          borderColor: colors.tabBarBackgroundColor,
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
        component={AddItem}
        listeners={props => ({
          tabPress: e => {
            // Prevent default action
            console.log(props);
          },
        })}
        options={props => ({
          tabBarButton: () => <Add {...props} />,
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
