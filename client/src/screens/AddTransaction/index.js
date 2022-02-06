/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  DeviceEventEmitter,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {colors, perfectSize} from '../../theme';
import {connect} from 'react-redux';
import {strings, images} from '../../theme';
import styles from './styles';

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
    label: 'Credit',
    image: images.income,
    description:
      'This transaction will be counted as your income. It could be your monthly salary or other income which you want to add or track',
    screenName: 'AddIncome',
    backgroundColor: colors.primary,
  },
  {
    label: 'Debit',
    image: images.expense,
    description:
      'This transaction will be counted as your expense. It cound be daily expenses that you should keep track of.',
    screenName: 'AddExpense',
    backgroundColor: colors.primary,
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
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(item.screenName)}
        style={[styles.cardContainer, {marginTop: index == 0 ? 0 : '10%'}]}>
        {/* <View style={styles.cardDetailsContainer}> */}
        <Text style={styles.cardTitle}>{item.label}</Text>
        {/* <Text style={styles.cardDescription}>{item.description}</Text> */}
        {/* </View>
        <Image
          source={item.image}
          style={styles.cardImage}
          resizeMode="contain"
        /> */}
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={colors.backgroundColor}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View
            style={{
              left: perfectSize(23),
              position: 'absolute',
              top: perfectSize(60),
              zIndex: 1,
            }}>
            <TouchableOpacity onPress={() => this.onBackButtonTapped()}>
              <Image source={images.close} style={styles.closeImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.listContentContainer}>
            <Image
              source={images.objectOne}
              style={[
                styles.objectImage,
                {
                  top: '5%',
                  right: '-10%',
                },
              ]}
            />
            <Image
              source={images.objectTwo}
              style={[
                styles.objectImage,
                {
                  bottom: '5%',
                  left: '-10%',
                },
              ]}
            />
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainer}
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
