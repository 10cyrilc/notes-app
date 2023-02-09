import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import colours from '../misc/colours'
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function NotFound() {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, StyleSheet.absoluteFillObject, { paddingTop: Math.max(insets.bottom, 16) }]}>
            <AntDesign name='frowno' size={90} color={colours.ERROR} />
            <Text style={{ marginTop: 20, fontSize: 20, color: colours.LIGHT }}>Result Not Found</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        zIndex: -1
    }
})