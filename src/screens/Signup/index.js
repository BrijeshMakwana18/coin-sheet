import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native'
import { Button } from '../../components'
import auth from '@react-native-firebase/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { images, colors, fonts, perfectSize, strings } from '../../theme'
import { updateEmail, updatePassword, signup } from './actions'

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch)
}

const mapStateToProps = state => {
    return {
        state: state.signupReducer
    }
}
class Signup extends Component {
    render() {
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

                                <Text style={styles.title}>{strings.signupScreen.title}</Text>
                                
                                <TextInput
                                    style={[styles.textInput,{marginTop: '40%'}]}
                                    placeholderTextColor='rgba(66,76,89,0.5)'
                                    selectionColor='#8389E9'
                                    autoCapitalize='none' 
                                    placeholder='Email'
                                    onChangeText={(email)=>this.props.updateEmail(email)}
                                    value={this.props.state.signupEmail}
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
                                    onChangeText={(password)=>this.props.updatePassword(password)}
                                    secureTextEntry
                                    value={this.props.state.signupPassword}
                                    ref={(input) => { this.secondTextInput = input }}
                                />

                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
                <View style={styles.bottomView}>
                    <Button 
                        buttonTitle='SIGN UP'
                        onPress={()=>this.props.signup()}
                    />
                    <Text style={styles.bottomText}>By creating an account, you are agreeing to our{'\n'}<Text style={{fontFamily: fonts.quicksandBold}}>Terms and Conditions</Text> and <Text style={{fontFamily: fonts.quicksandBold}}>Privacy Policy</Text> </Text>
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
)(Signup)