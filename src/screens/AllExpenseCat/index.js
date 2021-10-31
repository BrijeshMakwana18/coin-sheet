import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import {PrimaryHeader} from '../../components';
import {strings, images, colors} from '../../theme';
import styles from './styles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};
const mapStateToProps = state => {
  return {
    appReducer: state.appReducer,
  };
};
let months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
class AllExpenseCat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  renderAllCat = (item, index) => {
    const {transaction, transactions} = strings.allExpenseCat;
    const {total, category, data} = item;
    const {selectedFilter, dateRange} = this.props.route.params;
    let selectedStartDateTimeStamp, selectedEndDateTimeStamp;
    if (dateRange) {
      selectedStartDateTimeStamp = dateRange.start;
      selectedEndDateTimeStamp = dateRange.end;
    }
    if (item.total > 0 && item.data && item.data.length > 0) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('TransactionList', {
              selectedExpenseCat: category,
              isFromExpenseCat: true,
              selectedFilter: selectedFilter,
              dateRange:
                selectedFilter == 'all'
                  ? false
                  : {
                      start: selectedStartDateTimeStamp,
                      end: selectedEndDateTimeStamp,
                    },
            });
          }}
          style={[
            styles.catContainer,
            {
              backgroundColor: colors.expenseCatColor[category].backgroundColor,
            },
          ]}>
          <View
            style={[
              styles.catImageContainer,
              {
                backgroundColor: colors.expenseCatColor[category].tintColor,
              },
            ]}>
            <Image source={images[category]} style={styles.catImage} />
          </View>
          <View style={styles.catDetailsContainer}>
            <Text style={styles.catTitle}>{category.toUpperCase()}</Text>
            <Text style={styles.numberOfTransactions}>
              {data.length} {data.length == 1 ? transaction : transactions}
            </Text>
          </View>
          <Text
            style={[
              styles.totalAmmount,
              {
                color: colors.debitTransactionAmmountColor,
              },
            ]}>
            {total}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  getTransactionPeriodTitle = () => {
    const {overallExpense, monthlyExpense, customExpense} =
      strings.allExpenseCat;
    const {selectedFilter, dateRange} = this.props.route.params;
    let selectedStartDateTimeStamp, selectedEndDateTimeStamp;
    if (dateRange) {
      selectedStartDateTimeStamp = dateRange.start;
      selectedEndDateTimeStamp = dateRange.end;
    }
    switch (selectedFilter) {
      case 'all':
        return overallExpense;
        break;
      case 'month':
        return monthlyExpense;
        break;
      case 'custom':
        const startDate = selectedStartDateTimeStamp
          ? `${selectedStartDateTimeStamp.getDate()} ${months[
              selectedStartDateTimeStamp.getMonth()
            ].toUpperCase()}, ${selectedStartDateTimeStamp.getFullYear()}`
          : '';
        const endDate = selectedEndDateTimeStamp
          ? `${selectedEndDateTimeStamp.getDate()} ${months[
              selectedEndDateTimeStamp.getMonth()
            ].toUpperCase()}, ${selectedEndDateTimeStamp.getFullYear()}`
          : '';
        return customExpense + ': ' + startDate + '-' + endDate;
        break;
    }
  };
  render() {
    const {headerTitle, overallExpense, monthlyExpense, customExpense} =
      strings.allExpenseCat;
    const {totalExpensesByCategoty, customTotalExpensesByCategoty} =
      this.props.appReducer;
    const {selectedFilter} = this.props.route.params;
    return (
      <View style={styles.container}>
        <PrimaryHeader
          onPress={() => this.props.navigation.goBack()}
          title={headerTitle}
          leftImage={images.backArrow}
          rightImage={images.expense}
          rightTintColorDisabled
          rightImageOpacity={1}
        />
        <Text style={styles.transactionPeriodTitle}>
          {this.getTransactionPeriodTitle()}
        </Text>
        <FlatList
          data={
            selectedFilter == 'all'
              ? totalExpensesByCategoty
              : customTotalExpensesByCategoty
          }
          contentContainerStyle={styles.catListContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => this.renderAllCat(item, index)}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllExpenseCat);
