/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  Image,
  Modal,
  TouchableOpacity,
  DeviceEventEmitter,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {colors, images, perfectSize, strings} from '../../theme';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  setUserData,
  setUserIncome,
  setUserExpenses,
  setTotalIncome,
  setTotalExpenses,
  setTotalExpensesByCat,
  setAllTransactions,
  setCustomUserIncome,
  setCustomUserExpenses,
  setCustomTotalIncome,
  setCustomTotalExpenses,
  setCustomTotalExpensesByCat,
  setCustomAllTransactions,
} from './actions';
import styles from './styles';
import CalendarPicker from 'react-native-calendar-picker';
import {ButtonWithImage, ErrorSlider} from '../../components';
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUserData,
      setUserIncome,
      setUserExpenses,
      setTotalIncome,
      setTotalExpenses,
      setTotalExpensesByCat,
      setAllTransactions,
      setCustomUserIncome,
      setCustomUserExpenses,
      setCustomTotalIncome,
      setCustomTotalExpenses,
      setCustomTotalExpensesByCat,
      setCustomAllTransactions,
    },
    dispatch,
  );
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
//Custom styles for date picker
const customDayHeaderStylesCallback = () => {
  return {
    textStyle: {
      color: colors.backgroundColor,
      fontSize: perfectSize(16),
      fontFamily: fonts.quicksandBold,
      opacity: 0.4,
    },
  };
};

//Custom styles for date picker
const customDatesStylesCallback = date => {
  let currentDate = new Date();
  let tempDate = new Date(date);
  let a = `${currentDate.getDate()} ${currentDate.getMonth()} ${currentDate.getFullYear()}`;
  let b = `${tempDate.getDate()} ${tempDate.getMonth()} ${tempDate.getFullYear()}`;
  if (a == b) {
    return {
      style: {
        backgroundColor: colors.backgroundColor,
        height: perfectSize(30),
        width: perfectSize(30),
      },
      textStyle: {
        color: colors.primaryLightColor,
      },
    };
  }
};
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoding: true,
      selectedFilter: 'month',
      datePicker: false,
      modalDisplayDate: '',
      modalDate: '',
      selectedStartDateTimeStamp: null,
      selectedEndDateTimeStamp: null,
    };
    this.errorModalTop = new Animated.Value(perfectSize(-500));
  }

  //Fetching current user and storing it into store
  getCurrentUserData = async () => {
    this.setState({
      isLoding: true,
    });
    let user = await auth().currentUser;
    this.props.setUserData(user);
    //To fetch expenses and income from transactions collection
    await this.getUserTransactions();
  };

  getUserTransactions = async () => {
    const userId = this.props.appReducer.user.uid;
    //Fetching all expenses
    this.userExpenses = await firestore()
      .collection('transactions')
      .doc(userId)
      .collection('expenses')
      .onSnapshot(async documentSnapshot => {
        let tempAllExpenses = [];
        //Fetching each document data from expenses collenction
        documentSnapshot.forEach(async doc => {
          let tempExpense = doc.data();
          if (!tempAllExpenses.includes(tempExpense)) {
            tempAllExpenses.push(tempExpense);
          }
        });
        //Sum of all expenses
        let totalExpense = this.getTransactionSum(tempAllExpenses);
        //Storing values into store
        this.props.setUserExpenses(tempAllExpenses);
        this.props.setTotalExpenses(totalExpense);
        this.filterExpensesCat(tempAllExpenses);
        await this.generateAllTransactions();
      });
    //Fetching all income
    this.userIncome = await firestore()
      .collection('transactions')
      .doc(userId)
      .collection('income')
      .onSnapshot(async documentSnapshot => {
        let tempAllIncome = [];
        //Fetching each document data from income collenction
        documentSnapshot.forEach(doc => {
          let tempIncome = doc.data();
          if (!tempAllIncome.includes(tempIncome)) {
            tempAllIncome.push(tempIncome);
          }
        });
        //Sum of all income
        let totalIncome = this.getTransactionSum(tempAllIncome);
        //Storing income into store
        this.props.setUserIncome(tempAllIncome);
        this.props.setTotalIncome(totalIncome);
        this.generateAllTransactions();
      });
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.getCustomTransactions(firstDay, lastDay);
  };

  getCustomTransactions = async (startDate, endDate) => {
    const userId = this.props.appReducer.user.uid;
    //Fetching all expenses
    this.customExpenses = await firestore()
      .collection('transactions')
      .doc(userId)
      .collection('expenses')
      .where('transactionDate', '>=', startDate)
      .where('transactionDate', '<=', endDate)
      .onSnapshot(async documentSnapshot => {
        let tempAllExpenses = [];
        //Fetching each document data from expenses collenction
        documentSnapshot.forEach(async doc => {
          let tempExpense = doc.data();
          if (!tempAllExpenses.includes(tempExpense)) {
            tempAllExpenses.push(tempExpense);
          }
        });
        //Sum of all expenses
        let totalExpense = this.getTransactionSum(tempAllExpenses);
        //Storing values into store
        this.props.setCustomUserExpenses(tempAllExpenses);
        this.props.setCustomTotalExpenses(totalExpense);
        this.filterExpensesCat(tempAllExpenses, true);
        await this.generateAllTransactions(true);
      });
    //Fetching all income
    this.customIncome = await firestore()
      .collection('transactions')
      .doc(userId)
      .collection('income')
      .where('transactionDate', '>=', startDate)
      .where('transactionDate', '<=', endDate)
      .onSnapshot(async documentSnapshot => {
        let tempAllIncome = [];
        //Fetching each document data from income collenction
        documentSnapshot.forEach(doc => {
          let tempIncome = doc.data();
          if (!tempAllIncome.includes(tempIncome)) {
            tempAllIncome.push(tempIncome);
          }
        });
        //Sum of all income
        let totalIncome = this.getTransactionSum(tempAllIncome);
        //Storing income into store
        this.props.setCustomUserIncome(tempAllIncome);
        this.props.setCustomTotalIncome(totalIncome);
        this.generateAllTransactions(true);
      });
  };

  //To create an array of all transactions
  generateAllTransactions = isCustom => {
    let {allExpenses, allIncome, customAllIncome, customAllExpenses} =
      this.props.appReducer;
    let allCreditTransactions = isCustom ? customAllIncome : allIncome;
    let allDebitTransactions = isCustom ? customAllExpenses : allExpenses;
    let allTransactions = allCreditTransactions.concat(allDebitTransactions);
    allTransactions.sort((a, b) =>
      a.transactionDate > b.transactionDate ? -1 : 1,
    );
    isCustom
      ? this.props.setCustomAllTransactions(allTransactions)
      : this.props.setAllTransactions(allTransactions);
    this.setState({
      isLoding: false,
    });
  };

  //To calculate sum of transactions
  getTransactionSum = transactions => {
    let sum = 0;
    for (let i = 0; i < transactions.length; i++) {
      sum = sum + transactions[i].amount;
    }
    return sum;
  };

  //To calculate sum of different categories expenses and to filter them
  filterExpensesCat = (expenses, isFromCustom) => {
    let filteredExpenses = [
      {
        category: 'food',
        total: 0,
        data: [],
      },
      {
        category: 'cash',
        total: 0,
        data: [],
      },
      {
        category: 'transfer',
        total: 0,
        data: [],
      },
      {
        category: 'entertainment',
        total: 0,
        data: [],
      },
      {
        category: 'fuel',
        total: 0,
        data: [],
      },
      {
        category: 'groceries',
        total: 0,
        data: [],
      },
      {
        category: 'investment',
        total: 0,
        data: [],
      },
      {
        category: 'loans',
        total: 0,
        data: [],
      },
      {
        category: 'medical',
        total: 0,
        data: [],
      },
      {
        category: 'shopping',
        total: 0,
        data: [],
      },
      {
        category: 'travel',
        total: 0,
        data: [],
      },
      {
        category: 'other',
        total: 0,
        data: [],
      },
    ];
    for (let i = 0; i < expenses.length; i++) {
      let tempExpense = expenses[i];
      switch (tempExpense.selectedCat.toLowerCase()) {
        case 'food':
          let catFood = element => element.category == 'food';
          let indexOfFood = filteredExpenses.findIndex(catFood);
          if (!filteredExpenses[indexOfFood].data.includes(tempExpense)) {
            filteredExpenses[indexOfFood].data.push(tempExpense);
            filteredExpenses[indexOfFood].total =
              filteredExpenses[indexOfFood].total +
              parseFloat(tempExpense.amount);
          }
          break;
        case 'cash':
          let catCash = element => element.category == 'cash';
          let indexOfCash = filteredExpenses.findIndex(catCash);
          if (!filteredExpenses[indexOfCash].data.includes(tempExpense)) {
            filteredExpenses[indexOfCash].data.push(tempExpense);
            filteredExpenses[indexOfCash].total =
              filteredExpenses[indexOfCash].total +
              parseFloat(tempExpense.amount);
          }
          break;
        case 'transfer':
          let catTransfer = element => element.category == 'transfer';
          let indexOfTransfer = filteredExpenses.findIndex(catTransfer);
          if (!filteredExpenses[indexOfTransfer].data.includes(tempExpense)) {
            filteredExpenses[indexOfTransfer].data.push(tempExpense);
            filteredExpenses[indexOfTransfer].total =
              filteredExpenses[indexOfTransfer].total +
              parseFloat(tempExpense.amount);
          }
          break;
        case 'entertainment':
          let catEntertainment = element => element.category == 'entertainment';
          let indexOfEntertainment =
            filteredExpenses.findIndex(catEntertainment);
          if (
            !filteredExpenses[indexOfEntertainment].data.includes(tempExpense)
          ) {
            filteredExpenses[indexOfEntertainment].data.push(tempExpense);
            filteredExpenses[indexOfEntertainment].total =
              filteredExpenses[indexOfEntertainment].total +
              parseFloat(tempExpense.amount);
          }
          break;
        case 'fuel':
          let catFuel = element => element.category == 'fuel';
          let indexOfFuel = filteredExpenses.findIndex(catFuel);
          if (!filteredExpenses[indexOfFuel].data.includes(tempExpense)) {
            filteredExpenses[indexOfFuel].data.push(tempExpense);
            filteredExpenses[indexOfFuel].total =
              filteredExpenses[indexOfFuel].total +
              parseFloat(tempExpense.amount);
          }
          break;
        case 'groceries':
          let catGroceries = element => element.category == 'groceries';
          let indexOfGroceries = filteredExpenses.findIndex(catGroceries);
          if (!filteredExpenses[indexOfGroceries].data.includes(tempExpense)) {
            filteredExpenses[indexOfGroceries].data.push(tempExpense);
            filteredExpenses[indexOfGroceries].total =
              filteredExpenses[indexOfGroceries].total +
              parseFloat(tempExpense.amount);
          }
          break;
        case 'investment':
          let catInvestment = element => element.category == 'investment';
          let indexOfInvestment = filteredExpenses.findIndex(catInvestment);
          if (!filteredExpenses[indexOfInvestment].data.includes(tempExpense)) {
            filteredExpenses[indexOfInvestment].data.push(tempExpense);
            filteredExpenses[indexOfInvestment].total =
              filteredExpenses[indexOfInvestment].total +
              parseFloat(tempExpense.amount);
          }
          break;
        case 'loans':
          let catLoans = element => element.category == 'loans';
          let indexOfLoans = filteredExpenses.findIndex(catLoans);
          if (!filteredExpenses[indexOfLoans].data.includes(tempExpense)) {
            filteredExpenses[indexOfLoans].data.push(tempExpense);
            filteredExpenses[indexOfLoans].total =
              filteredExpenses[indexOfLoans].total +
              parseFloat(tempExpense.amount);
          }
          break;
        case 'medical':
          let catMedical = element => element.category == 'medical';
          let indexOfMedical = filteredExpenses.findIndex(catMedical);
          if (!filteredExpenses[indexOfMedical].data.includes(tempExpense)) {
            filteredExpenses[indexOfMedical].data.push(tempExpense);
            filteredExpenses[indexOfMedical].total =
              filteredExpenses[indexOfMedical].total +
              parseFloat(tempExpense.amount);
          }
          break;
        case 'shopping':
          let catShopping = element => element.category == 'shopping';
          let indexOfShopping = filteredExpenses.findIndex(catShopping);
          if (!filteredExpenses[indexOfShopping].data.includes(tempExpense)) {
            filteredExpenses[indexOfShopping].data.push(tempExpense);
            filteredExpenses[indexOfShopping].total =
              filteredExpenses[indexOfShopping].total +
              parseFloat(tempExpense.amount);
          }
          break;
        case 'travel':
          let catTravel = element => element.category == 'travel';
          let indexOfTravel = filteredExpenses.findIndex(catTravel);
          if (!filteredExpenses[indexOfTravel].data.includes(tempExpense)) {
            filteredExpenses[indexOfTravel].data.push(tempExpense);
            filteredExpenses[indexOfTravel].total =
              filteredExpenses[indexOfTravel].total +
              parseFloat(tempExpense.amount);
          }
          break;
        case 'other':
          let catOther = element => element.category == 'other';
          let indexOfOther = filteredExpenses.findIndex(catOther);
          if (!filteredExpenses[indexOfOther].data.includes(tempExpense)) {
            filteredExpenses[indexOfOther].data.push(tempExpense);
            filteredExpenses[indexOfOther].total =
              filteredExpenses[indexOfOther].total +
              parseFloat(tempExpense.amount);
          }
          break;
        default:
          break;
      }
    }
    filteredExpenses.sort((a, b) => (a.total > b.total ? -1 : 1));
    isFromCustom
      ? this.props.setCustomTotalExpensesByCat(filteredExpenses)
      : this.props.setTotalExpensesByCat(filteredExpenses);
  };

  componentDidMount() {
    this.getCurrentUserData();
  }

  componentWillUnmount() {
    //Removing snapshot listener
    this.userExpenses();
    this.userIncome();
    this.customExpenses();
    this.customIncome();
  }
  onScroll = event => {
    let offset = 0;
    var currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset > offset) {
      this.props.navigation.dangerouslyGetParent().setOptions({
        tabBarVisible: false,
      });
      DeviceEventEmitter.emit('HideTabBar', true);
    } else {
      DeviceEventEmitter.emit('HideTabBar', false);
      this.props.navigation.dangerouslyGetParent().setOptions({
        tabBarVisible: true,
      });
    }
    offset = currentOffset;
  };
  renderTopCategories = (item, index) => {
    const {
      selectedStartDateTimeStamp,
      selectedEndDateTimeStamp,
      selectedFilter,
    } = this.state;
    if (item && item.total && (item.total == 0 || index > 3)) {
      return null;
    } else {
      if (index < 3) {
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('TransactionList', {
                selectedExpenseCat: item.category,
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
                backgroundColor:
                  colors.topCatIndexColors[index].backgroundColor,
                marginTop: index <= 1 ? '5%' : 0,
              },
            ]}>
            <View
              style={[
                styles.catImageContainer,
                {
                  backgroundColor: colors.topCatIndexColors[index].tintColor,
                },
              ]}>
              <Image source={images[item.category]} style={styles.catImage} />
            </View>
            <Text numberOfLines={1} style={styles.catTitle}>
              {item.category.toUpperCase()}
            </Text>
            <Text numberOfLines={1} style={styles.catTotalExpense}>
              {item.total}
            </Text>
          </TouchableOpacity>
        );
      } else if (index == 3) {
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('AllExpenseCat', {
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
                backgroundColor:
                  colors.topCatIndexColors[index].backgroundColor,
              },
            ]}>
            <View
              style={[
                styles.catImageContainer,
                {
                  backgroundColor: colors.topCatIndexColors[index].tintColor,
                },
              ]}>
              <Image source={images.rightArrow} style={styles.catImage} />
            </View>
            <Text numberOfLines={1} style={styles.catTitle}>
              {strings.home.seeAll}
            </Text>
          </TouchableOpacity>
        );
      }
    }
  };

  renderRecentTransactions = (item, index) => {
    if (item && item.type && index < 4) {
      return (
        <TouchableOpacity
          style={[
            styles.recentTransactionsContainer,
            {
              backgroundColor:
                item.type == 'debit'
                  ? colors.recentTransactionsIndexColor[index].backgroundColor
                  : colors.creditTransactionBackgroundColor,
            },
          ]}>
          <View
            style={[
              styles.recentTransactionsImageContainer,
              {
                backgroundColor:
                  item.type == 'debit'
                    ? colors.recentTransactionsIndexColor[index].tintColor
                    : colors.creditTransactionTintColor,
              },
            ]}>
            <Image
              source={
                item.type == 'debit'
                  ? images[item.selectedCat]
                  : images.downArrow
              }
              style={styles.recentTransactionsImage}
            />
          </View>
          <View style={styles.recentTransactionsDetailsContainer}>
            <Text style={styles.recentTransactionsTitle}>
              {item.type == 'debit'
                ? item.payee
                : strings.home.dashboardIncomeTitle}
            </Text>
            <Text style={styles.recentTransactionsDate}>
              {item.displayDate}
            </Text>
          </View>
          <Text
            style={[
              styles.recentTransactionsAmount,
              {
                color:
                  item.type == 'debit'
                    ? colors.debitTransactionAmmountColor
                    : colors.creditTransactionAmmountColor,
              },
            ]}>
            {item.type == 'debit' ? '-' : '+'}
            {item.amount}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  checkTotalExpensesByCat = () => {
    const {selectedFilter} = this.state;
    const {totalExpensesByCategoty, customTotalExpensesByCategoty} =
      this.props.appReducer;
    if (selectedFilter == 'all') {
      if (
        totalExpensesByCategoty.length > 0 &&
        totalExpensesByCategoty[0].total > 0
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        customTotalExpensesByCategoty.length > 0 &&
        customTotalExpensesByCategoty[0].total > 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  getTotalExpensesByCat = index => {
    const {selectedFilter} = this.state;
    const {totalExpensesByCategoty, customTotalExpensesByCategoty} =
      this.props.appReducer;
    if (selectedFilter == 'all') {
      if (totalExpensesByCategoty[index].total > 0) {
        return this.renderTopCategories(totalExpensesByCategoty[index], index);
      }
    } else {
      if (customTotalExpensesByCategoty[index].total > 0) {
        return this.renderTopCategories(
          customTotalExpensesByCategoty[index],
          index,
        );
      }
    }
  };
  checkRecentTransactions = () => {
    const {selectedFilter} = this.state;
    const {customAllTransactions, allTransactions} = this.props.appReducer;
    if (selectedFilter == 'all') {
      if (allTransactions.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      if (customAllTransactions.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  };
  getRecentTransactions = index => {
    const {selectedFilter} = this.state;
    const {customAllTransactions, allTransactions} = this.props.appReducer;
    if (selectedFilter == 'all') {
      if (allTransactions.length > index) {
        return this.renderRecentTransactions(allTransactions[index], index);
      }
    } else {
      if (customAllTransactions.length > index) {
        return this.renderRecentTransactions(
          customAllTransactions[index],
          index,
        );
      }
    }
  };
  onDateChange = (date, type) => {
    if (date != null) {
      date = new Date(date);
    }
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDateTimeStamp: date,
      });
    } else {
      this.setState({
        selectedStartDateTimeStamp: date,
        selectedEndDateTimeStamp: null,
      });
    }
  };
  handleDateSubmit = () => {
    const {selectedStartDateTimeStamp, selectedEndDateTimeStamp} = this.state;
    if (
      selectedStartDateTimeStamp == null ||
      selectedEndDateTimeStamp == null
    ) {
      this.showError();
    } else {
      this.getCustomTransactions(
        selectedStartDateTimeStamp,
        selectedEndDateTimeStamp,
      );
      this.setState({datePicker: false});
    }
  };
  showError = () => {
    Animated.timing(this.errorModalTop, {
      toValue: Platform.OS == 'ios' ? perfectSize(50) : perfectSize(40),
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.elastic(Platform.OS == 'android' ? 1 : 1),
    }).start();
    setTimeout(() => {
      Animated.timing(this.errorModalTop, {
        toValue: -perfectSize(500),
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 2000);
  };
  render() {
    const {
      user,
      totalExpenses,
      totalIncome,
      totalExpensesByCategoty,
      allTransactions,
      customTotalIncome,
      customTotalExpenses,
      customTotalExpensesByCategoty,
      customAllTransactions,
    } = this.props.appReducer;
    const {
      headerTitle,
      dashboardIncomeTitle,
      dashboardExpenseTitle,
      dashboardHeader,
      topCatHeader,
      recentTransactionsHeader,
      filterOne,
      filterTwo,
      filterThree,
      seeAllTransactions,
    } = strings.home;
    const {selectedFilter} = this.state;
    const {selectedStartDateTimeStamp, selectedEndDateTimeStamp} = this.state;
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
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={colors.backgroundColor}
          barStyle="light-content"
        />
        {this.state.isLoding ? (
          <View
            style={{
              flex: 1,
              backgroundColor: 'green',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Skeleton Here</Text>
          </View>
        ) : (
          <View
            style={[
              styles.container,
              {
                paddingTop: perfectSize(Platform.OS == 'ios' ? 56 : 40),
              },
            ]}>
            <View style={styles.headerContainer}>
              <View style={styles.headerTitleContainer}>
                <Text
                  onPress={() => console.log(this.props.appReducer)}
                  style={styles.headerTitle}>
                  {headerTitle}Brijesh
                  {/* {user.displayName ? user.displayName : user.email} */}
                </Text>
              </View>
            </View>
            <View style={styles.filterContainer}>
              <View style={styles.filterInnerContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.customExpenses();
                    this.customIncome();
                    this.setState({
                      selectedFilter: 'all',
                      selectedStartDateTimeStamp: null,
                      selectedEndDateTimeStamp: null,
                    });
                  }}
                  style={[
                    styles.filterButtonContainer,
                    {
                      backgroundColor:
                        this.state.selectedFilter == 'all'
                          ? colors.primary
                          : colors.primaryCardBackgroundColor,
                    },
                  ]}>
                  <Text style={styles.filterButtonTitle}>{filterOne}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    let date = new Date();
                    let firstDay = new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      1,
                    );
                    let lastDay = new Date(
                      date.getFullYear(),
                      date.getMonth() + 1,
                      0,
                    );
                    this.setState({
                      selectedFilter: 'month',
                      selectedStartDateTimeStamp: null,
                      selectedEndDateTimeStamp: null,
                    });
                    this.getCustomTransactions(firstDay, lastDay);
                  }}
                  style={[
                    styles.filterButtonContainer,
                    {
                      backgroundColor:
                        this.state.selectedFilter == 'month'
                          ? colors.primary
                          : colors.primaryCardBackgroundColor,
                    },
                  ]}>
                  <Text style={styles.filterButtonTitle}>{filterTwo}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({selectedFilter: 'custom', datePicker: true});
                  }}
                  style={[
                    styles.filterButtonContainer,
                    {
                      backgroundColor:
                        this.state.selectedFilter == 'custom'
                          ? colors.primary
                          : colors.primaryCardBackgroundColor,
                    },
                  ]}>
                  <Text style={styles.filterButtonTitle}>{filterThree}</Text>
                </TouchableOpacity>
              </View>
              {selectedFilter == 'custom' && (
                <Text
                  style={styles.dateLabel}
                  onPress={() => this.setState({datePicker: true})}>
                  {startDate} To {endDate}
                </Text>
              )}
            </View>
            <ScrollView
              // onScroll={this.onScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              style={styles.scrollContainer}>
              <View style={styles.dashboardContainer}>
                <Text style={styles.dashboardHeader}>{dashboardHeader}</Text>
                <View style={styles.dashboardInnerContainer}>
                  <View style={styles.incomeContainer}>
                    <View style={styles.downArrowContainer}>
                      <Image
                        source={images.downArrow}
                        style={styles.downArrow}
                      />
                    </View>
                    <View>
                      <Text style={styles.dashboardIncomeHeaderStyle}>
                        {dashboardIncomeTitle}
                      </Text>
                      <Text style={styles.dashboardIncomeStyle}>
                        {selectedFilter == 'all'
                          ? totalIncome
                          : customTotalIncome}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.expenseContainer}>
                    <View style={styles.upArrowContainer}>
                      <Image source={images.upArrow} style={styles.upArrow} />
                    </View>
                    <View>
                      <Text style={styles.dashboardExpenseHeaderStyle}>
                        {dashboardExpenseTitle}
                      </Text>
                      <Text style={styles.dashboardExpenseStyle}>
                        {selectedFilter == 'all'
                          ? totalExpenses
                          : customTotalExpenses}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {this.checkTotalExpensesByCat() && (
                <View style={styles.topCatContainer}>
                  <Text style={styles.topCatHeader}>{topCatHeader}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {this.getTotalExpensesByCat(0)}
                    {this.getTotalExpensesByCat(1)}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: '3.33%',
                      justifyContent: 'space-between',
                    }}>
                    {this.getTotalExpensesByCat(2)}
                    {this.getTotalExpensesByCat(3)}
                  </View>
                </View>
              )}
              {this.checkRecentTransactions() && (
                <View style={styles.recentTransactionsListContainer}>
                  <Text style={styles.recentTransactionsHeader}>
                    {recentTransactionsHeader}
                  </Text>
                  {this.getRecentTransactions(0)}
                  {this.getRecentTransactions(1)}
                  {this.getRecentTransactions(2)}
                  {this.getRecentTransactions(3)}
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('TransactionList', {
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
                    style={styles.seeAllTransactions}>
                    <Text style={styles.seeAllTransactionsLabel}>
                      {seeAllTransactions}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        )}
        <Modal
          visible={this.state.datePicker}
          style={styles.modal}
          transparent
          animationType="fade">
          <View style={styles.modalViewContainer}>
            <View style={styles.datePickerContainer}>
              <View style={styles.datePickerHeaderContainer}>
                <Text style={styles.datePickerHeaderLabel}>
                  {startDate}
                  {'\n'}To{'\n'}
                  {endDate}
                </Text>
              </View>
              <CalendarPicker
                disabledDatesTextStyle={styles.disabledDatesTextStyle}
                selectedDayStyle={styles.selectedDayStyle}
                todayTextStyle={styles.todayTextStyle}
                todayBackgroundColor={colors.primary}
                textStyle={styles.textStyle}
                allowRangeSelection
                allowBackwardRangeSelect
                selectedDayTextColor={colors.primary}
                monthYearHeaderWrapperStyle={styles.monthYearHeaderWrapperStyle}
                yearTitleStyle={styles.yearTitleStyle}
                monthTitleStyle={styles.monthTitleStyle}
                dayLabelsWrapper={styles.dayLabelsWrapper}
                customDayHeaderStyles={customDayHeaderStylesCallback}
                customDatesStyles={customDatesStylesCallback}
                dayShape="circle"
                onDateChange={this.onDateChange}
                width={perfectSize(320)}
                weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
                showDayStragglers
                selectedDayColor={colors.primaryLightColor}
                maxDate={new Date()}
                previousComponent={
                  <Image
                    source={images.leftArrow}
                    style={styles.previousComponent}
                  />
                }
                nextComponent={
                  <Image
                    source={images.rightArrow}
                    style={styles.nextComponent}
                  />
                }
              />
              <View style={styles.bottomViewContainer}>
                <ButtonWithImage
                  onPress={() => this.handleDateSubmit()}
                  image={images.check}
                />
              </View>
            </View>
          </View>
          <ErrorSlider
            error="Please select date range"
            top={this.errorModalTop}
          />
        </Modal>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
