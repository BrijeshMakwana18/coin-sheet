/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native';
import {bindActionCreators} from 'redux';
import {colors, perfectSize} from '../../theme';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {setUserData} from './actions';
const mapDispatchToProps = dispatch => {
  return bindActionCreators({setUserData}, dispatch);
};

const mapStateToProps = state => {
  return {
    appReducer: state.appReducer,
  };
};
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getCurrentUserData = async () => {
    let user = await auth().currentUser;
    this.props.setUserData(user);
  };

  componentDidMount() {
    this.getCurrentUserData();
  }

  render() {
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={colors.backgroundColor}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <Text onPress={() => this.props.navigation.navigate('AddExpense')}>
            Home
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
