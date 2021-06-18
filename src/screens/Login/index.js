import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    Platform, 
    KeyboardAvoidingView, 
    Keyboard, 
    TouchableWithoutFeedback, 
    TextInput,
    Modal 
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import auth from '@react-native-firebase/auth'
import { Button } from '../../components'
import { 
    images, 
    colors, 
    fonts, 
    perfectSize, 
    strings 
} from '../../theme'
import { 
    login 
} from './actions'

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ login }, dispatch)
}

const mapStateToProps = state => {
    return {
        state: state.loginReducer
    }
}
class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            isVisible: false,
            email: '',
            password: ''
        }
    }

    handleLoginPress = async(email,password) => {
        await auth()
        .signInWithEmailAndPassword(email,password)
        .then(async(res)=>{
            this.props.login(res.user)
        })
        .catch(async(err)=> {
           console.log(err)
        })
    }
    render() {
        let { isVisible, email, password } = this.state
        return (
            <>
                <View style={styles.container}>
                    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View>
                                <TouchableOpacity 
                                    onPress={()=>this.props.navigation.goBack()} 
                                    style={styles.header}>
                                    
                                    <Image 
                                        source={images.backArrow}
                                        style={styles.backArrow} />
                                        
                                </TouchableOpacity>

                                <Text style={styles.title}>{strings.loginScreen.title}</Text>
                                
                                <TextInput
                                    style={[styles.textInput,{marginTop: '40%'}]}
                                    placeholderTextColor='rgba(66,76,89,0.5)'
                                    selectionColor='#8389E9'
                                    autoCapitalize='none' 
                                    placeholder='Email'
                                    onChangeText={(email)=>this.setState({ email: email })}
                                    value={email}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.secondTextInput.focus()}
                                    blurOnSubmit={false}
                                />
                                <TextInput
                                    style={[styles.textInput,{marginTop: perfectSize(18)}]}
                                    placeholderTextColor='rgba(66,76,89,0.5)'
                                    selectionColor='#8389E9'
                                    autoCapitalize='none'
                                    placeholder='Password'
                                    onChangeText={(password)=>this.setState({ password: password })}
                                    secureTextEntry
                                    value={password}
                                    ref={(input) => { this.secondTextInput = input }}
                                />

                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
                <View style={styles.bottomView}>
                    <Button 
                        buttonTitle={strings.loginScreen.buttonTitle}
                        onPress={()=>
                            this.handleLoginPress(email,password)
                        }
                    />
                    <Text style={styles.bottomText}>By logging in, you are agreeing to our{'\n'}<Text style={{fontFamily: fonts.quicksandBold}}>Terms and Conditions</Text> and <Text style={{fontFamily: fonts.quicksandBold}}>Privacy Policy</Text> </Text>
                </View>
                <Modal
                    visible={this.state.isVisible}
                    transparent
                    
                >
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                        <View style={{
                            height: 100,
                            width: 200,
                            backgroundColor: 'white'
                        }}>
                            <Text onPress={()=>this.setState({isVisible: false})}>Okay</Text>
                        </View>
                    </View>
                </Modal>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: perfectSize(Platform.OS == 'ios' ? 56 : 40),
        padding: perfectSize(23),
        backgroundColor: colors.backgroundColor
    },
    header: {
        height: perfectSize(23),
        width: perfectSize(30),
    },
    backArrow: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        tintColor: colors.textColor,
        opacity: 0.5
    },
    title: {
        textAlign: 'center',
        fontFamily: fonts.quicksandBold,
        fontSize: perfectSize(56),
        color: colors.textColor,
        opacity: 0.5,
    },
    textInput: {
        padding: perfectSize(20), 
        height: perfectSize(70), 
        width: '100%', 
        backgroundColor: 'rgba(0,0,0,0.04)', 
        borderRadius: perfectSize(12),
        fontSize: perfectSize(23),
        fontFamily: fonts.quicksandBold,
        color: 'rgba(66,76,89,0.5)'
    },
    bottomView: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: colors.backgroundColor,
        paddingBottom: '8%'
    },
    bottomText: {
        textAlign: 'center',
        fontSize: perfectSize(14),
        color: colors.white,
        fontFamily: fonts.avenirLight,
        marginTop: '5%'
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)