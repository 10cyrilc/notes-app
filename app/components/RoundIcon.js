import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import colours from '../misc/colours'

export default function RoundIcon({ antIcon, size, color, style, onPress }) {
    return (
        <AntDesign
            name={antIcon}
            size={size}
            color={color || colours.LIGHT}
            style={[styles.icon, { ...style }]}
            onPress={onPress}
        />
    )
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: colours.PRIMARY,
        padding: 15,
        borderRadius: 50,
        elevation: 5,
        fontSize: 30
    }
})