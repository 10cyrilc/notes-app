import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colours from '../misc/colours'

export default function Note({ item, onPress }) {
    const { title, desc } = item
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text numberOfLines={2} style={styles.title}>{title}</Text>
            <Text numberOfLines={3} style={styles.desc}>{desc}</Text>
        </TouchableOpacity>
    )
}

const width = (Dimensions.get('window').width - 40) / 2

const styles = StyleSheet.create({
    container: {
        backgroundColor: colours.PRIMARY,
        width: width - 10,
        padding: 8,
        borderRadius: 10,
        height: 150
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: colours.LIGHT
    },
    desc: {
        color: colours.LIGHT,
        paddingTop: 20,
        fontSize: 16
    }
})