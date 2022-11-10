import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableNativeFeedbackBase, Image, View, TouchableOpacity, Platform } from 'react-native'
import PlatformTouchable from '../components/PlatformTouchable'
import ModelScreen from './ModelScreen';

const HomeScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <PlatformTouchable>
                <View style={styles.touchableContainer}>
                    <View style={styles.rightPart}>
                        <Image
                            source={require('../assets/icon/stock-file-icon-gray.png')}
                            style={styles.image1}
                        />
                        <Text style={styles.title}>Asset Inventory</Text>

                    </View>
                    <Image
                        source={require('../assets/icon/arrow-right-gray1.png')}
                        style={styles.image1}
                    />
                </View>
            </PlatformTouchable>

            <PlatformTouchable
                onPress={() => navigation.navigate(ModelScreen)}>
                <View style={styles.touchableContainer}>
                    <View style={styles.rightPart}>
                        <Image
                            source={require('../assets/icon/vendors-icon-gray.png')}
                            style={styles.image1}
                        />
                        <Text style={styles.title}>Model</Text>

                    </View>
                    <Image
                        source={require('../assets/icon/arrow-right-gray1.png')}
                        style={styles.image1}
                    />
                </View>
            </PlatformTouchable>

            <PlatformTouchable>
                <View style={styles.touchableContainer}>
                    <View style={styles.rightPart}>
                        <Image
                            source={require('../assets/icon/vendors-icon-gray.png')}
                            style={styles.image1}
                        />
                        <Text style={styles.title}>Person</Text>

                    </View>
                    <View style={styles.leftPart}>
                        <Image
                            source={require('../assets/icon/arrow-right-gray1.png')}
                            style={styles.image1}
                        />
                    </View>
                </View>
            </PlatformTouchable>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    rightPart: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    image1: {

    },
    touchableContainer: {
        flext: 1,
        flexDirection: 'row',
        marginBottom: 20,
        marginHorizontal: 61,
        backgroundColor: '#EAEAEA',
        padding: 15,
        borderRadius: 27,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        color: '#4E4E4E',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Bold',
        paddingHorizontal: 9
    },
})