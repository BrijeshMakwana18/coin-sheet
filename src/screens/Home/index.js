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
} from './actions';

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUserData,
      setUserIncome,
      setUserExpenses,
      setTotalIncome,
      setTotalExpenses,
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

  componentDidMount() {
    this.getCurrentUserData();
  }

  componentWillUnmount() {
    //Removing snapshot listener
    this.userExpenses();
    this.userIncome();
  }

  render() {
    const {totalExpenses, totalIncome} = this.props.appReducer;
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={colors.backgroundColor}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <Text onPress={() => console.log(this.props.appReducer)}>
            {totalIncome}
          </Text>
          <Text onPress={() => console.log(this.props.appReducer)}>
            {totalExpenses}
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
