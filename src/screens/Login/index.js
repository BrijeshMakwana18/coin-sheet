import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from '../../components'
import auth from '@react-native-firebase/auth'

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button 
                    buttonTitle='Login'
                    onPress={()=>{
                        auth()
                        .signInWithEmailAndPassword('abc@example.com', 'brijesh')
                        .catch(error => {
                            alert(error)
                        });
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:  1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})