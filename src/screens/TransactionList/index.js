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
class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: 'debit',
    };
  }

  componentDidMount() {}

  renderAllTransactions = (item, index) => {
    const {type, selectedCat, payee, displayDate, amount} = item;
    if (type == this.state.selectedFilter) {
      return (
        <TouchableOpacity
          style={[
            styles.transactionContainer,
            {
              backgroundColor:
                type == 'debit'
                  ? colors.expenseCatColor[selectedCat].backgroundColor
                  : colors.creditTransactionBackgroundColor,
            },
          ]}>
          <View style={styles.transactionImageContainer}>
            <Image
              source={type == 'debit' ? images[selectedCat] : images.downArrow}
              style={styles.transactionImage}
            />
          </View>
          <View style={styles.transactionDetailsContainer}>
            <Text style={styles.transactionPayee}>
              {type == 'debit' ? payee : strings.home.dashboardIncomeTitle}
            </Text>
            <Text style={styles.transactionDate}>{displayDate}</Text>
          </View>
          <Text
            style={[
              styles.transactionAmount,
              {
                color:
                  type == 'debit'
                    ? colors.debitTransactionAmmountColor
                    : colors.creditTransactionAmmountColor,
              },
            ]}>
            {type == 'debit' ? '-' : '+'}
            {amount}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  getTransactionPeriodTitle = () => {
    const {overallExpense, monthlyExpense, customExpense} =
      strings.allTransactions;
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

  getListData = () => {
    const {selectedFilter, isFromExpenseCat, selectedExpenseCat} =
      this.props.route.params;
    const {totalExpensesByCategoty, customTotalExpensesByCategoty} =
      this.props.appReducer;
    const {customAllTransactions, allTransactions} = this.props.appReducer;
    if (isFromExpenseCat) {
      if (selectedFilter == 'all') {
        return totalExpensesByCategoty.find(
          element => element.category == selectedExpenseCat,
        ).data;
      } else {
        return customTotalExpensesByCategoty.find(
          element => element.category == selectedExpenseCat,
        ).data;
      }
    } else {
      if (selectedFilter == 'all') {
        return allTransactions;
      } else {
        return customAllTransactions;
      }
    }
  };
  render() {
    const {
      headerTitle,
      overallExpense,
      monthlyExpense,
      customExpense,
      filterOne,
      filterTwo,
    } = strings.allTransactions;
    const {customAllTransactions, allTransactions} = this.props.appReducer;
    const {selectedFilter, isFromExpenseCat, allTransactionsFromExpenseCat} =
      this.props.route.params;
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
        {!isFromExpenseCat && (
          <View style={styles.filterContainer}>
            <TouchableOpacity
              onPress={() => this.setState({selectedFilter: 'debit'})}
              style={[
                styles.filterButtonContainer,
                {
                  backgroundColor:
                    this.state.selectedFilter == 'debit'
                      ? colors.primary
                      : colors.primaryCardBackgroundColor,
                },
              ]}>
              <Text style={styles.filterButtonTitle}>{filterOne}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({selectedFilter: 'credit'})}
              style={[
                styles.filterButtonContainer,
                {
                  backgroundColor:
                    this.state.selectedFilter == 'credit'
                      ? colors.primary
                      : colors.primaryCardBackgroundColor,
                },
              ]}>
              <Text style={styles.filterButtonTitle}>{filterTwo}</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={this.getListData()}
          contentContainerStyle={styles.catListContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) =>
            this.renderAllTransactions(item, index)
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
