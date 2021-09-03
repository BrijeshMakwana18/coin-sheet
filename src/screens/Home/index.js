/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native';
import {bindActionCreators} from 'redux';
import {colors, perfectSize} from '../../theme';
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
    let filteredExpenses = {
      food: {
        total: 0,
        data: [],
      },
      cash: {
        total: 0,
        data: [],
      },
      transfer: {
        total: 0,
        data: [],
      },
      entertainment: {
        total: 0,
        data: [],
      },
      fuel: {
        total: 0,
        data: [],
      },
      groceries: {
        total: 0,
        data: [],
      },
      investment: {
        total: 0,
        data: [],
      },
      loans: {
        total: 0,
        data: [],
      },
      medical: {
        total: 0,
        data: [],
      },
      shopping: {
        total: 0,
        data: [],
      },
      travel: {
        total: 0,
        data: [],
      },
      other: {
        total: 0,
        data: [],
      },
    };
    for (let i = 0; i < expenses.length; i++) {
      let tempExpense = expenses[i];
      switch (tempExpense.selectedCat) {
        case 'Food':
          if (!filteredExpenses.food.data.includes(tempExpense)) {
            filteredExpenses.food.data.push(tempExpense);
            filteredExpenses.food.total =
              filteredExpenses.food.total + parseFloat(tempExpense.ammount);
          }
          break;
        case 'Cash':
          if (!filteredExpenses.cash.data.includes(tempExpense)) {
            filteredExpenses.cash.data.push(tempExpense);
            filteredExpenses.cash.total =
              filteredExpenses.cash.total + parseFloat(tempExpense.ammount);
          }
          break;
        case 'Transfer':
          if (!filteredExpenses.transfer.data.includes(tempExpense)) {
            filteredExpenses.transfer.data.push(tempExpense);
            filteredExpenses.transfer.total =
              filteredExpenses.transfer.total + parseFloat(tempExpense.ammount);
          }
          break;
        case 'Entertainment':
          if (!filteredExpenses.entertainment.data.includes(tempExpense)) {
            filteredExpenses.entertainment.data.push(tempExpense);
            filteredExpenses.entertainment.total =
              filteredExpenses.entertainment.total +
              parseFloat(tempExpense.ammount);
          }
          break;
        case 'Fuel':
          if (!filteredExpenses.fuel.data.includes(tempExpense)) {
            filteredExpenses.fuel.data.push(tempExpense);
            filteredExpenses.fuel.total =
              filteredExpenses.fuel.total + parseFloat(tempExpense.ammount);
          }
          break;
        case 'Groceries':
          if (!filteredExpenses.groceries.data.includes(tempExpense)) {
            filteredExpenses.groceries.data.push(tempExpense);
            filteredExpenses.groceries.total =
              filteredExpenses.groceries.total +
              parseFloat(tempExpense.ammount);
          }
          break;
        case 'Investment':
          if (!filteredExpenses.investment.data.includes(tempExpense)) {
            filteredExpenses.investment.data.push(tempExpense);
            filteredExpenses.investment.total =
              filteredExpenses.investment.total +
              parseFloat(tempExpense.ammount);
          }
          break;
        case 'Loans':
          if (!filteredExpenses.loans.data.includes(tempExpense)) {
            filteredExpenses.loans.data.push(tempExpense);
            filteredExpenses.loans.total =
              filteredExpenses.loans.total + parseFloat(tempExpense.ammount);
          }
          break;
        case 'Medical':
          if (!filteredExpenses.medical.data.includes(tempExpense)) {
            filteredExpenses.medical.data.push(tempExpense);
            filteredExpenses.medical.total =
              filteredExpenses.medical.total + parseFloat(tempExpense.ammount);
          }
          break;
        case 'Shopping':
          if (!filteredExpenses.shopping.data.includes(tempExpense)) {
            filteredExpenses.shopping.data.push(tempExpense);
            filteredExpenses.shopping.total =
              filteredExpenses.shopping.total + parseFloat(tempExpense.ammount);
          }
          break;
        case 'Travel':
          if (!filteredExpenses.travel.data.includes(tempExpense)) {
            filteredExpenses.travel.data.push(tempExpense);
            filteredExpenses.travel.total =
              filteredExpenses.travel.total + parseFloat(tempExpense.ammount);
          }
          break;
        case 'Other':
          if (!filteredExpenses.other.data.includes(tempExpense)) {
            filteredExpenses.other.data.push(tempExpense);
            filteredExpenses.other.total =
              filteredExpenses.other.total + parseFloat(tempExpense.ammount);
          }
          break;
        default:
          break;
      }
    }
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
    const {totalExpenses, totalIncome, totalExpensesByCategoty} =
      this.props.appReducer;
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={colors.backgroundColor}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <Text
            style={{
              color: colors.primaryLightColor,
              fontSize: perfectSize(20),
            }}
            onPress={() => console.log(this.props.appReducer)}>
            Income {totalIncome}
          </Text>
          <Text
            style={{
              color: colors.primaryLightColor,
              fontSize: perfectSize(20),
            }}>
            Expenses {totalExpenses}
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
