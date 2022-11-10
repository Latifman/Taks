import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return (
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    )
}

const styles = StyleSheet.create({
    card: Platform.select({
        android: {
            elevation: 3,
        },
        ios: {
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 3 },
        },
    }),
});

export default Card;