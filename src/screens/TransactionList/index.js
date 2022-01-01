import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  DeviceEventEmitter,
} from 'react-native';
import {PrimaryHeader} from '../../components';
import {strings, images, colors, perfectSize} from '../../theme';
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
      hasDebitTransactions: false,
      hasCreditTransactions: false,
    };
  }

  componentDidMount() {
    DeviceEventEmitter.emit('HideTabBar', true);
    const {isFromExpenseCat} = this.props.route.params;
    let allTransactions = this.getListData();
    console.log(allTransactions.length);
    if (!isFromExpenseCat && allTransactions) {
      for (let i = 0; i < allTransactions?.length; i++) {
        if (allTransactions[i].type == 'debit') {
          this.setState({
            hasDebitTransactions: true,
          });
          console.log('debit is there');
          break;
        }
      }
      for (let i = 0; i < allTransactions?.length; i++) {
        if (allTransactions[i].type == 'credit') {
          this.setState({
            hasCreditTransactions: true,
          });
          console.log('credit is there');
          break;
        }
      }
    }
  }

  renderAllTransactions = (item, index) => {
    const {type, selectedCat, displayDate, amount, notes} = item;
    const {selectedFilter} = this.state;
    if (type == selectedFilter) {
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
              source={
                type == 'debit' ? images[selectedCat] : images.incomePlaceholder
              }
              style={styles.transactionImage}
            />
          </View>
          <View style={styles.transactionDetailsContainer}>
            <Text style={styles.transactionNotes}>
              {type == 'debit' ? notes : strings.home.dashboardIncomeTitle}
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
  getDasListVisibility = () => {
    const {isFromExpenseCat} = this.props.route.params;
    if (!isFromExpenseCat) {
      const {selectedFilter, hasCreditTransactions, hasDebitTransactions} =
        this.state;

      if (selectedFilter == 'debit' && hasDebitTransactions) {
        return true;
      } else if (selectedFilter == 'credit' && hasCreditTransactions) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  renderEmptyDashboard = () => {
    const {selectedFilter} = this.state;
    const {emptyCreditList, emptyDebitList} = strings.allTransactions;
    let emptyDashboardImage, emptyDashboardTitle;
    if (selectedFilter == 'debit') {
      emptyDashboardImage = images.emptyDashboardImage;
      emptyDashboardTitle = emptyDebitList;
    } else if (selectedFilter == 'credit') {
      emptyDashboardImage = images.emptyDashboardImage;
      emptyDashboardTitle = emptyCreditList;
    }
    return (
      <View style={{flex: 1}}>
        <Image
          source={emptyDashboardImage}
          style={{
            height: '70%',
            width: '100%',
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            fontSize: perfectSize(18),
            fontFamily: fonts.quicksandBold,
            textAlign: 'center',
            padding: '5%',
            color: colors.primaryLightColor,
          }}>
          {emptyDashboardTitle}
        </Text>
      </View>
    );
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
    const {isFromExpenseCat, allTransactionsFromExpenseCat} =
      this.props.route.params;
    const {selectedFilter} = this.state;
    return (
      <View style={styles.container}>
        <PrimaryHeader
          onPress={() => {
            this.props.navigation.goBack();
            DeviceEventEmitter.emit('HideTabBar', false);
          }}
          title={headerTitle}
          leftImage={images.backArrow}
          rightImage={
            selectedFilter == 'credit' ? images.income : images.expense
          }
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
                    selectedFilter == 'debit'
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
                    selectedFilter == 'credit'
                      ? colors.primary
                      : colors.primaryCardBackgroundColor,
                },
              ]}>
              <Text style={styles.filterButtonTitle}>{filterTwo}</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.getDasListVisibility() ? (
          <FlatList
            data={this.getListData()}
            contentContainerStyle={styles.catListContainer}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) =>
              this.renderAllTransactions(item, index)
            }
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={this.renderEmptyDashboard()}
          />
        ) : (
          this.renderEmptyDashboard()
        )}
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
