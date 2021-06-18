import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from '../../components'
import auth from '@react-native-firebase/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
const mapStateToProps = state => {
    return {
        state: state.signupReducer
    }
}
class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button 
                    buttonTitle='Signout'
                    onPress={()=>{
            //             firestore()
            // .collection('users')
            // .doc('res.uid')
            // .set({
            //     "displayName": 'AA'
            // })
            auth()
                        .signOut()
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

export default connect(mapStateToProps)(Home)