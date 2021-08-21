/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Image, View, DeviceEventEmitter} from 'react-native';
import {perfectSize, images, colors} from '../theme';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('HideTabBar', hide => {
      hide ? this.setState({visible: false}) : this.setState({visible: true});
    });
  }

  render() {
    return (
      <>
        {this.state.visible && (
          <View style={styles.container}>
            <Image
              source={images.add}
              style={{
                height: perfectSize(25),
                width: perfectSize(25),
                resizeMode: 'contain',
                tintColor: 'white',
              }}
            />
          </View>
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
