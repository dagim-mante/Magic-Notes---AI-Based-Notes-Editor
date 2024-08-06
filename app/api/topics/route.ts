import db from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"


export async function POST(req:NextRequest){
    const data:Promise<any> = await req.json()
    const {title, description} = data
    const session = await getServerSession(db)
    const user = await db.user.findUnique({
        where:{
            email: session?.user.email
        }
    })
    
    await db.topic.create({
        data: {
            userId: user?.id,
            title,
            description
        }
    })
    return NextResponse.json({message: 'Topic Created!'}, {status: 201})
}


export async function DELETE(req:NextRequest){
    const id = req.nextUrl.searchParams.get('id')
    await db.topic.delete({
        where: {
            id: id
        }
    }) 
    return NextResponse.json({message: 'Topic Deleted!'}, {status: 200})
}