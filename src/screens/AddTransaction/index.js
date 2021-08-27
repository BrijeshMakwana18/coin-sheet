/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  DeviceEventEmitter,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {colors, perfectSize} from '../../theme';
import {connect} from 'react-redux';
import {PrimaryHeader} from '../../components';
import {strings, images} from '../../theme';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const mapStateToProps = state => {
  return {
    state: state.signupReducer,
  };
};
const data = [
  {
    backgroundColor: '#A440F6',
  },
  {
    backgroundColor: '#FF9478',
  },
  {
    backgroundColor: '#246BFE',
  },
];
class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  onBackButtonTapped = () => {
    this.props.navigation.goBack();
    DeviceEventEmitter.emit('HideTabBar', false);
  };
  renderItem = (item, index) => {
    return (
      <View
        style={[
          styles.cardContainer,
          {
            backgroundColor: item.backgroundColor,
            shadowColor: item.backgroundColor,
          },
        ]}
      />
    );
  };
  render() {
    const {headerTitle} = strings.addTransaction;
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={colors.backgroundColor}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <PrimaryHeader
            onPress={() => this.onBackButtonTapped()}
            title={headerTitle}
            leftImage={images.close}
            rightImage={images.transactionHeader}
          />
          {/* <Text onPress={() => this.props.navigation.navigate('AddExpense')}>
            Transaction
          </Text> */}
          <View style={styles.listContentContainer}>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              // contentContainerStyle={styles.listContentContainer}
              renderItem={({item, index}) => this.renderItem(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);
