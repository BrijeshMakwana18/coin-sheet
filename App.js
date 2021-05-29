import React, { useEffect } from 'react'
import Routes from './src/routes'
import SplashScreen from 'react-native-splash-screen'
export default function App() {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <Routes />
  )
}
