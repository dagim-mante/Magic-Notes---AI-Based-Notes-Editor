import { NoteWithUser } from "@/lib/infer-type";
import NotesHeader from "./notes-dashboard-header";
import NotesGrid from "./notes-grid";

export default function Notes({
    myNotes
}: {
    myNotes: NoteWithUser[]
}){
    return (
        <>
            <NotesHeader />
            <NotesGrid myNotes={myNotes} />
        </>
    )
}