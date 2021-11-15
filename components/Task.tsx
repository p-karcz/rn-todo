import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
    text: string,
    onPress?: () => void
}

const Task = (props: Props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square} onPress={props.onPress}/>
                <Text>{props.text}</Text>
            </View>
            <View style={styles.circular}/>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55bcf6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    itemText: {
        maxWidth: '80%'
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55bcf6',
        borderWidth: 2,
        borderRadius: 5
    }
})

export default Task;