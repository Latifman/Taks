import React from 'react';
import {
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from 'react-native';

const PlatformTouchable = props => {
    const { style, children, ...rest } = props;

    // const Touchable =
    //   Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const Touchable = Platform.select({
        android: TouchableNativeFeedback,
        ios: TouchableOpacity,
    });

    return (
        <Touchable {...rest}>
            <View style={style}>{children}</View>
        </Touchable>
    )
}


export default PlatformTouchable
