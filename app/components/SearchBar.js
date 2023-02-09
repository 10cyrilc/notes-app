import { Text, StyleSheet, View, TextInput } from 'react-native'
import React, { Component } from 'react'
import colours from '../misc/colours'
import { AntDesign } from '@expo/vector-icons'

export default function SearchBar({ containerStyle, value, onChangeText, onClear }) {
    return (
        <View style={[styles.container, { ...containerStyle }]}>
            <TextInput
                value={value}
                style={styles.searchBar}
                onChangeText={onChangeText}
                placeholder="Search Notes....."
                placeholderTextColor={colours.LIGHT}
            />
            {
                value ? <AntDesign
                    name='close'
                    size={20}
                    color={colours.ERROR}
                    onPress={onClear}
                    style={styles.clearIcon}
                /> : null
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    searchBar: {
        borderWidth: 0.5,
        borderColor: colours.PRIMARY,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 20
    },
    clearIcon: {
        position: 'absolute',
        right: 10,
    }

})