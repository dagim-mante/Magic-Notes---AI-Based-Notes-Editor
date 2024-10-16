'use client'

import { NoteWithUser } from "@/lib/infer-type";
import NotesHeader from "./notes-dashboard-header";
import NotesGrid from "./notes-grid";
import { useEffect, useState } from "react";

export const revalidate = 0

export default function Notes({
    myNotes
}: {
    myNotes: NoteWithUser[]
}){
    const [notesState, setNotesState] = useState(myNotes)
    const [filterNotes, setFilterNotes] = useState(myNotes)

    useEffect(() => {
        setNotesState(myNotes)
        setFilterNotes(myNotes)
    }, [myNotes])

    return (
        <>
            <NotesHeader  myNotes={notesState} allNotes={notesState} setFilterNotes={setFilterNotes}/>
            <NotesGrid myNotes={filterNotes} />
        </>
    )
}