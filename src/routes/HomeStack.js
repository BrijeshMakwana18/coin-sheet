import React from 'react'
import { 
  Platform,
} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  Home,
  Statistics,
  Goal,
  Account
} from '../screens'
import {
  TabIcon,
  Add
} from '../components'
import { 
  colors,
  perfectSize,
  strings,
  images
} from '../theme'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const AddItemItem = () => {
  return null
}

export default function HomeStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        lazyLoad: true,
        style: {
          position: 'absolute',
          backgroundColor: '#AAB6FB',
          height: '8%',
          marginBottom: '5%',
          borderRadius: perfectSize(50),
          marginLeft: '5%',
          marginRight: '5%',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 2
        },
      }}
    >
      <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
          tabBarIcon: (props)=> 
          <TabIcon 
            source={images.homeTab} 
            name={strings.tabBarLabels.home} 
            {...props} 
          />
        }} 
      />
      
      <Tab.Screen 
        name='Stat' 
        component={Statistics}
        options={{
          tabBarIcon: (props)=> 
          <TabIcon 
            source={images.statTab} 
            name={strings.tabBarLabels.stat} 
            {...props} 
          />
        }} 
      />

      <Tab.Screen 
        name='Add'
        component={Add}
        options={{
          tabBarButton: (props) => 
            <Add 
              onPress={()=>
                TabActions.jumpTo('Add')}
                {...props}
            />    
        }}
      />

      <Tab.Screen 
        name='Goal' 
        component={Goal}
        options={{
          tabBarIcon: (props)=> 
          <TabIcon 
            source={images.goalTab} 
            name={strings.tabBarLabels.stat} 
            {...props} 
          />
        }} 
      />

      <Tab.Screen 
        name='Account' 
        component={Account}
        options={{
          tabBarIcon: (props)=> 
          <TabIcon 
            source={images.accountTab} 
            name={strings.tabBarLabels.stat} 
            {...props} 
          />
        }} 
      />

    </Tab.Navigator>
  );
}

// import React, {useRef} from 'react'
// import { 
//   Platform,
//   Animated,
//   Dimensions
// } from 'react-native'
// import { createStackNavigator } from '@react-navigation/stack'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import {
//   Home,
//   Statistics,
//   Goal,
//   Account
// } from '../screens'
// import {
//   TabIcon,
//   Add
// } from '../components'
// import { 
//   colors,
//   perfectSize,
//   strings,
//   images
// } from '../theme'

// const Stack = createStackNavigator()
// const Tab = createBottomTabNavigator()

// const AddItemItem = () => {
//   return null
// }

// function getWidth() {
//   let width = Dimensions.get("window").width

//   // Horizontal Padding = 20...
//   width = width - 80

//   // Total five Tabs...
//   return width / 5
// }

// export default function HomeStack() {
//   const tabOffsetValue = useRef(new Animated.Value(0)).current;
//   return (
//     <>
//       <Tab.Navigator
//         tabBarOptions={{
//           showIcon: true,
//           showLabel: false,
//           lazyLoad: true,
//           style: {
//             backgroundColor: 'white',
//             borderTopWidth: 0,
//             position: 'absolute',
//             backgroundColor: 'black',
//             height: perfectSize(Platform.OS == 'android' ? 80 : 85),
//           },
//         }}
//       >
//         <Tab.Screen 
//           name='Home' 
//           component={Home}
//           options={{
//             tabBarIcon: (props)=> 
//             <TabIcon 
//               source={images.homeTab} 
//               name={strings.tabBarLabels.home} 
//               {...props} 
//             />
//           }} 
//           listeners={({ navigation, route }) => ({
//             // Onpress Update....
//             tabPress: e => {
//               Animated.spring(tabOffsetValue, {
//                 toValue: 0,
//                 useNativeDriver: false
//               }).start();
//             }
//           })}
//         />
        
//         <Tab.Screen 
//           name='Stat' 
//           component={Statistics}
//           options={{
//             tabBarIcon: (props)=> 
//             <TabIcon 
//               source={images.statTab} 
//               name={strings.tabBarLabels.stat} 
//               {...props} 
//             />
//           }} 
//           listeners={({ navigation, route }) => ({
//             // Onpress Update....
//             tabPress: e => {
//               Animated.spring(tabOffsetValue, {
//                 toValue: getWidth() * 1.3,
//                 useNativeDriver: false
//               }).start();
//             }
//           })}
//         />

//         <Tab.Screen 
//           name='Add'
//           component={Add}
//           options={{
//             tabBarButton: (props) => 
//               <Add 
//                 onPress={()=>
//                   TabActions.jumpTo('Add')}
//                   {...props}
//               />    
//           }}
//         />

//         <Tab.Screen 
//           name='Goal' 
//           component={Goal}
//           options={{
//             tabBarIcon: (props)=> 
//             <TabIcon 
//               source={images.goalTab} 
//               name={strings.tabBarLabels.stat} 
//               {...props} 
//             />
//           }}
//           listeners={({ navigation, route }) => ({
//             // Onpress Update....
//             tabPress: e => {
//               Animated.spring(tabOffsetValue, {
//                 toValue: getWidth() * 3.69,
//                 useNativeDriver: false
//               }).start();
//             }
//           })}
//         />

//         <Tab.Screen 
//           name='Account' 
//           component={Account}
//           options={{
//             tabBarIcon: (props)=> 
//             <TabIcon 
//               source={images.accountTab} 
//               name={strings.tabBarLabels.stat} 
//               {...props} 
//             />
//           }} 
//           listeners={({ navigation, route }) => ({
//             // Onpress Update....
//             tabPress: e => {
//               Animated.spring(tabOffsetValue, {
//                 toValue: getWidth() * 5,
//                 useNativeDriver: false
//               }).start();
//             }
//           })}
//         />

//       </Tab.Navigator>

//       <Animated.View 
//         style={{
//           width: '10%',
//           height: 2,
//           backgroundColor: colors.buttonBackgroundColor,
//           position: 'absolute',
//           bottom: perfectSize(Platform.OS == 'android' ? 80 : 85),
//           left: '5.5%',
//           borderRadius: 20,
//           transform: [
//             { translateX: tabOffsetValue }
//           ]
//         }}
//       >

//       </Animated.View>
//     </>
//   );
// }