/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, StatusBar,DeviceEventEmitter} from 'react-native';
import {bindActionCreators} from 'redux';
import {colors, perfectSize} from '../../theme';
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const mapStateToProps = state => {
  return {
    state: state.signupReducer,
  };
};
class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={colors.backgroundColor}
          barStyle="dark-content"
        />
        <View style={styles.container}>
          <Text onPress={() => this.props.navigation.navigate('AddExpense')}>
            Transaction
          </Text>
          <Text onPress={() => {
            this.props.navigation.goBack()
            DeviceEventEmitter.emit('HideTabBar', false);

          }}>
            Close
          </Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: perfectSize(Platform.OS == 'ios' ? 56 : 40),
    padding: perfectSize(23),
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);
