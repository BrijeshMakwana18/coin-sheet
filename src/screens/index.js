import {combineReducers} from 'redux';

//Screens
import Home from './Home';
import Launch from './Launch';
import Login from './Login';
import Signup from './Signup';
import Statistics from './Statistics';
import Goal from './Goal';
import Account from './Account';
import AddTransaction from './AddTransaction';
import AddExpense from './AddTransaction/AddExpense';
import AddIncome from './AddTransaction/AddIncome';
import AddGoal from './AddTransaction/AddGoal';
import TransactionSuccess from './TransactionSuccess';
import AllExpenseCat from './AllExpenseCat';
//Reducers
import signupReducer from './Signup/reducer';
import loginReducer from './Login/reducer';
import appReducer from './Home/reducer';
export {
  Home,
  Statistics,
  Launch,
  Login,
  Signup,
  Goal,
  Account,
  AddTransaction,
  AddExpense,
  AddIncome,
  AddGoal,
  TransactionSuccess,
  AllExpenseCat,
};

export const rootReducer = combineReducers({
  signupReducer,
  loginReducer,
  appReducer,
});
