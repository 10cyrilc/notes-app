import { Modal, StyleSheet, Text, StatusBar, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import colours from '../misc/colours'
import RoundIcon from '../components/RoundIcon'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NodeInputModel({ visible, onClose, onSubmit, note, isEdit }) {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (isEdit) {
            setTitle(note.title)
            setDesc(note.desc)
        }
    }, [isEdit])

    const handleModalClose = () => {
        Keyboard.dismiss();
    }

    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text)
        if (valueFor === 'desc') setDesc(text)

    }

    const handleSubmit = () => {
        if (!title.trim() && !desc.trim()) return onClose()

        if (isEdit) {
            onSubmit(title, desc, Date.now())

        } else {
            onSubmit(title, desc)
            setTitle('')
            setDesc('')
        }
        onClose()
    }

    const closeModal = () => {
        if (!isEdit) {
            setTitle('')
            setDesc('')
        }
        onClose()
    }

    return (
        <>
            <StatusBar hidden={true} />
            <Modal visible={visible} animationType='fade'>
                <View style={[styles.container, { paddingTop: Math.max(insets.bottom, 16) }]}>
                    <TextInput
                        style={[styles.input, styles.title]}
                        value={title}
                        placeholder="Title"
                        placeholderTextColor={colours.LIGHT}
                        onChangeText={(text) => handleOnChangeText(text, 'title')}
                    />
                    <TextInput
                        multiline
                        value={desc}
                        style={[styles.input, styles.desc]}
                        placeholder="Note"
                        placeholderTextColor={colours.LIGHT}
                        onChangeText={(text) => handleOnChangeText(text, 'desc')}
                    />
                </View>
                <View style={styles.btnContainer}>
                    {title.trim() || desc.trim() ? < RoundIcon
                        antIcon='close'
                        size={15}
                        style={{ marginRight: 20 }}
                        onPress={closeModal}
                    /> : null}
                    <RoundIcon
                        antIcon='check'
                        size={15}
                        onPress={handleSubmit}
                    />
                </View>
                <TouchableWithoutFeedback onPress={handleModalClose} >
                    <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        backgroundColor: '#011627',
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: colours.PRIMARY,
        fontSize: 20,
        color: colours.LIGHT,
    },
    title: {
        marginTop: 40,
        height: 40,
        marginBottom: 30,
        fontWeight: 'bold'

    },
    desc: {
        height: 400,
        borderWidth: 2,
        borderColor: colours.PRIMARY,
        textAlignVertical: 'top',
        paddingHorizontal: 10,
        paddingVertical: 6
    },
    modalBG: {
        flex: 1,
        zIndex: -1,
        backgroundColor: '#011627',

    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: '#011627',
    }
})