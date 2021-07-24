import React, {
    useState,
    Component
} from 'react'
import { 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Image,
    Animated, 
    TouchableWithoutFeedback,
    Text,
    DeviceEventEmitter
} from 'react-native'
import { 
    colors, 
    perfectSize, 
    images, 
    fonts
} from '../theme'
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
export default class Add extends Component{  

    animation = new Animated.Value(0)

    toggleMenu = () => {
        // DeviceEventEmitter.emit('OpenTransactionModal', true)
        const toValue = this.open ? 0 : 1
        Animated.spring(this.animation, {
            toValue,
            friction: 5,
            useNativeDriver: false
        }).start()
        this.open = !this.open
    }

    button = (title,value) => {
        return(
            <TouchableWithoutFeedback>
                <Animated.View
                    style={{
                        position: 'absolute',
                        alignItems: "center",
                        justifyContent: "center",
                        width: '200%',
                        height: perfectSize(50),
                        borderRadius: perfectSize(5),
                        backgroundColor: '#6096FD',
                        alignSelf: 'center',
                        transform: [
                            { 
                                scale: this.animation 
                            },
                            {
                                translateY: this.animation.interpolate({
                                    inputRange: [0,1],
                                    outputRange: [0,perfectSize(-value)]
                                })
                            }
                        ]
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >{title}</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }

render(){
    return (
        <>
                <TouchableOpacity 
                    onPress={()=>this.toggleMenu()} 
                    style={styles.container}
                >
                    {this.button('Income',80)}
                    {this.button('Expense',160)}
                    {this.button('Investment',240)}
                    <Animated.View
                        style={{
                            transform: [
                               {
                                    rotate: this.animation.interpolate({
                                        inputRange: [0,1],
                                        outputRange: ["0deg","45deg"]
                                    })
                                }
                            ]
                        }}
                    >
                        <Image 
                            source={images.add}
                            style={{
                                height: perfectSize(25),
                                width: perfectSize(25),
                                resizeMode: 'contain',
                                tintColor: 'white'
                            }}
                        />
                    </Animated.View>
                </TouchableOpacity>
        </>
    )
}
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        width: perfectSize(70),
        borderRadius: perfectSize(15),
        backgroundColor: '#F00B51',
        height: perfectSize(70),
        top: -hp('3%'),
        // marginTop: '2.5%',
        // marginBottom: '2.5%',
        shadowColor: '#F00B51',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {
            height: 10
        },
        elevation: 5
    }
})