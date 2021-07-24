import React, {
  useEffect
} from 'react';
import Routes from './src/routes'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux';
import { 
  createStore, 
  applyMiddleware 
} from 'redux'
import thunkMiddleWare from 'redux-thunk'
import { rootReducer } from './src/screens'

const middleware = applyMiddleware(thunkMiddleWare)
const store = createStore(rootReducer,middleware)

export default function App() {
  
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}
