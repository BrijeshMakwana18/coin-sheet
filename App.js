import React, {
  useEffect, useState
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
import NetInfo from '@react-native-community/netinfo'
import { Offline } from './src/components';
const middleware = applyMiddleware(thunkMiddleWare)
const store = createStore(rootReducer,middleware)
export default function App() {
  
  const [offlineStatus,setOfflineStatus] = useState(true)
  useEffect(async () => {
    SplashScreen.hide()
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
  }, [])


  const handleTryAgain = () => {
    NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable)
      setOfflineStatus(offline)
    })
  }

  return (
    <>
      {offlineStatus ? (
        <Offline 
          onPress={()=>handleTryAgain()}
        />
      ) : (
        <Provider store={store}>
          <Routes />
        </Provider>
      )}
    </>
  )
}
