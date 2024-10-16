import { db } from "@/server";
import { auth } from "@/server/auth";
import { notes, usersToNotes } from "@/server/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Create a new note
export const POST = async (req: NextRequest) => {
    try{
        const {title, content} = await req.json()
        const session = await auth()
    
        // User not logged in
        if(!session || !session.user){
            return NextResponse.json({error: 'You must be logged in to create a note.'}, {status: 400})
        }
    
        if(!title){
            return NextResponse.json({error: 'A note must have a title'}, {status: 400})
        }

        // Create new note
        const newNote = await db.insert(notes).values({
           title,
           content,
        }).returning()
        
        // Input into the join table for many to many relations 
        const newUserToNote = await db.insert(usersToNotes).values({
            userId: session.user.id!,
            noteId: newNote[0].id
        })
        return NextResponse.json({success: newNote}, {status: 201})
    }catch(error){
        console.log(error)
        return NextResponse.json({error: 'Something went wrong.'}, {status: 500})
    }
}

export const PUT = async (req: NextRequest) => {
    try{
        const session = await auth()
        if(!session){
            return NextResponse.json({error: 'You must be logged in to complete this action.'}, {status: 400})
        }
    
        const {id, content} = await req.json()
        if(!id || !content){
            return NextResponse.json({error: 'Incomplete form.'}, {status: 400})
        }
    
        const myNote = await db.query.usersToNotes.findFirst({
            where: and(
                eq(usersToNotes.userId, session.user?.id!),
                eq(usersToNotes.noteId, id)
            ),
        })
        if(!myNote){
            return NextResponse.json({error: 'Note not found.'}, {status: 400})
        }
    
        const updatedNote = await db.update(notes).set({
            content,
        }).where(eq(notes.id, id)).returning()
    
        return NextResponse.json({success: updatedNote[0]}, {status: 200})
    }catch(error){
        console.log(error)
        return NextResponse.json({note: null, error: 'Something went wrong.'}, {status: 500})
    }
}
