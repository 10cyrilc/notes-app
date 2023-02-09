import { Text, StyleSheet, View, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import colours from '../misc/colours'
import SearchBar from '../components/SearchBar'
import RoundIcon from '../components/RoundIcon';
import NoteInputModal from '../screens/NodeInputModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';
import { useNotes } from '../context/NoteProvider';
import NotFound from '../components/NotFound';

import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default function NoteScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [noResults, setNoResults] = useState(false)

    const insets = useSafeAreaInsets();

    const { notes, setNotes, findNotes } = useNotes()

    const reverseData = data => {
        return data.sort((a, b) => {
            const aInt = parseInt(a.time);
            const bInt = parseInt(b.time);
            if (aInt < bInt) return 1;
            if (aInt == bInt) return 0;
            if (aInt > bInt) return -1;
        });
    };

    const reverseNotes = reverseData(notes)


    const handleOnSubmit = async (title, desc) => {
        const time = Date.now()
        const note = { id: time, title, desc, time: time }
        const updateNotes = [...notes, note];
        setNotes(updateNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(updateNotes))
    }

    const openNote = note => {
        navigation.navigate('NoteDetails', { note })

    }

    const handleonChangeQuery = async (text) => {
        setSearchQuery(text)
        if (!text.trim()) {
            setSearchQuery('')
            setNoResults(false)
            return await findNotes()
        }
        const searchedNotes = notes.filter(n => {
            if (n.title.toLowerCase().includes(text.toLowerCase())) {
                return n
            }
        })
        if (searchedNotes.length) {
            setNotes([...searchedNotes])
        } else {
            setNoResults(true)
        }
    }

    const handleClear = async () => {
        setSearchQuery('')
        setNoResults(false)
        await findNotes()
    }

    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colours.DARK} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, { paddingTop: Math.max(insets.bottom, 16) }]}>
                    {
                        modalVisible ? <Text style={styles.header}>
                        </Text> :
                            <Text style={styles.header}>
                                All Notes
                            </Text>
                    }
                    {
                        notes.length ?
                            <SearchBar
                                value={searchQuery}
                                onChangeText={handleonChangeQuery}
                                containerStyle={{ marginVertical: 15 }}
                                onClear={handleClear}
                            />
                            : null
                    }
                    {noResults ? <NotFound /> :
                        <FlatList
                            data={reverseNotes}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
                            keyExtractor={item => String(item.id)}
                            renderItem={({ item }) => <Note onPress={() => openNote(item)} item={item} />}
                        />}
                    {!notes.length ?
                        (<View style={[StyleSheet.absoluteFillObject, styles.emptyHeadingContainer]}>
                            <Text style={styles.emptyHeading}>
                                Add  Notes
                            </Text>
                        </View>)
                        : null}
                </View>
            </TouchableWithoutFeedback>
            <RoundIcon
                onPress={() => setModalVisible(true)}
                antIcon='plus'
                style={styles.addBtn}
            />
            <NoteInputModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleOnSubmit}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1,
        backgroundColor: '#011627',
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 20,
        color: colours.LIGHT
    },
    emptyHeading: {
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.2,
        color: colours.LIGHT
    },
    emptyHeadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBtn: {
        position: 'absolute',
        right: 15,
        bottom: 50,
        zIndex: 1
    }
})