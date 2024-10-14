import { db } from "@/server"
import { auth } from "@/server/auth"
import { notes, usersToNotes } from "@/server/schema"
import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const DELETE = async (req: NextRequest, { params }: { params: { id: number }}) => {
    try{
        const session = await auth()
        if(!session){
            return NextResponse.json({error: 'You must be logged in to complete this action.'}, {status: 400})
        }
        
        if(!params.id){
            return NextResponse.json({error: 'Incomplete form.'}, {status: 400})
        }

        const myNote = await db.query.usersToNotes.findFirst({
            where: and(
                eq(usersToNotes.userId, session.user?.id!),
                eq(usersToNotes.noteId, Number(params.id!))
            ),
        })
        if(!myNote){
            return NextResponse.json({error: 'Note not found.'}, {status: 400})
        }

        await db.delete(usersToNotes).where(eq(usersToNotes.noteId, Number(params.id!)))
        const deletedNote = await db.delete(notes).where(eq(notes.id, Number(params.id!))).returning()

        return NextResponse.json({success: deletedNote}, {status: 200})
    }catch(error){
        console.log(error)
        return NextResponse.json({error: 'Something went wrong.'}, {status: 500})
    }
}