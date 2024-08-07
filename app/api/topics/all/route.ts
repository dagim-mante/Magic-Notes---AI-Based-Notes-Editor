import db from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {userId} = await req.json() 
    let notes = await db.note.findMany({
        where: {
            userId
        }
    })
    return NextResponse.json({notes}, {status: 200})
}