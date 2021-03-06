/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Button} from '../../components';
import {images, colors, fonts, perfectSize, strings} from '../../theme';
import {signup} from './actions';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({signup}, dispatch);
};

const mapStateToProps = state => {
  return {
    state: state.signupReducer,
  };
};
function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const backArrowMarginLeft = useRef(
    new Animated.Value(perfectSize(0)),
  ).current;
  const titleMarginTop = useRef(new Animated.Value(perfectSize(0))).current;
  const titleOpacity = useRef(new Animated.Value(perfectSize(1))).current;
  const errorModalTop = useRef(new Animated.Value(perfectSize(-500))).current;

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    Animated.timing(backArrowMarginLeft, {
      toValue: perfectSize(-500),
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.parallel([
      Animated.timing(titleMarginTop, {
        toValue: perfectSize(-200),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(titleOpacity, {
        toValue: perfectSize(0),
        duration: 1,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const _keyboardDidHide = () => {
    Animated.timing(backArrowMarginLeft, {
      toValue: perfectSize(0),
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.parallel([
      Animated.timing(titleMarginTop, {
        toValue: perfectSize(0),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(titleOpacity, {
        toValue: perfectSize(1),
        duration: 1,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const showError = () => {
    Animated.timing(errorModalTop, {
      toValue: Platform.OS == 'ios' ? perfectSize(50) : perfectSize(40),
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.elastic(Platform.OS == 'android' ? 1 : 1),
    }).start();
    setTimeout(() => {
      Animated.timing(errorModalTop, {
        toValue: -perfectSize(500),
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 2000);
  };

  const handleSignupPress = async (email, password) => {
    if (email.length == 0 || password.length == 0) {
      setError('Invalid credentials. Please enter email and password');
      showError();
      return;
    }
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async res => {
        let {user} = res;
        await firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            displayName: '',
            email: user.email,
            emailVerified: user.emailVerified,
            metadata: user.metadata,
            phoneNumber: '',
            photoURL: '',
            uid: user.uid,
          })
          .catch(error => {
            console.log(error);
          });
        props.signup(user);
      })
      .catch(async error => {
        setError(error.message);
        showError();
      });
  };
  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Animated.View
              style={{
                marginLeft: backArrowMarginLeft,
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={styles.header}>
                <Image source={images.backArrow} style={styles.backArrow} />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={{
                marginTop: titleMarginTop,
                opacity: titleOpacity,
              }}>
              <Text style={styles.title}>{strings.signupScreen.title}</Text>
            </Animated.View>

            <TextInput
              contextMenuHidden={true}
              style={[styles.textInput, {marginTop: '40%'}]}
              placeholderTextColor="rgba(66,76,89,0.5)"
              selectionColor="#8389E9"
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => setEmail(email)}
              value={email}
              returnKeyType="next"
              onSubmitEditing={() => this.secondTextInput.focus()}
              blurOnSubmit={false}
            />
            <TextInput
              style={[styles.textInput, {marginTop: perfectSize(18)}]}
              placeholderTextColor="rgba(66,76,89,0.5)"
              selectionColor="#8389E9"
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={password => setPassword(password)}
              secureTextEntry
              value={password}
              ref={input => {
                this.secondTextInput = input;
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.bottomView}>
        <Button
          active={true}
          title={strings.signupScreen.buttonTitle}
          onPress={() => handleSignupPress(email, password)}
        />
        <Text style={styles.bottomText}>
          By logging in, you are agreeing to our{'\n'}
          <Text style={{fontFamily: fonts.quicksandBold}}>
            Terms and Conditions
          </Text>{' '}
          and{' '}
          <Text style={{fontFamily: fonts.quicksandBold}}>Privacy Policy</Text>{' '}
        </Text>
      </View>
      <Animated.View
        style={{
          width: '90%',
          backgroundColor: '#C45156',
          borderRadius: perfectSize(10),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.2,
          shadowRadius: 16.0,
          elevation: 24,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          position: 'absolute',
          top: errorModalTop,
        }}>
        <Text
          style={{
            fontFamily: fonts.avenirMedium,
            fontSize: perfectSize(21),
            color: 'white',
            textAlign: 'center',
            padding: perfectSize(10),
            fontWeight: 'bold',
          }}>
          {error}
        </Text>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: perfectSize(Platform.OS == 'ios' ? 56 : 40),
    padding: perfectSize(23),
    backgroundColor: colors.backgroundColor,
  },
  header: {
    height: perfectSize(23),
    width: perfectSize(30),
  },
  backArrow: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: colors.primaryLightColor,
    opacity: 0.5,
  },
  title: {
    textAlign: 'center',
    fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(56),
    color: colors.primaryLightColor,
    opacity: 0.5,
  },
  textInput: {
    padding: perfectSize(20),
    height: perfectSize(70),
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: perfectSize(12),
    fontSize: perfectSize(23),
    fontFamily: fonts.quicksandBold,
    color: colors.primaryLightColor,
  },
  bottomView: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.backgroundColor,
    paddingBottom: '8%',
  },
  bottomText: {
    textAlign: 'center',
    fontSize: perfectSize(14),
    color: colors.primaryLightColor,
    fontFamily: fonts.avenirLight,
    marginTop: '5%',
  },
  errorImage: {
    alignItems: 'center',
    tintColor: 'rgba(226,54,54,0.1)',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
