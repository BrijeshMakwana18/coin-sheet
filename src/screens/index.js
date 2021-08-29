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

//Reducers
import signupReducer from './Signup/reducer';
import loginReducer from './Login/reducer';

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
};

export const rootReducer = combineReducers({
  signupReducer,
  loginReducer,
});
