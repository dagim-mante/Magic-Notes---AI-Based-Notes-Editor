import { db } from "@/server";
import { auth } from "@/server/auth";
import { notes, usersToNotes } from "@/server/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try{
        const {label, labelColor, labelNotes} = await req.json()
        const session = await auth()

        if(!session){
            return NextResponse.json({error: 'You must be logged in.'}, {status: 400})
        }
        if(labelNotes.length === 0){
            return NextResponse.json({error: 'Incomplete Form.'}, {status: 400})
        }

        for(let i = 0; i < labelNotes.length; i++){
            const myNote = await db.query.usersToNotes.findFirst({
                where: and(
                    eq(usersToNotes.userId, session.user?.id!),
                    eq(usersToNotes.noteId, labelNotes[i])
                ),
            })
            if(!myNote){
                return NextResponse.json({error: 'Note Doesn\'t exist.'}, {status: 400}) 
            }
            await db.update(notes).set({
               labelText: label,
               labelColor
            }).where(
                eq(notes.id, myNote.noteId)
            )
        }
        return NextResponse.json({success: 'New label created.'}, {status: 200})

    }catch(error){
        console.log(error)
        return NextResponse.json({error: 'Something went wrong.'}, {status: 500})
    }
}