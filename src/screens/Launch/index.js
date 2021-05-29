import React from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    StatusBar, 
    Image 
} from 'react-native'
import { 
    images, 
    perfectSize, 
    colors, 
    fonts, 
    strings 
} from '../../theme'
import {
    Button
} from '../../components'
export default function Launch({ navigation }) {
    return (
        <View 
            style={styles.container}
        >

            <StatusBar 
                backgroundColor={colors.backgroundColor} 
                barStyle='dark-content' />

            <Image
                source={images.launchScreenLogo} 
                style={styles.images}
                resizeMode='contain' />

            <Text 
                style={styles.title}
            >
                {strings.launchScreen.title}
            </Text>

            <Text 
                style={styles.subTitle}
            >
                {strings.launchScreen.subTitle}
            </Text>
            
            <View style={styles.bottomView}>

                <Button 
                    buttonTitle={strings.launchScreen.signupTitle}
                    onPress={()=>navigation.navigate('Signup')} />

                <Text 
                    onPress={()=>navigation.navigate('Login')} 
                    style={styles.loginButton}
                >
                    {strings.launchScreen.loginTitle}
                </Text>
           
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        alignItems: 'center'
    },
    images: {
        marginTop: '10%',
        height: '35%',
        width: '100%',
    },
    title: {
        color: colors.textColor,
        fontSize: perfectSize(32),
        textAlign: 'center',
        fontFamily: fonts.quicksandBold,
        marginTop: '5%'
    },
    subTitle: {
        marginTop: '5%',
        color: colors.textColor,
        fontSize: perfectSize(23),
        textAlign: 'center',
        fontFamily: fonts.quicksandBold,
        opacity: 0.5
    },
    bottomView: {
        position: 'absolute',
        bottom: '5%',
        alignSelf: 'center',
    },
    loginButton: {
        color: colors.textColor,
        fontSize: perfectSize(18),
        textAlign: 'center',
        fontFamily: fonts.quicksandBold,
        opacity: 0.5,
        bottom: '3%'
    }
})