import db from '@/libs/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse} from "next/server"


export async function PUT(req:NextRequest, {params}){
    const {id} = params
    const {newTitle: title, newDescription: description} = await req.json()

    await db.topic.update({
        where: {
            id: id
        },
        data: {
            title,
            description
        }
    })
    return NextResponse.json({"message": "topic updated."}, {status: 200})
}

export async function POST(req:NextRequest, {params}){
    const {id} = params
    const {userId} = await req.json()
    
    const selectedTopic = await db.topic.findUnique({
        where: {
            userId,
            id
        }
    })
    console.log('topic', selectedTopic)
    if(selectedTopic){
        return NextResponse.json({topic: selectedTopic}, {status: 200})
    }else{
        return NextResponse.json({topic: null}, {status: 200})
    }
} 

