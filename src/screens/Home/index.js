/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native';
import {bindActionCreators} from 'redux';
import {colors, perfectSize} from '../../theme';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {setUserData, setUserExpenses, setUserIncome} from './actions';

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {setUserData, setUserExpenses, setUserIncome},
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
    this.state = {
      label: 'test',
    };
  }

  getCurrentUserData = async () => {
    let user = await auth().currentUser;
    this.props.setUserData(user);
    await this.getUserTransactions();
  };

  getUserTransactions = async () => {
    const userId = this.props.appReducer.user.uid;
    this.userExpenses = await firestore()
      .collection('transactions')
      .doc(userId)
      .collection('expenses')
      .onSnapshot(async documentSnapshot => {
        let tempAllExpenses = [];
        documentSnapshot.forEach(async doc => {
          let tempExpense = await doc.data();
          if (!tempAllExpenses.includes(tempExpense)) {
            tempAllExpenses.push(tempExpense);
          }
        });
        await this.props.setUserExpenses(tempAllExpenses);
      });

    this.userExpenses = await firestore()
      .collection('transactions')
      .doc(userId)
      .collection('income')
      .onSnapshot(async documentSnapshot => {
        let tempAllIncome = [];
        documentSnapshot.forEach(doc => {
          let tempIncome = doc.data();
          if (!tempAllIncome.includes(tempIncome)) {
            tempAllIncome.push(tempIncome);
          }
        });
        let totalIncome = this.getTransactionSum(tempAllIncome);
        console.log(totalIncome, 'a');
        await this.props.setUserIncome(tempAllIncome);
      });
  };

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
    this.userExpenses();
    this.userExpenses();
  }

  render() {
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={colors.backgroundColor}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <Text onPress={() => console.log(this.props.appReducer)}>
            {this.state.label}
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
