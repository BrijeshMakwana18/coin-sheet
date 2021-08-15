/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text} from 'react-native';
import {colors, perfectSize} from '../theme';

export default function TabBarIcon(props) {
  return (
    <View
      style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={props.source}
        resizeMode="contain"
        style={{
          height: perfectSize(25),
          width: perfectSize(25),
          tintColor: props.focused
            ? colors.activeTabColor
            : colors.inactiveTabColor,
        }}
      />
      <Text
        style={{
          color: props.focused
            ? colors.activeTabColor
            : colors.inactiveTabColor,
          fontSize: perfectSize(10),
          marginTop: '5%',
        }}>
        {props.name}
      </Text>
    </View>
  );
}
