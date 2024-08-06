import db from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {userId} = await req.json() 
    let topics = await db.topic.findMany({
        where: {
            userId
        }
    })
    return NextResponse.json({topics}, {status: 200})
}