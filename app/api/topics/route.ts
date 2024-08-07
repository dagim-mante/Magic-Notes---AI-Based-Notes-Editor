import db from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"


export async function POST(req:NextRequest){
    const data:Promise<any> = await req.json()
    const {title, content} = data
    const session = await getServerSession(db)
    const user = await db.user.findUnique({
        where:{
            email: session?.user.email
        }
    })
    
    await db.note.create({
        data: {
            userId: user?.id,
            title,
            content
        }
    })
    return NextResponse.json({message: 'Topic Created!'}, {status: 201})
}


export async function DELETE(req:NextRequest){
    const id = req.nextUrl.searchParams.get('id')
    await db.note.delete({
        where: {
            id: id
        }
    }) 
    return NextResponse.json({message: 'Topic Deleted!'}, {status: 200})
}