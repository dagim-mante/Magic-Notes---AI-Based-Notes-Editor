import { connectToMongoDB } from "@/libs/db";
import topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    await connectToMongoDB()
    const data:Promise<any> = await req.json()
    const {title, description} = data
    
    await topic.create({title, description})
    return NextResponse.json({message: 'Topic Created!'}, {status: 201})
}

export async function GET(){
    await connectToMongoDB()
    const topics = await topic.find()
    return NextResponse.json({topics}, {status: 200})
}

export async function DELETE(req:NextRequest){
    await connectToMongoDB()
    const id = req.nextUrl.searchParams.get('id')
    await topic.findByIdAndDelete(id)
    return NextResponse.json({message: 'Topic Deleted!'}, {status: 200})
}