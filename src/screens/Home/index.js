import 
    React,{
    useRef,
    useState,
    useEffect,
    Component 
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
    StatusBar,
    DeviceEventEmitter,
    TouchableHighlight,
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
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const mapDispatchToProps = dispatch => {
    return bindActionCreators({  }, dispatch)
}

const mapStateToProps = state => {
    return {
        state: state.signupReducer
    }
}
class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
            <StatusBar 
                translucent
                backgroundColor={colors.backgroundColor}
                barStyle='dark-content'
            />
            <View style={styles.container}>
                <Text
                    onPress={()=>console.log(this.props)}
                >
                    Home
                </Text>
            </View>
        </>
        )
    }
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
)(Home)