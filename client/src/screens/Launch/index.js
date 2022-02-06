/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import {images, perfectSize, colors, fonts, strings} from '../../theme';
export default function Launch({navigation}) {
  const slideImage = useRef(new Animated.Value(perfectSize(-1000))).current;
  const slideModal = useRef(new Animated.Value(perfectSize(-1000))).current;
  const slideButton = useRef(new Animated.Value(perfectSize(200))).current;
  // const height = useRef(new Animated.Value(perfectSize(400))).current;
  // const width = useRef(new Animated.Value(perfectSize(400))).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const slideUp = () => {
    Animated.parallel([
      Animated.timing(slideImage, {
        toValue: perfectSize(30),
        duration: 2000,
        useNativeDriver: false,
        easing: Easing.elastic(1),
      }),
      Animated.timing(slideModal, {
        toValue: perfectSize(0),
        duration: 2000,
        useNativeDriver: false,
      }),
      // Animated.timing(height, {
      //   toValue: perfectSize(200),
      //   duration: 2000,
      //   useNativeDriver: false,
      // }),
      // Animated.timing(width, {
      //   toValue: perfectSize(200),
      //   duration: 2000,
      //   useNativeDriver: false,
      // }),
    ]).start();
  };

  useEffect(() => {
    slideUp();
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(slideButton, {
          toValue: perfectSize(0),
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.backgroundColor}
        barStyle="light-content"
      />

      <Animated.Image
        source={images.launchScreenLogo}
        style={{
          height: '60%',
          width: '100%',
          marginTop: slideImage,
        }}
        resizeMode="contain"
      />
      <Animated.View
        style={{
          position: 'absolute',
          backgroundColor: colors.secondaryCardBackgroundColor,
          height: '40%',
          width: '100%',
          borderTopLeftRadius: perfectSize(25),
          borderTopRightRadius: perfectSize(25),
          bottom: slideModal,
          alignItems: 'center',
          padding: perfectSize(20),
        }}>
        <Animated.Text style={[styles.title, {opacity: opacity}]}>
          {strings.launchScreen.title}
        </Animated.Text>
        <Animated.Text style={[styles.subTitle, {opacity: opacity}]}>
          {strings.launchScreen.subTitle}
        </Animated.Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={{
            height: perfectSize(70),
            width: perfectSize(200),
            borderRadius: perfectSize(15),
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10%',
          }}>
          <Animated.View
            style={{
              position: 'absolute',
              backgroundColor: colors.secondaryCardBackgroundColor,
              height: perfectSize(71),
              width: slideButton,
              alignSelf: 'flex-start',
              borderRadius: perfectSize(13),
              zIndex: 1,
            }}
          />
          <Text
            style={{
              fontFamily: fonts.quicksandBold,
              color: colors.primaryLightColor,
              fontSize: perfectSize(20),
            }}>
            {strings.launchScreen.signupTitle}
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}>
          {strings.launchScreen.loginTitle}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
  },
  images: {
    height: '100%',
    width: '100%',
  },
  title: {
    color: colors.primaryLightColor,
    fontSize: perfectSize(32),
    textAlign: 'center',
    fontFamily: fonts.quicksandBold,
  },
  subTitle: {
    marginTop: '5%',
    color: colors.primaryTintColor,
    fontSize: perfectSize(18),
    textAlign: 'center',
    fontFamily: fonts.quicksandBold,
    opacity: 0.6,
  },
  bottomView: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '5%',
  },
  loginButton: {
    color: colors.primaryLightColor,
    fontSize: perfectSize(18),
    textAlign: 'center',
    fontFamily: fonts.quicksandBold,
    opacity: 0.5,
    marginTop: '5%',
  },
});
