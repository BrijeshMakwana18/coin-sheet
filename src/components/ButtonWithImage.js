/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {colors, perfectSize} from '../theme';

export default function ButtonWithImage(props) {
  return (
    <TouchableOpacity
      style={{
        height: perfectSize(60),
        width: perfectSize(60),
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: perfectSize(15),
      }}
      onPress={props.onPress}>
      <Image
        source={props.image}
        style={{
          height: perfectSize(20),
          width: perfectSize(20),
          tintColor: colors.primary,
        }}
      />
    </TouchableOpacity>
  );
}
