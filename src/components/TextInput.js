import React from 'react'
import { TextInput } from 'react-native'
import { colors, fonts, perfectSize } from '../theme'
export default function Input(props) {
    return (
        <TextInput 
            style={{
                padding: perfectSize(20), 
                height: perfectSize(70), 
                width: '100%', 
                backgroundColor: 'rgba(0,0,0,0.04)', 
                borderRadius: perfectSize(12),
                fontSize: perfectSize(23),
                fontFamily: fonts.quicksandBold,
                marginTop: props.marginTop,
                color: colors.white
            }}
            placeholder={props.placeholder}
            placeholderTextColor='rgba(66,76,89,0.5)'
            selectionColor='#8389E9'
            autoCapitalize='none'
            {...props}
        />
    )
}
