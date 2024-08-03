import db from "@/libs/db"
import { NextResponse } from "next/server"
import {hash} from 'bcrypt'

export async function POST(req: Request){
    try{
        const {username, email, password, confirmPassword} = await req.json()

        if(!username || !email || !password || !confirmPassword){
            return NextResponse.json({user: null, message: 'All fields are required.'}, {status: 409})
        }

        const accountWithUsername = await db.user.findUnique({
            where: {
                username
            }
        })
        if(accountWithUsername){
            return NextResponse.json({user: null, message: 'Account with this username exists.'}, {status: 409})
        }

        const accountWithEmail= await db.user.findUnique({
            where: {
                email
            }
        })
        if(accountWithEmail){
            return NextResponse.json({user: null, message: 'Account with this email exists.'}, {status: 409})
        }

        if(password !== confirmPassword){
            return NextResponse.json({user: null, message: 'Password don\'t match'}, {status: 409})
        }

        const hashedPassword = await hash(password, 10)
        const user = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
        return NextResponse.json({user, message: 'New user created!'}, {status: 201})
    }catch(error){
        return NextResponse.json({user: null, message: 'Something went wrong.'}, {status: 500})
    }
}