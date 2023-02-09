import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useHeaderHeight } from '@react-navigation/elements';
import colours from '../misc/colours';
import RoundIcon from './RoundIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../context/NoteProvider';
import NoteInputModal from '../screens/NodeInputModel';
import Divider from 'react-native-divider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function (props) {
    const [note, setNote] = useState(props.route.params.note)
    const headerHeight = useHeaderHeight()
    const { setNotes } = useNotes()
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const insets = useSafeAreaInsets();


    const formatTime = (ms) => {
        const time = new Date(ms)
        const date = time.getDate()
        const month = time.getMonth() + 1
        const year = time.getFullYear()
        const hrs = time.getHours()
        const mins = time.getMinutes()
        const secs = time.getSeconds()
        return `${date}-${month}-${year} @ ${hrs}:${mins}:${secs}`
    }

    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('notes')
        let notes = []
        if (result !== null) notes = JSON.parse(result)
        const newNotes = notes.filter(n => n.id !== note.id)
        setNotes(newNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
        props.navigation.goBack()
    }

    const displayDeleteAlert = () => {
        Alert.alert("Are you Sure to Delete this Note?",
            "This is Permenant and Cannot be undone or Recovered",
            [
                {
                    text: 'Delete',
                    onPress: deleteNote
                },
                {
                    text: 'No Thanks',
                    onPress: () => console.log("delete")
                },
            ], {
            cancelable: true
        })
    }

    const handleUpdate = async (title, desc, time) => {
        const results = await AsyncStorage.getItem('notes')
        let notes = []
        if (results !== null) notes = JSON.parse(results)

        const newNotes = notes.filter(n => {
            if (n.id === note.id) {
                n.title = title
                n.desc = desc
                n.isUpdated = true
                n.time = time

                setNote(n)
            }
            return n
        })
        setNotes(newNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
    }
    const handleonClose = () => setShowModal(false)

    const openEditModal = () => {
        setIsEdit(true)
        setShowModal(true)
    }

    return (
        <>
            <ScrollView contentContainerStyle={[styles.container, { paddingTop: headerHeight, paddingTop: Math.max(insets.bottom + 60, 66) }]}>
                <Text style={styles.title}>{note.title}</Text>
                <Divider color="#fff" orientation='right'>
                    <Text style={styles.time}>{
                        note.isUpdated
                            ? `Updated at ${formatTime(note.time)}`
                            : `Created at ${formatTime(note.time)}`
                    }
                    </Text>
                </Divider>
                <Text style={styles.desc}>{note.desc}</Text>
            </ScrollView>
            <View style={styles.btnContainer}>
                <RoundIcon
                    antIcon='delete'
                    size={12}
                    style={{ backgroundColor: colours.ERROR, marginBottom: 15 }}
                    onPress={displayDeleteAlert}
                />
                <RoundIcon
                    antIcon='edit'
                    style={{ backgroundColor: colours.PRIMARY }}
                    size={12}
                    onPress={openEditModal}
                />
            </View>
            <NoteInputModal isEdit={isEdit} note={note} onClose={handleonClose} onSubmit={handleUpdate} visible={showModal} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#011627',
    },
    title: {
        fontSize: 30,
        color: colours.PRIMARY,
        fontWeight: 'bold'
    },
    desc: {
        paddingTop: 20,
        fontSize: 20,
        opacity: 0.6,
        color: colours.LIGHT
    },
    time: {
        textAlign: 'right',
        fontSize: 12,
        opacity: 0.5

    },
    btnContainer: {
        position: 'absolute',
        right: 15,
        bottom: 50,

    }
})