import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { List, Icon } from 'react-native-paper';

const Accordion = props => {

    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);

    return (
        <List.Section>
            <List.Accordion
                left={props => <List.Icon />}
                style={{ backgroundColor: '#DEDEDE' }}
                title={props.title}>
                {props.children}
            </List.Accordion>
        </List.Section>
    );
};

export default Accordion;