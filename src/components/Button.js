import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { perfectSize, fonts, colors } from '../theme'
export default function Button(props){
    return(
        <TouchableOpacity 
            style={{
                height: perfectSize(56),
                width: perfectSize(300),
                borderRadius: perfectSize(30),
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: colors.buttonBackgroundColor
            }} 
            onPress={props.onPress}>

            <Text 
                style={{
                    fontSize: perfectSize(18),
                    fontFamily: fonts.quicksandBold,
                    color: colors.buttonTextColor
                }}>{props.buttonTitle}</Text>
                
        </TouchableOpacity>
    )
}