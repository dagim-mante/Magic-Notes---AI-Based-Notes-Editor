import Tiptap from "@/components/tip-tap/tip-tap";
import { db } from "@/server";
import { auth } from "@/server/auth";
import { usersToNotes } from "@/server/schema";
import { and, eq } from "drizzle-orm";

export default async function NoteEditorPage({
    params: {id}
}: {
    params: {id: string}
}){
    const session = await auth()
    const myNote = await db.query.usersToNotes.findFirst({
        where: and(
            eq(usersToNotes.userId, session?.user?.id!),
            eq(usersToNotes.noteId, Number(id)),
        ),
        with: {
            note: true,
            user: true
        }
    })
    return (
        <Tiptap myNote={myNote!} />
    )
}