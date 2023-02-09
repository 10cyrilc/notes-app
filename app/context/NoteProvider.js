import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'

const NoteContext = createContext()

export default function NoteProvider({ children }) {
    const [notes, setNotes] = useState([])

    const findNotes = async () => {
        const results = await AsyncStorage.getItem('notes')
        if (results !== null) setNotes(JSON.parse(results))
    }

    useEffect(() => {
        findNotes();
    }, [])

    return (
        <NoteContext.Provider value={{ notes, setNotes, findNotes }} >
            {children}
        </NoteContext.Provider>
    )
}
export const useNotes = () => useContext(NoteContext)