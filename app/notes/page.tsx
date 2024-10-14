import Notes from "@/components/notes/notes";
import { NoteWithUser } from "@/lib/infer-type";
import { db } from "@/server";
import { auth } from "@/server/auth";
import { usersToNotes } from "@/server/schema";
import { eq } from "drizzle-orm";

export const revalidate = 0

export default async function NotesPage(){
    const session = await auth()
    if(!session){
        return null
    }
    const myNotes = await db.query.usersToNotes.findMany({
        where: eq(usersToNotes.userId, session.user?.id!),
        with: {
            note: true,
            user: true,
        }
    })
    
    return (
        <Notes myNotes={myNotes} />
    )
}