import React, { useEffect } from 'react'
import LaunchScreen from './src/screens/LaunchScreen'
import SplashScreen from 'react-native-splash-screen'
export default function App() {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <LaunchScreen />
  )
}
