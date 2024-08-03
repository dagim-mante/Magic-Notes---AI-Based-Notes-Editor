import db from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const data:Promise<any> = await req.json()
    const {title, description} = data
    
    await db.topic.create({
        data: {
            title,
            description
        }
    })
    return NextResponse.json({message: 'Topic Created!'}, {status: 201})
}

export async function GET(){
    const topics = await db.topic.findMany()
    return NextResponse.json({topics}, {status: 200})
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