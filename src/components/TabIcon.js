import React from 'react'
import { 
    View, 
    Image, 
    Text 
} from 'react-native'
import { 
    colors,
    perfectSize, 
    fonts 
} from '../theme'

export default function TabBarIcon(props) {
    return (
        <View 
            style={{
                height: '100%', 
                alignItems: 'center', 
                justifyContent: 'center',
            }}>
            <Image 
                source={props.source} 
                resizeMode='contain' 
                style={{
                    height: perfectSize(25), 
                    width: perfectSize(25),
                    tintColor: props.focused ? colors.activeTabColor :  colors.inactiveTabColor
                }}/>
            <Text 
                style={{
                    fontSize: perfectSize(10), 
                    marginTop: perfectSize(10), 
                    fontFamily: fonts.avenirMedium, 
                    fontWeight: 'bold', 
                    color: props.focused ? colors.activeTabColor :  colors.inactiveTabColor
                }}>{props.name}
            </Text>
        </View>
    )
}