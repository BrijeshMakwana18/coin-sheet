import 
    React,{
    useRef,
    useEffect
} from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    StatusBar, 
    Image,
    Animated 
} from 'react-native'
import { 
    images, 
    perfectSize, 
    colors, 
    fonts, 
    strings 
} from '../../theme'
import {
    Button,
    BouncingComponent
} from '../../components'
export default function Launch({ navigation }) {
    const slideAnimation = useRef(new Animated.Value(perfectSize(150))).current
    const height = useRef(new Animated.Value(perfectSize(400))).current
    const width = useRef(new Animated.Value(perfectSize(400))).current
    const opacity = useRef(new Animated.Value(0)).current

    const slideUp = () => {
        Animated.parallel([
            Animated.timing(slideAnimation, {
                toValue: perfectSize(80),
                duration: 2000,
                useNativeDriver: false
            }),
            Animated.timing(height, {
                toValue: perfectSize(200),
                duration: 2000,
                useNativeDriver: false
            }),
            Animated.timing(width, {
                toValue: perfectSize(200),
                duration: 2000,
                useNativeDriver: false
            }),
        ]).start()
        
    }

    useEffect(()=>{
        slideUp()
        setTimeout(()=> {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false
            }).start()
        },2000)
    },[])

    return (
        <View 
            style={styles.container}
        >

            <StatusBar 
                backgroundColor={colors.backgroundColor} 
                barStyle='dark-content' />

            <Animated.View 
                style={{ 
                    height: height, 
                    width: width, 
                    marginTop: slideAnimation 
                }}>
            
                <Image
                    source={images.launchScreenLogo} 
                    style={styles.images}
                    resizeMode='contain' />

            </Animated.View>
            <Animated.View style={{flex: 1, opacity: opacity}} >
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

                <Image 
                    source={images.goal}
                    style={{height: perfectSize(50),width: perfectSize(50), alignSelf: 'center'}}
                    resizeMode='contain'
                />
                
                </Animated.View>
                
                <Animated.View style={[styles.bottomView, { opacity: opacity }]}>

                    <Button 
                        title={strings.launchScreen.signupTitle}
                        onPress={()=>navigation.navigate('Signup')} />

                    <Text 
                        onPress={()=>navigation.navigate('Login')} 
                        style={styles.loginButton}
                    >
                        {strings.launchScreen.loginTitle}
                    </Text>
            
                </Animated.View>

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
        height: '100%',
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
        opacity: 0.6
    },
    bottomView: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: '5%'
    },
    loginButton: {
        color: colors.textColor,
        fontSize: perfectSize(18),
        textAlign: 'center',
        fontFamily: fonts.quicksandBold,
        opacity: 0.5,
        marginTop: '5%'
    }
})