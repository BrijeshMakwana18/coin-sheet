import 
    React,{
    useRef,
    useState,
    useEffect 
} from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Image,
    ImageBackground, 
    TouchableOpacity, 
    Platform, 
    KeyboardAvoidingView, 
    Keyboard, 
    TouchableWithoutFeedback, 
    TextInput,
    Modal,
    Animated,
    Easing,
    StatusBar
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { Button } from '../../components'
import { 
    images, 
    colors, 
    fonts, 
    perfectSize, 
    strings 
} from '../../theme'

const mapDispatchToProps = dispatch => {
    return bindActionCreators({  }, dispatch)
}

const mapStateToProps = state => {
    return {
        state: state.signupReducer
    }
}
function Account(props) {

    return (
        <>
            <StatusBar 
                translucent
                backgroundColor={colors.backgroundColor}
                barStyle='light-content'
            />
            <View style={styles.container}>
                <Text>
                    Account
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: perfectSize(Platform.OS == 'ios' ? 56 : 40),
        padding: perfectSize(23),
        backgroundColor: colors.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account)