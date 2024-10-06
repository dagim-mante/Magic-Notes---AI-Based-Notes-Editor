import { db } from "@/server";
import { auth } from "@/server/auth";
import { notes, usersToNotes } from "@/server/schema";
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