import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {colors, fonts, perfectSize} from '../theme';

export default function PrimaryHeader({onPress, title, rightImage, leftImage}) {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.backArrowContainer}>
        <Image source={leftImage} style={styles.backArrow} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Image
          source={rightImage}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backArrowContainer: {
    height: perfectSize(25),
    width: perfectSize(25),
  },
  backArrow: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: colors.primaryLightColor,
    opacity: 0.5,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: perfectSize(10),
  },
  headerTitle: {
    color: colors.headerTitleColor,
    fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(35),
  },
  headerImage: {
    height: perfectSize(170),
    width: perfectSize(200),
    top: perfectSize(-40),
    position: 'absolute',
    right: perfectSize(-20),
  },
});
