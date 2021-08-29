/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  DeviceEventEmitter,
  TouchableOpacity,
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
    label: 'Income/Credit',
    image: images.income,
    description:
      'This transaction will be counted as your income. It could be your monthly salary or other income which you want to add or track',
    screenName: 'AddIncome',
    backgroundColor: '#A440F6',
  },
  {
    label: 'Expense/Debit',
    image: images.expense,
    description:
      'This transaction will be counted as your expense. It cound be daily expenses that you should keep track of.',
    screenName: 'AddExpense',
    backgroundColor: '#FF9478',
  },
  {
    label: 'Goal',
    image: images.goal,
    description:
      'You should always have a goal in a life CoinSheet will help you keep track of your goals on your fingertips.',
    screenName: 'AddGoal',
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
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(item.screenName)}
        style={[
          styles.cardContainer,
          {
            backgroundColor: item.backgroundColor,
            shadowColor: item.backgroundColor,
          },
        ]}>
        <View style={styles.cardDetailsContainer}>
          <Text style={styles.cardTitle}>{item.label}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
        <Image source={item.image} style={styles.cardImage} />
      </TouchableOpacity>
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
          <View style={{paddingLeft: perfectSize(23)}}>
            <PrimaryHeader
              onPress={() => this.onBackButtonTapped()}
              title={headerTitle}
              leftImage={images.close}
              rightImage={images.transactionHeader}
            />
          </View>
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
