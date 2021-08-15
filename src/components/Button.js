/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {perfectSize, fonts, colors} from '../theme';
export default function Button(props) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={{
        height: perfectSize(56),
        width: perfectSize(300),
        borderRadius: perfectSize(30),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: props.active
          ? colors.primaryLightColor
          : colors.inActiveButtonColor,
        shadowColor: props.shadowColor
          ? props.shadowColor
          : colors.primaryLightColor,
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: props.shadow ? 0.58 : 0,
        shadowRadius: 16.0,
        elevation: props.shadow ? 24 : 0,
        ...props,
      }}
      onPress={props.onPress}>
      <Text
        style={{
          fontSize: perfectSize(18),
          fontFamily: fonts.quicksandBold,
          color: props.active ? colors.primary : colors.inActiveButtonColor,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
