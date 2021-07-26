import {combineReducers} from 'redux';

//Screens
import Home from './Home';
import Launch from './Launch';
import Login from './Login';
import Signup from './Signup';
import Statistics from './Statistics';
import Goal from './Goal';
import Account from './Account';
import AddExpense from './AddExpense';

//Reducers
import signupReducer from './Signup/reducer';
import loginReducer from './Login/reducer';

export {Home, Statistics, Launch, Login, Signup, Goal, Account, AddExpense};

export const rootReducer = combineReducers({
  signupReducer,
  loginReducer,
});
