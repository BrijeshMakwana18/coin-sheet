/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, Text, Platform, StatusBar, Image} from 'react-native';
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
} from './actions';
import styles from './styles';
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUserData,
      setUserIncome,
      setUserExpenses,
      setTotalIncome,
      setTotalExpenses,
      setTotalExpensesByCat,
    },
    dispatch,
  );
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

  //Fetching current user and storing it into store
  getCurrentUserData = async () => {
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
      });
  };

  //To calculate sum of transactions
  getTransactionSum = transactions => {
    let sum = 0;
    for (let i = 0; i < transactions.length; i++) {
      sum = sum + transactions[i].ammount;
    }
    return sum;
  };

  //To calculate sum of different categories expenses and to filter them
  filterExpensesCat = expenses => {
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
      switch (tempExpense.selectedCat) {
        case 'Food':
          let catFood = element => element.category == 'food';
          let indexOfFood = filteredExpenses.findIndex(catFood);
          if (!filteredExpenses[indexOfFood].data.includes(tempExpense)) {
            filteredExpenses[indexOfFood].data.push(tempExpense);
            filteredExpenses[indexOfFood].total =
              filteredExpenses[indexOfFood].total +
              parseFloat(tempExpense.ammount);
          }
          break;
        case 'Cash':
          let catCash = element => element.category == 'cash';
          let indexOfCash = filteredExpenses.findIndex(catCash);
          if (!filteredExpenses[indexOfCash].data.includes(tempExpense)) {
            filteredExpenses[indexOfCash].data.push(tempExpense);
            filteredExpenses[indexOfCash].total =
              filteredExpenses[indexOfCash].total +
              parseFloat(tempExpense.ammount);
          }
          break;
        case 'Transfer':
          let catTransfer = element => element.category == 'transfer';
          let indexOfTransfer = filteredExpenses.findIndex(catTransfer);
          if (!filteredExpenses[indexOfTransfer].data.includes(tempExpense)) {
            filteredExpenses[indexOfTransfer].data.push(tempExpense);
            filteredExpenses[indexOfTransfer].total =
              filteredExpenses[indexOfTransfer].total +
              parseFloat(tempExpense.ammount);
          }
          break;
        case 'Entertainment':
          let catEntertainment = element => element.category == 'entertainment';
          let indexOfEntertainment =
            filteredExpenses.findIndex(catEntertainment);
          if (
            !filteredExpenses[indexOfEntertainment].data.includes(tempExpense)
          ) {
            filteredExpenses[indexOfEntertainment].data.push(tempExpense);
            filteredExpenses[indexOfEntertainment].total =
              filteredExpenses[indexOfEntertainment].total +
              parseFloat(tempExpense.ammount);
          }
          break;
        case 'Fuel':
          let catFuel = element => element.category == 'fuel';
          let indexOfFuel = filteredExpenses.findIndex(catFuel);
          if (!filteredExpenses[indexOfFuel].data.includes(tempExpense)) {
            filteredExpenses[indexOfFuel].data.push(tempExpense);
            filteredExpenses[indexOfFuel].total =
              filteredExpenses[indexOfFuel].total +
              parseFloat(tempExpense.ammount);
          }
          break;
        case 'Groceries':
          let catGroceries = element => element.category == 'groceries';
          let indexOfGroceries = filteredExpenses.findIndex(catGroceries);
          if (!filteredExpenses[indexOfGroceries].data.includes(tempExpense)) {
            filteredExpenses[indexOfGroceries].data.push(tempExpense);
            filteredExpenses[indexOfGroceries].total =
              filteredExpenses[indexOfGroceries].total +
              parseFloat(tempExpense.ammount);
          }
          break;
        case 'Investment':
          let catInvestment = element => element.category == 'investment';
          let indexOfInvestment = filteredExpenses.findIndex(catInvestment);
          if (!filteredExpenses[indexOfInvestment].data.includes(tempExpense)) {
            filteredExpenses[indexOfInvestment].data.push(tempExpense);
            filteredExpenses[indexOfInvestment].total =
              filteredExpenses[indexOfInvestment].total +
              parseFloat(tempExpense.ammount);
          }
          break;
        case 'Loans':
          let catLoans = element => element.category == 'loans';
          let indexOfLoans = filteredExpenses.findIndex(catLoans);
          if (!filteredExpenses[indexOfLoans].data.includes(tempExpense)) {
            filteredExpenses[indexOfLoans].data.push(tempExpense);
            filteredExpenses[indexOfLoans].total =
              filteredExpenses[indexOfLoans].total +
              parseFloat(tempExpense.ammount);
          }
          break;
        case 'Medical':
          let catMedical = element => element.category == 'medical';
          let indexOfMedical = filteredExpenses.findIndex(catMedical);
          if (!filteredExpenses[indexOfMedical].data.includes(tempExpense)) {
            filteredExpenses[indexOfMedical].data.push(tempExpense);
            filteredExpenses[indexOfMedical].total =
              filteredExpenses[indexOfMedical].total +
              parseFloat(tempExpense.ammount);
          }
          break;
        case 'Shopping':
          let catShopping = element => element.category == 'shopping';
          let indexOfShopping = filteredExpenses.findIndex(catShopping);
          if (!filteredExpenses[indexOfShopping].data.includes(tempExpense)) {
            filteredExpenses[indexOfShopping].data.push(tempExpense);
            filteredExpenses[indexOfShopping].total =
              filteredExpenses[indexOfShopping].total +
              parseFloat(tempExpense.ammount);
          }
          break;
        case 'Travel':
          let catTravel = element => element.category == 'travel';
          let indexOfTravel = filteredExpenses.findIndex(catTravel);
          if (!filteredExpenses[indexOfTravel].data.includes(tempExpense)) {
            filteredExpenses[indexOfTravel].data.push(tempExpense);
            filteredExpenses[indexOfTravel].total =
              filteredExpenses[indexOfTravel].total +
              parseFloat(tempExpense.ammount);
          }
          break;
        case 'Other':
          let catOther = element => element.category == 'other';
          let indexOfOther = filteredExpenses.findIndex(catOther);
          if (!filteredExpenses[indexOfOther].data.includes(tempExpense)) {
            filteredExpenses[indexOfOther].data.push(tempExpense);
            filteredExpenses[indexOfOther].total =
              filteredExpenses[indexOfOther].total +
              parseFloat(tempExpense.ammount);
          }
          break;
        default:
          break;
      }
    }
    filteredExpenses.sort((a, b) => (a.total > b.total ? -1 : 1));
    this.props.setTotalExpensesByCat(filteredExpenses);
  };

  componentDidMount() {
    this.getCurrentUserData();
  }

  componentWillUnmount() {
    //Removing snapshot listener
    this.userExpenses();
    this.userIncome();
  }

  render() {
    const {totalExpenses, totalIncome, totalExpensesByCategoty, user} =
      this.props.appReducer;
    const {
      headerTitle,
      dashboardIncomeTitle,
      dashboardExpenseTitle,
      dashboardHeader,
    } = strings.home;
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={colors.backgroundColor}
          barStyle="light-content"
        />
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
          <View style={styles.dashboardContainer}>
            <Text style={styles.dashboardHeader}>{dashboardHeader}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '5%',
              }}>
              <View style={styles.incomeContainer}>
                <View style={styles.arrowContainer}>
                  <Image source={images.downArrow} style={styles.arrow} />
                </View>
                <View>
                  <Text style={styles.dashboardIncomeHeaderStyle}>
                    {dashboardIncomeTitle}
                  </Text>
                  <Text style={styles.dashboardIncomeStyle}>{totalIncome}</Text>
                </View>
              </View>
              <View style={styles.expenseContainer}>
                <View
                  style={[
                    styles.arrowContainer,
                    {backgroundColor: 'rgba(255,179,25,0.2)'},
                  ]}>
                  <Image
                    source={images.upArrow}
                    style={[styles.arrow, {tintColor: 'rgb(255,179,25)'}]}
                  />
                </View>
                <View>
                  <Text style={styles.dashboardExpenseHeaderStyle}>
                    {dashboardExpenseTitle}
                  </Text>
                  <Text style={styles.dashboardExpenseStyle}>
                    {totalExpenses}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
