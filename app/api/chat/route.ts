import { streamText, convertToCoreMessages, tool } from "ai"
import { google } from "@ai-sdk/google"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod";


export const maxDuration = 60;

export async function POST(req: NextRequest){
    const {messages, content} = await req.json()

    const finalResult = await streamText({
        model: google("gemini-1.5-flash"),
        system: `You are a notes app assistant called Magic AI. You will elaborate on the input given to you. You will recieve data in HTML format extract the text from the prompt and send response with atleast 100 charchters.content may change between prompts. consider each prompt separatley.the current content is content of note: ${content}. All of your responses should be formatted correctly using your own formatting. Don't use the asteriskes in your formatting.`,
        messages: convertToCoreMessages(messages),
    })

    

    return finalResult.toDataStreamResponse()
}