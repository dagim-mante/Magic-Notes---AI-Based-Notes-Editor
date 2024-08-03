import db from '@/libs/db'
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

export async function GET(req:NextRequest, {params}){
    const {id} = params
    const selectedTopic = await db.topic.findUnique({
        where: {
            id: id
        }
    })
    console.log(selectedTopic)
    return NextResponse.json({topic: selectedTopic}, {status: 200})
} 

