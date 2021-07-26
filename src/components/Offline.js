import React from 'react'
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import { colors, fonts, images, perfectSize } from '../theme'
import Button from './Button'

export default function Offline({
    onPress
}) {
    return (
        <View
            style={styles.container}
        >
            <StatusBar
                translucent
                barStyle='dark-content'
                backgroundColor={colors.white}
            />
            <Image 
                source={images.offlineImage}
                style={styles.image}
                resizeMode='contain'
            />
            <Text
                style={styles.title}
            >
                Oops!
            </Text>
            <Text
                style={styles.offlineMessage}
            >
                Your device is offline, Please check your internet settings
            </Text>
            <View style={{marginTop: '5%'}} />
            <Button 
                title='TRY AGAIN'
                onPress={onPress}
                shadow={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    image: {
        height: '50%',
        width: '100%',
    },
    title: {
        padding: '2%',
        fontFamily: fonts.quicksandBold,
        fontSize: perfectSize(35),
        textAlign: 'center',
        fontWeight: 'bold',
    },
    offlineMessage: {
        padding: '5%',
        fontFamily: fonts.avenirMedium,
        fontSize: perfectSize(20),
        textAlign: 'center'
    }
})