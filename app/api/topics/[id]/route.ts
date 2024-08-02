import { connectToMongoDB } from "@/libs/db"
import topic from "@/models/topic"
import { NextRequest, NextResponse} from "next/server"


export async function PUT(req:NextRequest, {params}){
    const {id} = params
    const {newTitle: title, newDescription: description} = await req.json()

    await connectToMongoDB()
    await topic.findByIdAndUpdate(id, {title, description})
    return NextResponse.json({"message": "topic updated."}, {status: 200})
}

export async function GET(req:NextRequest, {params}){
    const {id} = params
    await connectToMongoDB()
    const selectedTopic = await topic.findOne({_id: id})
    console.log(selectedTopic)
    return NextResponse.json({topic: selectedTopic}, {status: 200})
} 

