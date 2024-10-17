import { streamText, convertToCoreMessages } from "ai"
import { google } from "@ai-sdk/google"
import { NextRequest, NextResponse } from "next/server"


export const maxDuration = 60;

export async function POST(req: NextRequest){
    const {messages} = await req.json()
    const result = await streamText({
        model: google("gemini-1.5-flash"),
        system: "You are a notes app assistant you will elaborate on the input given to you. You will recieve data in HTML format extract the text from the prompt and send response with atleast 100 charchters.",
        messages: convertToCoreMessages(messages),
    })

    return result.toDataStreamResponse()
}