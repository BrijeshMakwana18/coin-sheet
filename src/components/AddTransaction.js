/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Text,
  DeviceEventEmitter,
} from 'react-native';
import {perfectSize, images, colors} from '../theme';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }
  animation = new Animated.Value(0);

  toggleMenu = () => {
    // DeviceEventEmitter.emit('OpenTransactionModal', true)
    const toValue = this.open ? 0 : 1;
    Animated.spring(this.animation, {
      toValue,
      friction: 5,
      useNativeDriver: false,
    }).start();
    this.open = !this.open;
  };

  button = (title, value) => {
    return (
      <TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            width: '200%',
            height: perfectSize(50),
            borderRadius: perfectSize(5),
            backgroundColor: '#6096FD',
            alignSelf: 'center',
            transform: [
              {
                scale: this.animation,
              },
              {
                translateY: this.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, perfectSize(-value)],
                }),
              },
            ],
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  componentDidMount() {
    DeviceEventEmitter.addListener('HideTabBar', hide => {
      hide ? this.setState({visible: false}) : this.setState({visible: true});
    });
  }

  render() {
    return (
      <>
        {this.state.visible && (
          <TouchableOpacity
            onPress={() => this.toggleMenu()}
            style={styles.container}>
            {this.button('Income', 80)}
            {this.button('Expense', 160)}
            {this.button('Investment', 240)}
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: this.animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '45deg'],
                    }),
                  },
                ],
              }}>
              <Image
                source={images.add}
                style={{
                  height: perfectSize(25),
                  width: perfectSize(25),
                  resizeMode: 'contain',
                  tintColor: 'white',
                }}
              />
            </Animated.View>
          </TouchableOpacity>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: perfectSize(70),
    borderRadius: perfectSize(15),
    backgroundColor: colors.addTransactionButtonColor,
    height: perfectSize(70),
    top: -hp('3%'),
    shadowColor: colors.addTransactionButtonColor,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      height: 10,
    },
    elevation: 5,
  },
});
