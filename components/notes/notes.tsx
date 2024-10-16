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
    useEffect(() => {
        setNotesState(myNotes)
    }, [myNotes])

    return (
        <>
            <NotesHeader myNotes={notesState} setNotesState={setNotesState}/>
            <NotesGrid myNotes={notesState} />
        </>
    )
}